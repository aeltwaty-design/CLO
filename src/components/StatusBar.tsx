import statusMask from '../assets/figma/1595bdb63adb4861835e71ccdca387378959b5c5.svg';

/**
 * iOS status bar as drawn in the designs (375×44), icons-only variant used by
 * the Market screens. The icon cluster (49.333×13.333 signal/wifi/battery) is
 * painted in text/Primary through its alpha mask; geometry measured off the
 * reference render: x 304, y 15.
 */
export default function StatusBar() {
  const mask: React.CSSProperties = {
    maskImage: `url("${statusMask}")`,
    WebkitMaskImage: `url("${statusMask}")`,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
  };
  return (
    <div className="relative h-11 w-full shrink-0">
      <div className="absolute left-[304px] top-[15px] h-[13.333px] w-[49.333px] bg-ink" style={mask} />
    </div>
  );
}
