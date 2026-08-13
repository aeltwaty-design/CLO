import { useAppState } from '../state/AppState';
import Riyal from './Riyal';
import stripCardIcon from '../assets/figma/a390ac31e5e3881c6ca4d0f9bbd3514e56e837c9.svg';
import stripTrendUp from '../assets/figma/a48ef43dadbf020f3a6c615ef0070de2a02b33be.svg';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * «إجمالي الكاش باك» section (grown out of the drawn 54:10646 band) — the one
 * cashback surface, rendered identically by Home and the Points Wallet so the
 * two can never drift: live balance, month delta, and the CTA row
 * «التفاصيل» (cashback wallet) · «استخدمه» (redemption hub).
 */
export default function CashbackStrip({
  onRedeem,
  onDetails,
  testId,
  balanceTestId,
  redeemTestId,
}: {
  onRedeem: () => void;
  onDetails: () => void;
  testId?: string;
  balanceTestId?: string;
  redeemTestId?: string;
}) {
  const { cashback } = useAppState();

  return (
    <div
      className="relative flex w-full shrink-0 flex-col items-start gap-3 overflow-clip rounded-2xl bg-bravo-50 px-4 py-3"
      data-testid={testId}
    >
      <div className="absolute left-0 top-0 h-[49px] w-full rounded-tl-2xl rounded-tr-2xl bg-[#cac6e7]" />
      <div className="relative flex w-full shrink-0 flex-col items-end gap-[18px]">
        {/* header band: title + card icon */}
        <div className="flex w-full items-center justify-end">
          <div className="flex shrink-0 items-center justify-end gap-2">
            <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
              إجمالي الكاش باك
            </p>
            <div className="relative size-6 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={stripCardIcon} />
            </div>
          </div>
        </div>
        {/* figures: هذا الشهر +120 ↗ · balance ﷼ */}
        <div className="flex w-full items-center justify-between">
          <div className="flex shrink-0 flex-col items-start justify-center">
            <p className="mb-[-1px] whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              هذا الشهر
            </p>
            <div className="flex w-full items-center gap-0.5">
              <p className="font-en whitespace-nowrap text-sm font-semibold leading-[1.5] text-bravo-500">120+</p>
              <div className="relative size-[17px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={stripTrendUp} />
              </div>
            </div>
          </div>
          <p
            className="flex items-center gap-1 whitespace-nowrap text-[24px] font-semibold leading-[1.4] text-ink"
            data-testid={balanceTestId}
          >
            <span className="text-[17px] font-normal leading-none">
              <Riyal />
            </span>
            <span className="font-en">{fmtSar(cashback)}</span>
          </p>
        </div>
      </div>
      {/* actions: التفاصيل (left) · استخدمه (right, primary) */}
      <div className="relative flex w-full items-stretch gap-2">
        <CashbackStripAction label="التفاصيل" onClick={onDetails} />
        <CashbackStripAction label="استخدمه" onClick={onRedeem} primary testId={redeemTestId} />
      </div>
    </div>
  );
}

/** CTA inside the strip's action row: primary = filled viola, secondary = white. */
function CashbackStripAction({
  label,
  onClick,
  primary,
  testId,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
  testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`flex h-9 min-w-px flex-[1_0_0] cursor-pointer items-center justify-center rounded-full ${
        primary ? 'bg-bravo-500' : 'border border-solid border-[#cac6e7] bg-surface'
      }`}
    >
      <p
        className={`whitespace-nowrap text-xs font-medium leading-[1.5] ${primary ? 'text-ink-inverse' : 'text-ink'}`}
        dir="auto"
      >
        {label}
      </p>
    </button>
  );
}
