import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import statusBattery from '../assets/figma/fe0d9d55a6dd314fe27654f69c4b348d0a47cf02.svg';
import statusBatteryCap from '../assets/figma/cc41ea038474f843d9c99eb2d5393ebf38a13330.svg';
import statusBatteryFill from '../assets/figma/802eea8f479965e6cddffec10cc25c6b616d29c9.svg';
import statusWifi from '../assets/figma/d3f0c5cbca17f7250eb46375314f4a9dce5b736d.svg';
import statusSignal from '../assets/figma/b00dcea0ce8342a8e64ac488a90c67d20b501f1b.svg';
import statusTime from '../assets/figma/c4dae27b2e1e06f9765192b0c8ff18e4ab965196.svg';
import iconClose from '../assets/figma/77832851b14d0014584c317e4f6da6aaba991b57.svg';
import heroCards from '../assets/figma/b4ee0f8753c19b40ccfa4d1d2ab5f3fd3d853273.svg';
import iconStar from '../assets/figma/ea9ee2885e4b168140d55cd31ec9eeb394c36f52.svg';
import iconCards from '../assets/figma/42372c28fe16ac8b86bcba01cf8135de843594b7.svg';
import iconCoin from '../assets/figma/49b2ad063a16e501dd1724af42efd55bad984f01.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';
import iconPlus from '../assets/figma/1782ca329908717a3751d66c5fff07ae32e411f5.svg';

/**
 * الكاش باك — cashback onboarding intro (Figma 1:10239 "onboarding", 375×1190).
 * Content scrolls inside the 812-tall frame; the CTA bar + home indicator are
 * pinned at the bottom as drawn (bar block is 117px tall, content clears it
 * with the design's 24px gap → pb-[141px]).
 */
export default function CashbackIntroScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto">
        {/* 📶 Status bar + nav */}
        <div className="flex w-full flex-col items-center gap-2">
          <div className="relative h-11 w-full shrink-0 overflow-clip">
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
          <div className="relative flex w-[343px] shrink-0 items-center justify-center gap-[7px]">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="إغلاق"
              className="absolute left-0 top-[calc(50%-1.59px)] size-6 -translate-y-1/2 overflow-clip"
            >
              <div className="absolute inset-1/4">
                <div className="absolute inset-[-8.33%]">
                  <img alt="" className="block size-full max-w-none" src={iconClose} />
                </div>
              </div>
            </button>
            <p className="shrink-0 whitespace-nowrap text-center text-sm font-medium leading-[1.5] text-ink" dir="auto">
              الكاش باك
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex w-[375px] flex-col items-center justify-center gap-6 bg-surface px-4 pb-[141px] pt-5">
          <div className="flex shrink-0 flex-col items-center gap-6">
            {/* 💳 Hero */}
            <div className="relative h-[315px] w-[343px] shrink-0 overflow-clip rounded-2xl bg-brand-50">
              <div className="absolute right-[21px] top-[29px] flex w-[301px] flex-col items-center text-center">
                <p className="w-full text-[0px] font-bold leading-none text-ink" dir="auto">
                  <span className="text-[20px] leading-[1.5]">{'كاش باك حتى '}</span>
                  <span className="font-en text-[20px] font-bold not-italic leading-[1.5]">[X]%</span>
                  <span className="text-[20px] leading-[1.5]">{' مع كل عملية مؤهلة'}</span>
                </p>
                <p className="w-full text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                  مرة وحدة تضيف بطاقتك الائتمانية.. وبعدها ادفع وبس. الكاش باك يجيك على مشترياتك المؤهلة من المتاجر المشاركة.
                </p>
              </div>
              <div className="absolute bottom-[-20.3px] left-[calc(50%+0.94px)] h-[178.296px] w-[277.35px] -translate-x-1/2">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={heroCards} />
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

            {/* 🔢 كيف؟ — how it works */}
            <div className="flex w-[343px] shrink-0 flex-col items-end gap-0.5 overflow-clip rounded-2xl border border-solid border-line">
              <div className="relative flex w-full shrink-0 items-center justify-center">
                <div className="w-full flex-none rotate-180 -scale-y-100">
                  <div className="flex w-full items-center justify-end gap-3 overflow-clip border-b border-solid border-line bg-brand-50 px-4 py-4">
                    <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-0.5">
                      <div className="relative flex w-full shrink-0 items-center justify-center">
                        <div className="w-full flex-none rotate-180 -scale-y-100">
                          <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                            كيف؟
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <StepRow n="1" title="ضفها مرة وحدة" subtitle="إضافة آمنة لبطاقتك" />
              <StepRow n="2" title="ادفع مثل كل مرة" subtitle="بالبطاقة أو من جوالك (أبل باي، سامسونج باي، جوجل باي) عند أي متجر مشارك" />
              <StepRow n="3" title="خذ الكاش باك في محفظة ولاء بلس" />
            </div>
          </div>

          {/* Terms */}
          <p className="shrink-0 whitespace-nowrap text-center text-[0px] font-normal leading-none text-ink" dir="auto">
            <span className="text-[12px] leading-[1.5]">{'تطبق '}</span>
            <span className="text-[12px] font-medium not-italic leading-[1.5] underline decoration-solid decoration-from-font [text-decoration-skip-ink:none] [text-underline-position:from-font]">
              الشروط والأحكام
            </span>
          </p>
        </div>
      </div>

      {/* ⛴️ Pinned CTA bar + home indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center overflow-clip border-t border-solid border-line-subtle bg-white pt-3">
        <div className="flex w-[343px] shrink-0 flex-col items-center gap-3">
          <p className="shrink-0 whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
            ضفها مرة وحدة.. وبعدها ادفع وبس
          </p>
          <button
            type="button"
            onClick={() => navigate('/cashback/add-card')}
            className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
          >
            {/* plus sits physically left of the label, as in the reference render */}
            <div className="relative size-5 shrink-0 overflow-clip">
              <div className="absolute inset-[20%]">
                <div className="absolute inset-[-2.08%]">
                  <img alt="" className="block size-full max-w-none" src={iconPlus} />
                </div>
              </div>
            </div>
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
              أضف بطاقتك الأولى
            </p>
          </button>
        </div>
        <div className="relative h-[34px] w-full shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}

/**
 * Bordered feature row. The design mirrors each row (rotate-180 + -scale-y-100
 * on row and again on content) so the icon lands on the physical right.
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

/** Numbered "كيف؟" step row with a brand-400 badge (Poppins bold digit). */
function StepRow({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div className="relative flex w-full shrink-0 items-center justify-center">
      <div className="w-full flex-none rotate-180 -scale-y-100">
        <div className="flex w-full items-center justify-end gap-3 overflow-clip border-b border-solid border-line bg-white px-4 py-4">
          <div className="relative flex shrink-0 items-center justify-center">
            <div className="flex-none rotate-180 -scale-y-100">
              <div className="relative flex size-6 items-center justify-center rounded-full bg-brand-400">
                <p className="font-en shrink-0 whitespace-nowrap text-center text-sm font-bold leading-[1.5] text-ink-inverse">{n}</p>
              </div>
            </div>
          </div>
          <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-0.5">
            <div className="relative flex w-full shrink-0 items-center justify-center">
              <div className="w-full flex-none rotate-180 -scale-y-100">
                <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  {title}
                </p>
              </div>
            </div>
            {subtitle !== undefined && (
              <div className="relative flex w-full shrink-0 items-center justify-center">
                <div className="w-full flex-none rotate-180 -scale-y-100">
                  <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
                    {subtitle}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
