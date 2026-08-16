import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDonate } from '../../state/DonateState';
import { charitiesFor, charityById } from '../../data/charities';
import { IosStatusBar, FlowAppBar } from '../../components/redeem/FlowChrome';
import BrandMark from '../../components/redeem/BrandMark';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import iconSearch from '../../assets/figma/7e784d450e713f5e771409c8ebed7f9f7b1ad69f.svg';

/**
 * اختر الجهة — second step of «تبرع فيها» (derived, no drawn frame): the gift
 * picker's radio list, filtered to the chosen cause. The organisations are
 * placeholder demo entities — see `src/data/charities.ts`.
 */
export default function DonateCharityScreen() {
  const navigate = useNavigate();
  const { cause, charity, setCharity } = useDonate();
  const [selected, setSelected] = useState<string | null>(charity?.id ?? null);

  if (!cause) return <Navigate to="/donate/cause" replace />;

  const list = charitiesFor(cause.id);
  const picked = charityById(selected);

  const submit = () => {
    if (!picked) return;
    setCharity(picked);
    navigate('/donate/amount');
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
              {cause.label}
            </p>
          </div>

          {/* 🎹 List picker */}
          <div className="flex w-[343px] shrink-0 flex-col items-end gap-2">
            <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              اختر الجهة
            </p>
            <div className="flex w-full shrink-0 flex-col items-end gap-1.5">
              <div className="flex w-full items-center justify-end overflow-clip rounded-full border border-solid border-line bg-surface px-3 py-2.5">
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
                  <input
                    type="text"
                    dir="auto"
                    placeholder="ابحث عن جهة معينة .."
                    className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                  />
                  <div className="relative size-[18px] shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col items-start gap-1">
              {list.map((c) => {
                const isSelected = selected === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelected(c.id)}
                    data-testid={`charity-${c.id}`}
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
                        {c.name}
                      </p>
                      <p className="w-full text-xs font-normal text-ink-secondary" dir="auto">
                        {c.blurb}
                      </p>
                    </div>
                    <BrandMark mark={c.mark} tint={c.tint} />
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
          data-testid="donate-charity-next"
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
