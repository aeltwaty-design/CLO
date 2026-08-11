import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import statusBattery from '../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import statusBatteryCap from '../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import statusBatteryFill from '../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import statusWifi from '../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import statusSignal from '../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import statusTime from '../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import haloEllipse from '../assets/figma/c09c31ada49366a21824589df74ea770d84360e6.svg';
import successBadge from '../assets/figma/f067da9e098b138084cc7dd83b475763e3989efd.svg';
import successCheck from '../assets/figma/76ff88ec09fd38e320d676076a02557540cd182e.svg';
import dotSolid from '../assets/figma/7e65c380a64eaec19c1f1c52a80bb0eb63554bb5.svg';
import dotOutline from '../assets/figma/f03d734b6e7962a9e2eb50e6a4ac6fe82d6975cc.svg';
import sparkleX from '../assets/figma/5fb6b6aa9f0da4e3c65ce176dd4b57f6dda4d039.svg';
import iconCheckSmall from '../assets/figma/13630e13d14a434e57428d6290c8a96611dffb48.svg';
import visaMask from '../assets/figma/8c19cdc6c340655ee715e5c0e021047e5e537124.svg';
import visaLogo from '../assets/figma/7cde00b8a4c1cec2de1c941b422f78393310b2b5.svg';
import iconClock from '../assets/figma/48986a4e85102fcc197e2b20835710b0c837cafd.svg';

/**
 * تم! بطاقتك جاهزة — card linked successfully (Figma 1:10469 "success",
 * 375×812). Both dock actions mark the card as linked and land on the Market
 * so it flips to its after-link state. Dock + home indicator pinned as drawn
 * (155px block; the design keeps 16px between list and dock → pb-[171px]).
 */
export default function LinkSuccessScreen() {
  const navigate = useNavigate();
  const { setCardLinked } = useAppState();

  const finish = () => {
    setCardLinked(true);
    navigate('/market');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <style>{'@keyframes pop-in{0%{transform:scale(0);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}@keyframes check-in{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}@keyframes spark-in{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}'}</style>
      <div className="h-full overflow-y-auto pb-[134px]">
        {/* 📶 Status bar */}
        <div className="relative h-11 w-[375px] shrink-0 overflow-clip">
          <div className="absolute right-[17px] top-[17.33px] h-[11.333px] w-[22px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBattery} />
          </div>
          <div className="absolute right-[14.67px] top-[21px] h-1 w-[1.328px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBatteryCap} />
          </div>
          <div className="absolute right-[19px] top-[19.33px] h-[7.333px] w-[18px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBatteryFill} />
          </div>
          <div className="absolute right-[44.03px] top-[17.33px] h-[10.966px] w-[15.272px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusWifi} />
          </div>
          <div className="absolute right-[64.33px] top-[17.67px] h-[10.667px] w-[17px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusSignal} />
          </div>
          <div className="absolute left-[21px] top-3 h-[21px] w-[54px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusTime} />
          </div>
        </div>

        <div className="flex w-[375px] flex-col items-center justify-center gap-2.5 rounded-t-[10px] px-4">
          {/* 🎉 Success illustration */}
          <div className="relative h-[133.083px] w-[153px] shrink-0">
            <div className="absolute left-[20.6px] top-[15.35px] size-[111.807px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={haloEllipse} />
            </div>
            <div className="absolute left-[33.84px] top-[28.59px] size-[85.326px] overflow-clip" style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={successBadge} />
              <div className="absolute inset-[27.34%_24.22%_27.54%_24.22%]" style={{ animation: 'check-in 300ms ease-out 250ms both' }}>
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={successCheck} />
              </div>
            </div>
            <div className="absolute left-[104.45px] top-[3.58px] size-[5.885px]" style={{ animation: 'spark-in 400ms ease-out 350ms both' }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotSolid} />
            </div>
            <div className="absolute left-[147.12px] top-[62.42px] size-[5.885px]" style={{ animation: 'spark-in 400ms ease-out 420ms both' }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotOutline} />
            </div>
            <div className="absolute left-[20.6px] top-[121.27px] size-[5.885px]" style={{ animation: 'spark-in 400ms ease-out 490ms both' }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotOutline} />
            </div>
            <div className="absolute left-0 top-[62.42px] size-[5.885px]" style={{ animation: 'spark-in 400ms ease-out 560ms both' }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotSolid} />
            </div>
            <div className="absolute left-[19.13px] top-[7.99px] size-[8.827px]" style={{ animation: 'spark-in 400ms ease-out 630ms both' }}>
              <div className="absolute inset-1/4">
                <div className="absolute inset-[-20%]">
                  <img alt="" className="block size-full max-w-none" src={sparkleX} />
                </div>
              </div>
            </div>
            <div className="absolute left-[114.75px] top-[118.33px] size-[8.827px]" style={{ animation: 'spark-in 400ms ease-out 700ms both' }}>
              <div className="absolute inset-1/4">
                <div className="absolute inset-[-20%]">
                  <img alt="" className="block size-full max-w-none" src={sparkleX} />
                </div>
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2.5 py-5 text-center">
            <div className="relative flex w-[min-content] min-w-full shrink-0 flex-col justify-center text-lg font-bold not-italic text-ink">
              <p className="leading-[1.5]" dir="auto">
                تم! بطاقتك جاهزة
              </p>
            </div>
            <p className="w-[303px] shrink-0 text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto">
              من الحين.. ادفع مثل كل مرة، والكاش باك يرجع لك
            </p>
          </div>

          {/* 💳 Linked card */}
          <div className="flex w-full shrink-0 flex-col items-end gap-3 rounded-2xl border border-solid border-brand-400 bg-brand-50 p-4">
            <div className="flex w-full shrink-0 items-center justify-between rounded-2xl">
              <div className="flex shrink-0 items-start">
                <div className="flex shrink-0 items-center justify-center gap-1 rounded-2xl bg-brand-400 py-0.5 pl-2 pr-1.5">
                  <p className="shrink-0 whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
                    مفعلة
                  </p>
                  <div className="relative size-3 shrink-0 overflow-clip">
                    <div className="absolute inset-[18.75%_15.62%_18.75%_15.63%]">
                      <div className="absolute inset-[-3.33%_-3.03%]">
                        <img alt="" className="block size-full max-w-none" src={iconCheckSmall} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex min-w-px flex-[1_0_0] items-center gap-4">
                <div className="flex min-w-px flex-[1_0_0] flex-col items-start gap-1.5 text-right leading-[1.5]">
                  <p className="w-full text-base font-medium text-ink" dir="auto">
                    البطاقة الرئيسية
                  </p>
                  <p className="font-en w-full text-xs font-normal text-ink-secondary" dir="auto">
                    **** 1234
                  </p>
                </div>
                <div className="relative size-8 shrink-0 overflow-clip">
                  <div
                    className="absolute flex inset-[1.32%_-10.47%_1.38%_-10.47%] items-center justify-center"
                    style={{ containerType: 'size' }}
                  >
                    <div className="h-[100cqh] w-[100cqw] flex-none -rotate-180 -scale-x-100">
                      <div
                        className="relative size-full mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.351px_10.393px] mask-size-[32px_10.35px]"
                        style={{ maskImage: `url("${visaMask}")` }}
                      >
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={visaLogo} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ⏳ What happens next (replaces the repeated benefits list) */}
          <div className="flex w-[343px] shrink-0 items-center justify-end gap-2.5 rounded-2xl bg-brand-50 px-4 py-3">
            <p className="min-w-px flex-[1_0_0] text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              ادفع في أي متجر مشارك.. والكاش باك يوصلك لمحفظتك خلال <span className="font-en">15</span> يوم
            </p>
            <div className="flex shrink-0 items-center justify-center rounded-full bg-brand-400 p-2 shadow-xs">
              <div className="relative size-5 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconClock} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned dock; home indicator overlays the dock, adding no height
          (ref primary button rows measured at y704-744) */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-surface">
        <div className="flex w-full shrink-0 flex-col items-start gap-3 px-4 pb-3 pt-2.5">
          {/* primary CTA points at the money: the Market flips to its after-link
              state the moment we land (UX redesign; wallet is still one tap away) */}
          <button
            type="button"
            onClick={finish}
            className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
          >
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
              اكتشف المتاجر
            </p>
          </button>
          <button
            type="button"
            onClick={() => {
              setCardLinked(true);
              navigate('/cards');
            }}
            className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl border border-solid border-line bg-surface px-4 py-2.5"
          >
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              روح لمحفظتك
            </p>
          </button>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34px]">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}

