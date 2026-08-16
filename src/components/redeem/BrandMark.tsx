/**
 * Monogram tile standing in for a logo. Neither the operators nor the
 * charities have any drawn art — nothing telecom- or charity-shaped was ever
 * exported — so this fills the slot `BankLogo` fills on the withdrawal
 * account picker: a tinted rounded square carrying a short wordmark.
 */
export default function BrandMark({
  mark,
  tint,
  size = 40,
}: {
  mark: string;
  /** Tailwind background class — token classes for charities, brand-approximation hexes for operators */
  tint: string;
  /** 64 is the recents-avatar circle, 40 the row tile, 24 the inline mark */
  size?: 24 | 40 | 64;
}) {
  const shape =
    size === 64 ? 'size-16 rounded-full' : size === 40 ? 'size-10 rounded-xl' : 'size-6 rounded-md';
  const type = size === 64 ? 'text-base' : size === 40 ? 'text-xs' : 'text-[9px]';
  // operator marks are Latin (stc/M/Z/V) and take Poppins; charity marks are
  // Arabic letters and stay on FF Shamel
  const latin = !/[؀-ۿ]/.test(mark);
  return (
    <div aria-hidden className={`flex shrink-0 items-center justify-center overflow-clip ${tint} ${shape}`}>
      <span
        className={`whitespace-nowrap font-medium leading-none text-ink-inverse ${latin ? 'font-en' : ''} ${type}`}
        dir="auto"
      >
        {mark}
      </span>
    </div>
  );
}
