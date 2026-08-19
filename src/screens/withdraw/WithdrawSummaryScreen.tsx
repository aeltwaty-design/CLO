import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IS_TEMP } from '../../state/PhaseState';
import iconBack from '../../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconEdit from '../../assets/figma/30a8a7af34a2a4266156e3e7d5cbeb76da909206.svg';
import iconInfoSmall from '../../assets/figma/60e86b53328378fe6e2eaac39925383a1427b8b4.svg';
import sarRow from '../../assets/figma/438a0e6cdb16aae2ff23232f4ec31e0a755634ef.svg';
import sarTotal from '../../assets/figma/26387e372dcacfc833c80eaaff70d73438cc6ef9.svg';
import {
  useWithdraw,
  REGISTERED_ACCOUNT,
  WITHDRAW_FEE,
  WITHDRAW_VAT,
} from '../../state/WithdrawState';

/**
 * تأكيد السحب — withdrawal summary (Figma 27:10987 "Summary", 375×812).
 * Entered amount + fee 1 + VAT 0.15 total to two decimals (drawn: 50 → 51.15).
 * The ⓘ glyphs on the fee and VAT rows open the small info cards drawn as
 * 27:11484 / 27:11489 (375×169 bottom sheets); backdrop tap or «تم» dismisses.
 */

/** Amounts rendered with Poppins digits, thousands-separated as drawn. */
const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

export default function WithdrawSummaryScreen() {
  const navigate = useNavigate();
  const { account, amount } = useWithdraw();
  const recipient = account ?? REGISTERED_ACCOUNT;
  const total = amount + WITHDRAW_FEE + WITHDRAW_VAT;
  const [info, setInfo] = useState<'fee' | 'vat' | null>(null);

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="flex h-full w-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full shrink-0 flex-col items-start">
          {/* 🧭 App bar */}
          <div className="flex w-full flex-col items-end gap-4 border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                {/* #66 */}
                {IS_TEMP ? 'تأكيد التحويل' : 'تأكيد السحب'}
              </p>
              <button type="button" onClick={() => navigate(-1)} className="relative block size-5 shrink-0 cursor-pointer overflow-clip">
                <div className="absolute inset-[17.71%_14.58%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBack} />
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-[380px] w-[375px] shrink-0 flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* المرسل إليه */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-surface p-4">
              <div className="flex w-full shrink-0 items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  {/* #67 */}
                  {IS_TEMP ? 'إلى' : 'المرسل إليه'}
                </p>
              </div>
              <div className="flex h-16 w-full shrink-0 items-center justify-end gap-3 rounded-2xl border border-solid border-brand-400 bg-brand-50 px-4">
                <div className="relative size-4 shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconEdit} />
                </div>
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
                  <div className="w-full flex-none -scale-y-100">
                    <div className="flex w-full flex-col items-end justify-center gap-1">
                      <div className="relative flex w-full shrink-0 items-center justify-center">
                        <div className="w-full flex-none -scale-y-100">
                          <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="ltr">
                            {recipient.masked}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex w-full shrink-0 items-center justify-center">
                        <div className="w-full flex-none -scale-y-100">
                          <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                            {recipient.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative size-10 shrink-0 overflow-clip rounded-full bg-surface">
                  <p className="font-en absolute left-1/2 top-[calc(50%-12px)] w-6 -translate-x-1/2 text-center text-base font-medium leading-[1.5] text-ink-secondary">
                    {recipient.initials}
                  </p>
                </div>
              </div>
            </div>

            {/* ملخص العملية */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-surface p-4">
              <div className="flex w-full shrink-0 items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  {/* #68 */}
                  {IS_TEMP ? 'ملخص التحويل' : 'ملخص العملية'}
                </p>
              </div>
              {/* #69 */}
              <SummaryRow label={IS_TEMP ? 'المبلغ' : 'المبلغ المُدخل'} value={fmt(amount)} />
              <SummaryRow label="رسوم التحويل" value={String(WITHDRAW_FEE)} onInfo={() => setInfo('fee')} />
              <SummaryRow label="ضريبة قيمة مضافة" value={String(WITHDRAW_VAT)} onInfo={() => setInfo('vat')} />
              <div className="flex w-full shrink-0 flex-col items-start">
                <div className="relative h-px w-full shrink-0 bg-line-subtle" />
              </div>
              {/* إجمالي المبلغ */}
              <div className="flex w-full shrink-0 items-center justify-end gap-3">
                <div className="flex shrink-0 items-center gap-1">
                  <div className="relative size-5 shrink-0 overflow-clip">
                    <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={sarTotal} />
                    </div>
                  </div>
                  <p className="font-en whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
                    {total.toFixed(2)}
                  </p>
                </div>
                <div className="flex min-w-px flex-[1_0_0] flex-col items-end">
                  <p className="w-full text-right text-sm font-normal leading-[1.5] text-ink" dir="auto">
                    {/* #70 */}
                    {IS_TEMP ? 'الإجمالي' : 'إجمالي المبلغ'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms + CTA + home indicator */}
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex flex-col items-center gap-[18px]">
            <p className="whitespace-nowrap text-center text-[0px] font-normal leading-none text-ink" dir="auto">
              <span className="text-xs leading-[1.5]">{'تطبق '}</span>
              <span className="text-xs font-medium not-italic leading-[1.5] underline decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]">
                الشروط والأحكام
              </span>
              <span className="text-xs leading-[1.5]">{' و'}</span>
              <span className="text-xs font-medium not-italic leading-[1.5] underline decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]">
                سياسة الخصوصية
              </span>
            </p>
            <button
              type="button"
              onClick={() => navigate('/withdraw/pin')}
              className="flex w-[343px] shrink-0 cursor-pointer items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                {/* #71 */}
                {IS_TEMP ? 'تمم التحويل' : 'تمم السحب'}
              </p>
            </button>
          </div>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </div>
      </div>

      {info !== null && (
        <InfoSheet
          title={info === 'fee' ? 'رسوم التحويل' : 'ضريبة قيمة مضافة'}
          body={
            info === 'fee' ? (
              'هذه رسوم البنك وتختلف قيمة الرسوم حسب المبلغ المحول '
            ) : (
              <>
                {'تحسب ضريبة القيمة المضافة ('}
                <span className="font-en">15%</span>
                {') من رسوم التحويل'}
              </>
            )
          }
          onClose={() => setInfo(null)}
        />
      )}
    </div>
  );
}

/** One «ملخص العملية» line: 15px riyal + Poppins value at the left, label
    (with optional ⓘ info trigger, as drawn 13.306px) at the right. */
function SummaryRow({ label, value, onInfo }: { label: string; value: string; onInfo?: () => void }) {
  return (
    <div className="flex w-full shrink-0 flex-col items-start">
      <div className="flex w-full items-center justify-end gap-3">
        <div className="flex shrink-0 items-center gap-1">
          <div className="relative size-[15px] shrink-0 overflow-clip">
            <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={sarRow} />
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip">
            <p className="font-en whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
              {value}
            </p>
          </div>
        </div>
        {onInfo ? (
          <div className="flex min-w-px flex-[1_0_0] items-center justify-end gap-0.5">
            <button type="button" onClick={onInfo} className="relative size-[13.306px] shrink-0 cursor-pointer overflow-clip">
              <div className="absolute inset-[12.5%]">
                <div className="absolute inset-[-5.56%]">
                  <img alt="" className="block size-full max-w-none" src={iconInfoSmall} />
                </div>
              </div>
            </button>
            <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
              {label}
            </p>
          </div>
        ) : (
          <div className="flex min-w-px flex-[1_0_0] flex-col items-end">
            <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
              {label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Small info card (Figma 27:11484 رسوم التحويل / 27:11489 ضريبة قيمة مضافة,
 * 375×169): white sheet with 10px top radius over a dimmed backdrop.
 */
function InfoSheet({ title, body, onClose }: { title: string; body: ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50">
      <style>{'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'}</style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center rounded-t-[10px] bg-surface pt-3"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
      >
        <div className="flex w-full shrink-0 flex-col items-end gap-1 px-4 py-2">
          <div className="flex w-full flex-col items-end">
            <div className="flex w-full items-center gap-2">
              <div className="flex min-w-px flex-[1_0_0] items-center justify-end gap-1.5">
                <p className="whitespace-nowrap text-right text-base font-medium leading-[1.5] text-ink" dir="auto">
                  {title}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[375px] shrink-0 flex-col items-end justify-center gap-[18px] px-4 py-5">
          <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            {body}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
          >
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
              تم
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
