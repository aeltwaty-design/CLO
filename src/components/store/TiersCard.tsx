import { useState } from 'react';
import emojiTierLow from '../../assets/figma/080c4083e4543452fb07d15565275044df9f7b4e.svg';
import emojiTierMid from '../../assets/figma/d11b139800133c7d0499e0b1759c17c2e3953749.svg';
import emojiTierTop from '../../assets/figma/a46ad780ca561487da54526ddda1e0c201794ccc.svg';
import emojiRowLow from '../../assets/figma/c257410ac970cbbc3d509f57fd4106e3306b5af8.svg';
import emojiRowMid from '../../assets/figma/a4f7ec8f9a3327e560a17bcc376d76336c8d11ab.svg';
import emojiRowTop from '../../assets/figma/d62d733202950660ca5ccd08970301dd6c8858ca.svg';
import chevronDoubleStroke from '../../assets/figma/f0a7d89f034347502883d1deb07e4bb180e33c08.svg';

/** chevron-double-down_mini (16px) inside the tiers pill; flipped via -scale-y-100 when expanded. */
function ChevronDoubleDownMini() {
  return (
    <div className="relative size-4 shrink-0 overflow-clip">
      <div
        className="absolute bottom-[20%] left-1/4 right-1/4 top-[20%] flex items-center justify-center"
        style={{ containerType: 'size' }}
      >
        <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
          <div className="relative size-full">
            <div className="absolute inset-[-3.13%_-2.6%_-3.12%_-2.6%]">
              <img alt="" className="block size-full max-w-none" src={chevronDoubleStroke} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Spend-tiers section «كل ما صرفت أكثر.. رجع لك أكثر» with the collapsed
 * (Figma 1:8525) ⇄ expanded (1:8748) states. Shared by the before- and
 * after-link cashback store screens (kept on the after screen by user
 * direction — the Figma after-frame drops it).
 */
export default function TiersCard() {
  const [tiersExpanded, setTiersExpanded] = useState(false);

  return (
    <div className="flex w-full shrink-0 flex-col items-end gap-3">
      <p className="w-full shrink-0 text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
        كل ما صرفت أكثر.. رجع لك أكثر
      </p>
      <div className="flex w-full shrink-0 flex-col items-center gap-4.5 overflow-clip rounded-[10px] bg-surface-neutral p-4">
        <div className="relative h-[78px] w-[311px] shrink-0 rounded-[3px]">
          <div className="absolute right-[0.33px] top-[calc(50%-10.5px)] h-[11px] w-[103.667px] -translate-y-1/2 rounded-r-sm bg-[#33d8a2]" />
          <div className="absolute left-[calc(50%+0.33px)] top-[calc(50%-10.5px)] h-[11px] w-[103.67px] -translate-x-1/2 -translate-y-1/2 border-l-2 border-r-2 border-solid border-white bg-offer-400" />
          <div className="absolute left-0 top-[calc(50%-10.5px)] h-[11px] w-[103.67px] -translate-y-1/2 rounded-l-sm bg-bravo-400" />
          <div className="absolute left-[250px] top-0 h-[18.631px] w-[18.51px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={emojiTierLow} />
          </div>
          <div className="absolute left-[145px] top-[-1.61px] flex h-[22.227px] w-[22.245px] items-center justify-center">
            <div className="flex-none rotate-[-10.79deg]">
              <div className="relative h-[19px] w-[19.023px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={emojiTierMid} />
              </div>
            </div>
          </div>
          <div className="absolute left-[38.67px] top-[-2.91px] flex h-[24.82px] w-[24.764px] items-center justify-center">
            <div className="flex-none rotate-[22.7deg]">
              <div className="relative h-[19px] w-[18.896px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={emojiTierTop} />
              </div>
            </div>
          </div>
          <p className="absolute right-[51.5px] top-[39px] translate-x-1/2 whitespace-nowrap text-center font-en text-xs font-semibold leading-[1.5] text-ink" dir="rtl">
            10%
          </p>
          <p className="absolute right-[53px] top-[57px] translate-x-1/2 whitespace-nowrap text-center font-en text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            500 - 999 ﷼
          </p>
          <p className="absolute right-[154.5px] top-[39px] translate-x-1/2 whitespace-nowrap text-center font-en text-xs font-semibold leading-[1.5] text-ink" dir="rtl">
            15%
          </p>
          <p className="absolute right-[155px] top-[57px] translate-x-1/2 whitespace-nowrap text-center font-en text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            1,000 - 2,999 ﷼
          </p>
          <p className="absolute right-[259.5px] top-[39px] translate-x-1/2 whitespace-nowrap text-center font-en text-xs font-semibold leading-[1.5] text-ink" dir="rtl">
            20%
          </p>
          <p className="absolute right-[259.5px] top-[57px] translate-x-1/2 whitespace-nowrap text-center font-en text-[0px] font-normal leading-[0] text-ink-tertiary" dir="auto">
            <span className="font-sans text-xs not-italic leading-[1.5]">+</span>
            <span className="text-xs leading-[1.5]">{' 3,000 ﷼'}</span>
          </p>
        </div>
        <button
          type="button"
          aria-expanded={tiersExpanded}
          aria-label="تفاصيل الشرائح"
          onClick={() => setTiersExpanded((v) => !v)}
          className={
            tiersExpanded
              ? 'flex w-full shrink-0 flex-col items-center justify-center gap-2 overflow-clip rounded-lg bg-surface p-2'
              : 'flex h-[27px] w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-lg bg-surface p-2'
          }
        >
          {tiersExpanded && (
            <div className="flex w-full shrink-0 flex-col items-end gap-3">
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="flex shrink-0 flex-col items-end">
                  <p className="whitespace-nowrap text-right text-[0px] font-normal leading-[0] text-ink-secondary" dir="auto">
                    <span className="text-xs leading-[1.5]">{'من '}</span>
                    <span className="font-en text-xs not-italic leading-[1.5]">{'500 لــ 999 '}</span>
                    <span className="text-xs leading-[1.5]">{'﷼ يرجع لك '}</span>
                    <span className="font-en text-xs font-semibold not-italic leading-[1.5]">10%</span>
                  </p>
                </div>
                <div className="relative size-[25px] shrink-0">
                  <div className="absolute inset-[0_0_0_-5.13%]">
                    <img alt="" className="block size-full max-w-none" src={emojiRowLow} />
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="flex shrink-0 flex-col items-end">
                  <p className="whitespace-nowrap text-right text-[0px] font-normal leading-[0] text-ink-secondary" dir="auto">
                    <span className="text-xs leading-[1.5]">{'من '}</span>
                    <span className="font-en text-xs not-italic leading-[1.5]">{'1,000 لــ 2,999 '}</span>
                    <span className="text-xs leading-[1.5]">{'﷼ يرجع لك '}</span>
                    <span className="font-en text-xs font-semibold not-italic leading-[1.5]">15%</span>
                  </p>
                </div>
                <div className="relative size-[25px] shrink-0">
                  <div className="absolute inset-[0_0_0_-5.13%]">
                    <img alt="" className="block size-full max-w-none" src={emojiRowMid} />
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="flex shrink-0 flex-col items-end">
                  <p className="whitespace-nowrap text-right text-[0px] font-normal leading-[0] text-ink-secondary" dir="auto">
                    <span className="text-xs leading-[1.5]">{'فوق '}</span>
                    <span className="font-en text-xs not-italic leading-[1.5]">3,000</span>
                    <span className="text-xs leading-[1.5]">{' ﷼ يرجع لك '}</span>
                    <span className="font-en text-xs font-semibold not-italic leading-[1.5]">20%</span>
                  </p>
                </div>
                <div className="relative size-[25px] shrink-0">
                  <div className="absolute inset-[0_0_0_-5.13%]">
                    <img alt="" className="block size-full max-w-none" src={emojiRowTop} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {tiersExpanded ? (
            <div className="relative flex shrink-0 items-center justify-center">
              <div className="flex-none -scale-y-100">
                <div className="relative flex items-center justify-center">
                  <ChevronDoubleDownMini />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex shrink-0 items-center justify-center">
              <ChevronDoubleDownMini />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
