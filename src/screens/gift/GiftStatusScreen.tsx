import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGift } from '../../state/GiftState';
import Riyal from '../../components/Riyal';
import {
  MaskStatusBar,
  SuccessArt,
  FailureArt,
  STATUS_KEYFRAMES,
} from '../withdraw/WithdrawStatusScreen';

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/**
 * Gift result — drawn success 3196:32860 «تم تحويل النقاط بنجاح» / failure
 * 3196:32879 «ما ضبطت» (both 375×812; نقاط → كاش باك per user direction),
 * picked by `?ok=`. Same art/layout as the withdrawal status screens.
 * Success: كمل → wallet; العودة للرئيسية → market (withdraw idiom).
 * Failure: حاول مره ثانية → the gift PIN; خلها بعدين → wallet.
 */
export default function GiftStatusScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const failed = params.get('ok') === '0';
  // receipt specifics render only when live flow state exists, so a cold
  // deep link still matches the plain drawn frame
  const { amount, recipient } = useGift();
  const showReceipt = !failed && amount > 0 && recipient !== null;

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
                {failed ? 'ما ضبطت' : 'تم تحويل الكاش باك بنجاح'}
              </p>
            </div>
            {/* the drawn transfer failure has no error-code line (unlike the
                withdrawal one) — the op number renders on success only */}
            {!failed && (
              <p className="w-[min-content] min-w-full shrink-0 text-[0px] font-medium leading-[0] text-ink" dir="auto">
                <span className="text-xs leading-[1.5]">رقم العملية: </span>
                <span className="font-en text-xs not-italic leading-[1.5] text-brand-400">25.05.203, 05:30</span>
              </p>
            )}
            {showReceipt ? (
              <p className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-tertiary" dir="rtl" data-testid="gift-receipt">
                {'وصلت '}
                <span className="font-en font-medium text-ink">{fmt(amount)}</span>
                {' '}
                <Riyal />
                {' لـ'}
                <span className="text-ink">{recipient.name}</span>
              </p>
            ) : (
              <p className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                {failed ? 'جرب مره ثانية وتأكد من بياناتك واتصالك بالنت' : 'سيصل الكاش باك قريبا إلى الجهة الأخرى'}
              </p>
            )}
          </div>

          {/* ⛴️ Dock */}
          <div className={`flex w-[375px] shrink-0 flex-col items-start gap-3 px-4 ${failed ? 'py-2.5' : 'pb-4 pt-2.5'}`}>
            <button
              type="button"
              onClick={() => navigate(failed ? '/gift/pin' : '/cards')}
              className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                {failed ? 'حاول مره ثانية' : 'كمل'}
              </p>
            </button>
            <button
              type="button"
              onClick={() => navigate(failed ? '/cards' : '/market')}
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
