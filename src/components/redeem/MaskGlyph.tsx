/**
 * Paints any glyph in one colour through its own alpha mask — the repo's
 * `WhiteMaskIcon`/`MaskIcon` trick, shared here because the derived redemption
 * flows mix icons whose baked colours disagree (a #111317 heart beside a
 * #00CE8B shield) and need them to read as one set.
 */
export default function MaskGlyph({
  src,
  size,
  className = 'bg-white',
}: {
  src: string;
  size: number;
  /** Tailwind background class — this is what the glyph is painted in */
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}
