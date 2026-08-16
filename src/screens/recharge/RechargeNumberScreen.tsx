import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppState';
import { useRecharge } from '../../state/RechargeState';
import {
  MY_NUMBER,
  groupMsisdn,
  isValidKsaMobile,
  normalizeMsisdn,
  telcoForNumber,
} from '../../data/telcos';
import Riyal from '../../components/Riyal';
import { IosStatusBar, BackArrow } from '../../components/redeem/FlowChrome';
import BrandMark from '../../components/redeem/BrandMark';
import MaskGlyph from '../../components/redeem/MaskGlyph';
import iconMobile from '../../assets/icons/mobile.svg';
import iconEdit from '../../assets/figma/2f32ae6cacf71bafc710b01e73dee5f65fab16be.png';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * لأي رقم؟ — the number step of «شحن رصيد جوال» (derived, no drawn frame).
 * Field language is the gift amount screen's: a glyph pinned left, the value
 * right-aligned and `dir="ltr"` so digits read naturally, grouped 055 123 4567
 * like the card-number field. The «رقمي» chip fills the demo user's own line.
 *
 * When the typed prefix belongs to a different operator than the one picked,
 * the screen says so — a hint, never a block, since ported numbers are real.
 */
export default function RechargeNumberScreen() {
  const navigate = useNavigate();
  const { cashback } = useAppState();
  const { telco, number, setNumber } = useRecharge();
  const [value, setValue] = useState(number);

  if (!telco) return <Navigate to="/recharge/operator" replace />;

  const valid = isValidKsaMobile(value);
  const issuer = telcoForNumber(value);
  const mismatch = valid && issuer !== null && issuer.id !== telco.id;

  const submit = () => {
    if (!valid) return;
    setNumber(normalizeMsisdn(value));
    navigate('/recharge/amount');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="flex h-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full flex-col items-center">
          <IosStatusBar />

          {/* 🧭 App bar — live cashback chip at the left, title + back at the right */}
          <div className="flex w-full shrink-0 items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            <div className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 py-1.5">
              <p className="shrink-0 text-[15px] font-normal leading-none text-brand-400">
                <Riyal />
              </p>
              <p className="font-en shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                {fmtSar(cashback)}
              </p>
            </div>
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                رقم الجوال
              </p>
              <BackArrow />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* المشغّل — mirrors the gift «المرسل إليه» card, edit glyph back to the picker */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  المشغّل
                </p>
              </div>
              <div className="flex w-full items-center justify-end gap-3 rounded-2xl border border-solid border-brand-400 bg-brand-50 px-4 py-3">
                <button
                  type="button"
                  onClick={() => navigate('/recharge/operator')}
                  aria-label="تغيير المشغّل"
                  className="relative size-4 shrink-0 cursor-pointer"
                >
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconEdit} />
                </button>
                <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1 text-right leading-[1.5]">
                  <p className="w-full text-xs font-medium text-ink" dir="auto">
                    {telco.name}
                  </p>
                  <p className="w-full text-xs font-normal text-ink-secondary" dir="rtl">
                    {'يبدأ بـ '}
                    <span className="font-en">{telco.prefixes.join(' · ')}</span>
                  </p>
                </div>
                <BrandMark mark={telco.mark} tint={telco.tint} />
              </div>
            </div>

            {/* Number card */}
            <div className="flex w-[343px] shrink-0 flex-col items-center rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-2.5">
                  <div className="flex w-full items-center justify-end">
                    <p className="h-6 w-[253px] text-right text-base font-normal leading-[1.5] text-ink" dir="auto">
                      لأي رقم تبي تشحن؟
                    </p>
                  </div>
                  <div
                    className={`flex w-full items-center justify-between rounded-lg border border-solid bg-white px-4 py-[17px] ${
                      valid ? 'border-brand-400' : 'border-[#ccd2e0]'
                    }`}
                  >
                    <MaskGlyph
                      src={iconMobile}
                      size={20}
                      className={valid ? 'bg-brand-400' : 'bg-ink-quadrant'}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      dir="ltr"
                      value={groupMsisdn(value)}
                      onChange={(e) => setValue(normalizeMsisdn(e.target.value))}
                      placeholder="05X XXX XXXX"
                      data-testid="recharge-number-input"
                      className="font-en min-w-px flex-[1_0_0] bg-transparent text-right text-base font-semibold leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                      aria-label="رقم الجوال"
                    />
                  </div>
                </div>

                {/* «رقمي» — the demo user's own line */}
                <div className="flex w-full items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setValue(MY_NUMBER)}
                    data-testid="recharge-my-number"
                    className="flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full border border-solid border-line px-3 py-2"
                  >
                    <p className="font-en whitespace-nowrap text-xs font-medium leading-[1.5] text-ink-tertiary" dir="ltr">
                      {groupMsisdn(MY_NUMBER)}
                    </p>
                    <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-brand-400" dir="auto">
                      رقمي
                    </p>
                  </button>
                </div>

                {/* ported-number hint — informative, never blocking */}
                {mismatch && (
                  <p
                    role="status"
                    className="w-full text-right text-xs font-normal leading-[1.5] text-ink-warning"
                    dir="rtl"
                    data-testid="recharge-mismatch"
                  >
                    {`هذا الرقم يتبع ${issuer.name} عادةً — كمّل لو كان منقول إلى ${telco.name}.`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ⛴️ CTA + home indicator */}
        <div className="flex w-full shrink-0 flex-col items-center">
          <button
            type="button"
            disabled={!valid}
            onClick={submit}
            data-testid="recharge-number-next"
            className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
              valid ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
            }`}
          >
            <p
              className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
                valid ? 'text-ink-inverse' : 'text-ink-quadrant'
              }`}
              dir="auto"
            >
              اللي بعده
            </p>
          </button>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
