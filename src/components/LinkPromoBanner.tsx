import iconShop16 from '../assets/figma/8b46d8c8b043dd24e8af69e3f25d9d115f2171ee.svg';
import iconFlash16 from '../assets/figma/bf3d51654507f65ce1374cd093eb5832aaa8bc1f.svg';
import iconSecurity16 from '../assets/figma/6d6ef4e974b62e59ac6b41ef2c8589c78266e702.svg';
import iconArrowLeft16 from '../assets/figma/b48fe1cd7576b56f97cc1cf5e90b0ed15aaa67fb.svg';
import { IS_TEMP } from '../state/PhaseState';

/** Four-point twinkle, drawn around the origin so it can be placed by transform. */
function Sparkle({ x, y, scale, className }: { x: number; y: number; scale: number; className: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${scale})`}
      d="M0-6C.6-2.2 2.2-.6 6 0 2.2.6.6 2.2 0 6-.6 2.2-2.2.6-6 0-2.2-.6-.6-2.2 0-6Z"
      className={className}
    />
  );
}

/**
 * «50%» promo art (derived, no drawn frame) — replaces the drawn green wallet
 * card so the illustration carries the same claim as the headline instead of
 * repeating the card already pictured elsewhere on the screen. Inline SVG
 * rather than an exported asset, so the numerals render in the app's own
 * Poppins and every colour stays a theme token via Tailwind's fill/stroke
 * utilities; the tilted card behind keeps a nod to the art it replaces.
 */
function FiftyPercentArt({ clear = false }: { clear?: boolean }) {
  // Temp (`clear`): the reviewer's first bullet is longer («… عند أكثر من 500
  // متجر» starts ~135px in), so the «%», its sparkle and the orbit's right
  // arc are pulled left/down out of that band — nothing paints past x≈130
  // where the copy runs. Phase 2 keeps the drawn composition byte-for-byte.
  const halo = clear ? 74 : 77;
  const orbit = clear ? { cx: 70, r: 69 } : { cx: 77, r: 76 };
  const pct = clear ? { x: 131, y: 88 } : { x: 130, y: 76 };
  const twinkle = clear ? { x: 120, y: 22 } : { x: 140, y: 34 };
  return (
    <svg
      viewBox="0 0 160 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      {/* soft halo + dashed orbit */}
      <circle cx={halo} cy="81" r="66" className="fill-viola-100" opacity="0.5" />
      <circle cx={halo} cy="81" r="47" className="fill-viola-100" opacity="0.55" />
      <circle
        cx={orbit.cx}
        cy="81"
        r={orbit.r}
        fill="none"
        strokeWidth="2"
        strokeDasharray="4 10"
        className="stroke-viola-300"
        opacity="0.75"
      />

      {/* tilted card behind — a nod to the drawn art this replaces */}
      <g transform="rotate(-14 77 81)">
        <rect x="22" y="48" width="110" height="68" rx="13" className="fill-bravo-500" opacity="0.17" />
        <rect x="22" y="68" width="110" height="9" className="fill-bravo-500" opacity="0.22" />
        <rect x="104" y="90" width="24" height="10" rx="3" className="fill-gold-600" opacity="0.55" />
      </g>

      {/* the claim */}
      <text
        x="58"
        y="118"
        textAnchor="middle"
        fontSize="92"
        fontWeight="700"
        letterSpacing="-4"
        className="font-en fill-bravo-500"
      >
        50
      </text>
      <text x={pct.x} y={pct.y} textAnchor="middle" fontSize="46" fontWeight="700" className="font-en fill-brand-400">
        %
      </text>

      {/* artistic touches */}
      <Sparkle x={20} y={30} scale={1.5} className="fill-brand-400" />
      <Sparkle x={140} y={126} scale={1.2} className="fill-gold-600" />
      <Sparkle x={twinkle.x} y={twinkle.y} scale={0.9} className="fill-viola-500" />
      <Sparkle x={16} y={132} scale={0.8} className="fill-brand-400" />
      <circle cx="44" cy="150" r="4" className="fill-viola-300" />
      <circle cx="150" cy="108" r="3.5" className="fill-brand-400" />
      <circle cx="6" cy="72" r="3" className="fill-gold-600" />
      <circle cx="100" cy="10" r="3.5" className="fill-viola-300" />
    </svg>
  );
}

/**
 * Vuesax-linear «bank» redrawn at 16px in the banner icons' duotone (ink
 * body, bravo-500 details) with a «+» emblem on the roof — the Temp copy's
 * second Home bullet reads «زيادة على مكافآت بنكك», which the flash glyph no
 * longer fits (that glyph moves down to «كاش باك يوصلك لحظتها»). Inline, like
 * the art above, so both colours stay theme tokens.
 */
function BankPlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full" aria-hidden>
      <g strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path
          className="stroke-ink"
          d="M8.25 1.43l6 2.4c.23.09.42.37.42.62v2.22c0 .37-.3.66-.67.66H2c-.37 0-.67-.3-.67-.66V4.45c0-.25.19-.53.42-.62l6-2.4c.13-.05.36-.05.5 0Z"
        />
        <path className="stroke-ink" d="M14.67 14.67H1.33v-2c0-.37.3-.67.67-.67h12c.37 0 .67.3.67.67v2Z" />
        <path className="stroke-bravo-500" d="M2.67 12V7.33M5.33 12V7.33M8 12V7.33M10.67 12V7.33M13.33 12V7.33" />
        <path className="stroke-bravo-500" d="M8 3v2.4M6.8 4.2h2.4" />
      </g>
    </svg>
  );
}

/**
 * BEFORE linking — the shared card promo (drawn 54:10300 in the Points
 * Wallet). One component in **both** Phase-2 before-link slots — the Points
 * Wallet and Home — so the two can never drift; Home previously carried a
 * smaller promo of its own with the same claim in different words.
 *
 * Headline reads «كاش باك حتى 50% بدون حد» per user direction, replacing the
 * drawn «اربط بطاقتك، واربح نقاطًا مع كل عملية شراء», and the CTA reads «ابدأ»
 * rather than the drawn «اربطها الأن» — the same claim the market banner and
 * the linking intro sheet make.
 */
export default function LinkPromoBanner({
  onLink,
  variant = 'home',
}: {
  onLink: () => void;
  /** Temp copy differs per host — the reviewer wrote separate lines for the
      Home promo (#1–3, #9) and the Points-Wallet banner (#7, #8, #11, #12).
      Phase 1/2 ignore this and render the shared copy. */
  variant?: 'home' | 'wallet';
}) {
  const wallet = variant === 'wallet';
  return (
    <div className="relative flex w-full shrink-0 flex-col items-end gap-4 overflow-clip rounded-2xl bg-bravo-50 p-4">
      {/* art first, so it paints behind the copy and the CTA */}
      <div className="pointer-events-none absolute left-0 top-[30px] h-[164px] w-[160px]">
        <FiftyPercentArt clear={IS_TEMP} />
      </div>
      <div className="flex w-full shrink-0 flex-col items-end gap-5">
        <div className="flex w-full shrink-0 flex-col items-end">
          <div className="flex shrink-0 items-center">
            {IS_TEMP && wallet ? (
              // #7 — the wallet headline
              <p className="whitespace-nowrap text-right text-sm font-bold not-italic leading-[1.5] text-bravo-500" dir="auto">
                خل مشترياتك ترجع لك كاش باك
              </p>
            ) : (
              <p className="whitespace-nowrap text-right text-sm not-italic leading-[1.5]" dir="rtl">
                <span className="font-bold text-bravo-500">كاش باك</span>
                <span className="font-medium text-ink">{' حتى '}</span>
                <span className="font-en font-bold text-bravo-500">50%</span>
                <span className="font-medium text-ink">{' بدون حد'}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip">
            <p className="h-[18px] whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
              {IS_TEMP ? (
                wallet ? (
                  // #8
                  <>
                    {'حتى '}
                    <span className="font-en">[X]%</span>
                    {' عند أكثر من '}
                    <span className="font-en">500</span>
                    {' متجر'}
                  </>
                ) : (
                  // #1
                  <>
                    {'كاش باك عند أكثر من '}
                    <span className="font-en">500</span>
                    {' متجر'}
                  </>
                )
              ) : (
                <>
                  {'اربح من أكثر من '}
                  <span className="font-en">500</span>
                  {' متجر'}
                </>
              )}
            </p>
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShop16} />
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip">
            <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              {/* #11 / #2 */}
              {IS_TEMP ? (wallet ? 'كاش باك يوصلك لحظتها' : 'زيادة على مكافآت بنكك') : 'استرداد نقدي سريع'}
            </p>
            <div className="relative size-4 shrink-0">
              {IS_TEMP && !wallet ? (
                <BankPlusIcon />
              ) : (
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconFlash16} />
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip">
            <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              {/* #3 */}
              {IS_TEMP && !wallet ? 'كاش باك يوصلك لحظتها' : 'آمن ومشفّر'}
            </p>
            <div className="relative size-4 shrink-0">
              <img
                alt=""
                className="absolute inset-0 block size-full max-w-none"
                src={IS_TEMP && !wallet ? iconFlash16 : iconSecurity16}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onLink}
          className="flex h-[30px] w-[160px] shrink-0 items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-surface px-2 py-1.5"
        >
          <div className="relative size-4 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowLeft16} />
          </div>
          <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
            {/* #12 / #9 */}
            {IS_TEMP ? (wallet ? 'خلها ترجع لك' : 'شوف الكاش باك') : 'ابدأ'}
          </p>
        </button>
      </div>
    </div>
  );
}
