import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import statusBattery from '../../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import statusBatteryCap from '../../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import statusBatteryFill from '../../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import statusWifi from '../../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import statusSignal from '../../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import statusTime from '../../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import iconFingerprint from '../../assets/figma/8370fb142b4eb35213caa1af694be0784a8b2fc3.svg';
import touchIdSheet from '../../assets/figma/68e6eda014aecbfa361d59ca1f31505c7c011d41.svg';

/** The design draws six PIN indicators (Figma 27:11216-27:11221). */
const PIN_LENGTH = 6;

/** All-zeros demos the failure status; anything else succeeds. */
const FAILURE_PIN = '0'.repeat(PIN_LENGTH);

const SF_PRO = "'SF Pro', -apple-system, 'Helvetica Neue', 'Segoe UI', sans-serif";

function IosStatusBar() {
  return (
    <div className="relative h-11 w-[375px] shrink-0 overflow-clip">
      <div className="absolute right-[17px] top-[17.33px] h-[11.333px] w-[22px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBattery} />
      </div>
      <div className="absolute right-[14.67px] top-[21px] h-1 w-[1.328px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBatteryCap} />
      </div>
      <div className="absolute right-[19px] top-[19.33px] h-[7.333px] w-[18px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBatteryFill} />
      </div>
      <div className="absolute right-[44.03px] top-[17.33px] h-[10.966px] w-[15.272px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusWifi} />
      </div>
      <div className="absolute right-[64.33px] top-[17.67px] h-[10.667px] w-[17px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusSignal} />
      </div>
      <div className="absolute left-[21px] top-3 h-[21px] w-[54px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusTime} />
      </div>
    </div>
  );
}

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
 * تأكيد السحب — withdrawal PIN entry (Figma 27:11214 "PIN Code", 375×812) plus
 * its Touch ID overlay state (27:11251 adds only the dimming overlay + sheet).
 * Six indicator dots as drawn; the Steps row is mirrored horizontally in Figma
 * (rotate-180 + scaleY(-1)), so entry fills from the right. On the 6th digit a
 * ~350ms beat, then /withdraw/status — all-zeros demos the failure variant.
 * No delete key is drawn (row 4 is نسيته؟ / 0 / fingerprint); a physical
 * keyboard still works: digits type, Backspace erases, Escape cancels Touch ID.
 * The fingerprint key opens the Touch ID sheet; tapping its glyph simulates a
 * successful scan (?touchid=1 deep-links the overlay for the diff harness).
 */
export default function WithdrawPinScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [pin, setPin] = useState('');
  const [touchId, setTouchId] = useState(() => params.has('touchid'));

  const append = (d: string) => setPin((p) => (p.length >= PIN_LENGTH ? p : p + d));
  const erase = () => setPin((p) => p.slice(0, -1));

  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return;
    const t = setTimeout(() => {
      navigate('/withdraw/status?ok=' + (pin === FAILURE_PIN ? '0' : '1'));
    }, 350);
    return () => clearTimeout(t);
  }, [pin, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) append(e.key);
      else if (e.key === 'Backspace') erase();
      else if (e.key === 'Escape') setTouchId(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const authenticate = () => {
    setTimeout(() => navigate('/withdraw/status?ok=1'), 350);
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto">
        <div className="relative h-full min-h-[812px] w-full">
          <IosStatusBar />

          {/* Label */}
          <div className="absolute left-6 top-20 flex w-[327px] flex-col items-center justify-center gap-1 text-center">
            <p className="w-full text-lg font-bold leading-[1.5] text-ink" dir="auto">
              تأكيد السحب
            </p>
            <p className="w-full text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto">
              قم بكتابة الرقم السري لإتمام العملية
            </p>
          </div>

          {/* 🔵 Indicators — mirrored as drawn, so dots fill right-to-left */}
          <div className="absolute left-[calc(50%+0.5px)] top-[180px] flex -translate-x-1/2 items-center justify-center">
            <div className="flex-none rotate-180 -scale-y-100">
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

          {/* 🔢 Keypad */}
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
              <button type="button" className="relative size-20 shrink-0 overflow-clip rounded-[40px]">
                <p
                  className="absolute left-1/2 top-[calc(50%-10px)] -translate-x-1/2 whitespace-nowrap text-center text-sm font-medium leading-[1.5] text-brand-400"
                  dir="auto"
                >
                  نسيته؟
                </p>
              </button>
              <DigitKey digit={0} onPress={append} />
              <button
                type="button"
                aria-label="البصمة"
                onClick={() => setTouchId(true)}
                className="relative size-20 shrink-0 overflow-clip rounded-[40px] transition-colors active:bg-surface-neutral"
              >
                <div className="absolute left-7 top-7 size-6 overflow-clip">
                  <div className="absolute inset-[5%_10%_4.79%_4.14%]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconFingerprint} />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-[34px] w-full">
            <div className="absolute left-[calc(50%+0.5px)] top-5 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
          </div>

          {/* 👆 Touch ID overlay (27:11251) — fingerprint glyph drawn in Figma as
              an SF Pro private-use character; painted here from the same
              fingerprint SVG through an alpha mask (MaskIcon precedent) */}
          {touchId && (
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
              <div className="absolute inset-[39.08%_15.38%_39.25%_15.38%]">
                <div className="absolute left-[calc(50%+0.24px)] top-1/2 h-[175.962px] w-[260.096px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
                  <div className="absolute inset-[0_0_0_0.18%]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={touchIdSheet} />
                  </div>
                  <button
                    type="button"
                    aria-label="تأكيد بالبصمة"
                    onClick={authenticate}
                    className="absolute left-[calc(50%+0.24px)] top-[19.23px] flex h-[39.423px] -translate-x-1/2 items-center justify-center"
                  >
                    <div
                      aria-hidden
                      className="h-[36px] w-[34px] bg-ink-secondary"
                      style={{
                        maskImage: `url("${iconFingerprint}")`,
                        WebkitMaskImage: `url("${iconFingerprint}")`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                      }}
                    />
                  </button>
                  <p
                    className="absolute left-[15.87px] right-[15.38px] top-[75px] text-center text-[16.35px] font-[590] leading-[21.154px] text-black"
                    style={{ fontFamily: SF_PRO }}
                  >
                    Touch ID
                  </p>
                  <p
                    className="absolute left-[15.87px] right-[15.38px] top-[99.04px] text-center text-[12.5px] font-normal leading-[15.385px] text-black"
                    style={{ fontFamily: SF_PRO }}
                  >
                    john.appleseed@icloud.com
                  </p>
                  <button
                    type="button"
                    onClick={() => setTouchId(false)}
                    className="absolute inset-[75.96%_0.18%_0_0] flex items-center justify-center"
                  >
                    <div className="absolute left-0 right-0 top-0 h-[0.481px] bg-[rgba(60,60,67,0.36)]" />
                    <p className="text-center text-[16.35px] font-[590] leading-[21.154px] text-black" style={{ fontFamily: SF_PRO }}>
                      Cancel
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
