import { useEffect, useRef, useState } from 'react';
import { getAuthor, setAuthor, updateComment, deleteComment, type CommentPin } from './store';

/** «قبل 5 دقائق»-style relative stamp. */
function relTime(ts: number): string {
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return 'الآن';
  const m = Math.floor(s / 60);
  if (m < 60) return `قبل ${m} د`;
  const h = Math.floor(m / 60);
  if (h < 24) return `قبل ${h} س`;
  return `قبل ${Math.floor(h / 24)} يوم`;
}

/**
 * The pin popover — one component for composing a new comment, viewing an
 * existing one, and editing it. Clamped inside the 375px frame and flipped
 * above the pin when it sits in the lower half; a visualViewport listener
 * counters the iOS keyboard pushing the document.
 */
export default function CommentComposer({
  pin,
  draft,
  frameW,
  frameH,
  pinLeft,
  pinTop,
  onSave,
  onClose,
}: {
  /** existing pin (view/edit) — null when composing at a fresh spot */
  pin: CommentPin | null;
  /** true when composing (new pin or editing) */
  draft: boolean;
  frameW: number;
  frameH: number;
  pinLeft: number;
  pinTop: number;
  /** save a NEW comment (text, author); existing edits go through the store */
  onSave: (text: string, author: string) => void;
  onClose: () => void;
}) {
  const [editing, setEditing] = useState(draft && !pin);
  const [text, setText] = useState(pin?.text ?? '');
  const [name, setName] = useState(getAuthor());
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) {
      const t = setTimeout(() => areaRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [editing]);

  // iOS: the keyboard shrinks the visual viewport and can push the document
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => window.scrollTo(0, 0);
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  const W = 252;
  const left = Math.min(Math.max(8, pinLeft - W / 2), frameW - W - 8);
  const below = pinTop < frameH / 2;
  const canSave = text.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    const author = name.trim() || 'زائر';
    setAuthor(author);
    if (pin && editing && pin.text) {
      updateComment(pin.id, text.trim(), author);
      onClose();
      return;
    }
    onSave(text.trim(), author);
  };

  return (
    <div
      data-comment-ui
      className="pointer-events-auto absolute z-[110] flex w-[252px] flex-col gap-2.5 rounded-2xl border border-solid border-line bg-white p-3 shadow-[0px_8px_28px_rgba(0,0,0,0.18)]"
      style={below ? { left, top: pinTop + 18 } : { left, bottom: frameH - pinTop + 18 }}
      onClick={(e) => e.stopPropagation()}
    >
      {editing ? (
        <>
          <textarea
            ref={areaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب تعليقك…"
            rows={3}
            dir="auto"
            data-testid="comment-text"
            className="w-full resize-none rounded-lg border border-solid border-[#ccd2e0] bg-surface-input px-3 py-2 text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant focus:border-brand-400"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمك"
            dir="auto"
            data-testid="comment-author"
            className="w-full rounded-lg border border-solid border-[#ccd2e0] bg-surface-input px-3 py-1.5 text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant focus:border-brand-400"
          />
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium leading-[1.5] text-ink-tertiary"
              dir="auto"
            >
              إلغاء
            </button>
            <button
              type="button"
              disabled={!canSave}
              onClick={save}
              data-testid="comment-save"
              className={`rounded-lg px-4 py-1.5 text-xs font-medium leading-[1.5] ${
                canSave ? 'cursor-pointer bg-brand-400 text-ink-inverse' : 'bg-surface-disabled text-ink-quadrant'
              }`}
              dir="auto"
            >
              حفظ
            </button>
          </div>
        </>
      ) : pin ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <p className="font-en shrink-0 text-[10px] font-normal leading-[1.5] text-ink-quadrant" dir="ltr">
              {relTime(pin.updatedAt)}
            </p>
            <p className="min-w-px flex-[1_0_0] truncate text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              {pin.author || 'زائر'}
            </p>
          </div>
          <p className="w-full whitespace-pre-wrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto" data-testid="comment-view-text">
            {pin.text}
          </p>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                deleteComment(pin.id);
                onClose();
              }}
              data-testid="comment-delete"
              className="cursor-pointer rounded-lg px-2 py-1 text-xs font-medium leading-[1.5] text-ink-danger"
              dir="auto"
            >
              حذف
            </button>
            <button
              type="button"
              onClick={() => {
                setText(pin.text);
                setEditing(true);
              }}
              data-testid="comment-edit"
              className="cursor-pointer rounded-lg px-2 py-1 text-xs font-medium leading-[1.5] text-brand-400"
              dir="auto"
            >
              تعديل
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
