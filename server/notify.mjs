/**
 * New-comment email notifications — shared by the Vercel function
 * (api/comments.js) and the self-host server (server/comments.mjs).
 *
 * Sends through Resend's REST API. Env:
 *   RESEND_API_KEY          — required to send; without it this is a no-op
 *   COMMENTS_NOTIFY_EMAIL   — recipient (default a.eltwaty@walaplus.com)
 *   COMMENTS_NOTIFY_FROM    — sender (default Resend's onboarding sender,
 *                             which needs no domain verification)
 *   RESEND_API_BASE         — test override
 *
 * Delivery is tracked, not fire-and-forget: the host supplies a persisted
 * set of already-notified comment ids, and ids are added ONLY after Resend
 * confirms the send (res.ok). A failed or rate-limited send therefore
 * retries automatically on the next push — comments can arrive late in a
 * digest, but never silently never. One transient retry (429/5xx/network)
 * happens in-call. Mail failures still never fail the comments API.
 */
const DEFAULT_TO = 'a.eltwaty@walaplus.com';
const BACKLOG_WINDOW = 7 * 24 * 3600 * 1000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

/** The inbox's jump link, rebuilt server-side from the stored variant. */
function linkFor(origin, c) {
  const parts = String(c.variant || '').split('|');
  const phase = (parts[0] || 'p2').replace(/^p/, '');
  const sp = new URLSearchParams();
  for (const seg of parts.slice(2)) {
    const i = seg.indexOf('=');
    if (i > 0) sp.set(seg.slice(0, i), seg.slice(i + 1));
  }
  sp.set('phase', phase);
  sp.set('comments', '1');
  sp.set('focus', c.id);
  return `${origin}${c.path || '/'}?${sp.toString()}`;
}

async function sendMail(base, key, payload) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 5000);
  try {
    return await fetch(`${base}/emails`, {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctl.signal,
    });
  } finally {
    clearTimeout(t);
  }
}

/**
 * @param {object} args
 * @param {{version:1, comments:any[]}} args.merged — the doc after this push
 * @param {string} args.origin — site origin for the jump links
 * @param {() => Promise<string[]>} args.loadNotified — persisted notified ids
 * @param {(ids: string[]) => Promise<void>} args.saveNotified
 */
export async function notifyNewComments({ merged, origin, loadNotified, saveNotified }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  let notified;
  try {
    notified = new Set(await loadNotified());
  } catch {
    notified = new Set();
  }

  // everything live, real, recent, and not yet successfully emailed —
  // failures from earlier pushes are still here and go out with this digest
  const cutoff = Date.now() - BACKLOG_WINDOW;
  const fresh = merged.comments.filter(
    (c) => !c.deletedAt && c.text && !notified.has(c.id) && (c.createdAt ?? 0) > cutoff,
  );
  if (fresh.length === 0) return;

  const to = process.env.COMMENTS_NOTIFY_EMAIL || DEFAULT_TO;
  const from = process.env.COMMENTS_NOTIFY_FROM || 'CLO Comments <onboarding@resend.dev>';
  const base = process.env.RESEND_API_BASE || 'https://api.resend.com';

  const items = fresh
    .map(
      (c) => `
      <div style="border:1px solid #e2e6ee;border-radius:12px;padding:14px 16px;margin:0 0 12px">
        <p style="margin:0 0 6px;font-size:13px;color:#626c83">
          <strong style="color:#111317">${esc(c.author || 'زائر')}</strong>
          · ${esc(c.path || '/')}
        </p>
        ${c.element?.label ? `<p style="margin:0 0 6px;font-size:12px;color:#00714c">حول: ${esc(c.element.label)}</p>` : ''}
        <p style="margin:0 0 10px;font-size:15px;color:#111317;white-space:pre-wrap">${esc(c.text)}</p>
        <a href="${esc(linkFor(origin, c))}"
           style="font-size:13px;color:#00714c;text-decoration:underline">افتح التعليق في النموذج</a>
      </div>`,
    )
    .join('');

  const subject =
    fresh.length === 1
      ? `تعليق جديد من ${fresh[0].author || 'زائر'} — CLO experience`
      : `${fresh.length} تعليقات جديدة — CLO experience`;

  const html = `
    <div dir="rtl" style="font-family:-apple-system,Segoe UI,Tahoma,sans-serif;max-width:520px;margin:0 auto;padding:8px">
      <h2 style="font-size:16px;color:#111317;margin:0 0 14px">تعليقات جديدة على النموذج</h2>
      ${items}
      <p style="font-size:11px;color:#96a0b6;margin:14px 0 0">CLO experience · ${esc(origin)}</p>
    </div>`;

  try {
    let res;
    try {
      res = await sendMail(base, key, { from, to, subject, html });
    } catch {
      res = null;
    }
    if (!res || res.status === 429 || res.status >= 500) {
      await sleep(1100); // ride out Resend's 2 req/s limit, then one retry
      try {
        res = await sendMail(base, key, { from, to, subject, html });
      } catch {
        res = null;
      }
    }
    if (!res?.ok) return; // stay unnotified — the next push retries

    // confirmed sent — persist, pruned to ids that still exist in the doc
    const current = new Set(merged.comments.map((c) => c.id));
    const next = [...notified].filter((id) => current.has(id));
    for (const c of fresh) next.push(c.id);
    await saveNotified(next);
  } catch {
    /* mail must never fail the comments API */
  }
}
