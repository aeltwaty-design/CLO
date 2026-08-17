/**
 * Comments API on Vercel — the serverless twin of server/comments.mjs.
 *
 * Serverless filesystems are ephemeral, so the doc lives in a Redis KV
 * reached over Upstash's REST API. Provisioning is one dashboard step:
 * Vercel project → Storage → Create → Redis (Upstash, free tier) — the
 * env vars below are injected automatically; redeploy and this endpoint
 * goes live. Until then it answers 503 and the app degrades to
 * device-local comments («محلية»), exactly like static hosting.
 *
 * Same contract as the self-host server: GET returns the doc; PUT/POST
 * (POST = sendBeacon alias) merges the incoming doc into the stored one —
 * last-write-wins per comment id, deletes are tombstones — and returns
 * the merged doc, which the client adopts.
 */
import { notifyNewComments } from '../server/notify.mjs';

const KEY = 'clo-comments-v1';
const BODY_LIMIT = 512 * 1024;
const TOMBSTONE_TTL = 30 * 24 * 3600 * 1000;

const emptyDoc = () => ({ version: 1, comments: [] });

// mirror of mergeDocs in server/comments.mjs / src/comments/store.ts
function mergeDocs(a, b) {
  const byId = new Map();
  for (const c of [...a.comments, ...b.comments]) {
    if (!c || typeof c.id !== 'string') continue;
    const prev = byId.get(c.id);
    if (!prev || (c.updatedAt ?? 0) > (prev.updatedAt ?? 0)) byId.set(c.id, c);
  }
  const now = Date.now();
  const comments = [...byId.values()].filter((c) => !c.deletedAt || now - c.deletedAt < TOMBSTONE_TTL);
  comments.sort((x, y) => (x.seq ?? 0) - (y.seq ?? 0));
  return { version: 1, comments };
}

function redisEnv() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

const NOTIFIED_KEY = 'clo-comments-notified';

async function redisRead(env, key) {
  const res = await fetch(`${env.url}/get/${key}`, {
    headers: { authorization: `Bearer ${env.token}` },
  });
  if (!res.ok) throw new Error(`redis get ${res.status}`);
  const { result } = await res.json();
  return result ?? null;
}

async function redisWrite(env, key, value) {
  const res = await fetch(`${env.url}/set/${key}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.token}` },
    body: value,
  });
  if (!res.ok) throw new Error(`redis set ${res.status}`);
}

async function redisGet(env) {
  const raw = await redisRead(env, KEY);
  if (!raw) return emptyDoc();
  try {
    const doc = JSON.parse(raw);
    return doc?.version === 1 && Array.isArray(doc.comments) ? doc : emptyDoc();
  } catch {
    return emptyDoc();
  }
}

const redisSet = (env, doc) => redisWrite(env, KEY, JSON.stringify(doc));

async function loadNotified(env) {
  const raw = await redisRead(env, NOTIFIED_KEY);
  if (!raw) return [];
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

const saveNotified = (env, ids) => redisWrite(env, NOTIFIED_KEY, JSON.stringify(ids));

export default async function handler(req, res) {
  const env = redisEnv();
  if (!env) {
    res.status(503).json({ error: 'storage not configured — add the Redis (Upstash) integration and redeploy' });
    return;
  }

  try {
    if (req.method === 'GET') {
      res.setHeader('cache-control', 'no-store');
      res.status(200).json(await redisGet(env));
      return;
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      // Vercel parses JSON bodies; sendBeacon blobs arrive as parsed objects
      // too (application/json), but keep the string path for safety
      const incoming = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (JSON.stringify(incoming ?? '').length > BODY_LIMIT) {
        res.status(413).json({ error: 'too large' });
        return;
      }
      if (incoming?.version !== 1 || !Array.isArray(incoming.comments)) {
        res.status(400).json({ error: 'bad doc' });
        return;
      }
      const stored = await redisGet(env);
      const merged = mergeDocs(stored, incoming);
      await redisSet(env, merged);
      // must complete before responding — serverless may freeze afterwards
      await notifyNewComments({
        merged,
        origin: `https://${req.headers.host}`,
        loadNotified: () => loadNotified(env),
        saveNotified: (ids) => saveNotified(env, ids),
      });
      res.setHeader('cache-control', 'no-store');
      res.status(200).json(merged);
      return;
    }
    res.status(405).json({ error: 'method' });
  } catch (err) {
    res.status(502).json({ error: String(err?.message ?? err) });
  }
}
