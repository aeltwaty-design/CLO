import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MaskStatusBar, SuccessArt, FailureArt, STATUS_KEYFRAMES } from '../withdraw/WithdrawStatusScreen';

/**
 * Shared result screen for the derived redemption flows (شحن رصيد جوال and
 * تبرع فيها), picked by `?ok=`. Same art and layout as the withdrawal and gift
 * status screens; only the copy and the two dock destinations differ.
 *
 * As on the gift screen, the receipt line renders **only when live flow state
 * exists**, so a cold deep link still lands on the plain frame.
 */
export default function RedeemStatusScreen({
  successTitle,
  successBody,
  receipt,
  retryTo,
  continueTo,
  homeTo = '/market',
}: {
  successTitle: string;
  /** shown when there is no live state to summarise */
  successBody: string;
  receipt: ReactNode | null;
  /** «حاول مره ثانية» — back to this flow's PIN */
  retryTo: string;
  /** «كمل» on success */
  continueTo: string;
  homeTo?: string;
}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const failed = params.get('ok') === '0';

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <style>{STATUS_KEYFRAMES}</style>
      <div className="flex h-full w-full flex-col items-center overflow-y-auto">
        <MaskStatusBar />

        <div className="flex min-h-px w-[375px] flex-[1_0_0] flex-col items-center justify-center gap-2.5 rounded-t-[10px] p-5">
          {failed ? <FailureArt /> : <SuccessArt />}

          {/* Label */}
          <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2.5 py-5 text-center">
            <div className="relative flex w-[min-content] min-w-full shrink-0 flex-col justify-center text-lg font-bold not-italic leading-[0] text-ink">
              <p className="leading-[1.5]" dir="auto">
                {failed ? 'ما ضبطت' : successTitle}
              </p>
            </div>
            {/* op number on success only — the drawn failure states carry none */}
            {!failed && (
              <p className="w-[min-content] min-w-full shrink-0 text-[0px] font-medium leading-[0] text-ink" dir="auto">
                <span className="text-xs leading-[1.5]">رقم العملية: </span>
                <span className="font-en text-xs not-italic leading-[1.5] text-brand-400">25.05.203, 05:30</span>
              </p>
            )}
            {!failed && receipt ? (
              <p
                className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-tertiary"
                dir="rtl"
                data-testid="redeem-receipt"
              >
                {receipt}
              </p>
            ) : (
              <p className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                {failed ? 'جرب مره ثانية وتأكد من بياناتك واتصالك بالنت' : successBody}
              </p>
            )}
          </div>

          {/* ⛴️ Dock */}
          <div className={`flex w-[375px] shrink-0 flex-col items-start gap-3 px-4 ${failed ? 'py-2.5' : 'pb-4 pt-2.5'}`}>
            <button
              type="button"
              onClick={() => navigate(failed ? retryTo : continueTo)}
              className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                {failed ? 'حاول مره ثانية' : 'كمل'}
              </p>
            </button>
            <button
              type="button"
              onClick={() => navigate(failed ? continueTo : homeTo)}
              className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5"
            >
              <p
                className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
                  failed ? 'text-ink-danger' : 'text-ink'
                }`}
                dir="auto"
              >
                {failed ? 'خلها بعدين' : 'العودة للرئيسية'}
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
