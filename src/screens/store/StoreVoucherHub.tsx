import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { merchants } from '../../data/merchants';
import { storeBrands } from '../../data/storeBrands';
import { VOUCHER_LADDER, type Voucher } from '../../data/vouchers';
import { useAppState } from '../../state/AppState';
import { useVoucher } from '../../state/VoucherState';
import PurchaseVoucherSheet from '../../components/PurchaseVoucherSheet';
import LinkIntroSheet, { useLinkIntroGate } from '../../components/LinkIntroSheet';
import CashbackOfferPromo from '../../components/CashbackOfferPromo';
import { LOGOS, VoucherTile, CircleButton, ChevronLeftMini } from './StoreVoucherDetails';
import { SimilarStoreCard } from './StoreOffersBefore';
import iconSignal from '../../assets/figma/98a449519d2cb6b8478d85d07db09bff5760c428.svg';
import iconWifi from '../../assets/figma/cdc8aed2c9f148d8a793c644a408ff4d4eeeaea2.svg';
import batteryBody from '../../assets/figma/f89fb86ac074101f6cc61149b813776ca9620527.svg';
import batteryCap from '../../assets/figma/1f38d8ef67e3230ca23801d463fe7ed151dad57b.svg';
import batteryFill from '../../assets/figma/043aeae53215903321ce9d08058402508a4b0c1f.svg';
import iconExport from '../../assets/figma/42fc667f1604268ed3acfe8ba20382facf76c168.svg';
import iconHeart from '../../assets/figma/aff47a8629f50f4bf7c3cac784df0512d05b0a9d.svg';
import iconArrowRight from '../../assets/figma/66f0c85afe06c3c9373ce03f89fdb4a4ebdee5ee.svg';
import iconTicketGreen from '../../assets/figma/cab88cb9dbbb1af4fb3b163b08c9cbd0d72ec096.svg';
import iconDiscountShape from '../../assets/figma/3e588dba78a4fc8affe5c6ad4e81e953e499bed4.svg';
import inkBar from '../../assets/figma/bab1ce16d7a8ee274f4360fff6cc3b8442c1eb17.svg';
import homeIndicator from '../../assets/figma/5f04cb4b716a42ba11ba59a4acef8da61bbe12e9.svg';
import heroPhoto from '../../assets/figma/27cde6821f1952fa7483f220578eb04c40cae482.png';
import photoAmazon from '../../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoHunger from '../../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoNamaq from '../../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';

/**
 * Store details — القسائم stores, redrawn (Figma 135:6477, إيكيا content).
 * Temp only (user direction: «all stores under the Vouchers tab shall be the
 * same as 135:6477»); Phase 2 keeps StoreVoucherDetails (65:25229). Over that
 * page this adds, top to bottom: the before-link **add-card promo card**
 * («أضف بطاقتك واربح 10% كاش باك» — both CTAs start the linking flow),
 * the **القسائم | العروض tabs** (العروض opens this store on the +offers
 * design) and **«متاجر مشابهة»** after the points ladder. The drawn frame
 * hides the dock, so «بشتريها / برسلها هدية» rises only once a row is picked.
 * The frame's sixth (cashback-priced) row and the older «مبلغ مخصص» tile
 * were removed on review (user direction).
 */
export default function StoreVoucherHub() {
  const navigate = useNavigate();
  const { id } = useParams();
  const merchant = (id && merchants[id]) || merchants.amazon;
  const brand = storeBrands[merchant.id];
  const { cardLinked } = useAppState();
  const { voucher, setVoucher, setStoreId } = useVoucher();
  const { introOpen, startLinking, closeIntro } = useLinkIntroGate();
  const [sheetOpen, setSheetOpen] = useState(false);

  const pickTier = (tier: Voucher) => {
    setStoreId(merchant.id);
    setVoucher({ face: tier.face, points: tier.points, tier });
  };

  const buy = () => {
    if (!voucher) return;
    setSheetOpen(true);
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className={`h-full overflow-y-auto overflow-x-clip ${voucher ? 'pb-[104px]' : 'pb-[34px]'}`}>
        <div className="relative flex min-h-full w-full flex-col bg-surface">
          {/* Hero photo + overlays */}
          <div className="relative h-[215px] w-full shrink-0">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={heroPhoto} />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(9,11,9,0.5)] to-[rgba(9,11,9,0)]" />
            <div className="absolute bottom-[-0.26px] right-0 h-[61.069px] w-full bg-gradient-to-b from-[rgba(250,250,250,0)] to-[#fafafa] to-[96%]" />
          </div>

          {/* Top bar over the photo */}
          <div className="absolute right-0 top-0 flex w-full flex-col items-center pb-4">
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
            <div className="flex w-full shrink-0 items-center justify-between px-4">
              <div className="flex shrink-0 items-center gap-2.5">
                <CircleButton icon={iconExport} label="مشاركة" />
                <CircleButton icon={iconHeart} label="المفضلة" />
              </div>
              <CircleButton icon={iconArrowRight} label="رجوع" onClick={() => navigate(-1)} />
            </div>
          </div>

          {/* Content — starts overlapping the photo, as drawn */}
          <div className="relative -mt-[43px] flex w-full flex-col gap-5 px-4">
            {/* Store identity card */}
            <div className="flex h-[78px] w-full shrink-0 items-center justify-between rounded-2xl border border-solid border-line-subtle bg-white px-3.5">
              <ChevronLeftMini />
              <div className="flex shrink-0 items-center gap-2">
                <div className="flex flex-col items-end gap-0.5 text-right">
                  <p className="text-base font-medium leading-[1.5] text-ink" dir="auto">
                    {merchant.name}
                  </p>
                  <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                    {brand?.category ?? merchant.category ?? 'متجر إلكتروني'}
                  </p>
                </div>
                <div className="relative size-[50px] shrink-0 rounded-[12.5px]">
                  <img
                    alt=""
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12.5px] object-cover"
                    src={brand?.logo ?? LOGOS[merchant.id] ?? photoAmazon}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              {/* Store promo — the shared Temp card (attached design,
                  2026-08-19) in both link states; before linking «شوف كيف»
                  starts the linking flow */}
              {cardLinked && <CashbackOfferPromo testid="hub-promo-linked" />}
              {!cardLinked && <CashbackOfferPromo testid="hub-promo" onHow={startLinking} />}

              {/* 🗂️ القسائم | العروض — full-bleed tabs, القسائم selected */}
              <div className="-mx-4 flex h-[45px] w-[375px] items-end justify-between border-b border-solid border-line bg-surface" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  onClick={() => navigate(`/store/${merchant.id}?variant=offers`)}
                  data-testid="hub-tab-offers"
                  className="flex h-full min-w-px flex-[1_0_0] cursor-pointer items-center justify-center gap-1 overflow-clip"
                >
                  <div className="flex shrink-0 items-center justify-center overflow-clip py-2">
                    <p className="whitespace-nowrap text-right text-[14px] font-normal leading-[1.5] text-ink" dir="auto">
                      العروض
                    </p>
                  </div>
                  <div className="relative size-5 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconDiscountShape} />
                  </div>
                </button>
                <div role="tab" aria-selected className="relative flex h-full min-w-px flex-[1_0_0] flex-col items-center justify-center overflow-clip">
                  <div className="absolute bottom-0 left-0 right-0 h-0">
                    <div className="absolute inset-[-2px_0_0_0]">
                      <img alt="" className="block size-full max-w-none" src={inkBar} />
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-center gap-1 py-1">
                    <div className="flex shrink-0 items-center justify-center overflow-clip py-2">
                      <p className="whitespace-nowrap text-right text-[14px] font-medium leading-[1.5] text-brand-400" dir="auto">
                        القسائم
                      </p>
                    </div>
                    <div className="relative size-5 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTicketGreen} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section header + «كيف تستخدمها؟» */}
            <div className="flex w-full items-center justify-between">
              <div className="flex shrink-0 items-center justify-center rounded-lg border border-solid border-line bg-white px-2 py-1.5">
                <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                  كيف تستخدمها؟
                </p>
              </div>
              <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                اختر القسيمة اللي تبيها
              </p>
            </div>

            {/* Rows — the points ladder */}
            <div className="flex w-full flex-col items-start gap-5">
              {VOUCHER_LADDER.map((tier) => (
                <VoucherTile
                  key={tier.face}
                  tier={tier}
                  selected={!!voucher && voucher.face === tier.face}
                  onPick={() => pickTier(tier)}
                />
              ))}
            </div>

            {/* متاجر مشابهة — drawn parked below the rows; flows after them here */}
            <div className="flex flex-col items-start gap-4">
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

      {/* ⛴️ Dock — hidden in the drawn frame; rises once a voucher is picked */}
      {voucher ? (
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-surface pt-3"
          style={{ animation: 'hub-dock-rise 240ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
          data-testid="hub-dock"
        >
          <style>{'@keyframes hub-dock-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}'}</style>
          <div className="flex w-full items-center gap-2 px-4">
            <button
              type="button"
              onClick={() => navigate('/gift/pick?aud=colleagues')}
              className="flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-solid border-line bg-surface px-4"
            >
              <div className="relative size-5 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTicketGreen} />
              </div>
              <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
                برسلها هدية
              </p>
            </button>
            <button
              type="button"
              onClick={buy}
              data-testid="buy-voucher"
              className="flex h-[42px] min-w-px flex-[1_0_0] cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-400 px-4"
            >
              <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                بشتريها
              </p>
            </button>
          </div>
          <div className="relative h-[34px] w-full shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </div>
      ) : (
        <div className="absolute bottom-[0.23px] left-[calc(50%+0.5px)] flex -translate-x-1/2 flex-col items-center">
          <div className="relative h-[20.771px] w-[343px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={homeIndicator} />
          </div>
        </div>
      )}

      <PurchaseVoucherSheet open={sheetOpen} onClose={() => setSheetOpen(false)} merchant={merchant} />
      <LinkIntroSheet open={introOpen} onClose={closeIntro} />
    </div>
  );
}

