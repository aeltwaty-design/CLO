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
import iconCardLinear16 from '../../assets/figma/2a02a76700bfa721a2d4c7abb3f26abfd1e840c9.svg';
import iconDiscountShape from '../../assets/figma/3e588dba78a4fc8affe5c6ad4e81e953e499bed4.svg';
import inkBar from '../../assets/figma/0ba6a04a0954e8df69e90e8fbe5a9e473f0339f4.svg';
import iconTicket from '../../assets/figma/cab88cb9dbbb1af4fb3b163b08c9cbd0d72ec096.svg';
import riyalGlyph from '../../assets/figma/969546ee4269b5afc807dd5a3a99e2c62268b73b.svg';
import woCoin24 from '../../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';
import coinLayer1 from '../../assets/figma/8932e435a715d7d81aa1ff0f66393978b62fca73.svg';
import coinLayer2 from '../../assets/figma/e19bddb60b0a93b329b0ff8504048a401ba3c554.svg';
import coinLayer3 from '../../assets/figma/f3e1148e3fc68cfc63a2dbb1d26358e8778b35ca.svg';
import coinLayer4 from '../../assets/figma/9f6067323de47f223044ef0ed85d8c5bcdacb283.svg';
import coinPayment from '../../assets/figma/604b6b63d8992b3a571df20428416a66702742f7.svg';
import coinLayer5 from '../../assets/figma/98b8c4c60f78fb14151386901216b763161c31e6.svg';
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

/** SAR currency glyph (18px riyal symbol SVG) shown left of the face value. */
function RiyalGlyph() {
  return (
    <div className="relative size-[18px] shrink-0 overflow-clip">
      <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={riyalGlyph} />
      </div>
    </div>
  );
}

/** WO Coin (24px) shown in the green price strip of a voucher tile. */
function WoCoin24() {
  return (
    <div className="relative size-6 shrink-0">
      <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={woCoin24} />
      </div>
    </div>
  );
}

/** Layered WalaPlus points/payment coin (16.4px) of the viola strip. */
function PointsCoin() {
  return (
    <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
      <div className="relative col-1 row-1 ml-[1.35px] mt-0 size-[16.438px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer1} />
      </div>
      <div className="relative col-1 row-1 ml-0 mt-0 size-[16.438px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer2} />
      </div>
      <div className="relative col-1 row-1 ml-px mt-[1.03px] h-[14.387px] w-[14.428px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer3} />
      </div>
      <div className="relative col-1 row-1 ml-[2.06px] mt-[2.06px] size-[12.326px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer4} />
      </div>
      <div className="relative col-1 row-1 ml-[4.11px] mt-[3.96px] flex h-[8.553px] w-[8.211px] flex-col items-center overflow-clip px-[13.685px] py-[1.026px]">
        <div className="relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
          <div className="relative col-1 row-1 ml-0 mt-0 h-[6.642px] w-[7.804px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinPayment} />
          </div>
        </div>
      </div>
      <div className="relative col-1 row-1 ml-[2.06px] mt-[2.06px] h-[11.402px] w-[10.008px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer5} />
      </div>
    </div>
  );
}

type VoucherTileData = {
  /** Face value shown in the top row — leading space verbatim from Figma. */
  value: string;
  /** Per-tile fixed width class of the face-value column, as generated. */
  valueClass: string;
  /** Struck-through old face value beside the price (tile 3 only). */
  was?: string;
  /** Bottom strip: WO-coin price (optionally with struck old price) or viola points price. */
  strip: { kind: 'coins'; amount: string; was?: string } | { kind: 'points'; amount: string };
  /** وفر 20% corner tag — 'flush' sits at left-0, 'overlap' at -1px (per-tile in Figma). */
  tag?: 'flush' | 'overlap';
};

const VOUCHERS: VoucherTileData[] = [
  { value: ' 100', valueClass: 'w-[22px]', strip: { kind: 'coins', amount: '400', was: '500' }, tag: 'flush' },
  { value: ' 200', valueClass: 'w-[25px]', strip: { kind: 'coins', amount: '1,000' } },
  { value: ' 350', valueClass: 'w-[25px]', was: '300', strip: { kind: 'coins', amount: '1,500' }, tag: 'overlap' },
  { value: ' 400', valueClass: 'w-[26px]', strip: { kind: 'coins', amount: '2,000' } },
  { value: ' 500', valueClass: 'w-[26px]', strip: { kind: 'coins', amount: '2,000' } },
  { value: ' 500', valueClass: 'w-[26px]', strip: { kind: 'points', amount: '300' } },
];

/** قسيمة شراء tile — 78px card with the price strip pinned to its bottom edge. */
function VoucherTile({ data, onTap }: { data: VoucherTileData; onTap?: () => void }) {
  return (
    <button
      type="button"
      onClick={onTap}
      className="relative flex h-[78px] w-full shrink-0 flex-col items-center gap-4 overflow-clip rounded-2xl border border-solid border-line bg-white px-3 pt-3.5"
    >
      <div className="flex w-full shrink-0 items-center justify-end gap-[5px]">
        {data.was ? (
          <div className="flex shrink-0 items-center gap-1">
            <div className="flex shrink-0 items-center">
              <RiyalGlyph />
              <div className={`flex shrink-0 flex-col items-end ${data.valueClass}`}>
                <p className="w-full text-right font-en text-xs font-medium leading-[1.5] text-ink" dir="auto">
                  {data.value}
                </p>
              </div>
            </div>
            <div className="flex w-[22px] shrink-0 flex-col items-end">
              <p
                className="w-full text-right font-en text-xs font-normal leading-[1.5] text-ink-tertiary line-through decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]"
                dir="auto"
              >
                {data.was}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex shrink-0 items-center">
            <RiyalGlyph />
            <div className={`flex shrink-0 flex-col items-end ${data.valueClass}`}>
              <p className="w-full text-right font-en text-xs font-medium leading-[1.5] text-ink" dir="auto">
                {data.value}
              </p>
            </div>
          </div>
        )}
        <div className="flex shrink-0 items-center justify-end gap-1.5">
          <div className="flex shrink-0 items-center justify-center">
            <div className="flex shrink-0 flex-col justify-end whitespace-nowrap text-center text-xs font-normal leading-[0] text-ink-secondary">
              <p className="leading-[1.5]" dir="auto">
                قسيمة شراء بقيمة
              </p>
            </div>
          </div>
        </div>
      </div>
      {data.strip.kind === 'coins' ? (
        <div className="absolute left-0 top-[45px] flex h-8 w-[341px] items-center justify-center rounded-bl-[10px] rounded-br-[10px] bg-brand-50">
          <div className="flex shrink-0 items-center gap-1">
            <WoCoin24 />
            <div className="flex shrink-0 flex-col justify-center whitespace-nowrap text-right font-en text-sm font-semibold leading-[0] text-ink">
              <p className="leading-[1.5]" dir="auto">
                {data.strip.amount}
              </p>
            </div>
            {data.strip.was && (
              <div className="flex shrink-0 flex-col justify-center whitespace-nowrap text-right font-en text-xs font-normal leading-[0] text-ink-tertiary">
                <p
                  className="leading-[1.5] line-through decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]"
                  dir="auto"
                >
                  {data.strip.was}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute left-0 top-[44.92px] flex h-[27px] w-[341px] items-center justify-center gap-1 rounded-bl-[10px] rounded-br-[10px] bg-[#f1effb] leading-[0]">
          <PointsCoin />
          <div className="flex shrink-0 flex-col justify-center whitespace-nowrap text-right font-en text-sm font-semibold text-ink">
            <p className="leading-[1.5]" dir="auto">
              {data.strip.amount}
            </p>
          </div>
        </div>
      )}
      {data.tag && (
        <div className={`absolute top-[-1px] flex items-start ${data.tag === 'overlap' ? 'left-[-1px]' : 'left-0'}`}>
          <div className="flex shrink-0 items-center justify-center rounded-br-2xl rounded-tl-2xl bg-brand-400/80 px-2 py-0.5">
            <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
              وفر 20%
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

/**
 * Store details — offers+vouchers variant, before card link (Figma 1:9399, 375×968).
 * Same shell as StoreScreen; the CTA lives inside the bravo banner (no bottom dock),
 * and the القسائم tab lists six voucher denominations.
 */
export default function StoreVouchersBefore({ onOfferTap }: { onOfferTap?: () => void }) {
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

              {/* Bravo promo banner + tabs */}
              <div className="flex w-full shrink-0 flex-col items-start gap-2.5">
                <div className="flex w-full shrink-0 flex-col items-end gap-3 overflow-clip rounded-2xl bg-bravo-50 p-3">
                  <div className="flex w-full shrink-0 items-center justify-end gap-2.5">
                    <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1.5 text-right">
                      <p className="w-[239px] shrink-0 text-[0px] font-medium leading-[0] text-ink" dir="auto">
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
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCardLinear16} />
                      </div>
                    </button>
                    <button
                      type="button"
                      className="flex min-w-px flex-[1_0_0] items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-white px-2 py-1.5"
                    >
                      <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                        التفاصيل
                      </p>
                    </button>
                  </div>
                </div>

                {/* 🗂️ Tabs — full-bleed 375px; القسائم (right, selected) / العروض (left) */}
                <div className="flex w-full shrink-0 flex-col items-center">
                  <div className="flex w-[375px] shrink-0 items-end justify-between border-b border-solid border-line bg-white">
                    <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
                      <div className="relative flex h-full min-w-px flex-[1_0_0] items-center justify-center gap-3 overflow-clip">
                        <div className="flex shrink-0 items-center justify-center gap-3">
                          <div className="flex shrink-0 items-center gap-1">
                            <div className="flex shrink-0 items-center justify-center gap-2.5 overflow-clip py-2">
                              <div className="flex shrink-0 flex-col items-center justify-center gap-2.5 overflow-clip">
                                <div className="flex shrink-0 flex-col justify-center whitespace-nowrap text-right text-sm font-normal leading-[0] text-ink">
                                  <p className="leading-[1.5]" dir="auto">
                                    العروض
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="relative size-5 shrink-0">
                            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconDiscountShape} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex min-w-px flex-[1_0_0] flex-col items-end justify-center overflow-clip">
                      <div className="absolute bottom-0 left-0 right-0 h-0">
                        <div className="absolute inset-[-2px_0_0_0]">
                          <img alt="" className="block size-full max-w-none" src={inkBar} />
                        </div>
                      </div>
                      <div className="flex w-full shrink-0 items-center justify-center gap-3 py-1">
                        <div className="flex shrink-0 items-center gap-1">
                          <div className="flex shrink-0 items-center justify-center gap-2.5 overflow-clip py-2">
                            <div className="flex shrink-0 flex-col items-start justify-center overflow-clip">
                              <div className="flex shrink-0 flex-col justify-center whitespace-nowrap text-right text-sm font-medium leading-[0] text-brand-400">
                                <p className="leading-[1.5]" dir="auto">
                                  القسائم
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative size-5 shrink-0">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTicket} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* القسائم — voucher denominations */}
              <div className="flex w-full shrink-0 flex-col items-end gap-5">
                <div className="flex w-full shrink-0 items-center justify-between">
                  <button
                    type="button"
                    className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-white px-2 py-1.5"
                  >
                    <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                      كيف تستخدمها؟
                    </p>
                  </button>
                  <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                    اختر القسيمة اللي تبيها
                  </p>
                </div>
                <div className="flex w-full shrink-0 flex-col items-start gap-5">
                  {VOUCHERS.map((voucher, i) => (
                    <VoucherTile key={i} data={voucher} onTap={onOfferTap} />
                  ))}
                </div>
              </div>
            </div>

            {/* متاجر مشابهة — below the fold (base-frame precedent: 120px under the content) */}
            <div className="mt-[120px] flex flex-col items-start gap-4">
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

      {/* Home indicator floats over the scrolling content — no CTA dock in this variant */}
      <div className="absolute bottom-[0.23px] left-[calc(50%+0.5px)] flex -translate-x-1/2 flex-col items-center">
        <div className="relative h-[20.771px] w-[343px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={homeIndicator} />
        </div>
      </div>
    </div>
  );
}
