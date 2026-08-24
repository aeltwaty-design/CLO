/**
 * Temp store promo (user-attached design, 2026-08-19) — replaces the bravo
 * add-card promo card's content in **every Temp instance** (the vouchers
 * hub before/after linking, the +offers store pages before/after linking):
 * headline «هذا العرض يصير أحلى مع الكاش باك», the «استخدم بطاقتك المعتادة
 * وخذ حتى [X]% كاش باك» line, a price-tag + coins illustration on the
 * left, and one «شوف كيف» button. Colours stay in the banner's violet
 * world per user direction («don't change colors») — bravo-50 ground,
 * bravo-500 accent — with the illustration mixing the drawn accent
 * palette (violet tag, green % badge, gold coins). Phase 1/2 keep the
 * drawn cards untouched.
 */
export default function CashbackOfferPromo({
  onHow,
  testid = 'cashback-offer-promo',
}: {
  /** the «شوف كيف» action; omitted → the button renders inert (the drawn
      after-link cards' «التفاصيل» had no action either) */
  onHow?: () => void;
  testid?: string;
}) {
  return (
    <div className="flex w-full shrink-0 flex-col items-end gap-3 overflow-clip rounded-2xl bg-bravo-50 p-3" data-testid={testid}>
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <div className="pointer-events-none relative h-[96px] w-[100px] shrink-0">
          <svg viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full" aria-hidden>
            {/* rays */}
            <g className="stroke-gold-600" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 26l7 5" />
              <path d="M8 40h9" />
              <path d="M16 14l5 7" />
            </g>
            {/* price tag — violet hexagon with a rope loop */}
            <g transform="rotate(10 52 46)">
              <path d="M52 14l22 12v25L52 63 30 51V26l22-12Z" className="fill-viola-500" />
              <path d="M52 14l22 12v25L52 63V14Z" fill="#fff" opacity="0.08" />
              <circle cx="52" cy="26" r="4" className="fill-bravo-50" />
              <path d="M52 22c-3-8 3-14 8-15" className="stroke-ink" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
            {/* % badge */}
            <circle cx="66" cy="56" r="16" className="fill-brand-400" />
            <g className="stroke-white" strokeWidth="2.6" strokeLinecap="round">
              <path d="M60 62l12-12" />
            </g>
            <circle cx="61.5" cy="51.5" r="2.6" fill="none" strokeWidth="2.2" className="stroke-white" />
            <circle cx="70.5" cy="60.5" r="2.6" fill="none" strokeWidth="2.2" className="stroke-white" />
            {/* gold coins */}
            <circle cx="26" cy="74" r="11" className="fill-gold-600" />
            <circle cx="26" cy="74" r="7" fill="none" strokeWidth="1.8" className="stroke-white" opacity="0.9" />
            <circle cx="46" cy="80" r="9" className="fill-gold-600" />
            <circle cx="46" cy="80" r="5.6" fill="none" strokeWidth="1.6" className="stroke-white" opacity="0.9" />
            {/* sparkle */}
            <path
              transform="translate(88 22) scale(0.8)"
              d="M0-6C.6-2.2 2.2-.6 6 0 2.2.6.6 2.2 0 6-.6 2.2-2.2.6-6 0-2.2-.6-.6-2.2 0-6Z"
              className="fill-viola-300"
            />
          </svg>
        </div>
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
          <p className="w-full text-right text-[15px] font-bold leading-[1.5] text-ink" dir="auto">
            هذا العرض يصير أحلى مع الكاش باك
          </p>
          <p className="w-full text-right text-xs font-normal leading-[1.6] text-ink-secondary" dir="rtl">
            {'استخدم بطاقتك المعتادة وخذ حتى '}
            <span className="font-en font-bold text-bravo-500">[X]%</span>
            {' كاش باك'}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onHow}
        className={`flex h-9 w-full shrink-0 items-center justify-center gap-1.5 overflow-clip rounded-xl border border-solid border-line bg-white px-4 ${onHow ? 'cursor-pointer' : ''}`}
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
          <path d="M13.5 8H3M6.5 4.5L3 8l3.5 3.5" className="stroke-ink" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
          شوف كيف
        </p>
      </button>
    </div>
  );
}
