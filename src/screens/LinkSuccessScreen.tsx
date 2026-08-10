import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
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
import iconStar from '../assets/figma/ea9ee2885e4b168140d55cd31ec9eeb394c36f52.svg';
import iconCards from '../assets/figma/42372c28fe16ac8b86bcba01cf8135de843594b7.svg';
import iconCoin from '../assets/figma/49b2ad063a16e501dd1724af42efd55bad984f01.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';

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
            <div className="absolute left-[33.84px] top-[28.59px] size-[85.326px] overflow-clip">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={successBadge} />
              <div className="absolute inset-[27.34%_24.22%_27.54%_24.22%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={successCheck} />
              </div>
            </div>
            <div className="absolute left-[104.45px] top-[3.58px] size-[5.885px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotSolid} />
            </div>
            <div className="absolute left-[147.12px] top-[62.42px] size-[5.885px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotOutline} />
            </div>
            <div className="absolute left-[20.6px] top-[121.27px] size-[5.885px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotOutline} />
            </div>
            <div className="absolute left-0 top-[62.42px] size-[5.885px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotSolid} />
            </div>
            <div className="absolute left-[19.13px] top-[7.99px] size-[8.827px]">
              <div className="absolute inset-1/4">
                <div className="absolute inset-[-20%]">
                  <img alt="" className="block size-full max-w-none" src={sparkleX} />
                </div>
              </div>
            </div>
            <div className="absolute left-[114.75px] top-[118.33px] size-[8.827px]">
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

          {/* ✨ Feature list */}
          <div className="flex w-[343px] shrink-0 flex-col items-end gap-0.5 overflow-clip rounded-2xl border border-solid border-line">
            <FeatureRow icon={iconStar}>
              <p className="w-full text-right text-[0px] font-medium leading-none text-ink" dir="auto">
                <span className="text-[14px] leading-[1.5]">{'يرجع لك حتى '}</span>
                <span className="font-en text-[14px] font-semibold not-italic leading-[1.5]">[X]%</span>
                <span className="text-[14px] leading-[1.5]">.. بدون سقف</span>
              </p>
            </FeatureRow>
            <FeatureRow icon={iconCards} tall>
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                ما عليك شي جديد _ ادفع مثل عادتك، بالبطاقة أو من جوالك
              </p>
            </FeatureRow>
            <FeatureRow icon={iconCoin}>
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                فوق مكافآت بنكك
              </p>
            </FeatureRow>
            <FeatureRow icon={iconShieldTick}>
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                بياناتك في أمان
              </p>
            </FeatureRow>
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned dock; home indicator overlays the dock, adding no height
          (ref primary button rows measured at y704-744) */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-surface">
        <div className="flex w-full shrink-0 flex-col items-start gap-3 px-4 pb-3 pt-2.5">
          <button
            type="button"
            onClick={finish}
            className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
          >
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
              روح لمحفظتك
            </p>
          </button>
          <button
            type="button"
            onClick={finish}
            className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl border border-solid border-line bg-surface px-4 py-2.5"
          >
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              أضف بطاقة أخرى
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

/**
 * Bordered feature row, identical to the intro screen's list. The design
 * mirrors each row (rotate-180 + -scale-y-100 on row and again on content)
 * so the icon lands on the physical right.
 */
function FeatureRow({ icon, tall, children }: { icon: string; tall?: boolean; children: ReactNode }) {
  return (
    <div className="relative flex w-full shrink-0 items-center justify-center">
      <div className="w-full flex-none rotate-180 -scale-y-100">
        <div className={`flex w-full items-center justify-end gap-3 overflow-clip border-b border-solid border-line bg-white px-4 ${tall ? 'py-4' : 'py-3'}`}>
          <div className="relative flex shrink-0 items-center justify-center">
            <div className="flex-none rotate-180 -scale-y-100">
              <div className="relative flex flex-col items-center justify-center gap-2">
                <div className="relative flex shrink-0 items-center justify-center rounded-full bg-brand-50 p-2.5">
                  <div className="relative size-5 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-0.5">
            <div className="relative flex w-full shrink-0 items-center justify-center">
              <div className="w-full flex-none rotate-180 -scale-y-100">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
