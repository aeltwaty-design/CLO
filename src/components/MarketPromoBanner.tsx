import bannerArt from '../assets/figma/5f398b0220b18eef0795015b5a0ced39bdd8fe93.png';
import { IS_TEMP } from '../state/PhaseState';

/**
 * The lilac promo banner drawn into both market lists (Figma 91:44353, shown
 * in the العروض frame 91:44135 and the القسائم frame 91:43784): a #ebe8f9
 * field with the card/coins illustration bleeding off the left edge and the
 * headline pinned right. Copy is «كاش باك حتى 50% بدون حد» per user
 * direction, replacing the drawn «ادفع مثل كل مرة ، وخذ أكثر كل مــرة».
 *
 * **Temp** (user-attached design, 2026-08-19, colours unchanged): the same
 * drawn art, headline «كاش باك حتى [X]% بدون قيود» over «على مشترياتك من
 * المتاجر المشاركة.», and a white «اعرف أكثر» pill — the banner grows to
 * fit the extra row. Phase 1/2 keep the drawn 101px banner byte-for-byte.
 */
export default function MarketPromoBanner({ onClick }: { onClick?: () => void }) {
  if (IS_TEMP)
    return (
      <button
        type="button"
        onClick={onClick}
        data-testid="market-promo-banner"
        className={`relative flex w-full shrink-0 flex-col gap-2 overflow-clip rounded-2xl bg-[#ebe8f9] p-3 text-start ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="relative h-[104px] w-full shrink-0">
          {/* the drawn card/coins art, bleeding off the left like the frame */}
          <div className="absolute left-[-14px] top-1/2 h-[132px] w-[348px] -translate-y-1/2">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-contain" src={bannerArt} />
          </div>
          <div className="absolute right-0.5 top-1/2 flex w-[186px] -translate-y-1/2 flex-col items-end justify-center gap-1.5">
            <p className="w-full text-right text-sm font-bold leading-[1.5] text-black" dir="rtl">
              {'كاش باك حتى '}
              <span className="font-en">[X]%</span>
              <br />
              {'بدون قيود'}
            </p>
            <p className="w-full text-right text-xs font-normal leading-[1.6] text-ink-secondary" dir="auto">
              على مشترياتك من المتاجر المشاركة.
            </p>
          </div>
        </div>
        <div className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 overflow-clip rounded-full bg-white px-4">
          <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
            <path d="M13.5 8H3M6.5 4.5L3 8l3.5 3.5" className="stroke-ink" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
            اعرف أكثر
          </p>
        </div>
      </button>
    );
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="market-promo-banner"
      className={`relative h-[101px] w-full shrink-0 overflow-clip rounded-2xl bg-white text-start ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%+14.5px)] h-[132px] w-[348px] -translate-x-1/2 -translate-y-1/2 bg-[#ebe8f9]" />
      <div className="absolute left-[calc(50%+2.5px)] top-[calc(50%+0.5px)] h-[132px] w-[348px] -translate-x-1/2 -translate-y-1/2">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-contain" src={bannerArt} />
      </div>
      <div className="absolute right-3.5 top-[calc(50%-0.5px)] flex w-[186px] -translate-y-1/2 flex-col items-end justify-center gap-2">
        <p className="w-[215px] text-right text-sm font-bold leading-[1.5] text-black" dir="rtl">
          {'كاش باك حتى '}
          <span className="font-en">50%</span>
          <br />
          {'بدون حد'}
        </p>
      </div>
      <div className="absolute left-[314px] top-[101px] h-3 w-[11px] bg-[#eeeafb]" />
    </button>
  );
}
