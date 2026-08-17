/**
 * Comment store — framework-free singleton behind `useSyncExternalStore`.
 *
 * Persistence layers, in order:
 * 1. localStorage ('clo-comments-v1') — always; survives the demo Reset,
 *    which only clears sessionStorage.
 * 2. Same-origin `/api/comments` — best-effort. Served by the vite dev
 *    middleware in dev and by `server/comments.mjs` on the subdomain; when
 *    unreachable (pure static hosting) the store degrades to device-local
 *    and the UI shows «محلية» plus export/import.
 *
 * Concurrency model: last-write-wins per comment id (`updatedAt`), deletes
 * are tombstones (text/author stripped) so a delete can never be resurrected
 * by a peer's later whole-doc PUT. The server merges every PUT into its disk
 * doc and responds with the merged doc, which the client adopts.
 */

export type CommentPin = {
  id: string;
  /** stable pin number — allocated once, never reused after deletes */
  seq: number;
  path: string;
  /** screen identity from variantKey() */
  variant: string;
  /** 0..1 of frame width */
  x: number;
  /** px from the top of the screen's scroll content */
  contentY: number;
  text: string;
  author: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

export type CommentsDoc = { version: 1; comments: CommentPin[] };

const DOC_KEY = 'clo-comments-v1';
const AUTHOR_KEY = 'clo-comments-author';
const TOMBSTONE_TTL = 30 * 24 * 3600 * 1000;
const PUT_DEBOUNCE = 800;
const POLL_MS = 5000;

export type SyncStatus = 'shared' | 'local';

type Snapshot = { doc: CommentsDoc; status: SyncStatus };

/* ── id + doc helpers ─────────────────────────────────────── */

/** crypto.randomUUID needs a secure context — phone-on-LAN dev has none. */
export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const emptyDoc = (): CommentsDoc => ({ version: 1, comments: [] });

function readLocal(): CommentsDoc {
  try {
    const raw = localStorage.getItem(DOC_KEY);
    if (!raw) return emptyDoc();
    const parsed = JSON.parse(raw) as CommentsDoc;
    if (parsed?.version !== 1 || !Array.isArray(parsed.comments)) return emptyDoc();
    return parsed;
  } catch {
    return emptyDoc();
  }
}

function writeLocal(doc: CommentsDoc) {
  try {
    localStorage.setItem(DOC_KEY, JSON.stringify(doc));
  } catch {
    /* storage full/blocked — in-memory copy still works */
  }
}

/** LWW union by id; expired tombstones dropped. Shared by GET/poll/import. */
export function mergeDocs(a: CommentsDoc, b: CommentsDoc): CommentsDoc {
  const byId = new Map<string, CommentPin>();
  for (const c of [...a.comments, ...b.comments]) {
    if (!c?.id) continue;
    const prev = byId.get(c.id);
    if (!prev || (c.updatedAt ?? 0) > (prev.updatedAt ?? 0)) byId.set(c.id, c);
  }
  const now = Date.now();
  const comments = [...byId.values()].filter((c) => !c.deletedAt || now - c.deletedAt < TOMBSTONE_TTL);
  comments.sort((x, y) => x.seq - y.seq);
  return { version: 1, comments };
}

/* ── the singleton ────────────────────────────────────────── */

let snapshot: Snapshot = { doc: readLocal(), status: 'local' };
const listeners = new Set<() => void>();
let initDone = false;
let putTimer: ReturnType<typeof setTimeout> | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
let dirty = false;

function emit(next: Partial<Snapshot>) {
  snapshot = { ...snapshot, ...next };
  writeLocal(snapshot.doc);
  for (const l of listeners) l();
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const getSnapshot = (): Snapshot => snapshot;

async function fetchRemote(): Promise<CommentsDoc | null> {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 1500);
    const res = await fetch('/api/comments', { signal: ctl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const doc = (await res.json()) as CommentsDoc;
    return doc?.version === 1 && Array.isArray(doc.comments) ? doc : null;
  } catch {
    return null;
  }
}

async function pushRemote() {
  dirty = false;
  try {
    const res = await fetch('/api/comments', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(snapshot.doc),
    });
    if (!res.ok) throw new Error(String(res.status));
    const merged = (await res.json()) as CommentsDoc;
    if (merged?.version === 1 && Array.isArray(merged.comments)) {
      emit({ doc: mergeDocs(snapshot.doc, merged), status: 'shared' });
    }
  } catch {
    dirty = true;
    emit({ status: 'local' });
  }
}

function schedulePush() {
  dirty = true;
  if (putTimer) clearTimeout(putTimer);
  putTimer = setTimeout(() => {
    putTimer = null;
    void pushRemote();
  }, PUT_DEBOUNCE);
}

/** iOS kills background timers — beacon the doc out before the tab sleeps. */
function flushBeacon() {
  if (!dirty) return;
  try {
    const blob = new Blob([JSON.stringify(snapshot.doc)], { type: 'application/json' });
    if (navigator.sendBeacon?.('/api/comments', blob)) dirty = false;
  } catch {
    /* best effort */
  }
}

export async function refreshRemote() {
  const remote = await fetchRemote();
  if (remote) emit({ doc: mergeDocs(snapshot.doc, remote), status: 'shared' });
  else emit({ status: 'local' });
}

export function initCommentsStore() {
  if (initDone) return;
  initDone = true;
  void refreshRemote();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushBeacon();
    else void refreshRemote();
  });
}

export function startPolling() {
  if (pollTimer) return;
  pollTimer = setInterval(() => void refreshRemote(), POLL_MS);
}

export function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  if (dirty) void pushRemote();
}

/* ── mutations ────────────────────────────────────────────── */

export function addComment(
  input: Pick<CommentPin, 'path' | 'variant' | 'x' | 'contentY' | 'text' | 'author'>,
): CommentPin {
  const now = Date.now();
  const seq = snapshot.doc.comments.reduce((m, c) => Math.max(m, c.seq), 0) + 1;
  const pin: CommentPin = { id: newId(), seq, createdAt: now, updatedAt: now, ...input };
  emit({ doc: { version: 1, comments: [...snapshot.doc.comments, pin] } });
  schedulePush();
  return pin;
}

export function updateComment(id: string, text: string, author: string) {
  emit({
    doc: {
      version: 1,
      comments: snapshot.doc.comments.map((c) =>
        c.id === id ? { ...c, text, author, updatedAt: Date.now() } : c,
      ),
    },
  });
  schedulePush();
}

export function deleteComment(id: string) {
  const now = Date.now();
  emit({
    doc: {
      version: 1,
      comments: snapshot.doc.comments.map((c) =>
        c.id === id ? { ...c, text: '', author: '', updatedAt: now, deletedAt: now } : c,
      ),
    },
  });
  schedulePush();
}

/** live (non-tombstone) pins for one screen variant */
export function pinsFor(variant: string, doc: CommentsDoc = snapshot.doc): CommentPin[] {
  return doc.comments.filter((c) => !c.deletedAt && c.variant === variant);
}

export const liveCount = (doc: CommentsDoc = snapshot.doc) => doc.comments.filter((c) => !c.deletedAt).length;

/* ── author name ──────────────────────────────────────────── */

export function getAuthor(): string {
  try {
    return localStorage.getItem(AUTHOR_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setAuthor(name: string) {
  try {
    localStorage.setItem(AUTHOR_KEY, name);
  } catch {
    /* fine */
  }
}

/* ── export / import (static-hosting fallback sharing) ────── */

export function exportJson(): string {
  return JSON.stringify(snapshot.doc, null, 2);
}

export function importJson(raw: string): boolean {
  try {
    const doc = JSON.parse(raw) as CommentsDoc;
    if (doc?.version !== 1 || !Array.isArray(doc.comments)) return false;
    emit({ doc: mergeDocs(snapshot.doc, doc) });
    schedulePush();
    return true;
  } catch {
    return false;
  }
}
