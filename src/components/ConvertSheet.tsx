import { useEffect, useState } from 'react';
import { POINTS_RATE, useAppState } from '../state/AppState';
import Riyal from './Riyal';
import iconCheck from '../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import coinWp from '../assets/figma/1fc63f5f61f3f22b61f4543f37dec854ea9f0818.svg';

const fmtPts = (n: number) => n.toLocaleString('en-US');
const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Transition phase 1 — the points → cashback converter (10 pts = 1 ﷼).
    Preset chips (الربع / النص / كل النقاط) or any custom amount, with a live
    ﷼ preview and an in-sheet success moment; balances move app-wide through
    AppState. */
export default function ConvertSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { points, cashback, convertPoints } = useAppState();
  const [sel, setSel] = useState<number | null>(null);
  const [custom, setCustom] = useState('');
  const [done, setDone] = useState<number | null>(null); // converted ﷼ amount

  useEffect(() => {
    if (open) {
      setSel(null);
      setCustom('');
      setDone(null);
    }
  }, [open]);

  if (!open) return null;

  // display order quarter → half → all (RTL: «كل النقاط» sits rightmost);
  // «كل النقاط» is the default selection
  const presets = [
    { label: 'الربع', pts: Math.floor(points / 4) },
    { label: 'النص', pts: Math.floor(points / 2) },
    { label: 'كل النقاط', pts: points },
  ];
  // a typed amount takes over from the chips until it is cleared
  const usingCustom = custom !== '';
  const customPts = Number(custom) || 0;
  const chosen = usingCustom ? customPts : sel ?? points;
  const tooSmall = usingCustom && customPts > 0 && customPts < POINTS_RATE;
  const tooBig = chosen > points;
  const valid = chosen >= POINTS_RATE && chosen <= points;

  return (
    <div className="absolute inset-0 z-50">
      <style>
        {
          '@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}@keyframes pop-in{0%{transform:scale(0);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}'
        }
      </style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-2"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
        data-testid="convert-sheet"
      >
        <div className="h-1 w-9 rounded-full bg-line" />

        {done !== null ? (
          /* 🎉 success — balances already moved live */
          <div className="flex w-full flex-col items-center gap-3 py-4 text-center">
            <div
              className="relative flex size-14 items-center justify-center rounded-full bg-brand-400"
              style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
            >
              <div className="relative size-6">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
              </div>
            </div>
            <p className="text-base font-bold leading-[1.5] text-ink" dir="rtl">
              {'تم! أضفنا '}
              <span className="font-en">{fmtSar(done)}</span> <Riyal />
              {' لكاش باك'}
            </p>
            <p className="text-sm font-normal leading-[1.5] text-ink-secondary" dir="rtl" data-testid="convert-new-balance">
              {'رصيد الكاش باك الحين: '}
              <span className="font-en font-medium text-ink">{fmtSar(cashback)}</span> <Riyal />
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                تم
              </p>
            </button>
          </div>
        ) : points <= 0 ? (
          /* empty state — everything already converted */
          <div className="flex w-full flex-col items-center gap-2 py-4 text-center">
            <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
              ما عندك نقاط الحين
            </p>
            <p className="text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto">
              كل نقاطك صارت كاش باك.. اكسب أكثر وارجع لنا
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl border border-solid border-line bg-surface px-4 py-2.5"
            >
              <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
                رجوع
              </p>
            </button>
          </div>
        ) : (
          <>
            <p className="w-full text-right text-base font-bold leading-[1.5] text-ink" dir="auto">
              حوّل نقاطك لكاش باك
            </p>
            {/* rate line */}
            <div className="flex w-full items-center justify-end gap-1.5">
              <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
                {'كل '}
                <span className="font-en">{POINTS_RATE}</span>
                {' نقاط = '}
                <span className="font-en">1</span> <Riyal />
                {' كاش باك'}
              </p>
              <div className="relative size-4 shrink-0">
                <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
                  <img alt="" className="block size-full max-w-none" src={coinWp} />
                </div>
              </div>
            </div>

            {/* preset chips */}
            <div className="flex w-full items-stretch gap-2">
              {presets.map((p) => {
                const active = !usingCustom && chosen === p.pts;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setSel(p.pts);
                      setCustom('');
                    }}
                    className={`flex min-w-px flex-[1_0_0] flex-col items-center gap-0.5 rounded-2xl border border-solid py-2.5 ${
                      active ? 'border-2 border-brand-400 bg-brand-50' : 'border-line bg-surface'
                    }`}
                  >
                    <p className={`text-xs leading-[1.5] ${active ? 'font-medium text-ink' : 'font-normal text-ink-secondary'}`} dir="auto">
                      {p.label}
                    </p>
                    <p className="font-en text-sm font-semibold leading-[1.5] text-ink">{fmtPts(p.pts)}</p>
                  </button>
                );
              })}
            </div>

            {/* أو مبلغ مخصص — any amount between the 10-point floor and the
                whole balance */}
            <div
              className={`flex w-full items-center gap-2 rounded-2xl border border-solid px-3 py-2.5 ${
                usingCustom ? 'border-brand-400 bg-brand-50' : 'border-line bg-surface'
              }`}
            >
              <div className="relative size-5 shrink-0">
                <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
                  <img alt="" className="block size-full max-w-none" src={coinWp} />
                </div>
              </div>
              <input
                type="text"
                inputMode="numeric"
                dir="ltr"
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ''))}
                placeholder={`${POINTS_RATE}–${fmtPts(points)}`}
                aria-label="مبلغ مخصص بالنقاط"
                data-testid="convert-custom"
                className="font-en min-w-px flex-[1_0_0] bg-transparent text-right text-sm font-semibold leading-[1.5] text-ink outline-none placeholder:font-normal placeholder:text-ink-quadrant"
              />
              <p className="shrink-0 whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
                مبلغ مخصص
              </p>
            </div>

            {/* live preview */}
            <div
              className={`flex w-full items-center justify-center gap-1 rounded-2xl px-4 py-3 ${
                valid ? 'bg-brand-50' : 'bg-surface-neutral'
              }`}
            >
              <p className="text-sm font-normal leading-[1.5] text-ink" dir="rtl" data-testid="convert-preview">
                {tooBig ? (
                  <span className="text-ink-danger">أكثر من رصيدك من النقاط</span>
                ) : tooSmall ? (
                  <span className="text-ink-tertiary">
                    {'أقل تحويل '}
                    <span className="font-en">{POINTS_RATE}</span>
                    {' نقاط'}
                  </span>
                ) : !valid ? (
                  <span className="text-ink-tertiary">اختر مبلغ أو اكتبه</span>
                ) : (
                  <>
                    {'بتحصل '}
                    <span className="font-en text-base font-bold text-brand-400">{fmtSar(chosen / POINTS_RATE)}</span>{' '}
                    <span className="text-brand-400">
                      <Riyal />
                    </span>
                    {' كاش باك'}
                  </>
                )}
              </p>
            </div>

            <button
              type="button"
              disabled={!valid}
              onClick={() => {
                convertPoints(chosen);
                setDone(chosen / POINTS_RATE);
              }}
              data-testid="convert-cta"
              className={`flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
                valid ? 'bg-brand-400' : 'bg-surface-disabled'
              }`}
            >
              <p
                className={`whitespace-nowrap text-sm font-medium leading-[1.5] ${valid ? 'text-ink-inverse' : 'text-ink-quadrant'}`}
                dir="auto"
              >
                حوّلها كاش باك
              </p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
