import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { merchants } from '../../data/merchants';
import { CUSTOM_MAX, CUSTOM_MIN, POINTS_PER_RIYAL, VOUCHER_LADDER, pointsFor, type Voucher } from '../../data/vouchers';
import { useVoucher } from '../../state/VoucherState';
import PurchaseVoucherSheet from '../../components/PurchaseVoucherSheet';
import iconSignal from '../../assets/figma/98a449519d2cb6b8478d85d07db09bff5760c428.svg';
import iconWifi from '../../assets/figma/cdc8aed2c9f148d8a793c644a408ff4d4eeeaea2.svg';
import batteryBody from '../../assets/figma/f89fb86ac074101f6cc61149b813776ca9620527.svg';
import batteryCap from '../../assets/figma/1f38d8ef67e3230ca23801d463fe7ed151dad57b.svg';
import batteryFill from '../../assets/figma/043aeae53215903321ce9d08058402508a4b0c1f.svg';
import iconExport from '../../assets/figma/42fc667f1604268ed3acfe8ba20382facf76c168.svg';
import iconHeart from '../../assets/figma/aff47a8629f50f4bf7c3cac784df0512d05b0a9d.svg';
import iconArrowRight from '../../assets/figma/66f0c85afe06c3c9373ce03f89fdb4a4ebdee5ee.svg';
import chevronStroke from '../../assets/figma/799e69f6bf3b072fd575e5ef3e7a3f09fc624b98.svg';
import riyalGlyph from '../../assets/figma/969546ee4269b5afc807dd5a3a99e2c62268b73b.svg';
import woCoin24 from '../../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';
import iconTicket from '../../assets/figma/cab88cb9dbbb1af4fb3b163b08c9cbd0d72ec096.svg';
import heroPhoto from '../../assets/figma/34f0bb903b87df46e603c7446d65690b4ba71aac.png';
import photoNamaq from '../../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoAmazon from '../../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoHunger from '../../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoJahez from '../../assets/figma/924e4f06eab7bf8031d10804ed6309bb8a93a3b4.png';
import photoJarir from '../../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';
import photoGolden from '../../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import photoZara from '../../assets/figma/453784f58c394882dae76c32815f4f8dac9abc7e.png';

const LOGOS: Record<string, string> = {
  namaq: photoNamaq,
  amazon: photoAmazon,
  hunger: photoHunger,
  jahez: photoJahez,
  jarir: photoJarir,
  golden: photoGolden,
  zara: photoZara,
};

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/**
 * Store details — vouchers variant (Figma 65:25229 / 65:25365): hero photo,
 * merchant identity card, the «اختر القسيمة اللي تبيها» denomination ladder
 * and a dock of «بشتريها» / «برسلها هدية». Phase 2 only; Phase 1 keeps the
 * frozen StoreVouchers screens.
 *
 * Beyond the drawn tiers this adds the user-directed **«مبلغ مخصص»** tile —
 * any face value between 10 and 500 ﷼, priced at the undiscounted base rate.
 */
export default function StoreVoucherDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const merchant = (id && merchants[id]) || merchants.amazon;
  const { voucher, setVoucher, setStoreId } = useVoucher();
  const [custom, setCustom] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const customFace = Number(custom) || 0;
  const customValid = customFace >= CUSTOM_MIN && customFace <= CUSTOM_MAX;

  const pickTier = (tier: Voucher) => {
    setStoreId(merchant.id);
    setVoucher({ face: tier.face, points: tier.points, tier });
    setCustom('');
  };

  const pickCustom = (value: string) => {
    setCustom(value);
    const face = Number(value) || 0;
    setStoreId(merchant.id);
    setVoucher(
      face >= CUSTOM_MIN && face <= CUSTOM_MAX
        ? { face, points: pointsFor(face), custom: true }
        : null,
    );
  };

  const buy = () => {
    if (!voucher) return;
    setSheetOpen(true);
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto overflow-x-clip pb-[104px]">
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
                    {merchant.category ?? 'متجر إلكتروني'}
                  </p>
                </div>
                <div className="relative size-[50px] shrink-0 rounded-[12.5px]">
                  <img
                    alt=""
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12.5px] object-cover"
                    src={LOGOS[merchant.id] ?? photoAmazon}
                  />
                </div>
              </div>
            </div>

            {/* Section header + «كيف تستخدمها؟» */}
            <div className="flex w-full items-center justify-between">
              <div className="flex shrink-0 items-center justify-center rounded-2xl border border-solid border-line px-2.5 py-1.5">
                <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
                  كيف تستخدمها؟
                </p>
              </div>
              <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                اختر القسيمة اللي تبيها
              </p>
            </div>

            {/* Denomination ladder */}
            <div className="flex w-full flex-col items-end gap-3">
              {VOUCHER_LADDER.map((tier) => (
                <VoucherTile
                  key={tier.face}
                  tier={tier}
                  selected={!!voucher && !voucher.custom && voucher.face === tier.face}
                  onPick={() => pickTier(tier)}
                />
              ))}

              {/* «مبلغ مخصص» — user direction: any face value, base rate */}
              <div
                className={`flex w-full shrink-0 flex-col gap-2.5 rounded-2xl border border-solid p-3 ${
                  voucher?.custom ? 'border-brand-400 bg-brand-50' : 'border-line bg-white'
                }`}
                data-testid="custom-voucher"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex shrink-0 items-center justify-center rounded-md bg-surface-neutral px-2 py-0.5">
                    <p className="whitespace-nowrap text-center text-[10px] font-medium leading-[1.5] text-ink-secondary" dir="auto">
                      جديد
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                    مبلغ مخصص
                  </p>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="flex min-w-px flex-[1_0_0] items-center gap-1.5 rounded-lg border border-solid border-[#ccd2e0] bg-white px-3 py-2">
                    <RiyalGlyph />
                    <input
                      type="text"
                      inputMode="numeric"
                      dir="ltr"
                      value={custom}
                      onChange={(e) => pickCustom(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder={`${CUSTOM_MIN}–${CUSTOM_MAX}`}
                      aria-label="مبلغ مخصص"
                      className="font-en min-w-px flex-[1_0_0] bg-transparent text-right text-sm font-semibold leading-[1.5] text-ink outline-none placeholder:font-normal placeholder:text-ink-quadrant"
                    />
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-lg bg-brand-50 px-3 py-2">
                    <WoCoin24 />
                    <p className="font-en whitespace-nowrap text-right text-sm font-semibold leading-[1.5] text-ink" dir="auto">
                      {customValid ? fmt(pointsFor(customFace)) : '—'}
                    </p>
                  </div>
                </div>
                <p className="w-full text-right text-[10px] font-normal leading-[1.5] text-ink-tertiary" dir="rtl">
                  {'كل '}
                  <span className="font-en">1</span>
                  {' ﷼ = '}
                  <span className="font-en">{POINTS_PER_RIYAL}</span>
                  {' نقاط · تقدر تدفعها كاش باك بعد'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⛴️ Dock — بشتريها / برسلها هدية */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-surface pt-3">
        <div className="flex w-full items-center gap-2 px-4">
          <button
            type="button"
            onClick={() => navigate('/gift/pick?aud=colleagues')}
            className="flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-solid border-line bg-surface px-4"
          >
            <div className="relative size-5 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTicket} />
            </div>
            <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
              برسلها هدية
            </p>
          </button>
          <button
            type="button"
            disabled={!voucher}
            onClick={buy}
            data-testid="buy-voucher"
            className={`flex h-[42px] min-w-px flex-[1_0_0] items-center justify-center gap-2 rounded-xl px-4 ${
              voucher ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
            }`}
          >
            <p
              className={`whitespace-nowrap text-sm font-medium leading-[1.5] ${voucher ? 'text-ink-inverse' : 'text-ink-quadrant'}`}
              dir="auto"
            >
              بشتريها
            </p>
          </button>
        </div>
        <div className="relative h-[34px] w-full shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>

      <PurchaseVoucherSheet open={sheetOpen} onClose={() => setSheetOpen(false)} merchant={merchant} />
    </div>
  );
}

/** قسيمة شراء tile — 78px card, price strip pinned to its bottom edge; the
    selected state (green border + mint fill) is drawn on the first tile. */
function VoucherTile({ tier, selected, onPick }: { tier: Voucher; selected: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      data-testid={`voucher-${tier.face}`}
      className={`relative flex h-[78px] w-full shrink-0 cursor-pointer flex-col items-center gap-4 overflow-clip rounded-2xl border border-solid px-3 pt-3.5 ${
        selected ? 'border-brand-400 bg-brand-50/40' : 'border-line bg-white'
      }`}
    >
      <div className="flex w-full shrink-0 items-center justify-end gap-[5px]">
        <div className="flex shrink-0 items-center gap-1">
          <div className="flex shrink-0 items-center">
            <RiyalGlyph />
            <p className="font-en whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              {` ${tier.face}`}
            </p>
          </div>
          {tier.wasFace && (
            <p
              className="font-en whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary line-through decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]"
              dir="auto"
            >
              {tier.wasFace}
            </p>
          )}
        </div>
        <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
          قسيمة شراء بقيمة
        </p>
      </div>
      <div
        className={`absolute left-0 top-[45px] flex h-8 w-full items-center justify-center rounded-bl-[10px] rounded-br-[10px] ${
          selected ? 'bg-brand-100/70' : 'bg-brand-50'
        }`}
      >
        <div className="flex shrink-0 items-center gap-1">
          <WoCoin24 />
          <p className="font-en whitespace-nowrap text-right text-sm font-semibold leading-[1.5] text-ink" dir="auto">
            {fmt(tier.points)}
          </p>
          {tier.wasPoints && (
            <p
              className="font-en whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary line-through decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]"
              dir="auto"
            >
              {fmt(tier.wasPoints)}
            </p>
          )}
        </div>
      </div>
      {tier.save && (
        <div className="absolute left-0 top-[-1px] flex items-start">
          <div className="flex shrink-0 items-center justify-center rounded-br-2xl rounded-tl-2xl bg-brand-400/80 px-2 py-0.5">
            <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
              {'وفر '}
              <span className="font-en">{tier.save}%</span>
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

/** Floating white circle button of the photo top bar (38.168px). */
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

/** chevron-left_mini (20px) used inside the store card. */
function ChevronLeftMini() {
  return (
    <div className="relative size-5 shrink-0 overflow-clip">
      <div className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center" style={{ containerType: 'size' }}>
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

/** SAR currency glyph (18px) shown left of a face value. */
function RiyalGlyph() {
  return (
    <div className="relative size-[18px] shrink-0 overflow-clip">
      <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={riyalGlyph} />
      </div>
    </div>
  );
}

/** WO Coin (24px) of a points price. */
function WoCoin24() {
  return (
    <div className="relative size-6 shrink-0">
      <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={woCoin24} />
      </div>
    </div>
  );
}
