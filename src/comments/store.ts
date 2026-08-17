/**
 * Comment store — framework-free singleton behind `useSyncExternalStore`.
 *
 * Persistence layers, in order:
 * 1. localStorage ('clo-comments-v1') — always; survives the demo Reset,
 *    which only clears sessionStorage.
 * 2. Same-origin `/api/comments` — best-effort. Served by the vite dev
 *    middleware in dev and by `server/comments.mjs` on the subdomain; when
 *    unreachable (pure static hosting) the store degrades to device-local
 *    and the UI shows «محلية».
 *
 * Concurrency model: last-write-wins per comment id (`updatedAt`), deletes
 * are tombstones (text/author stripped) so a delete can never be resurrected
 * by a peer's later whole-doc PUT. The server merges every PUT into its disk
 * doc and responds with the merged doc, which the client adopts.
 */

/** The tapped element, captured for the highlight + the inbox label.
    x/w are fractions of frame width (phones are 360–430 full-bleed, not
    375); y/h are content-space px like `contentY`. Optional — background
    taps and pre-rework pins have none. */
export type ElementRef = {
  label: string;
  testid?: string;
  x: number;
  w: number;
  y: number;
  h: number;
};

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
  element?: ElementRef;
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

type Snapshot = { doc: CommentsDoc; status: SyncStatus; mode: boolean };

/** One suppression rule for every comment surface: Playwright captures
    (webdriver) unless they opt in, the dev diff overlays, and the explicit
    escape hatch. */
export function commentsSuppressed(): boolean {
  try {
    const p = new URLSearchParams(window.location.search);
    return (
      p.has('diff') ||
      p.has('onion') ||
      (navigator.webdriver && !p.has('comments')) ||
      sessionStorage.getItem('clo-no-comments') !== null
    );
  } catch {
    return true;
  }
}

/** `?comments=1` arrives with comment mode ON — resolved once at module
    scope (the PHASE pattern), so StrictMode double-effects can't race it. */
const seedMode = (() => {
  try {
    return new URLSearchParams(window.location.search).get('comments') === '1';
  } catch {
    return false;
  }
})();

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

let snapshot: Snapshot = { doc: readLocal(), status: 'local', mode: seedMode };
const listeners = new Set<() => void>();
let initDone = false;
let putTimer: ReturnType<typeof setTimeout> | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
let dirty = false;

function emit(next: Partial<Snapshot>) {
  const prevDoc = snapshot.doc;
  snapshot = { ...snapshot, ...next };
  // a mode/status flip must not rewrite the doc in storage
  if (snapshot.doc !== prevDoc) writeLocal(snapshot.doc);
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
    // generous enough for a cold serverless start (Vercel) — a too-eager
    // abort would flash «محلية» on first load even when sharing works
    const t = setTimeout(() => ctl.abort(), 4000);
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
  if (snapshot.mode) startPolling();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushBeacon();
    else void refreshRemote();
  });
}

function startPolling() {
  if (pollTimer) return;
  pollTimer = setInterval(() => void refreshRemote(), POLL_MS);
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  if (dirty) void pushRemote();
}

/** The panel (shell) and the layer (frame) share one mode through here —
    the store also owns the sync cadence, so they can't disagree. */
export function setMode(on: boolean) {
  if (snapshot.mode === on) return;
  emit({ mode: on });
  if (on) {
    void refreshRemote();
    startPolling();
  } else {
    stopPolling();
  }
}

export const toggleMode = () => setMode(!snapshot.mode);

/* ── mutations ────────────────────────────────────────────── */

export function addComment(
  input: Pick<CommentPin, 'path' | 'variant' | 'x' | 'contentY' | 'text' | 'author' | 'element'>,
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

/** all live pins across every screen — the inbox's data */
export const liveComments = (doc: CommentsDoc = snapshot.doc) => doc.comments.filter((c) => !c.deletedAt);

export const liveCount = (doc: CommentsDoc = snapshot.doc) => liveComments(doc).length;

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

