import { useEffect, useState } from 'react';
import { POINTS_RATE, useAppState } from '../state/AppState';
import Riyal from './Riyal';
import iconCheck from '../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import coinWp from '../assets/figma/1fc63f5f61f3f22b61f4543f37dec854ea9f0818.svg';

const fmtPts = (n: number) => n.toLocaleString('en-US');
const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Same PIN contract as the withdrawal / gift / voucher flows: 000000 is
    wrong (3 tries), 999999 fails the transfer, anything else confirms. */
const PIN_LENGTH = 6;
const WRONG_PIN = '0'.repeat(PIN_LENGTH);
const FAIL_PIN = '9'.repeat(PIN_LENGTH);
const MAX_ATTEMPTS = 3;

/** Compact keypad key of the in-sheet PIN step. */
function PinKey({ digit, onPress }: { digit: number; onPress: (d: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(String(digit))}
      className="font-en size-16 shrink-0 rounded-full text-[22px] font-semibold leading-[1.4] text-ink transition-colors active:bg-surface-neutral"
    >
      {digit}
    </button>
  );
}

/** Transition phase 1 — the points → cashback converter (10 pts = 1 ﷼).
    Preset chips (الربع / النص / كل النقاط) or any custom amount, with a live
    ﷼ preview and an in-sheet success moment; balances move app-wide through
    AppState. */
export default function ConvertSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { points, cashback, convertPoints } = useAppState();
  const [sel, setSel] = useState<number | null>(null);
  const [custom, setCustom] = useState('');
  const [done, setDone] = useState<number | null>(null); // converted ﷼ amount
  // PIN step between the form and the success moment
  const [confirming, setConfirming] = useState(false);
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (open) {
      setSel(null);
      setCustom('');
      setDone(null);
      setConfirming(false);
      setPin('');
      setAttempts(0);
      setPinError('');
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

  /** A completed 6-digit entry: apply the demo rules, then convert. */
  const submitPin = (entry: string) => {
    if (entry === FAIL_PIN) {
      setPin('');
      setPinError('ما ضبطت التحويل.. جرب مره ثانية');
      return;
    }
    if (entry === WRONG_PIN) {
      const n = attempts + 1;
      setAttempts(n);
      setPin('');
      setPinError(
        n >= MAX_ATTEMPTS
          ? 'رمز غير صحيح.. حاول لاحقاً'
          : n === 1
            ? 'رمز غير صحيح.. باقي محاولتين'
            : 'رمز غير صحيح.. باقي محاولة وحدة',
      );
      return;
    }
    convertPoints(chosen);
    setDone(chosen / POINTS_RATE);
    setConfirming(false);
  };

  const pressDigit = (d: string) => {
    if (pin.length >= PIN_LENGTH || attempts >= MAX_ATTEMPTS) return;
    const next = pin + d;
    setPin(next);
    setPinError('');
    if (next.length === PIN_LENGTH) setTimeout(() => submitPin(next), 350);
  };

  return (
    <div className="absolute inset-0 z-50">
      <style>
        {
          '@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}@keyframes pop-in{0%{transform:scale(0);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}@keyframes pin-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}'
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
        ) : confirming ? (
          /* 🔒 PIN — same contract as the withdrawal / gift / voucher flows */
          <div className="flex w-full flex-col items-center gap-3 pb-2" data-testid="convert-pin">
            <p className="w-full text-center text-base font-bold leading-[1.5] text-ink" dir="auto">
              تأكيد التحويل
            </p>
            <p className="w-full text-center text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
              {'تحويل '}
              <span className="font-en">{fmtPts(chosen)}</span>
              {' نقطة = '}
              <span className="font-en font-medium text-ink">{fmtSar(chosen / POINTS_RATE)}</span> <Riyal />
            </p>

            {/* indicators — mirrored so the dots fill right-to-left */}
            <div className="flex items-center justify-center py-1">
              <div key={attempts} className="flex-none rotate-180 -scale-y-100" style={pinError ? { animation: 'pin-shake 300ms ease' } : undefined}>
                <div className="flex items-center justify-center gap-4">
                  {Array.from({ length: PIN_LENGTH }, (_, i) => (
                    <div
                      key={i}
                      className={`size-3 shrink-0 rounded-lg transition-colors duration-150 ${i < pin.length ? 'bg-brand-400' : 'bg-line'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {pinError && (
              <p role="status" className="text-center text-xs font-medium leading-[1.5] text-ink-danger" dir="auto" data-testid="convert-pin-error">
                {pinError}
              </p>
            )}

            <div className="flex w-full flex-col items-center gap-1.5">
              {[
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
              ].map((row) => (
                <div key={row[0]} className="flex items-center gap-1.5">
                  {row.map((d) => (
                    <PinKey key={d} digit={d} onPress={pressDigit} />
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPin((v) => v.slice(0, -1))}
                  aria-label="مسح"
                  className="size-16 shrink-0 rounded-full text-lg font-medium text-ink-secondary transition-colors active:bg-surface-neutral"
                >
                  ⌫
                </button>
                <PinKey digit={0} onPress={pressDigit} />
                <div className="size-16 shrink-0" aria-hidden />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setConfirming(false);
                setPin('');
                setPinError('');
              }}
              className="pt-1 text-xs font-medium leading-[1.5] text-ink-tertiary"
              dir="auto"
            >
              رجوع
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
                setPin('');
                setPinError('');
                setAttempts(0);
                setConfirming(true);
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
