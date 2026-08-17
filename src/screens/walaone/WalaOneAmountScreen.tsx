import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppState';
import { useWalaOne } from '../../state/WalaOneState';
import Riyal from '../../components/Riyal';
import { IosStatusBar, BackArrow } from '../../components/redeem/FlowChrome';
import iconSwap from '../../assets/figma/deefd6b77894536589cb50f767e7a9c50d68ba82.svg';
import MaskGlyph from '../../components/redeem/MaskGlyph';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPts = (n: number) => n.toLocaleString('en-US');

/** Rate per user direction: one riyal buys 500 WalaOne points (the drawn
    strip reads «50 ← 1» — its green side is WalaPlus points, not riyal). */
export const WALAONE_PER_RIYAL = 500;

/** Drawn chips ÷100 into the cashback world (gift precedent), physical order
    so the RTL rows read 5→50 and 100→500. */
const CHIP_ROWS: number[][] = [
  [50, 10, 5],
  [500, 200, 100],
];

/** WalaOne coin — viola smiling coin, inline so it stays a theme token. */
export function W1Coin({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden className="shrink-0">
      <circle cx="10" cy="10" r="10" className="fill-viola-300" />
      <circle cx="9.2" cy="9.2" r="8.4" className="fill-viola-500" />
      <path
        d="M5.6 9.2c.5 2.1 2.1 3.4 4 3.4s3.5-1.3 4-3.4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * حولها لولاء ون — amount step of the drawn ولاء ون flow (108:45207 amount
 * frames; points → cashback per user direction: the drawn green-points input
 * becomes the live riyal balance, chips ÷100, and the rate strip's green coin
 * becomes the Riyal glyph). Promo card, «50 ← 1» rate strip, amount card with
 * the live «تساوي» WalaOne line, CTA to the confirm screen.
 */
export default function WalaOneAmountScreen() {
  const navigate = useNavigate();
  const { cashback } = useAppState();
  const { amount, setAmount } = useWalaOne();
  const [value, setValue] = useState(amount > 0 ? String(amount) : '');

  const parsed = Number(value.replace(/[^\d.]/g, '')) || 0;
  const valid = parsed > 0 && parsed <= cashback;

  const submit = () => {
    if (!valid) return;
    setAmount(parsed);
    navigate('/walaone/confirm');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="flex h-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full flex-col items-center">
          <IosStatusBar />

          {/* 🧭 App bar — live cashback chip at the left, title + back at the right */}
          <div className="flex w-full shrink-0 items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            <div className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 py-1.5">
              <p className="shrink-0 text-[15px] font-normal leading-none text-brand-400">
                <Riyal />
              </p>
              <p className="font-en shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                {fmtSar(cashback)}
              </p>
            </div>
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                حولها لولاء ون
              </p>
              <BackArrow />
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* Promo card — drawn mint shopfront copy, verbatim */}
            <div className="flex w-[343px] shrink-0 items-center justify-end gap-4 overflow-clip rounded-2xl bg-brand-50 px-3 py-4">
              <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-0.5 text-right leading-[1.5]">
                <p className="w-full text-base font-medium text-ink" dir="auto">
                  نقاط ولاء ون
                </p>
                <p className="w-full text-xs font-normal text-ink-secondary" dir="auto">
                  حوّل نقاطك إلى نقاط ولاء ون واستمتع بمزايا لا محدوووودة
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
                <W1Coin size={24} />
              </div>
            </div>

            {/* rate strip — drawn «50 ← 1» with the ⇄ button on its edge */}
            <div className="relative flex w-[343px] shrink-0 items-center justify-center gap-3 rounded-2xl bg-surface-neutral px-4 py-3" data-testid="w1-rate">
              <div className="flex shrink-0 items-center gap-1.5">
                <W1Coin size={18} />
                <p className="font-en whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="ltr">
                  {WALAONE_PER_RIYAL}
                </p>
              </div>
              <p className="shrink-0 text-sm font-normal leading-none text-ink-quadrant" dir="ltr">
                ←
              </p>
              <div className="flex shrink-0 items-center gap-1.5">
                <p className="shrink-0 text-[15px] font-normal leading-none text-brand-400">
                  <Riyal />
                </p>
                <p className="font-en whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="ltr">
                  1
                </p>
              </div>
              <div className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xs" aria-hidden>
                <MaskGlyph src={iconSwap} size={18} className="bg-ink" />
              </div>
            </div>

            {/* Amount card — input + chips + the live «تساوي» line */}
            <div className="flex w-[343px] shrink-0 flex-col items-center rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-2.5">
                  <div className="flex w-full items-center justify-end">
                    <p className="h-6 text-right text-base font-normal leading-[1.5] text-ink" dir="auto">
                      كم ودك تحول؟
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between rounded-lg border border-solid border-[#ccd2e0] bg-white px-4 py-[17px]">
                    <p className={`shrink-0 text-[17px] font-normal leading-none ${parsed > 0 ? 'text-brand-400' : 'text-ink-quadrant'}`}>
                      <Riyal />
                    </p>
                    <input
                      type="text"
                      inputMode="decimal"
                      dir="ltr"
                      value={value}
                      onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ''))}
                      placeholder="0"
                      data-testid="w1-amount-input"
                      className={`font-en min-w-px flex-[1_0_0] bg-transparent text-right text-base font-semibold leading-[1.5] outline-none placeholder:text-ink-quadrant ${
                        parsed > cashback ? 'text-ink-danger' : 'text-ink'
                      }`}
                      aria-label="المبلغ"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-4">
                  {CHIP_ROWS.map((row) => (
                    <div key={row[0]} className="flex w-full items-start justify-between">
                      {row.map((chip) => {
                        const off = chip > cashback;
                        return (
                          <button
                            key={chip}
                            type="button"
                            disabled={off}
                            onClick={() => setValue(String(chip))}
                            data-testid={`w1-chip-${chip}`}
                            className={`flex w-24 shrink-0 items-center justify-center gap-1 rounded-full border border-solid border-line px-[11px] py-3 ${
                              off ? 'opacity-40' : 'cursor-pointer'
                            }`}
                          >
                            <p className="shrink-0 text-[13px] font-normal leading-none text-brand-400">
                              <Riyal />
                            </p>
                            <p className="font-en whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                              {chip.toLocaleString('en-US')}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                {/* تساوي — the drawn live equivalence row */}
                <div className="flex w-full items-center justify-between rounded-xl bg-surface-neutral px-4 py-3">
                  <div className="flex shrink-0 items-center gap-1.5">
                    <W1Coin size={18} />
                    <p
                      className={`font-en whitespace-nowrap text-sm font-semibold leading-[1.5] ${parsed > 0 ? 'text-ink' : 'text-ink-quadrant'}`}
                      dir="ltr"
                      data-testid="w1-equals"
                    >
                      {fmtPts(parsed * WALAONE_PER_RIYAL)}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                    تساوي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ⛴️ CTA + home indicator */}
        <div className="flex w-full shrink-0 flex-col items-center">
          <button
            type="button"
            disabled={!valid}
            onClick={submit}
            data-testid="w1-amount-next"
            className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
              valid ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
            }`}
          >
            <p
              className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
                valid ? 'text-ink-inverse' : 'text-ink-quadrant'
              }`}
              dir="auto"
            >
              اللي بعده
            </p>
          </button>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
