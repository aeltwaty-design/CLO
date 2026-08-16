import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import batteryOutline from '../../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import batteryCap from '../../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import batteryFill from '../../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import iconWifi from '../../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import iconSignal from '../../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import imgTime from '../../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import iconArrowBack from '../../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';

/** iOS status bar as drawn (375×44): 9:41 at left, signal/wifi/battery at right. */
export function IosStatusBar() {
  return (
    <div className="relative h-11 w-[375px] shrink-0 overflow-clip">
      <div className="absolute right-[17px] top-[17.33px] h-[11.333px] w-[22px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryOutline} />
      </div>
      <div className="absolute right-[14.67px] top-[21px] h-1 w-[1.328px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryCap} />
      </div>
      <div className="absolute right-[19px] top-[19.33px] h-[7.333px] w-[18px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryFill} />
      </div>
      <div className="absolute right-[44.03px] top-[17.33px] h-[10.966px] w-[15.272px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconWifi} />
      </div>
      <div className="absolute right-[64.33px] top-[17.67px] h-[10.667px] w-[17px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSignal} />
      </div>
      <div className="absolute left-[21px] top-3 h-[21px] w-[54px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgTime} />
      </div>
    </div>
  );
}

/** 20px back arrow of the gift app bars (arrow-small-right_outline). */
export function BackArrow() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="رجوع"
      className="relative block size-5 shrink-0 cursor-pointer overflow-clip"
    >
      <div className="absolute inset-[17.71%_14.58%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowBack} />
      </div>
    </button>
  );
}

/** Pick-screen app bar (drawn 3196:33258: pt-8 pb-14, border-b subtle) —
    back arrow at the right, optional left slot, no inline title. */
export function GiftAppBar({ title, left }: { title?: string; left?: ReactNode }) {
  return (
    <div className="flex w-full shrink-0 items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-2">
      {left ?? <div className="size-5 shrink-0" aria-hidden />}
      <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
        {title && (
          <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
            {title}
          </p>
        )}
        <BackArrow />
      </div>
    </div>
  );
}
