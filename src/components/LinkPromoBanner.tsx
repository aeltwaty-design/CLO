import iconShop16 from '../assets/figma/8b46d8c8b043dd24e8af69e3f25d9d115f2171ee.svg';
import iconFlash16 from '../assets/figma/bf3d51654507f65ce1374cd093eb5832aaa8bc1f.svg';
import iconSecurity16 from '../assets/figma/6d6ef4e974b62e59ac6b41ef2c8589c78266e702.svg';
import iconArrowLeft16 from '../assets/figma/b48fe1cd7576b56f97cc1cf5e90b0ed15aaa67fb.svg';
import type { ReactNode } from 'react';
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
export function BankPlusIcon() {
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

/** «50%» art of the Temp Home banner (attached design, reverted to the
    banner's violet scheme per user direction): gradient
    numerals, a tilted «حتى» badge at their top right, gold coins bottom-left,
    sparkles over a soft mint blob. Inline so the numerals render in Poppins
    and every colour stays a theme token (gradient stops via CSS vars). */
function FiftyPercentArtTemp() {
  return (
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <linearGradient id="tp-fifty" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-viola-500)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-bravo-500)' }} />
        </linearGradient>
      </defs>

      {/* soft lilac blob */}
      <circle cx="66" cy="74" r="58" className="fill-viola-100" opacity="0.45" />
      <circle cx="66" cy="74" r="40" className="fill-viola-100" opacity="0.5" />

      {/* the claim — slight tilt, as attached */}
      <g transform="rotate(-8 66 78)">
        <text x="52" y="108" textAnchor="middle" fontSize="78" fontWeight="700" letterSpacing="-3" className="font-en" fill="url(#tp-fifty)">
          50
        </text>
        <text x="113" y="76" textAnchor="middle" fontSize="40" fontWeight="700" className="font-en" fill="url(#tp-fifty)">
          %
        </text>
      </g>

      {/* «حتى» badge, tilted over the top-right of the numerals */}
      <g transform="rotate(12 112 34)">
        <rect x="92" y="22" width="40" height="22" rx="11" className="fill-bravo-500" />
        <text x="112" y="37" textAnchor="middle" fontSize="12" fontWeight="500" className="fill-white">
          حتى
        </text>
      </g>

      {/* gold coins, bottom-left */}
      <g>
        <circle cx="24" cy="118" r="11" className="fill-gold-600" />
        <circle cx="24" cy="118" r="7" fill="none" strokeWidth="1.6" className="stroke-white" opacity="0.85" />
        <circle cx="42" cy="128" r="8" className="fill-gold-600" opacity="0.9" />
        <circle cx="42" cy="128" r="4.8" fill="none" strokeWidth="1.4" className="stroke-white" opacity="0.85" />
      </g>

      {/* sparkles */}
      <Sparkle x={16} y={26} scale={1.3} className="fill-brand-400" />
      <Sparkle x={132} y={110} scale={1} className="fill-gold-600" />
      <Sparkle x={10} y={78} scale={0.7} className="fill-viola-500" />
      <circle cx="126" cy="10" r="3" className="fill-viola-300" />
      <circle cx="6" cy="118" r="2.5" className="fill-brand-400" />
    </svg>
  );
}

/**
 * Temp-only Home promo (user-attached design, 2026-08-19, violet scheme
 * per follow-up direction): bravo card —
 * headline «كاش باك حتى 50% بدون قيود», three bullet rows with plain ink
 * glyphs, the green «50%» art on the left, and a full-width brand pill CTA
 * «ابدأ تستفيد» that starts the linking flow. The rows column and the art
 * are flex siblings, so the copy can never run under the art. Rendered by
 * LinkPromoBanner instead of the shared markup when IS_TEMP && home; the
 * wallet keeps the violet Temp banner and Phase 1/2 keep the shared card.
 */
/** Vuesax-linear card at 16px in the banner icons' duotone (ink outline,
    bravo-500 stripe + digits) — the 16px card asset is baked white-only, so
    the middle bullet draws its own to match the shop/flash duotones. */
function CardDuoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full" aria-hidden>
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path
          className="stroke-ink"
          d="M4.29333 2.33664H11.7C14.0733 2.33664 14.6667 2.92331 14.6667 5.26331V10.7366C14.6667 13.0766 14.0733 13.6633 11.7067 13.6633H4.29333C1.92667 13.67 1.33333 13.0833 1.33333 10.7433V5.26331C1.33333 2.92331 1.92667 2.33664 4.29333 2.33664Z"
        />
        <path className="stroke-bravo-500" d="M1.33333 5.66997H14.6667" />
        <path className="stroke-bravo-500" d="M4 11.0033H5.33333M7 11.0033H9.66667" />
      </g>
    </svg>
  );
}

function TempHomePromoBanner({ onLink }: { onLink: () => void }) {
  // the drawn duotone assets where they exist (ink + bravo strokes baked in)
  const rows: { text: string; icon: ReactNode }[] = [
    { text: 'كاش باك عند أكثر من 500 متجر', icon: <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShop16} /> },
    // plain hyphen: FF Shamel has no em-dash glyph (it renders as a blank)
    { text: 'ادفع ببطاقتك البنكية المعتادة عند المتاجر المشاركة - بدون أي خطوات أو إجراءات إضافية', icon: <CardDuoIcon /> },
    { text: 'وخذ كاش باك إضافي يرجع لمحفظة ولاء بلس لحظتها!', icon: <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconFlash16} /> },
  ];
  return (
    <div className="relative flex w-full shrink-0 flex-col items-end gap-4 overflow-clip rounded-2xl bg-bravo-50 p-4">
      <p className="w-full whitespace-nowrap text-right text-sm not-italic leading-[1.5]" dir="rtl">
        <span className="font-bold text-bravo-500">{'كاش باك حتى '}</span>
        <span className="font-en font-bold text-bravo-500">50%</span>
        <span className="font-bold text-bravo-500">{' بدون قيود'}</span>
      </p>
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <div className="pointer-events-none relative h-[130px] w-[124px] shrink-0">
          <FiftyPercentArtTemp />
        </div>
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-2.5">
          {rows.map(({ text, icon }) => (
            <div key={text} className="flex w-full shrink-0 items-start justify-end gap-2">
              <p className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
                {text}
              </p>
              <div className="relative mt-px size-4 shrink-0">{icon}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onLink}
        className="flex h-9 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-clip rounded-full bg-bravo-500 px-4"
      >
        <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
          ابدأ تستفيد
        </p>
        <svg viewBox="-8 -8 16 16" className="size-4 shrink-0" aria-hidden>
          <Sparkle x={0} y={0} scale={1.1} className="fill-white" />
        </svg>
      </button>
    </div>
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
  // Temp Home takes the green attached design wholesale; the shared markup
  // below keeps serving Phase 1/2 (both hosts) and the Temp wallet.
  if (IS_TEMP && !wallet) return <TempHomePromoBanner onLink={onLink} />;
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
                // #8 — wallet only; Temp Home returns the green banner above
                <>
                  {'حتى '}
                  <span className="font-en">[X]%</span>
                  {' عند أكثر من '}
                  <span className="font-en">500</span>
                  {' متجر'}
                </>
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
              {/* #11 */}
              {IS_TEMP ? 'كاش باك يوصلك لحظتها' : 'استرداد نقدي سريع'}
            </p>
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconFlash16} />
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip">
            <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              آمن ومشفّر
            </p>
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSecurity16} />
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
            {/* #12 */}
            {IS_TEMP ? 'خلها ترجع لك' : 'ابدأ'}
          </p>
        </button>
      </div>
    </div>
  );
}
