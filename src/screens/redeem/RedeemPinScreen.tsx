import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IosStatusBar } from '../../components/redeem/FlowChrome';

/** Six PIN indicators, as the drawn confirmations do (3887:40765). */
const PIN_LENGTH = 6;

/** Demo rules — identical to the withdrawal and gift PINs, so the app's
    cheat-sheet stays true: all-zeros = wrong PIN (inline retry, 3 attempts
    then failure); all-nines = instant failure; anything else succeeds. */
const WRONG_PIN = '0'.repeat(PIN_LENGTH);
const FAIL_PIN = '9'.repeat(PIN_LENGTH);
const MAX_ATTEMPTS = 3;

function DigitKey({ digit, onPress }: { digit: number; onPress: (d: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(String(digit))}
      className="relative size-20 shrink-0 overflow-clip rounded-[40px] transition-colors active:bg-surface-neutral"
    >
      <p className="font-en absolute left-[calc(50%+0.5px)] top-[calc(50%-17px)] -translate-x-1/2 whitespace-nowrap text-center text-[24px] font-semibold leading-[1.4] text-ink">
        {digit}
      </p>
    </button>
  );
}

/**
 * Shared confirmation PIN for the derived redemption flows (شحن رصيد جوال and
 * تبرع فيها). Structurally the gift PIN — six dots over a bare keypad, row 4 =
 * blank / 0 / blank — with the copy, the context line and the settle action
 * passed in, so the two flows can never drift apart or from the demo rules.
 */
export default function RedeemPinScreen({
  title,
  subtitle,
  context,
  ready,
  backTo,
  statusPath,
  onSettle,
}: {
  title: string;
  subtitle: string;
  /** the line under the title — what exactly is being confirmed */
  context: ReactNode;
  /** false when the flow was deep-linked cold, so there is nothing to confirm */
  ready: boolean;
  backTo: string;
  statusPath: string;
  /** debits the live balance; runs once, immediately before the success route */
  onSettle: () => void;
}) {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);

  const append = (d: string) => setPin((p) => (p.length >= PIN_LENGTH ? p : p + d));
  const erase = () => setPin((p) => p.slice(0, -1));

  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return;
    const t = setTimeout(() => {
      if (pin === FAIL_PIN) {
        navigate(`${statusPath}?ok=0`);
        return;
      }
      if (pin === WRONG_PIN) {
        const n = attempts + 1;
        if (n >= MAX_ATTEMPTS) {
          navigate(`${statusPath}?ok=0`);
          return;
        }
        setAttempts(n);
        setWrong(true);
        setPin('');
        return;
      }
      onSettle();
      navigate(`${statusPath}?ok=1`);
    }, 350);
    return () => clearTimeout(t);
    // onSettle is redeclared per render by the flow wrappers; keying the effect
    // on it would re-run the settle timer mid-entry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, attempts, navigate, statusPath]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.('input,textarea')) return;
      if (/^[0-9]$/.test(e.key)) append(e.key);
      else if (e.key === 'Backspace') erase();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!ready) return <Navigate to={backTo} replace />;

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <style>{'@keyframes pin-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}'}</style>
      <div className="h-full overflow-y-auto">
        <div className="relative h-full min-h-[812px] w-full">
          <IosStatusBar />

          {/* Label */}
          <div className="absolute left-6 top-20 flex w-[327px] flex-col items-center justify-center gap-1 text-center">
            <p className="w-full text-lg font-bold leading-[1.5] text-ink" dir="auto">
              {title}
            </p>
            <p className="w-full text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto">
              {subtitle}
            </p>
          </div>

          {/* context line — what is being confirmed */}
          <p
            className="absolute left-1/2 top-[150px] -translate-x-1/2 whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink-tertiary"
            dir="rtl"
            data-testid="pin-context"
          >
            {context}
          </p>

          {/* 🔵 Indicators — mirrored as drawn, so dots fill right-to-left */}
          <div className="absolute left-[calc(50%+0.5px)] top-[180px] flex -translate-x-1/2 items-center justify-center">
            <div
              key={attempts}
              className="flex-none rotate-180 -scale-y-100"
              style={wrong ? { animation: 'pin-shake 300ms ease' } : undefined}
            >
              <div className="flex items-center justify-center gap-6">
                {Array.from({ length: PIN_LENGTH }, (_, i) => (
                  <div
                    key={i}
                    className={`size-3.5 shrink-0 rounded-lg transition-colors duration-150 ${
                      i < pin.length ? 'bg-brand-400' : 'bg-line'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* inline wrong-PIN feedback */}
          {wrong && (
            <p
              role="status"
              className="absolute left-1/2 top-[212px] -translate-x-1/2 whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-danger"
              dir="auto"
            >
              {MAX_ATTEMPTS - attempts === 2 ? 'رمز غير صحيح.. باقي محاولتين' : 'رمز غير صحيح.. باقي محاولة وحدة'}
            </p>
          )}

          {/* 🔢 Keypad — row 4 is blank / 0 / blank as drawn */}
          <div className="absolute left-[44px] top-[386px] flex flex-col items-start gap-6">
            {[
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ].map((row) => (
              <div key={row[0]} className="flex shrink-0 items-start gap-6">
                {row.map((d) => (
                  <DigitKey key={d} digit={d} onPress={append} />
                ))}
              </div>
            ))}
            <div className="flex shrink-0 items-start gap-6">
              <div className="size-20 shrink-0" aria-hidden />
              <DigitKey digit={0} onPress={append} />
              <div className="size-20 shrink-0" aria-hidden />
            </div>
          </div>

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-[34px] w-full">
            <div className="absolute left-[calc(50%+0.5px)] top-5 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
