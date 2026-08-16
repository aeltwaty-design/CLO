import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecharge } from '../../state/RechargeState';
import { RECENT_TOPUPS, TELCOS, groupMsisdn, telcoById } from '../../data/telcos';
import { IosStatusBar, FlowAppBar } from '../../components/redeem/FlowChrome';
import BrandMark from '../../components/redeem/BrandMark';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';

/**
 * اختر المشغّل — first step of «شحن رصيد جوال» (derived, no drawn frame:
 * built from the gift picker's radio-row language). Recents sit on top: a
 * previous top-up already implies its operator, so tapping one fills both and
 * skips straight to the amount. Otherwise pick an operator and continue to the
 * number screen.
 */
export default function RechargeOperatorScreen() {
  const navigate = useNavigate();
  const { telco, setTelco, setNumber } = useRecharge();
  const [selected, setSelected] = useState<string | null>(telco?.id ?? null);

  const picked = telcoById(selected);

  const submit = () => {
    if (!picked) return;
    setTelco(picked);
    navigate('/recharge/number');
  };

  const pickRecent = (number: string, telcoId: string) => {
    const t = telcoById(telcoId);
    if (!t) return;
    setTelco(t);
    setNumber(number);
    navigate('/recharge/amount');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto pb-[75px]">
        <div className="flex w-full flex-col items-center gap-6 px-4">
          <div className="-mx-4 flex w-[375px] flex-col items-start">
            <IosStatusBar />
            <FlowAppBar />
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="size-9 shrink-0" aria-hidden />
            <p className="whitespace-nowrap text-right text-lg font-bold leading-[1.5] text-ink" dir="auto">
              شحن رصيد جوال
            </p>
          </div>

          {/* recents — a past top-up carries its operator, so this is a shortcut
              past both the operator and the number step */}
          <div className="mb-6 flex w-full flex-col items-end gap-3">
            <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              اشحن لهم مره ثانية
            </p>
            <div className="flex w-full items-start justify-end gap-4">
              {[...RECENT_TOPUPS].reverse().map((r) => {
                const t = telcoById(r.telcoId);
                if (!t) return null;
                return (
                  <button
                    key={r.number}
                    type="button"
                    onClick={() => pickRecent(r.number, r.telcoId)}
                    data-testid={`recharge-recent-${r.number}`}
                    className="flex w-[88px] shrink-0 cursor-pointer flex-col items-center gap-1.5"
                  >
                    <BrandMark mark={t.mark} tint={t.tint} size={64} />
                    <p className="font-en whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="ltr">
                      {groupMsisdn(r.number)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🎹 Operator picker */}
          <div className="flex w-[343px] shrink-0 flex-col items-end gap-2">
            <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              اختر المشغّل
            </p>
            <div className="flex w-full shrink-0 flex-col items-start gap-1">
              {TELCOS.map((t) => {
                const isSelected = selected === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t.id)}
                    data-testid={`telco-${t.id}`}
                    className={`flex h-16 w-full shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-solid px-4 ${
                      isSelected ? 'border-brand-400 bg-brand-50' : 'border-line-subtle bg-surface'
                    }`}
                  >
                    {isSelected ? (
                      <div className="relative size-4 shrink-0 overflow-clip rounded-lg border border-solid border-brand-400 bg-brand-400">
                        <div className="absolute inset-[calc(31.25%-0.38px)]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
                        </div>
                      </div>
                    ) : (
                      <div className="relative size-4 shrink-0 rounded-lg border border-solid border-line bg-surface" />
                    )}
                    <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1 text-right leading-[1.5]">
                      <p className="w-full text-xs font-medium text-ink" dir="auto">
                        {t.name}
                      </p>
                      <p className="w-full text-xs font-normal text-ink-secondary" dir="rtl">
                        {'يبدأ بـ '}
                        <span className="font-en">{t.prefixes.join(' · ')}</span>
                      </p>
                    </div>
                    <BrandMark mark={t.mark} tint={t.tint} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned CTA + home indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-surface">
        <button
          type="button"
          disabled={!picked}
          onClick={submit}
          data-testid="recharge-operator-next"
          className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
            picked ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
          }`}
        >
          <p
            className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
              picked ? 'text-ink-inverse' : 'text-ink-quadrant'
            }`}
            dir="auto"
          >
            اللي بعده
          </p>
        </button>
        <div className="relative h-[34px] w-full shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
