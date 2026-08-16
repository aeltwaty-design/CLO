import bannerArt from '../assets/figma/5f398b0220b18eef0795015b5a0ced39bdd8fe93.png';

/**
 * The lilac promo banner drawn into both market lists (Figma 91:44353, shown
 * in the العروض frame 91:44135 and the القسائم frame 91:43784): a #ebe8f9
 * field with the card/coins illustration bleeding off the left edge and the
 * headline pinned right. Copy is «كاش باك حتى 50% بدون حد» per user
 * direction, replacing the drawn «ادفع مثل كل مرة ، وخذ أكثر كل مــرة».
 */
export default function MarketPromoBanner({ onClick }: { onClick?: () => void }) {
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
