import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useWithdraw,
  REGISTERED_ACCOUNT,
  WITHDRAW_BALANCE,
  WITHDRAW_FEE,
  WITHDRAW_VAT,
} from '../../state/WithdrawState';
import statusBarMask from '../../assets/figma/863c90e2bcf523e5186af44ac3700298ea5b0759.svg';
import Riyal from '../../components/Riyal';
import successHalo from '../../assets/figma/c86d0ccdbe4f6abff26435432e86ed008852d86b.svg';
import successBadge from '../../assets/figma/a70622922533649e4fca73589acc38f85c06d0cd.svg';
import successCheck from '../../assets/figma/f3e5d497d8cb9c79e2027f7fa9e62de66f4b9492.svg';
import dotSolid from '../../assets/figma/23db3aa5b65dc249ae1465707a1181acee96f7f0.svg';
import dotOutline from '../../assets/figma/2de1fa87d1f7931f7c8e5300fceb6ef5764c2996.svg';
import sparkleX from '../../assets/figma/1c855b47d463db4172d39caac7591a4366964c82.svg';
import errorBlob from '../../assets/figma/cc57845c5c19e1bfc901e04b4d3537110ab784c6.svg';
import errorArtBase from '../../assets/figma/0ec834c2169338f0d0f9788fd647ae8f0b24368b.svg';
import errorArtLines from '../../assets/figma/0eb2c7d292b6b2ea56ce7f3cac83e3ab2894091f.svg';
import errorArtMark from '../../assets/figma/fc70a4b56612114c9ed26104c675624cf4ced5fb.svg';
import iconExport from '../../assets/figma/a495e8b4f8c794ab58d35158625e671abac5391a.svg';
import iconBank from '../../assets/figma/b0f66261075012027d39e295d75abc4168569e6c.svg';

/** Amounts in Poppins digits, thousands-separated (house rule). */
const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/** Glyph painted in brand green through its alpha mask (ValidTick precedent). */
function MaskIcon({ src, size }: { src: string; size: number }) {
  return (
    <div
      aria-hidden
      className="bg-brand-400"
      style={{
        width: size,
        height: size,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}

/** 12:30 status bar drawn as one alpha-masked shape (Figma "Blur Evenly"). */
function MaskStatusBar() {
  const maskClasses =
    'absolute inset-0 bg-ink mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[16.448px_9.333px] mask-size-[324.886px_13.333px]';
  return (
    <div className="relative h-11 w-[375px] shrink-0">
      <div className={`${maskClasses} backdrop-blur-[125px]`} style={{ maskImage: `url("${statusBarMask}")` }} />
      <div className={maskClasses} style={{ maskImage: `url("${statusBarMask}")` }} />
    </div>
  );
}

function Sparkle({ left, top, delay }: { left: string; top: string; delay: number }) {
  return (
    <div
      className="absolute size-[11.365px]"
      style={{ left, top, animation: `spark-in 400ms ease-out ${delay}ms both` }}
    >
      <div className="absolute inset-1/4">
        <div className="absolute inset-[-20%]">
          <img alt="" className="block size-full max-w-none" src={sparkleX} />
        </div>
      </div>
    </div>
  );
}

/** Green badge + staggered sparks (27:11151), LinkSuccessScreen animation idiom. */
function SuccessArt() {
  return (
    <div className="flex shrink-0 flex-col items-start py-[33.5px]">
      <div className="relative h-[159.117px] w-[196.997px]">
        <div className="absolute left-[26.52px] top-[15.15px] size-[143.962px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={successHalo} />
        </div>
        <div
          className="absolute left-[43.57px] top-[32.2px] size-[109.865px] overflow-clip"
          style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
        >
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={successBadge} />
          <div className="absolute inset-[27.34%_24.22%_27.54%_24.22%]" style={{ animation: 'check-in 300ms ease-out 250ms both' }}>
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={successCheck} />
          </div>
        </div>
        <div className="absolute left-[134.49px] top-0 size-[7.577px]" style={{ animation: 'spark-in 400ms ease-out 350ms both' }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotSolid} />
        </div>
        <div className="absolute left-[189.42px] top-[75.77px] size-[7.577px]" style={{ animation: 'spark-in 400ms ease-out 420ms both' }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotOutline} />
        </div>
        <div className="absolute left-[26.52px] top-[151.54px] size-[7.577px]" style={{ animation: 'spark-in 400ms ease-out 490ms both' }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotOutline} />
        </div>
        <div className="absolute left-0 top-[75.77px] size-[7.577px]" style={{ animation: 'spark-in 400ms ease-out 560ms both' }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotSolid} />
        </div>
        <Sparkle left="24.63px" top="5.68px" delay={630} />
        <Sparkle left="147.75px" top="147.75px" delay={700} />
      </div>
    </div>
  );
}

/** Warning-triangle collage on its sparkle blob (27:11170 "Approve"). */
function FailureArt() {
  return (
    <div
      className="relative size-[250px] shrink-0 bg-surface"
      style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
    >
      <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] h-[184px] w-[210px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
        <div className="absolute inset-[-17.93%_-8.57%_-17.93%_-10.48%]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={errorBlob} />
        </div>
        <div className="absolute inset-[-0.06%_0.05%_-0.06%_0.17%]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={errorArtBase} />
        </div>
        <div className="absolute inset-[-0.06%_0.05%_-0.06%_0.17%]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={errorArtLines} />
        </div>
        <div className="absolute inset-[22.28%_23.67%_22.65%_22.22%]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={errorArtMark} />
        </div>
      </div>
    </div>
  );
}

/**
 * Withdrawal result — success 27:11148 «تم سحب المبلغ بنجاح» / failure
 * 27:11167 «ما ضبطت» (both 375×812), picked by query param: ok=0 → failure,
 * anything else → success. Success: كمل → wallet, العودة للرئيسية → market.
 * Failure: حاول مره ثانية → PIN again, خلها بعدين → wallet. The green
 * operation-number/error-code digits are verbatim from the design.
 */
export default function WithdrawStatusScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const failed = params.get('ok') === '0';
  // Success receipt (UX enhancement): specifics render only when live state
  // exists (amount > 0), so an unseeded visit still matches 27:11148 exactly.
  const { amount, account } = useWithdraw();
  const recipient = account ?? REGISTERED_ACCOUNT;
  const showReceipt = !failed && amount > 0;
  const remaining = Math.max(0, WITHDRAW_BALANCE - amount - WITHDRAW_FEE - WITHDRAW_VAT);

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <style>
        {
          '@keyframes pop-in{0%{transform:scale(0);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}@keyframes check-in{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}@keyframes spark-in{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@keyframes rise-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes dash-flow{to{background-position:-12px 0}}'
        }
      </style>
      <div className="flex h-full w-full flex-col items-center overflow-y-auto">
        <MaskStatusBar />

        <div className="flex min-h-px w-[375px] flex-[1_0_0] flex-col items-center justify-center gap-2.5 rounded-t-[10px] p-5">
          {failed ? <FailureArt /> : <SuccessArt />}

          {/* Label */}
          <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2.5 py-5 text-center">
            <div className="relative flex w-[min-content] min-w-full shrink-0 flex-col justify-center text-lg font-bold not-italic leading-[0] text-ink">
              <p className="leading-[1.5]" dir="auto">
                {failed ? 'ما ضبطت' : 'تم سحب المبلغ بنجاح'}
              </p>
            </div>
            <p className="w-[min-content] min-w-full shrink-0 text-[0px] font-medium leading-[0] text-ink" dir="auto">
              <span className="text-xs leading-[1.5]">{failed ? 'كود خطأ: ' : 'رقم العملية: '}</span>
              <span className="font-en text-xs not-italic leading-[1.5] text-brand-400">
                {failed ? '4000154' : '25.05.203, 05:30'}
              </span>
            </p>
            {showReceipt ? (
              <p className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-tertiary" dir="rtl" data-testid="receipt-line">
                {'تم سحب '}
                <span className="font-en font-medium text-ink">{fmt(amount)}</span>
                {' '}
                <Riyal />
                {' إلى حساب '}
                <span className="font-en text-ink" dir="ltr">
                  {recipient.masked}
                </span>
              </p>
            ) : (
              <p className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                {failed ? 'جرب مره ثانية وتأكد من بياناتك واتصالك بالنت' : 'سيصل المبلغ للحساب قريبا'}
              </p>
            )}
          </div>

          {showReceipt && (
            <>
              {/* ⏱️ Arrival mini-timeline — سحبت اليوم ← (خلال يوم عمل) ← حسابك البنكي */}
              <div
                className="flex w-full shrink-0 flex-col rounded-2xl border border-solid border-line bg-white px-4 pb-3 pt-4"
                style={{ animation: 'rise-in 300ms ease-out 450ms both' }}
                data-testid="arrival-timeline"
              >
                <div className="relative flex w-full flex-row-reverse items-start justify-between">
                  <div className="flex w-[86px] shrink-0 flex-col items-center gap-1.5">
                    <div className="flex size-9 items-center justify-center rounded-full bg-brand-50">
                      <MaskIcon src={iconExport} size={18} />
                    </div>
                    <p className="w-full text-center text-[10px] font-medium leading-[1.4] text-ink" dir="auto">
                      سحبت اليوم
                    </p>
                  </div>
                  <div className="relative mx-1 mt-[17px] h-0.5 min-w-px flex-1">
                    <div
                      className="absolute inset-0 rounded-full"
                      data-testid="timeline-connector"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(to left, #00ce8b 0 6px, transparent 6px 12px)',
                        animation: 'dash-flow 600ms linear infinite',
                      }}
                    />
                    <p
                      className="absolute left-1/2 top-[-13px] -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-400 px-2 py-0.5 text-[10px] font-medium leading-[1.4] text-ink-inverse"
                      dir="auto"
                    >
                      خلال يوم عمل
                    </p>
                  </div>
                  <div className="flex w-[86px] shrink-0 flex-col items-center gap-1.5">
                    <div className="flex size-9 items-center justify-center rounded-full bg-brand-50">
                      <MaskIcon src={iconBank} size={18} />
                    </div>
                    <p className="w-full text-center text-[10px] font-medium leading-[1.4] text-ink" dir="auto">
                      في حسابك البنكي
                    </p>
                  </div>
                </div>
              </div>
              <p
                className="shrink-0 text-xs font-normal leading-[1.5] text-ink-tertiary"
                style={{ animation: 'rise-in 300ms ease-out 600ms both' }}
                dir="rtl"
                data-testid="balance-after"
              >
                {'رصيدك بعد السحب: '}
                <span className="font-en font-medium text-ink">{fmt(remaining)}</span>
                {' '}
                <Riyal />
              </p>
            </>
          )}

          {/* ⛴️ Dock */}
          <div className={`flex w-[375px] shrink-0 flex-col items-start gap-3 px-4 ${failed ? 'py-2.5' : 'pb-4 pt-2.5'}`}>
            <button
              type="button"
              onClick={() => navigate(failed ? '/withdraw/pin' : '/cards')}
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
