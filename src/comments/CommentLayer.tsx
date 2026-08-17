import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { router } from '../navigation/routes';
import { usePhase } from '../state/PhaseState';
import { useAppState } from '../state/AppState';
import { variantKey } from './variantKey';
import {
  addComment,
  getSnapshot,
  initCommentsStore,
  liveCount,
  pinsFor,
  refreshRemote,
  startPolling,
  stopPolling,
  subscribe,
  exportJson,
  importJson,
} from './store';
import CommentComposer from './CommentComposer';

type Draft = { x: number; contentY: number };

/** The active screen's main vertical scroller (sheets carry their own small
    ones; StoreRouter nests the real one a level deeper). */
function resolveScroller(): HTMLElement | null {
  const screen = document.querySelector<HTMLElement>('.screen');
  if (!screen) return null;
  for (const el of screen.querySelectorAll<HTMLElement>('.overflow-y-auto')) {
    if (el.clientHeight >= screen.clientHeight - 8) return el;
  }
  return screen; // .screen itself is overflow-y:auto per base.css
}

const subscribeRouter = (fn: () => void) => router.subscribe(fn);
const getLocation = () => router.state.location;

/**
 * Review-comment layer (derived feature — the prototype's Figma-style pins):
 * a floating 💬 chip toggles comment mode; while ON, every tap drops a
 * numbered pin with a composer, existing pins open for view/edit/delete, and
 * app interaction is paused (one capture-phase click listener on the phone
 * frame — the layer itself is pointer-events-none so native scrolling keeps
 * working). Pins anchor to the screen's scroll-content space and are keyed
 * by screen variant (variantKey). Hidden entirely for webdriver captures
 * (unless ?comments=1), under ?diff=/?onion=, or when sessionStorage
 * 'clo-no-comments' is set — the pixel gate never sees it.
 */
export default function CommentLayer() {
  const params = new URLSearchParams(window.location.search);
  const suppressed =
    params.has('diff') ||
    params.has('onion') ||
    (navigator.webdriver && !params.has('comments')) ||
    sessionStorage.getItem('clo-no-comments') !== null;

  if (suppressed) return null;
  return <Layer seedOn={params.get('comments') === '1'} />;
}

function Layer({ seedOn }: { seedOn: boolean }) {
  const phase = usePhase();
  const { cardLinked } = useAppState();
  const location = useSyncExternalStore(subscribeRouter, getLocation);
  const { doc, status } = useSyncExternalStore(subscribe, getSnapshot);

  const [mode, setMode] = useState(seedOn);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [frame, setFrame] = useState({ w: 375, h: 812 });

  const rootRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const variant = variantKey(location, phase, cardLinked);
  const pins = pinsFor(variant, doc);
  const active = activeId ? (pins.find((p) => p.id === activeId) ?? null) : null;

  useEffect(() => initCommentsStore(), []);

  // measure the frame + follow the screen's scroll (capture phase — scroll
  // doesn't bubble, but it does capture through the frame element)
  useLayoutEffect(() => {
    const frameEl = rootRef.current?.parentElement;
    if (!frameEl) return;
    let raf = 0;
    const measure = () => {
      const r = frameEl.getBoundingClientRect();
      setFrame({ w: r.width, h: r.height });
      setScrollTop(resolveScroller()?.scrollTop ?? 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    frameEl.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      frameEl.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // route/screen change: close any open popover, re-read the fresh scroller
  useLayoutEffect(() => {
    setDraft(null);
    setActiveId(null);
    setScrollTop(resolveScroller()?.scrollTop ?? 0);
  }, [location]);

  // comment mode: pause the app behind one capture-phase click listener
  useEffect(() => {
    const frameEl = rootRef.current?.parentElement;
    if (!frameEl || !mode) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-comment-ui]')) return; // our own UI
      e.preventDefault();
      e.stopPropagation();
      setActiveId(null);
      setDraft((prev) => {
        if (prev) return null; // second tap dismisses an open composer
        const r = frameEl.getBoundingClientRect();
        const scroller = resolveScroller();
        return {
          x: (e.clientX - r.left) / r.width,
          contentY: e.clientY - r.top + (scroller?.scrollTop ?? 0),
        };
      });
    };
    frameEl.addEventListener('click', onClick, { capture: true });
    return () => frameEl.removeEventListener('click', onClick, { capture: true });
  }, [mode]);

  // sync cadence follows the mode
  useEffect(() => {
    if (mode) {
      void refreshRemote();
      startPolling();
      return () => stopPolling();
    }
  }, [mode]);

  const toggleMode = () => {
    setDraft(null);
    setActiveId(null);
    setMode((m) => !m);
  };

  const saveDraft = (text: string, author: string) => {
    if (!draft) return;
    addComment({ path: location.pathname, variant, x: draft.x, contentY: draft.contentY, text, author });
    setDraft(null);
  };

  const doExport = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'clo-comments.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const count = liveCount(doc);
  const pinPos = (p: { x: number; contentY: number }) => ({
    left: p.x * frame.w,
    top: p.contentY - scrollTop,
  });

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-[100]" style={{ WebkitTouchCallout: 'none' }}>
      {/* pins — visible only while the viewer has comments on */}
      {mode &&
        pins.map((pin) => {
          const pos = pinPos(pin);
          if (pos.top < -28 || pos.top > frame.h + 28) return null;
          return (
            <button
              key={pin.id}
              type="button"
              data-comment-ui
              data-testid={`comment-pin-${pin.seq}`}
              onClick={() => {
                setDraft(null);
                setActiveId((cur) => (cur === pin.id ? null : pin.id));
              }}
              className="pointer-events-auto absolute z-[105] flex size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full rounded-bl-[4px] border-2 border-solid border-white bg-brand-400 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]"
              style={pinPos(pin)}
            >
              <span className="font-en text-[10px] font-bold leading-none text-ink-inverse">{pin.seq}</span>
            </button>
          );
        })}

      {/* draft pin */}
      {mode && draft && (
        <div
          data-comment-ui
          className="pointer-events-auto absolute z-[105] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full rounded-bl-[4px] border-2 border-solid border-brand-400 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.25)]"
          style={pinPos(draft)}
        />
      )}

      {/* composer / viewer */}
      {mode && draft && (
        <CommentComposer
          pin={null}
          draft
          frameW={frame.w}
          frameH={frame.h}
          pinLeft={pinPos(draft).left}
          pinTop={pinPos(draft).top}
          onSave={saveDraft}
          onClose={() => setDraft(null)}
        />
      )}
      {mode && active && (
        <CommentComposer
          key={active.id}
          pin={active}
          draft={false}
          frameW={frame.w}
          frameH={frame.h}
          pinLeft={pinPos(active).left}
          pinTop={pinPos(active).top}
          onSave={() => setActiveId(null)}
          onClose={() => setActiveId(null)}
        />
      )}

      {/* floating chip + (while ON) the sync/export cluster */}
      <div
        data-comment-ui
        className="pointer-events-auto absolute left-3 z-[106] flex items-center gap-2"
        style={{ bottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          type="button"
          onClick={toggleMode}
          aria-pressed={mode}
          aria-label="التعليقات"
          data-testid="comments-chip"
          className={`relative flex size-10 cursor-pointer items-center justify-center rounded-full border border-solid shadow-[0px_4px_14px_rgba(0,0,0,0.25)] ${
            mode ? 'border-brand-400 bg-brand-400' : 'border-line bg-white/90'
          }`}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
            <path
              d="M3 6.2C3 4.4 4.4 3 6.2 3h7.6C15.6 3 17 4.4 17 6.2v4.6c0 1.8-1.4 3.2-3.2 3.2H8.4L5 16.6a.6.6 0 0 1-1-.5V14A3.2 3.2 0 0 1 3 10.8Z"
              fill="none"
              strokeWidth="1.6"
              className={mode ? 'stroke-white' : 'stroke-ink'}
            />
          </svg>
          {count > 0 && (
            <span
              data-testid="comments-count"
              className={`font-en absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold leading-none ${
                mode ? 'bg-white text-brand-500' : 'bg-brand-400 text-ink-inverse'
              }`}
            >
              {count}
            </span>
          )}
        </button>

        {mode && (
          <div className="flex items-center gap-1 rounded-full border border-solid border-line bg-white/95 px-2 py-1 shadow-[0px_4px_14px_rgba(0,0,0,0.18)]">
            <span
              data-testid="comments-status"
              className={`flex items-center gap-1 px-1 text-[10px] font-medium leading-[1.5] ${
                status === 'shared' ? 'text-brand-500' : 'text-ink-tertiary'
              }`}
              dir="auto"
            >
              <span className={`size-1.5 rounded-full ${status === 'shared' ? 'bg-brand-400' : 'bg-ink-quadrant'}`} />
              {status === 'shared' ? 'مشتركة' : 'محلية'}
            </span>
            <button
              type="button"
              onClick={doExport}
              className="cursor-pointer px-1 text-[10px] font-medium leading-[1.5] text-ink-secondary"
              dir="auto"
            >
              تصدير
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer px-1 text-[10px] font-medium leading-[1.5] text-ink-secondary"
              dir="auto"
            >
              استيراد
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) importJson(await f.text());
                e.target.value = '';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
