import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppState';
import { useDonate } from '../../state/DonateState';
import { DONATE_CHIPS } from '../../data/charities';
import Riyal from '../../components/Riyal';
import { IosStatusBar, BackArrow } from '../../components/redeem/FlowChrome';
import AmountCard from '../../components/redeem/AmountCard';
import BrandMark from '../../components/redeem/BrandMark';
import MaskGlyph from '../../components/redeem/MaskGlyph';
import iconEdit from '../../assets/figma/2f32ae6cacf71bafc710b01e73dee5f65fab16be.png';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * كم تبي تتبرع؟ — the amount step of «تبرع فيها» (derived, no drawn frame:
 * the gift amount screen's layout, sharing `AmountCard`). Cashback only, so
 * the CTA dies at zero or above balance and chips above balance go inert.
 */
export default function DonateAmountScreen() {
  const navigate = useNavigate();
  const { cashback } = useAppState();
  const { cause, charity, amount, setAmount } = useDonate();
  const [value, setValue] = useState(amount > 0 ? String(amount) : '');

  if (!cause || !charity) return <Navigate to="/donate/cause" replace />;

  const parsed = Number(value.replace(/[^\d.]/g, '')) || 0;
  const valid = parsed > 0 && parsed <= cashback;

  const submit = () => {
    if (!valid) return;
    setAmount(parsed);
    navigate('/donate/pin');
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
                تبرع
              </p>
              <BackArrow />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* Promo strip — carries the picked cause */}
            <div className="flex h-[88px] w-[343px] shrink-0 items-center justify-end gap-4 overflow-clip rounded-2xl bg-brand-50 px-3 py-4">
              <div className="flex h-full w-[259px] shrink-0 flex-col items-end gap-0.5 text-right leading-[1.5]">
                <p className="w-full text-base font-medium text-ink" dir="auto">
                  {cause.label}
                </p>
                <p className="w-full text-xs font-normal text-ink-secondary" dir="auto">
                  كل ريال من الكاش باك يوصل كامل للجهة، بدون رسوم
                </p>
              </div>
              <div className="relative flex size-10 shrink-0 items-center justify-center overflow-visible rounded-full bg-brand-400 shadow-[0px_2px_8px_2px_rgba(0,206,139,0.2),inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.5),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.5),inset_0px_0px_8px_0px_rgba(160,160,160,0.5)]">
                <MaskGlyph src={cause.icon} size={24} />
              </div>
            </div>

            <AmountCard
              label="كم تبي تتبرع؟"
              value={value}
              onChange={setValue}
              chipRows={DONATE_CHIPS}
              balance={cashback}
            />

            {/* الجهة */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  الجهة
                </p>
              </div>
              <div className="flex w-full items-center justify-end gap-3 rounded-2xl border border-solid border-brand-400 bg-brand-50 px-4 py-3">
                <button
                  type="button"
                  onClick={() => navigate('/donate/charity')}
                  aria-label="تغيير الجهة"
                  className="relative size-4 shrink-0 cursor-pointer"
                >
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconEdit} />
                </button>
                <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1 text-right leading-[1.5]">
                  <p className="w-full text-xs font-medium text-ink" dir="auto">
                    {charity.name}
                  </p>
                  <p className="w-full text-xs font-normal text-ink-secondary" dir="auto">
                    {charity.blurb}
                  </p>
                </div>
                <BrandMark mark={charity.mark} tint={charity.tint} />
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
            data-testid="donate-amount-next"
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
              تبرع الآن
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
