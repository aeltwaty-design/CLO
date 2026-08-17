import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { router } from '../navigation/routes';
import { usePhase } from '../state/PhaseState';
import { useAppState } from '../state/AppState';
import { variantKey } from './variantKey';
import {
  addComment,
  commentsSuppressed,
  getSnapshot,
  initCommentsStore,
  pinsFor,
  subscribe,
  type ElementRef,
} from './store';
import CommentComposer from './CommentComposer';

type Draft = { x: number; contentY: number; element?: ElementRef };

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
 * Review-pin layer inside the phone frame (a prototype-shell tool, not
 * product UI — its controls live in the shell's CommentsPanel outside the
 * frame; on phones, `?comments=1` seeds mode ON and the session is
 * capture-only, with no in-frame chrome at all). While mode is ON, every tap
 * is intercepted by one capture-phase click listener: the tapped element is
 * captured (highlight + readable label) and a numbered pin + composer open;
 * existing pins open for view/edit/delete. Native scrolling keeps working —
 * the layer is pointer-events-none and pins track the screen's scroll
 * content. `?focus=<id>` (from the inbox) scrolls to a pin and opens it.
 * Suppressed for webdriver/?diff/?onion — the QA gate never sees it.
 */
export default function CommentLayer() {
  if (commentsSuppressed()) return null;
  return <Layer />;
}

function Layer() {
  const phase = usePhase();
  const { cardLinked } = useAppState();
  const location = useSyncExternalStore(subscribeRouter, getLocation);
  const { doc, mode } = useSyncExternalStore(subscribe, getSnapshot);

  const [draft, setDraft] = useState<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [frame, setFrame] = useState({ w: 375, h: 812 });
  const [hint, setHint] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef(new URLSearchParams(window.location.search).get('focus'));
  const focusAppliedRef = useRef<string | null>(null);

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

  // route/screen change: close any open popover, re-read the fresh scroller.
  // While an inbox focus is pending/applied, the reset must not wipe it —
  // the router emits a late state update right after the initial load.
  useLayoutEffect(() => {
    setDraft(null);
    if (!focusRef.current) setActiveId(null);
    setScrollTop(resolveScroller()?.scrollTop ?? 0);
  }, [location]);

  // mode flip from the shell panel: drop any in-progress popover
  useEffect(() => {
    if (!mode) {
      setDraft(null);
      setActiveId(null);
      focusRef.current = null;
      focusAppliedRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // ?focus=<id> from the inbox — waits for the doc (a fresh browser only
  // receives the comment via the init GET). Stays pending (guarding the
  // location reset above) until the viewer closes the popover; the applied
  // ref keeps the 5s polls from re-scrolling.
  useEffect(() => {
    const id = focusRef.current;
    if (!id || focusAppliedRef.current === id) return;
    const c = doc.comments.find((x) => x.id === id && !x.deletedAt);
    if (!c) return; // not arrived yet — retry on the next doc update
    if (c.variant !== variant) {
      focusRef.current = null;
      setHint(true);
      const t = setTimeout(() => setHint(false), 4000);
      return () => clearTimeout(t);
    }
    focusAppliedRef.current = id;
    const scroller = resolveScroller();
    if (scroller) scroller.scrollTop = Math.max(0, c.contentY - frame.h / 2);
    setScrollTop(scroller?.scrollTop ?? 0);
    setActiveId(c.id);
  }, [doc, variant, frame.h]);

  const clearFocus = () => {
    focusRef.current = null;
    focusAppliedRef.current = null;
  };
  const clearFocusRef = useRef(clearFocus);
  clearFocusRef.current = clearFocus;

  // comment mode: pause the app behind one capture-phase click listener
  useEffect(() => {
    const frameEl = rootRef.current?.parentElement;
    if (!frameEl || !mode) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-comment-ui]')) return; // our own UI
      e.preventDefault();
      e.stopPropagation();
      clearFocusRef.current();
      setActiveId(null);
      setDraft((prev) => {
        if (prev) return null; // second tap dismisses an open composer
        const r = frameEl.getBoundingClientRect();
        const scroller = resolveScroller();
        const st = scroller?.scrollTop ?? 0;

        // capture the tapped element — e.target IS the hit test (this layer
        // and the DiffOverlay are pointer-events-none, so they never occlude)
        let element: ElementRef | undefined;
        const screenEl = document.querySelector('.screen');
        if (target && screenEl?.contains(target) && target !== screenEl && target !== scroller) {
          const cand =
            (target.closest('button,a,input,textarea,select,[data-testid],[role=button]') as HTMLElement | null) ??
            target;
          if (screenEl.contains(cand)) {
            const cr = cand.getBoundingClientRect();
            // Arabic-first label: aria → text → img alt → testid → tag.
            // innerText (not textContent) so sibling lines keep separators.
            const label =
              cand.getAttribute('aria-label') ||
              (cand.innerText ?? '').trim().replace(/\s+/g, ' ').slice(0, 40) ||
              cand.querySelector('img')?.getAttribute('alt') ||
              cand.getAttribute('data-testid') ||
              cand.tagName.toLowerCase();
            element = {
              label,
              testid: cand.getAttribute('data-testid') ?? undefined,
              x: (cr.left - r.left) / r.width,
              w: cr.width / r.width,
              y: cr.top - r.top + st,
              h: cr.height,
            };
          }
        }
        return { x: (e.clientX - r.left) / r.width, contentY: e.clientY - r.top + st, element };
      });
    };
    frameEl.addEventListener('click', onClick, { capture: true });
    return () => frameEl.removeEventListener('click', onClick, { capture: true });
  }, [mode]);

  const saveDraft = (text: string, author: string) => {
    if (!draft) return;
    addComment({
      path: location.pathname,
      variant,
      x: draft.x,
      contentY: draft.contentY,
      element: draft.element,
      text,
      author,
    });
    setDraft(null);
  };

  const pinPos = (p: { x: number; contentY: number }) => ({
    left: p.x * frame.w,
    top: p.contentY - scrollTop,
  });

  // the element outline shown while a popover is open (stored rect is the
  // honest record of what was tapped — no live re-resolution)
  const highlight = draft?.element ?? active?.element ?? null;

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-[100]" style={{ WebkitTouchCallout: 'none' }}>
      {mode && highlight && (
        <div
          className="pointer-events-none absolute z-[104] rounded-lg border-2 border-dashed border-brand-400 bg-brand-400/10"
          data-testid="comment-highlight"
          style={{
            left: highlight.x * frame.w - 2,
            top: highlight.y - scrollTop - 2,
            width: highlight.w * frame.w + 4,
            height: highlight.h + 4,
          }}
        />
      )}

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
                clearFocus();
                setDraft(null);
                setActiveId((cur) => (cur === pin.id ? null : pin.id));
              }}
              className="pointer-events-auto absolute z-[105] flex size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full rounded-bl-[4px] border-2 border-solid border-white bg-brand-400 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]"
              style={pos}
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
          elementLabel={draft.element?.label}
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
          elementLabel={active.element?.label}
          onSave={() => {
            clearFocus();
            setActiveId(null);
          }}
          onClose={() => {
            clearFocus();
            setActiveId(null);
          }}
        />
      )}

      {/* inbox jump landed on a screen whose live state can't be seeded */}
      {hint && (
        <div
          className="pointer-events-none absolute inset-x-6 z-[110] rounded-xl bg-ink px-4 py-2.5"
          style={{ bottom: 120 }}
          data-testid="comment-focus-hint"
        >
          <p className="text-center text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
            تعذّر فتح الشاشة تلقائيًا.. الشاشة تحتاج خطوات حية
          </p>
        </div>
      )}
    </div>
  );
}
