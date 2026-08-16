import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { merchants } from '../../data/merchants';
import { priceOf, useVoucher } from '../../state/VoucherState';
import Riyal from '../../components/Riyal';
import { FailureArt, MaskStatusBar, STATUS_KEYFRAMES } from '../withdraw/WithdrawStatusScreen';
import iconCopy from '../../assets/figma/26c637b88c317007245e05a01d6c48e3ee5ac0ff.svg';
import iconCalendar from '../../assets/figma/53cc683de430c76ae02e762843c62844111e8134.svg';
import barcode from '../../assets/figma/f7e975ae679ed30ca043dd5afa1b7dbfaa9d2e3c.png';
import notch from '../../assets/figma/2c1e5756ef39942df695e4533d624a40d0909e12.svg';
import dashLine from '../../assets/figma/48e120fbcc2d9a6024237638624dfca6b97ec566.svg';
import successHalo from '../../assets/figma/8021cc5a2919eb4f88522ef664c51a783142f8f0.svg';
import successBadge from '../../assets/figma/d63754fa986210f2bdd8933088923c05f56daa81.svg';
import successCheck from '../../assets/figma/0fb07201416baf27650fd389803ede424425e378.svg';
import dotSolid from '../../assets/figma/13ebf9336d0687f2a13abf83cd90d3acc7ee0ba1.svg';
import dotOutline from '../../assets/figma/03fb124c6f629a462f33721949bdf93bbf473fe6.svg';
import sparkX from '../../assets/figma/8875b465eadd16291f1c14b597d80e8844ebba12.svg';
import woCoin24 from '../../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

/** «استخدمها قبل: dd.MM.yyyy» — a year out, in the drawn shape. */
function expiryLabel() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** «20 يوليو 2025، 08:30 م» — Latin digits, Arabic month, ص/م suffix. */
function stamp() {
  const d = new Date();
  const h24 = d.getHours();
  const h = h24 % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${MONTHS_AR[d.getMonth()]} ${d.getFullYear()}، ${String(h).padStart(2, '0')}:${m} ${h24 < 12 ? 'ص' : 'م'}`;
}

/**
 * Voucher purchase result — success ticket (Figma 65:25888) / failure. The
 * drawn ticket: green gradient header, white card with the success mark,
 * expiry line, dashed perforation with side notches, the voucher code +
 * «نسخ», the barcode strip, then «ملخص العملية».
 *
 * Its «النقاط المستخدمة» row becomes «المدفوع» whenever cashback took part,
 * since Phase 2 can pay in points, cashback, or a split of both.
 */
export default function VoucherSuccessScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const failed = params.get('ok') === '0';
  const { voucher, method, cashbackPart, storeId, code } = useVoucher();
  const [copied, setCopied] = useState(false);

  const merchant = (storeId && merchants[storeId]) || merchants.amazon;
  const due = voucher ? priceOf(voucher, method, cashbackPart) : { cashback: 0, points: 0 };
  const shown = code ?? 'bfa-14000000030';
  const pointsOnly = due.points > 0 && due.cashback === 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable (insecure context / denied) — the code stays visible
    }
  };

  if (failed) {
    return (
      <div className="relative h-full overflow-hidden bg-surface">
        <style>{STATUS_KEYFRAMES}</style>
        <div className="flex h-full w-full flex-col items-center overflow-y-auto">
          <MaskStatusBar />
          <div className="flex min-h-px w-[375px] flex-[1_0_0] flex-col items-center justify-center gap-2.5 p-5">
            <FailureArt />
            <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2.5 py-5 text-center">
              <p className="text-lg font-bold leading-[1.5] text-ink" dir="auto">
                ما ضبطت
              </p>
              <p className="w-[303px] text-sm font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                ما تم شراء القسيمة — جرب مره ثانية وتأكد من رصيدك
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 px-4">
              <button
                type="button"
                onClick={() => navigate('/vouchers/pin')}
                className="flex w-full items-center justify-center rounded-xl bg-brand-400 px-4 py-2.5"
              >
                <p className="text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                  حاول مره ثانية
                </p>
              </button>
              <button
                type="button"
                onClick={() => navigate('/market?tab=vouchers')}
                className="flex w-full items-center justify-center rounded-xl px-4 py-2.5"
              >
                <p className="text-sm font-medium leading-[1.5] text-ink-danger" dir="auto">
                  خلها بعدين
                </p>
              </button>
            </div>
          </div>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-surface-neutral">
      <style>{STATUS_KEYFRAMES}</style>
      {/* green header band with its two blurred blobs, as drawn */}
      <div className="absolute left-0 top-0 h-[211px] w-full overflow-clip rounded-bl-xl rounded-br-xl bg-gradient-to-b from-[#002015] to-[#00ce8b]">
        <div className="absolute left-[142px] top-[52px] h-[203px] w-[296px] rounded-[500px] bg-[#b54806] opacity-50 blur-[57px]" />
        <div className="absolute left-[-95px] top-[52px] h-[203px] w-[275px] rounded-[500px] bg-[#009263] opacity-50 blur-[57px]" />
      </div>

      <div className="relative flex h-full w-full flex-col items-center overflow-y-auto pb-6">
        <MaskStatusBar />

        <div className="relative flex w-[343px] flex-col gap-6 pt-4">
          {/* 🎟️ Ticket */}
          <div className="relative flex w-full flex-col items-center overflow-clip rounded-xl bg-white pb-4 pt-7" data-testid="voucher-ticket">
            <SuccessMark />

            <p className="mt-2.5 text-sm font-medium leading-[1.5] text-ink" dir="auto">
              تم شراء القسيمة بنجاح
            </p>
            <div className="mt-2.5 flex items-center justify-center gap-[5px]">
              <p className="text-center text-xs font-normal leading-[1.5] text-ink-tertiary" dir="rtl">
                {'استخدمها قبل: '}
                <span className="font-en text-ink">{expiryLabel()}</span>
              </p>
              <div className="relative size-4 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCalendar} />
              </div>
            </div>

            {/* perforation — dashed rule with the drawn side notches */}
            <div className="relative mt-6 h-0 w-[296px]">
              <div className="absolute inset-[-1.5px_0_0_0]">
                <img alt="" className="block size-full max-w-none" src={dashLine} />
              </div>
              <div className="absolute left-[-38.5px] top-1/2 size-[30px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={notch} />
              </div>
              <div className="absolute right-[-38.5px] top-1/2 size-[30px] -translate-y-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={notch} />
              </div>
            </div>

            <div className="mt-6 flex w-[260px] flex-col items-center gap-2.5">
              <p className="w-full text-center text-xs font-medium leading-[1.5] text-ink" dir="auto">
                كود القسيمة
              </p>
              <div className="flex w-full items-stretch justify-end overflow-clip rounded-xl border border-solid border-[#ccd2e0] bg-white pr-4">
                <button
                  type="button"
                  onClick={copy}
                  data-testid="copy-code"
                  className="flex shrink-0 cursor-pointer items-center justify-end gap-1 border-r border-solid border-[#ccd2e0] bg-surface-neutral px-4 py-2.5"
                >
                  <div className="relative size-5 shrink-0 overflow-clip">
                    <div className="absolute inset-[9.38%_15.63%]">
                      <div className="absolute inset-[-4.62%_-5.45%]">
                        <img alt="" className="block size-full max-w-none" src={iconCopy} />
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink-secondary" dir="auto">
                    {copied ? 'تم النسخ' : 'نسخ'}
                  </p>
                </button>
                <p
                  className="font-en flex min-w-px flex-[1_0_0] items-center justify-end text-xs font-semibold leading-[1.5] text-ink"
                  dir="auto"
                  data-testid="voucher-code"
                >
                  {shown}
                </p>
              </div>
            </div>

            <div className="mt-6 h-[123px] w-[236px]">
              <img alt="" className="block size-full max-w-none object-contain" src={barcode} />
            </div>
          </div>

          {/* ملخص العملية */}
          <div className="flex w-full flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-white p-4">
            <div className="flex w-full items-center justify-end gap-1">
              <div className="flex shrink-0 items-center justify-center rounded-2xl bg-brand-50 px-2 py-0.5">
                <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-brand-400" dir="auto">
                  قسيمة
                </p>
              </div>
              <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                ملخص العملية
              </p>
            </div>
            <SummaryRow label="رقم العملية" value={<span className="font-en font-medium">{shown.slice(-6)}</span>} />
            <Separator />
            <SummaryRow label="التاجر" value={<span className="font-medium">{merchant.name}</span>} />
            <Separator />
            <SummaryRow
              label={pointsOnly ? 'النقاط المستخدمة' : 'المدفوع'}
              value={
                <span className="flex items-center justify-end gap-1" dir="ltr">
                  {due.points > 0 && (
                    <>
                      <span className="relative size-6 shrink-0">
                        <span className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={woCoin24} />
                        </span>
                      </span>
                      <span className="font-en font-medium">{fmt(due.points)}</span>
                    </>
                  )}
                  {due.points > 0 && due.cashback > 0 && <span className="text-ink-tertiary">+</span>}
                  {due.cashback > 0 && (
                    <span className="font-en flex items-center gap-1 font-medium">
                      {fmt(due.cashback)} <Riyal />
                    </span>
                  )}
                </span>
              }
            />
            <Separator />
            <SummaryRow label="التاريخ والوقت" value={<span className="font-medium">{stamp()}</span>} />
          </div>

          {/* ⛴️ Dock */}
          <div className="flex w-full flex-col items-start gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate('/market?tab=vouchers')}
              className="flex w-full items-center justify-center rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                ارجع للسوق
              </p>
            </button>
            <button type="button" onClick={() => navigate('/cards')} className="flex w-full items-center justify-center rounded-xl px-4 py-2.5">
              <p className="text-sm font-medium leading-[1.5] text-ink" dir="auto">
                وريني مشترياتي
              </p>
            </button>
          </div>
        </div>

        <div className="relative h-[34px] w-[375px] shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}

/** Success mark as drawn (halo + badge + check, with its dots and sparks). */
function SuccessMark() {
  return (
    <div className="relative h-[104px] w-[104px]">
      <div className="absolute left-[14px] top-2 size-[76px]" style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={successHalo} />
      </div>
      <div className="absolute left-[23px] top-[17px] size-[58px] overflow-clip" style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={successBadge} />
        <div className="absolute inset-[27.34%_24.22%_27.54%_24.22%]" style={{ animation: 'check-in 300ms ease-out 250ms both' }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={successCheck} />
        </div>
      </div>
      <Dot src={dotSolid} left={29} top={0} delay={350} />
      <Dot src={dotOutline} left={0} top={40} delay={420} />
      <Dot src={dotOutline} left={86} top={80} delay={490} />
      <Dot src={dotSolid} left={100} top={40} delay={560} />
      <Spark left={85} top={3} delay={630} />
      <Spark left={20} top={78} delay={700} />
    </div>
  );
}

function Dot({ src, left, top, delay }: { src: string; left: number; top: number; delay: number }) {
  return (
    <div className="absolute size-1" style={{ left, top, animation: `spark-in 400ms ease-out ${delay}ms both` }}>
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={src} />
    </div>
  );
}

function Spark({ left, top, delay }: { left: number; top: number; delay: number }) {
  return (
    <div className="absolute size-1.5" style={{ left, top, animation: `spark-in 400ms ease-out ${delay}ms both` }}>
      <div className="absolute inset-1/4">
        <div className="absolute inset-[-20%]">
          <img alt="" className="block size-full max-w-none" src={sparkX} />
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-px w-full shrink-0 bg-line-subtle" />;
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-end gap-3">
      <div className="shrink-0 text-xs leading-[1.5] text-ink">{value}</div>
      <p className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
    </div>
  );
}
