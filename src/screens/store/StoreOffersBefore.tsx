import { useNavigate } from 'react-router-dom';
import chevronStroke from '../../assets/figma/799e69f6bf3b072fd575e5ef3e7a3f09fc624b98.svg';
import heroPhoto from '../../assets/figma/27cde6821f1952fa7483f220578eb04c40cae482.png';
import cardBackdrop from '../../assets/figma/58e3869470fd0495474bbabbcb93a479dbba9ed3.png';
import logoIkea from '../../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoHunger from '../../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoNamaq from '../../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import iconSignal from '../../assets/figma/98a449519d2cb6b8478d85d07db09bff5760c428.svg';
import iconWifi from '../../assets/figma/cdc8aed2c9f148d8a793c644a408ff4d4eeeaea2.svg';
import batteryBody from '../../assets/figma/f89fb86ac074101f6cc61149b813776ca9620527.svg';
import batteryCap from '../../assets/figma/1f38d8ef67e3230ca23801d463fe7ed151dad57b.svg';
import batteryFill from '../../assets/figma/043aeae53215903321ce9d08058402508a4b0c1f.svg';
import iconExport from '../../assets/figma/42fc667f1604268ed3acfe8ba20382facf76c168.svg';
import iconHeart from '../../assets/figma/aff47a8629f50f4bf7c3cac784df0512d05b0a9d.svg';
import iconArrowRight from '../../assets/figma/66f0c85afe06c3c9373ce03f89fdb4a4ebdee5ee.svg';
import iconCards from '../../assets/figma/7829263638c55bcb9dddbbe8eec00ec0e4075ca2.svg';
import iconCardSmall from '../../assets/figma/2a02a76700bfa721a2d4c7abb3f26abfd1e840c9.svg';
import iconClock from '../../assets/figma/4ca1d76cac1c2978bf74b600bbc083970bbb0ef2.svg';
import iconShopSmall from '../../assets/figma/a62874d091718c63140099ddac84dfe95bb8c844.svg';
import iconGlobalSmall from '../../assets/figma/db441bf2894b85e842a013bf7ac55d7541426cde.svg';
import coin24 from '../../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';
import homeIndicator from '../../assets/figma/5f04cb4b716a42ba11ba59a4acef8da61bbe12e9.svg';
import iconGlobal from '../../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';
import iconShop from '../../assets/figma/b29c8472a920d7f72b3162de749ffef1cc4696df.svg';

/** chevron-left_mini (20px) used inside the store card. */
function ChevronLeftMini() {
  return (
    <div className="relative size-5 shrink-0 overflow-clip">
      <div
        className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center"
        style={{ containerType: 'size' }}
      >
        <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
          <div className="relative size-full">
            <div className="absolute inset-[-4.17%_-2.5%]">
              <img alt="" className="block size-full max-w-none" src={chevronStroke} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Floating white circle button of the photo top bar (38.168px, x-small shadow). */
function CircleButton({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-[38.168px] items-center justify-center rounded-full bg-white px-[15.267px] py-[7.634px] drop-shadow-[0px_0.954px_0.954px_rgba(13,13,18,0.06)]"
    >
      <div className="relative size-[19.084px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
    </button>
  );
}

/** Offer card of the العروض المتاحة list — the whole card opens the تسوّق واربح sheet. */
function OfferCard({
  title,
  desc,
  validity,
  place,
  placeIcon,
  tagNeutral,
  tagWarning,
  coins,
  onTap,
}: {
  title: string;
  desc: string;
  validity: string;
  place: string;
  placeIcon: string;
  tagNeutral: string;
  tagWarning: string;
  /** WalaPlus coins reward — draws the brand-50 bottom strip (card pinned to Figma's 227px). */
  coins?: string;
  onTap?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onTap}
      className={`relative flex w-full shrink-0 flex-col items-end gap-4 overflow-clip rounded-2xl border border-solid border-line bg-white px-3 py-3.5 ${
        coins ? 'h-[227px]' : ''
      }`}
    >
      <div className="flex w-full shrink-0 flex-col items-end gap-2.5">
        <div className="flex w-full shrink-0 items-center justify-center gap-2.5">
          <div className="flex min-w-px flex-[1_0_0] flex-col justify-center text-right text-sm font-medium leading-[0] text-ink">
            <p className="leading-[1.5]" dir="auto">
              {title}
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center justify-end gap-1.5">
          <div className="flex min-w-px flex-[1_0_0] items-center justify-end">
            <div className="flex min-w-px flex-[1_0_0] flex-col justify-end text-right text-xs font-normal leading-[0] text-ink-secondary">
              <p className="leading-[1.5]" dir="auto">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-center gap-2">
        <div className="flex shrink-0 items-center justify-end gap-1">
          <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            {validity}
          </p>
          <div className="relative size-4 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconClock} />
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1">
          <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            {place}
          </p>
          <div className="relative size-4 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={placeIcon} />
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-start gap-2.5">
        <div className="flex shrink-0 items-center justify-center rounded-sm bg-surface-neutral px-2 py-0.5">
          <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink" dir="auto">
            {tagNeutral}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center rounded-sm bg-warning-50 px-2 py-0.5">
          <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-warning" dir="auto">
            {tagWarning}
          </p>
        </div>
      </div>
      {coins ? (
        <div className="absolute left-1/2 top-[194px] flex h-8 w-[341px] -translate-x-1/2 items-center justify-center rounded-bl-[10px] rounded-br-[10px] bg-brand-50">
          <div className="flex shrink-0 items-center gap-1">
            <div className="relative size-6 shrink-0">
              <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coin24} />
              </div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap text-right font-en text-sm font-semibold leading-[0] text-ink">
              <p className="leading-[1.5]" dir="auto">
                {coins}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </button>
  );
}

/** Small icon badge (branch / online) pinned to a merchant card corner. */
function CornerBadge({ icon }: { icon: string }) {
  return (
    <div className="flex shrink-0 items-center rounded-[5.263px] bg-surface-neutral p-[2.105px]">
      <div className="relative size-[16.842px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
    </div>
  );
}

function SimilarStoreCard({
  photo,
  photoCropped,
  name,
  tag,
  badges,
}: {
  photo: string;
  /** true → the Figma zoom-crop transform of the هنقرسيتشن logo */
  photoCropped?: boolean;
  name: string;
  tag: string;
  badges: ('shop' | 'global')[];
}) {
  return (
    <div className="relative flex w-[163.5px] shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-solid border-line bg-white px-4 py-3">
      <div className="flex shrink-0 flex-col items-center gap-2.5">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div className="relative size-16 shrink-0 rounded-2xl">
            {photoCropped ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <img alt="" className="absolute left-[-20.07%] top-[-16.92%] size-[138.57%] max-w-none" src={photo} />
              </div>
            ) : (
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-2xl object-cover" src={photo} />
            )}
          </div>
          <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.5] text-ink" dir="auto">
            {name}
          </p>
        </div>
        <div className="flex shrink-0 items-start">
          <div className="flex shrink-0 items-start">
            <div className="flex shrink-0 items-center justify-center rounded-sm bg-warning-50 px-2 py-0.5">
              <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-warning" dir="auto">
                {tag}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-[6.5px] top-[7px] flex gap-[4.211px] ${
          badges.length > 1 ? 'flex-col items-start justify-center' : 'h-5 items-center'
        }`}
      >
        {badges.includes('shop') && <CornerBadge icon={iconShop} />}
        {badges.includes('global') && <CornerBadge icon={iconGlobal} />}
      </div>
    </div>
  );
}

/** Store details — +offers variant, before card link (Figma 1:9221, إيكيا content). */
export default function StoreOffersBefore({ onOfferTap }: { onOfferTap?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto overflow-x-clip">
        <div className="relative flex min-h-full w-full flex-col bg-surface">
          {/* Hero photo + overlays (375×215, fades into the page at the bottom) */}
          <div className="relative h-[215px] w-full shrink-0">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={heroPhoto} />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(9,11,9,0.5)] to-[rgba(9,11,9,0)]" />
            <div className="absolute bottom-[-0.26px] right-0 h-[61.069px] w-full bg-gradient-to-b from-[rgba(250,250,250,0)] to-[#fafafa] to-[96%]" />
          </div>

          {/* Top bar over the photo: status bar + floating buttons */}
          <div className="absolute right-0 top-0 flex w-full flex-col items-center pb-4">
            {/* Native / Status Bar (light content) */}
            <div className="relative h-[41.985px] w-full shrink-0">
              <div className="absolute left-[22.9px] top-[calc(50%+1.91px)] flex -translate-y-1/2 flex-col justify-center whitespace-nowrap font-en text-[15.27px] font-medium leading-[0] text-white">
                <p className="leading-[15.267px]">9:41</p>
              </div>
              <div className="absolute right-[73.47px] top-[calc(50%+3.34px)] h-[9.542px] w-[17.176px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSignal} />
              </div>
              <div className="absolute right-[54.13px] top-[calc(50%+2.37px)] h-[10.463px] w-[14.573px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconWifi} />
              </div>
              <div className="absolute right-[24.81px] top-[calc(50%+2.39px)] h-[12.405px] w-[23.855px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryBody} />
              </div>
              <div className="absolute right-[22.92px] top-[calc(50%+2.86px)] h-[3.817px] w-[1.267px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryCap} />
              </div>
              <div className="absolute right-[27.19px] top-[calc(50%+2.38px)] h-[7.948px] w-[19.275px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryFill} />
              </div>
            </div>

            {/* Share + favourite on the left, back (RTL forward arrow) on the right */}
            <div className="flex w-full shrink-0 items-center justify-between px-4">
              <div className="flex w-[190.584px] shrink-0 items-center gap-2.5">
                <div className="flex shrink-0 items-center justify-end">
                  <CircleButton icon={iconExport} label="مشاركة" />
                </div>
                <div className="flex shrink-0 items-center justify-end">
                  <CircleButton icon={iconHeart} label="المفضلة" />
                </div>
              </div>
              <CircleButton icon={iconArrowRight} label="رجوع" onClick={() => navigate(-1)} />
            </div>
          </div>

          {/* Content stack — starts at y=172, overlapping the photo */}
          <div className="relative -mt-[43px] flex w-full flex-col px-4 pb-10">
            <div className="flex w-full flex-col items-end gap-5">
              {/* Store identity card */}
              <div className="flex w-full shrink-0 flex-col items-end">
                <div className="relative h-[78px] w-full shrink-0 overflow-clip rounded-2xl border border-solid border-line-subtle">
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <img alt="" className="absolute left-[-38.97%] top-[72.29%] h-full w-[177.94%] max-w-none" src={cardBackdrop} />
                  </div>
                  <div className="relative flex size-full flex-col items-end justify-center rounded-[15.267px] bg-white px-3.5">
                    <div className="flex w-full shrink-0 items-center justify-between">
                      <ChevronLeftMini />
                      <div className="flex shrink-0 items-center gap-2">
                        <div className="flex flex-row items-center self-stretch">
                          <div className="flex h-full w-[76px] shrink-0 flex-col items-start gap-0.5 text-right">
                            <div className="flex w-full shrink-0 flex-col justify-center text-base font-medium text-ink">
                              <p className="leading-[1.5]" dir="auto">
                                إيكيا
                              </p>
                            </div>
                            <div className="flex w-full shrink-0 flex-col justify-center text-xs font-normal text-ink-secondary">
                              <p className="leading-[1.5]" dir="auto">
                                المنزل والأثاث
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="relative size-[50px] shrink-0 rounded-[12.5px]">
                          <img
                            alt=""
                            className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12.5px] object-cover"
                            src={logoIkea}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bravo promo banner — add-card CTA + details */}
              <div className="flex w-full shrink-0 flex-col items-end gap-3 overflow-clip rounded-2xl bg-bravo-50 p-3">
                <div className="flex w-full shrink-0 items-center justify-end gap-2.5">
                  <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1.5 text-right">
                    <p className="w-[254px] shrink-0 text-[0px] font-medium leading-[0] text-ink" dir="auto">
                      <span className="text-[14px] leading-[1.5]">{'حاسب ببطاقتك وخذ لك حتى '}</span>
                      <span className="font-en text-[14px] font-bold not-italic leading-[1.5] text-bravo-500">[X]%</span>
                      <span className="font-en text-[14px] font-bold not-italic leading-[1.5]">{' '}</span>
                      <span className="text-[14px] leading-[1.5]">كاش باك</span>
                    </p>
                    <p className="w-[min-content] min-w-full shrink-0 text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                      ادفع مثل عادتك.. والكاش باك يرجع لك أول بأول على مشترياتك المؤهلة
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-full bg-bravo-500 p-2 shadow-xs">
                    <div className="relative size-5 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCards} />
                    </div>
                  </div>
                </div>
                <div className="flex w-full shrink-0 items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/cashback/intro')}
                    className="flex min-w-px flex-[1_0_0] items-center justify-center gap-1 overflow-clip rounded-lg bg-brand-400 px-2 py-1.5"
                  >
                    <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
                      ضفها مرة وحدة
                    </p>
                    <div className="relative size-4 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCardSmall} />
                    </div>
                  </button>
                  <button
                    type="button"
                    className="flex h-[30px] min-w-px flex-[1_0_0] items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-white px-2 py-1.5"
                  >
                    <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                      التفاصيل
                    </p>
                  </button>
                </div>
              </div>

              {/* العروض المتاحة */}
              <div className="flex w-full shrink-0 flex-col items-end gap-5">
                <div className="flex w-full shrink-0 items-center justify-between whitespace-nowrap text-right">
                  <p className="shrink-0 font-en text-[0px] font-normal leading-[0] text-ink-secondary" dir="auto">
                    <span className="text-xs leading-[1.5]">{'4 '}</span>
                    <span className="font-sans text-xs not-italic leading-[1.5]">عروض</span>
                  </p>
                  <p className="shrink-0 text-sm font-medium leading-[1.5] text-ink" dir="auto">
                    العروض المتاحة
                  </p>
                </div>
                <div className="flex w-full shrink-0 flex-col items-end gap-5">
                  <OfferCard
                    title="خصم 15% على إجمالي الفاتورة"
                    desc="احصل على خصم 15% على مشترياتك بالكامل. يسري العرض على طلبات تناول الطعام في المطعم وطلبات الوجبات الجاهزة."
                    validity="صالح حتى 31 ديسمبر 2026"
                    place="جميع الفروع"
                    placeIcon={iconShopSmall}
                    tagNeutral="1x استخدام"
                    tagWarning={'خصم 15% '}
                    onTap={onOfferTap}
                  />
                  <OfferCard
                    title="اشترِ اثنين واحصل على واحد مجاناً"
                    desc="اشترِ أي مشروبين واحصل على الثالث مجاناً. يسري العرض على جميع الأحجام."
                    validity="صالح لفترة غير محودة"
                    place="اونلاين"
                    placeIcon={iconGlobalSmall}
                    tagNeutral="استخدام لا محدود"
                    tagWarning="اشتري 2 و 1 مجانا"
                    coins="100"
                    onTap={onOfferTap}
                  />
                  <OfferCard
                    title="معجنات مجانية مع أي مشروب"
                    desc="استمتع بمعجنات مجانية عند طلب أي مشروب ساخن أو بارد."
                    validity="صالح حتى 31 ديسمبر 2026"
                    place="فروع محددة"
                    placeIcon={iconShopSmall}
                    tagNeutral="2x استخدام"
                    tagWarning="منتج مجاني"
                    onTap={onOfferTap}
                  />
                </div>
              </div>
            </div>

            {/* متاجر مشابهة — Figma parks this at y=1031 (overlapping the taller offers list),
                so it flows after the list with the screen's 20px section rhythm instead */}
            <div className="mt-5 flex flex-col items-start gap-4">
              <div className="flex w-[343px] shrink-0 items-center justify-between whitespace-nowrap text-right">
                <p className="shrink-0 font-en text-[0px] font-normal leading-[0] text-ink-secondary opacity-0" dir="auto">
                  <span className="text-xs leading-[1.5]">{'4 '}</span>
                  <span className="font-sans text-xs not-italic leading-[1.5]">عروض</span>
                </p>
                <p className="shrink-0 text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  متاجر مشابهة
                </p>
              </div>
              <div className="flex w-[343px] shrink-0 items-start justify-end gap-3">
                <SimilarStoreCard photo={photoHunger} photoCropped name="هنقرسيتشن" tag={'خصم 20% '} badges={['global']} />
                <SimilarStoreCard photo={photoHunger} photoCropped name="هنقرسيتشن" tag={'خصم 20% '} badges={['global']} />
                <SimilarStoreCard photo={photoNamaq} name="قهوة نمق" tag={'كاش باك 10% '} badges={['shop', 'global']} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home indicator pinned over the scrolling content (no CTA dock in this variant) */}
      <div className="absolute bottom-[0.23px] left-[calc(50%+0.5px)] flex -translate-x-1/2 flex-col items-center">
        <div className="relative h-[20.771px] w-[343px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={homeIndicator} />
        </div>
      </div>
    </div>
  );
}
