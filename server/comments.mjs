/**
 * Comments API + static host for the prototype's subdomain deployment.
 *
 *   node server/comments.mjs          # serves dist/ + /api/comments
 *   PORT=8080 node server/comments.mjs
 *
 * The same request handler is mounted by the vite dev server (see
 * vite.config.ts), so `npm run dev` and the deployed subdomain behave
 * identically. Storage is a JSON file beside this script (gitignored);
 * every PUT/POST is merged into the disk doc server-side (last-write-wins
 * per comment id, deletes are tombstones) and the merged doc is returned,
 * so concurrent reviewers can't clobber or resurrect each other's edits.
 */
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, renameSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';
import { notifyNewComments } from './notify.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(HERE, 'comments-data.json');
const DIST = join(HERE, '..', 'dist');
const BODY_LIMIT = 512 * 1024;
const TOMBSTONE_TTL = 30 * 24 * 3600 * 1000;

const emptyDoc = () => ({ version: 1, comments: [] });

function readDoc() {
  try {
    const doc = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
    return doc?.version === 1 && Array.isArray(doc.comments) ? doc : emptyDoc();
  } catch {
    return emptyDoc();
  }
}

function writeDoc(doc) {
  const tmp = `${DATA_FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(doc));
  renameSync(tmp, DATA_FILE);
}

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

function sendJson(res, status, body) {
  const buf = JSON.stringify(body);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(buf);
}

/** Handles /api/comments; returns false when the request is something else. */
export function handleCommentsApi(req, res) {
  const path = (req.url ?? '').split('?')[0];
  if (path !== '/api/comments') return false;

  if (req.method === 'GET') {
    sendJson(res, 200, readDoc());
    return true;
  }
  // POST is an alias of PUT for navigator.sendBeacon flushes
  if (req.method === 'PUT' || req.method === 'POST') {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        sendJson(res, 413, { error: 'too large' });
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', async () => {
      if (res.writableEnded) return;
      try {
        const incoming = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (incoming?.version !== 1 || !Array.isArray(incoming.comments)) {
          sendJson(res, 400, { error: 'bad doc' });
          return;
        }
        const stored = readDoc();
        const merged = mergeDocs(stored, incoming);
        writeDoc(merged);
        const proto = req.headers['x-forwarded-proto'] ?? 'http';
        await notifyNewComments(stored, merged, `${proto}://${req.headers.host ?? 'localhost'}`);
        sendJson(res, 200, merged);
      } catch {
        sendJson(res, 400, { error: 'bad json' });
      }
    });
    return true;
  }
  sendJson(res, 405, { error: 'method' });
  return true;
}

/* ── static hosting of dist/ (only when run directly) ─────── */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function serveStatic(req, res) {
  const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
  // the QA reference renders are gitignored and must never publish
  if (urlPath.startsWith('/refs/')) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  let file = join(DIST, safe);
  if (!file.startsWith(DIST)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }
  const hasFile = existsSync(file) && statSync(file).isFile();
  if (!hasFile) {
    // SPA fallback for route-looking paths
    file = join(DIST, 'index.html');
  }
  try {
    const buf = readFileSync(file);
    const type = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
    const cache = file.includes(`${join(DIST, 'assets')}`) ? 'public, max-age=31536000, immutable' : 'no-cache';
    res.writeHead(200, { 'content-type': type, 'cache-control': cache });
    res.end(buf);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === normalize(process.argv[1]);
if (isMain) {
  const port = Number(process.env.PORT) || 8080;
  createServer((req, res) => {
    if (handleCommentsApi(req, res)) return;
    if (req.method === 'GET' || req.method === 'HEAD') {
      serveStatic(req, res);
      return;
    }
    res.writeHead(405);
    res.end('method');
  }).listen(port, () => {
    console.log(`cashback prototype + comments API on http://localhost:${port}`);
  });
}
