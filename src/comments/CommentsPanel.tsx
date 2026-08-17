import { useEffect, useSyncExternalStore } from 'react';
import {
  commentsSuppressed,
  deleteComment,
  getSnapshot,
  initCommentsStore,
  liveComments,
  subscribe,
  toggleMode,
  type CommentPin,
} from './store';
import { parseVariant, variantToSearch } from './variantKey';
import { seedFor } from '../navigation/screenLinks';

/** Arabic screen names for the inbox rows. */
const SCREEN_AR: [RegExp, string][] = [
  [/^\/market/, 'السوق'],
  [/^\/home/, 'الرئيسية'],
  [/^\/cards/, 'محفظة الكاش باك'],
  [/^\/wallet/, 'محفظة النقاط'],
  [/^\/transactions/, 'العمليات'],
  [/^\/withdraw/, 'السحب'],
  [/^\/gift/, 'الإهداء'],
  [/^\/vouchers/, 'القسائم'],
  [/^\/recharge/, 'شحن الرصيد'],
  [/^\/donate/, 'التبرع'],
  [/^\/walaone/, 'ولاء ون'],
  [/^\/store\//, 'المتجر'],
  [/^\/cashback/, 'ربط البطاقة'],
];

const screenLabel = (path: string) => SCREEN_AR.find(([re]) => re.test(path))?.[1] ?? path;

/** Small state chips beside the screen name (tab/phase/linked/ok/aud). */
function describeVariant(variant: string): string[] {
  const { phase, path, params } = parseVariant(variant);
  const chips: string[] = [];
  if (params.tab === 'vouchers') chips.push('القسائم');
  else if (params.tab === 'offers') chips.push('العروض');
  else if (params.tab === 'cashback') chips.push('الكاش باك');
  if (params.ok === '1') chips.push('نجاح');
  else if (params.ok === '0') chips.push('فشل');
  if (params.aud === 'colleagues') chips.push('زملاء');
  else if (params.aud === 'family') chips.push('عائلة');
  if (params.linked === '1') chips.push('بعد الربط');
  else if (params.linked === '0') chips.push('قبل الربط');
  if (path.startsWith('/store/')) chips.push(path.slice('/store/'.length));
  chips.push(`Phase ${phase}`);
  return chips;
}

const relTime = (ts: number): string => {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return 'الآن';
  if (m < 60) return `قبل ${m} د`;
  const h = Math.floor(m / 60);
  if (h < 24) return `قبل ${h} س`;
  return `قبل ${Math.floor(h / 24)} يوم`;
};

/**
 * التعليقات — the shell inbox beside the phone frame (desktop chrome, like
 * DemoControls): toggles comment mode, shows the sync status, and lists every
 * comment across every screen grouped by variant. Clicking a row rebuilds a
 * seeded URL for that screen (SCREEN_LINKS seeds keep guarded screens from
 * bouncing) and hard-navigates with `comments=1&focus=<id>` so the layer
 * opens the pin in place.
 */
export default function CommentsPanel() {
  if (commentsSuppressed()) return null;
  return <Panel />;
}

function Panel() {
  const { doc, status, mode } = useSyncExternalStore(subscribe, getSnapshot);
  useEffect(() => initCommentsStore(), []);

  const live = liveComments(doc);

  // group by full variant; groups by recency, rows by seq
  const groups = new Map<string, CommentPin[]>();
  for (const c of live) {
    const g = groups.get(c.variant);
    if (g) g.push(c);
    else groups.set(c.variant, [c]);
  }
  const ordered = [...groups.entries()]
    .map(([variant, rows]) => ({
      variant,
      rows: rows.sort((a, b) => a.seq - b.seq),
      latest: Math.max(...rows.map((r) => r.updatedAt)),
    }))
    .sort((a, b) => b.latest - a.latest);

  const jump = (c: CommentPin) => {
    const { path, params } = parseVariant(c.variant);
    const seed = seedFor(path, params);
    const target = variantToSearch(c.variant, seed, { comments: '1', focus: c.id });
    window.location.href = `${target.path}?${target.search}`;
  };

  return (
    <div className="comments-panel">
      <div className="demo-group">
        <span className="demo-label">Comments · التعليقات</span>
        <button type="button" aria-pressed={mode} onClick={toggleMode} data-testid="panel-mode-toggle">
          {mode ? 'إيقاف وضع التعليق' : 'تشغيل وضع التعليق'}
        </button>
        <div className="comments-meta">
          <span className={`comments-status ${status === 'shared' ? 'is-shared' : ''}`} data-testid="panel-status">
            {status === 'shared' ? '● مشتركة' : '○ محلية'}
          </span>
          <span className="comments-count" data-testid="panel-count">
            {live.length}
          </span>
        </div>
      </div>

      <div className="comments-list" data-testid="panel-list">
        {ordered.length === 0 && <p className="comments-empty">فعّل وضع التعليق واضغط على أي مكان في الشاشة</p>}
        {ordered.map((g) => {
          const { path } = parseVariant(g.variant);
          return (
            <div key={g.variant} className="comments-screen">
              <p className="comments-screen-title" dir="rtl">
                {screenLabel(path)}
                {describeVariant(g.variant).map((chip) => (
                  <span key={chip} className="comments-chip" dir="auto">
                    {chip}
                  </span>
                ))}
              </p>
              {g.rows.map((c) => (
                <div key={c.id} className="comments-row" data-testid={`panel-row-${c.seq}`}>
                  <button type="button" className="comments-row-main" onClick={() => jump(c)}>
                    <span className="comments-seq">{c.seq}</span>
                    <span className="comments-body">
                      {c.element?.label && (
                        <span className="comments-el" dir="rtl">
                          {'حول: '}
                          {c.element.label}
                        </span>
                      )}
                      <span className="comments-text" dir="auto">
                        {c.text}
                      </span>
                      <span className="comments-sub" dir="rtl">
                        {c.author || 'زائر'}
                        {' · '}
                        {relTime(c.updatedAt)}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="comments-del"
                    aria-label="حذف"
                    onClick={() => deleteComment(c.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
