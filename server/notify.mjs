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
 * "New" = a live comment whose id was absent from the stored doc before the
 * merge — edits and deletes never email. The client debounces its pushes, so
 * a burst of comments usually lands as ONE email listing them all. Mail
 * failures are swallowed: notifications must never fail the comments API.
 */
const DEFAULT_TO = 'a.eltwaty@walaplus.com';

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

export async function notifyNewComments(stored, merged, origin) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const before = new Set(stored.comments.map((c) => c.id));
  const fresh = merged.comments.filter((c) => !before.has(c.id) && !c.deletedAt && c.text);
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
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 5000);
    await fetch(`${base}/emails`, {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html }),
      signal: ctl.signal,
    });
    clearTimeout(t);
  } catch {
    /* mail must never fail the comments API */
  }
}
