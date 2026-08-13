import type { ReactNode } from 'react';
import { useAppState } from '../state/AppState';
import Riyal from './Riyal';
import stripBackArrow from '../assets/figma/9d26d5f8332ff3f5f0f39a2a066bc6a3e9b9d038.svg';
import stripCardIcon from '../assets/figma/a390ac31e5e3881c6ca4d0f9bbd3514e56e837c9.svg';
import stripTrendUp from '../assets/figma/a48ef43dadbf020f3a6c615ef0070de2a02b33be.svg';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * «إجمالي الكاش باك» strip (grown out of the drawn 54:10646 band) — the one
 * cashback surface shared by Home and the Points Wallet so the two can never
 * drift. Live balance + month delta.
 *
 * - `onOpen` (Home): the whole strip is one button into the cashback wallet,
 *   with the ← affordance arrow.
 * - `actions` (Wallet): the strip is static and hosts its own CTA row instead
 *   (no arrow — the actions carry the navigation).
 */
export default function CashbackStrip({
  arrow = false,
  onOpen,
  actions,
  testId,
  balanceTestId,
}: {
  arrow?: boolean;
  onOpen?: () => void;
  actions?: ReactNode;
  testId?: string;
  balanceTestId?: string;
}) {
  const { cashback } = useAppState();

  const body = (
    <>
      <div className="absolute left-0 top-0 h-[49px] w-full rounded-tl-2xl rounded-tr-2xl bg-[#cac6e7]" />
      <div className="relative flex w-full shrink-0 flex-col items-end gap-[18px]">
        {/* header band: (← back glyph) + title + card icon */}
        <div className={`flex w-full items-center ${arrow ? 'justify-between' : 'justify-end'}`}>
          {arrow && (
            <div className="relative size-4 shrink-0 overflow-clip">
              <div className="absolute inset-[20%_15%] flex items-center justify-center" style={{ containerType: 'size' }}>
                <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                  <div className="relative size-full">
                    <div className="absolute inset-[-2.23%_-2.6%]">
                      <img alt="" className="block size-full max-w-none" src={stripBackArrow} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
    </>
  );

  const shell = 'relative flex w-full shrink-0 flex-col items-start gap-3 overflow-clip rounded-2xl bg-bravo-50 px-4 py-3';

  if (actions) {
    return (
      <div className={shell} data-testid={testId}>
        {body}
        <div className="relative flex w-full items-stretch gap-2">{actions}</div>
      </div>
    );
  }

  return (
    <button type="button" onClick={onOpen} data-testid={testId} className={`${shell} cursor-pointer`}>
      {body}
    </button>
  );
}

/** CTA inside the strip's action row: primary = filled viola, secondary = white. */
export function CashbackStripAction({
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
