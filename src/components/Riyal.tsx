import { usePhase } from '../state/PhaseState';
import sarSymbol from '../assets/icons/sar-symbol.svg';

/** Currency mark. Phase 1 keeps the ﷼ character (FF Shamel renders it as the
    «ريال» word ligature, the QA'd baseline); Phase 2 swaps in the new Saudi
    Riyal symbol (Wikimedia File:Saudi_Riyal_Symbol.svg) as a
    currentColor-masked inline glyph, so every site inherits its surrounding
    text size and color untouched. */
export default function Riyal() {
  const phase = usePhase();
  if (phase === 1) return <>﷼</>;
  return (
    <span
      role="img"
      aria-label="ريال"
      className="inline-block bg-current"
      style={{
        width: '0.81em',
        height: '0.9em',
        verticalAlign: '-0.06em',
        maskImage: `url("${sarSymbol}")`,
        WebkitMaskImage: `url("${sarSymbol}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}
