import Riyal from '../Riyal';

/**
 * «كم ودك …؟» amount card — the input + quick-chip block of the gift amount
 * screen (drawn 3196:31717), lifted so the recharge and donation flows share
 * one copy. The gift screen keeps its own, because it is pixel-gated against
 * that frame and not worth the regression risk.
 *
 * Chip rows are written in physical order, so an RTL row reads right-to-left:
 * `[[30, 20, 10]]` shows as 10 · 20 · 30.
 */
export default function AmountCard({
  label,
  value,
  onChange,
  chipRows,
  balance,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  chipRows: number[][];
  /** live cashback — the input turns danger and chips above it go inert */
  balance: number;
}) {
  const parsed = Number(value.replace(/[^\d.]/g, '')) || 0;
  return (
    <div className="flex w-[343px] shrink-0 flex-col items-center rounded-2xl border border-solid border-line bg-white p-4">
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-2.5">
          <div className="flex w-full items-center justify-end">
            <p className="h-6 w-[253px] text-right text-base font-normal leading-[1.5] text-ink" dir="auto">
              {label}
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
              onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
              placeholder="0"
              data-testid="amount-input"
              className={`font-en min-w-px flex-[1_0_0] bg-transparent text-right text-base font-semibold leading-[1.5] outline-none placeholder:text-ink-quadrant ${
                parsed > balance ? 'text-ink-danger' : 'text-ink'
              }`}
              aria-label="المبلغ"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          {chipRows.map((row) => (
            <div key={row[0]} className="flex w-full items-start justify-between">
              {row.map((chip) => {
                const off = chip > balance;
                return (
                  <button
                    key={chip}
                    type="button"
                    disabled={off}
                    onClick={() => onChange(String(chip))}
                    data-testid={`amount-chip-${chip}`}
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
      </div>
    </div>
  );
}
