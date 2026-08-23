import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { usePhase, IS_TEMP } from '../state/PhaseState';
import iconClose from '../assets/figma/77832851b14d0014584c317e4f6da6aaba991b57.svg';
import heroCards from '../assets/figma/b4ee0f8753c19b40ccfa4d1d2ab5f3fd3d853273.svg';
import iconCoin from '../assets/figma/49b2ad063a16e501dd1724af42efd55bad984f01.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';
import iconPlus from '../assets/figma/1782ca329908717a3751d66c5fff07ae32e411f5.svg';
import iconInfoSmall from '../assets/figma/60e86b53328378fe6e2eaac39925383a1427b8b4.svg';
import sarSymbol from '../assets/icons/sar-symbol.svg';
import MaskGlyph from './redeem/MaskGlyph';

/** Entry-point gate: in Phase 2, EVERY «add card» tap opens the intro sheet
    over the screen it was tapped on for as long as no card has been added
    yet; once the first card is linked — and in all of Phase 1 — taps go
    straight to the form. Consumers wire their CTA to `startLinking` and
    render `<LinkIntroSheet open={introOpen} onClose={closeIntro} />` at the
    screen root (the sheet's default CTA then navigates to the form). */
export function useLinkIntroGate() {
  const navigate = useNavigate();
  const phase = usePhase();
  const { cardLinked, introSuppressed } = useAppState();
  const [introOpen, setIntroOpen] = useState(false);
  const startLinking = () => {
    if (phase >= 2 && !cardLinked && !introSuppressed) {
      setIntroOpen(true);
      return;
    }
    navigate('/cashback/add-card');
  };
  return { introOpen, startLinking, closeIntro: () => setIntroOpen(false) };
}

const STEPS = [
  { title: 'ضفها مرة وحدة', desc: 'إضافة آمنة لبطاقتك' },
  { title: 'ادفع مثل كل مرة', desc: 'بالبطاقة أو من جوالك (أبل باي، سامسونج باي، جوجل باي) عند أي متجر مشارك' },
  { title: 'خذ الكاش باك في محفظة ولاء بلس', desc: 'يوصلك خلال وقت قصير جدا' },
];

type TipId = 'safe' | 'rewards';

/** Trust chip with an ⓘ explainer (user direction — the drawn chips are
    label + glyph only). The ⓘ sits at the reading end of the label
    (physically leftmost), reusing the withdrawal summary's drawn info glyph;
    hover, focus, or tap opens an ink tooltip bubble anchored above the chip
    — a bubble, not the withdrawal's InfoSheet, since this sheet is already
    an overlay and stacking a second one for one sentence is too heavy. */
function TrustChip({
  id,
  label,
  icon,
  tipText,
  align,
  openTip,
  setTip,
}: {
  id: TipId;
  label: string;
  icon: string;
  tipText: string;
  /** which chip edge the bubble hugs, so it never leaves the 375px frame */
  align: 'left' | 'right';
  openTip: TipId | null;
  setTip: (t: TipId | null) => void;
}) {
  const open = openTip === id;
  return (
    <div className="relative flex shrink-0 items-center gap-1.5 rounded-full bg-brand-50 py-1.5 pl-2.5 pr-2.5">
      {open && (
        <div
          role="tooltip"
          data-testid={`chip-tip-${id}`}
          className={`absolute bottom-[calc(100%+8px)] z-10 w-[230px] rounded-xl bg-ink px-3 py-2.5 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{ animation: 'tip-in 150ms ease-out both' }}
        >
          <p className="text-right text-xs font-normal leading-[1.5] text-ink-inverse" dir="rtl">
            {tipText}
          </p>
          <div
            aria-hidden
            className={`absolute top-full size-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-ink ${
              align === 'right' ? 'right-4' : 'left-4'
            }`}
          />
        </div>
      )}
      <button
        type="button"
        aria-label={`المزيد عن ${label}`}
        aria-expanded={open}
        data-testid={`chip-info-${id}`}
        onMouseEnter={() => setTip(id)}
        onMouseLeave={() => setTip(null)}
        onFocus={() => setTip(id)}
        onBlur={() => setTip(null)}
        // touch has no hover, so a tap toggles; mouse clicks stay hover-only
        // (a click handler would fight the mouseenter that precedes it)
        onPointerDown={(e) => {
          if (e.pointerType === 'touch') setTip(open ? null : id);
        }}
        className="relative size-[13.306px] shrink-0 cursor-pointer overflow-clip"
      >
        <div className="absolute inset-[12.5%]">
          <div className="absolute inset-[-5.56%]">
            <img alt="" className="block size-full max-w-none" src={iconInfoSmall} />
          </div>
        </div>
      </button>
      <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
      <div className="relative size-4 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
    </div>
  );
}

/** Four-point twinkle (the banner art's path, local copy). */
function Spark({ x, y, scale, className }: { x: number; y: number; scale: number; className: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${scale})`}
      d="M0-6C.6-2.2 2.2-.6 6 0 2.2.6.6 2.2 0 6-.6 2.2-2.2.6-6 0-2.2-.6-.6-2.2 0-6Z"
      className={className}
    />
  );
}

/** Hero illustration of the Temp intro (attached design): tilted dark bank
    card with chip/contactless/digits, a green SAR-coin badge overlapping it,
    a curved return arrow and sparkles. Inline SVG on theme tokens. */
function TempHeroArt() {
  return (
    <svg viewBox="0 0 128 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full" aria-hidden>
      <g transform="rotate(-16 58 62)">
        <rect x="8" y="34" width="94" height="58" rx="9" className="fill-ink" />
        <rect x="16" y="48" width="14" height="10" rx="2" className="fill-gold-600" />
        <g className="stroke-white" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M88 42a7 7 0 0 1 0 10" />
          <path d="M92.5 39a12 12 0 0 1 0 16" />
        </g>
        <g className="fill-white" opacity="0.9">
          <circle cx="18" cy="76" r="1.6" />
          <circle cx="24" cy="76" r="1.6" />
          <circle cx="30" cy="76" r="1.6" />
          <circle cx="36" cy="76" r="1.6" />
        </g>
        <text x="60" y="79.5" fontSize="9" className="font-en fill-white" opacity="0.9">
          1234
        </text>
      </g>
      {/* curved return arrow — head aligned to the arc's end tangent
          (the SAR coin badge is an HTML overlay in TempIntroBody, so the
          real sar-symbol asset can be used) */}
      <path d="M115 78c8-13 4-28-8-34" className="stroke-brand-400" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M103.5 42.5l10.5.2-4 9.2Z" className="fill-brand-400" />
      <Spark x={14} y={20} scale={1.1} className="fill-brand-400" />
      <Spark x={118} y={14} scale={0.8} className="fill-brand-400" />
    </svg>
  );
}

/** Benefit-card illustrations (attached design, simplified vectors). */
function ArtShieldCheck() {
  return (
    <svg viewBox="0 0 64 56" fill="none" className="h-14 w-16" aria-hidden>
      <path d="M32 4l20 7v14c0 12.5-8.2 21.5-20 26C20.2 46.5 12 37.5 12 25V11l20-7Z" className="fill-brand-400" />
      <path d="M32 4l20 7v14c0 12.5-8.2 21.5-20 26V4Z" className="fill-brand-500" opacity="0.6" />
      <path d="M23.5 27.5l6 6 11.5-12" className="stroke-white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Spark x={10} y={10} scale={0.6} className="fill-brand-100" />
    </svg>
  );
}
function ArtCardCoins() {
  return (
    <svg viewBox="0 0 64 56" fill="none" className="h-14 w-16" aria-hidden>
      <g transform="rotate(-8 36 24)">
        <rect x="16" y="8" width="44" height="28" rx="4.5" className="fill-ink" />
        <rect x="16" y="14" width="44" height="5" className="fill-white" opacity="0.25" />
        <rect x="22" y="24" width="10" height="7" rx="1.5" className="fill-gold-600" />
      </g>
      <g>
        <ellipse cx="18" cy="46" rx="12" ry="5" className="fill-gold-700" />
        <ellipse cx="18" cy="43.5" rx="12" ry="5" className="fill-gold-600" />
        <ellipse cx="18" cy="39.5" rx="12" ry="5" className="fill-gold-700" />
        <ellipse cx="18" cy="37" rx="12" ry="5" className="fill-gold-600" />
        <ellipse cx="18" cy="37" rx="7" ry="2.8" className="fill-white" opacity="0.35" />
      </g>
    </svg>
  );
}
function ArtWalletCoins() {
  return (
    <svg viewBox="0 0 64 56" fill="none" className="h-14 w-16" aria-hidden>
      <circle cx="40" cy="9" r="5.5" className="fill-gold-600" />
      <circle cx="40" cy="9" r="3.2" fill="none" strokeWidth="1.2" className="stroke-white" opacity="0.85" />
      <circle cx="51" cy="16" r="4.5" className="fill-gold-600" />
      <circle cx="51" cy="16" r="2.6" fill="none" strokeWidth="1.1" className="stroke-white" opacity="0.85" />
      <rect x="8" y="18" width="48" height="32" rx="7" className="fill-brand-500" />
      <rect x="8" y="24" width="48" height="26" rx="7" className="fill-brand-400" />
      <rect x="40" y="30" width="16" height="12" rx="4" className="fill-brand-100" />
      <circle cx="46" cy="36" r="2.5" className="fill-gold-600" />
      <rect x="14" y="14" width="26" height="8" rx="3" className="fill-brand-500" opacity="0.5" />
    </svg>
  );
}
function ArtPayUsual() {
  return (
    <svg viewBox="0 0 64 56" fill="none" className="h-14 w-16" aria-hidden>
      <rect x="8" y="6" width="24" height="44" rx="5" className="fill-ink" />
      <rect x="11" y="12" width="18" height="28" rx="2.5" className="fill-brand-100" />
      <path d="M16.5 26l3 3 6-6" className="stroke-brand-500" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g transform="rotate(8 48 34)">
        <rect x="36" y="20" width="26" height="17" rx="3.5" className="fill-brand-400" />
        <rect x="36" y="23.5" width="26" height="3.5" className="fill-white" opacity="0.35" />
        <rect x="40" y="30" width="7" height="4" rx="1" className="fill-gold-600" />
      </g>
      <g className="stroke-brand-400" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M40 46a6 6 0 0 0 8 0" />
        <path d="M38 50a10 10 0 0 0 12 0" />
      </g>
    </svg>
  );
}
function ArtShieldLock() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-12 shrink-0" aria-hidden>
      <path d="M24 3l16 5.5v11c0 10.5-6.6 18-16 21.5C14.6 37.5 8 30 8 19.5v-11L24 3Z" className="fill-brand-400" />
      <path d="M24 3l16 5.5v11c0 10.5-6.6 18-16 21.5V3Z" className="fill-brand-500" opacity="0.6" />
      <rect x="17" y="20" width="14" height="11" rx="2.5" className="fill-white" />
      <path d="M20 20v-3a4 4 0 0 1 8 0v3" className="stroke-white" strokeWidth="2.4" fill="none" />
      <circle cx="24" cy="25.5" r="1.8" className="fill-brand-500" />
    </svg>
  );
}

/** The Temp intro's benefit cards (attached design). */
const TEMP_BENEFITS = [
  {
    title: 'خلي بطاقتك مضافة',
    art: <ArtShieldCheck />,
    body: 'نحتاج بطاقتك عشان نتعرف على مشترياتك المؤهلة ونستمر في إرجاع الكاش باك.',
    note: 'إذا شلتها، يتوقف الكاش باك على مشترياتها القادمة.',
  },
  {
    title: 'زيادة على مكافأت بطاقتك',
    art: <ArtCardCoins />,
    body: 'مكافأت بطاقتك مستمرة، وكاش باك ولاء بلس زيادة عليها',
  },
  {
    title: 'كاش باك يصلك لحظتها',
    art: <ArtWalletCoins />,
    body: 'يرجع الكاش باك مباشرة إلى محفظة ولاء بلس وتقدر تستخدمه متى ما تبغى',
  },
  {
    title: 'ادفع كالمعتاد',
    art: <ArtPayUsual />,
    body: 'ادفع بطاقتك أو Apple Pay أو Samsung Pay أو Google Pay',
    accent: 'بدون أي خطوات أو إجراءات إضافية',
  },
];

/** «كيف يشتغل؟» steps (attached design; RTL — step 1 rightmost). */
const TEMP_STEPS = [
  { n: 1, caption: 'أضف بطاقتك المعتادة مرة واحدة', icon: 'card' as const },
  { n: 2, caption: 'ادفع كالمعتاد عند المتاجر المشاركة', icon: 'shop' as const },
  { n: 3, caption: 'يرجع الكاش باك لمحفظة ولاء بلس لحظتها', icon: 'wallet' as const },
];

function TempStepIcon({ kind }: { kind: 'card' | 'shop' | 'wallet' }) {
  if (kind === 'card')
    return (
      <svg viewBox="0 0 28 28" fill="none" className="size-7" aria-hidden>
        <g strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" fill="none">
          <rect x="2.5" y="6.5" width="19" height="14" rx="3" />
          <path d="M2.5 11h19" />
        </g>
        <circle cx="22" cy="20" r="5.5" className="fill-brand-400" />
        <path d="M22 17.5v5M19.5 20h5" className="stroke-white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (kind === 'shop')
    return (
      <svg viewBox="0 0 28 28" fill="none" className="size-7" aria-hidden>
        <g strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" fill="none">
          <path d="M5 12v9.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V12" />
          <path d="M3.5 8.5L6 4.5h16l2.5 4a2.8 2.8 0 0 1-5.4 1.2A2.9 2.9 0 0 1 14 9.6a2.9 2.9 0 0 1-5.1.1A2.8 2.8 0 0 1 3.5 8.5Z" />
          <path d="M10.5 23v-5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V23" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 28 28" fill="none" className="size-7" aria-hidden>
      <g strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" fill="none">
        <rect x="3" y="8" width="22" height="15" rx="3.5" />
        <path d="M7 8V6.5a2 2 0 0 1 2-2h13" />
        <path d="M18.5 15.5h6.5" />
      </g>
      <circle cx="8" cy="4.5" r="3.4" className="fill-gold-600" />
    </svg>
  );
}

/** Body of the Temp intro sheet — the attached design's blocks; the parent
    sheet supplies the chrome (backdrop, grabber, X), the scroll container
    and the pinned CTA. Old stepper/chips/terms don't exist in this design. */
function TempIntroBody() {
  return (
    <>
      {/* hero — text right, illustration left */}
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <div className="pointer-events-none relative h-[118px] w-[126px] shrink-0">
          <TempHeroArt />
          {/* SAR coin badge over the card's lower corner — the real symbol,
              painted white through its own mask */}
          <div className="absolute left-[79px] top-[68px] flex size-[34px] items-center justify-center rounded-full bg-brand-100">
            <div className="flex size-[27px] items-center justify-center rounded-full bg-brand-400">
              <MaskGlyph src={sarSymbol} size={14} className="bg-white" />
            </div>
          </div>
        </div>
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
          <p className="w-full text-right text-[19px] font-bold leading-[1.45] text-ink" dir="auto">
            استخدم بطاقتك اللي دائما تشتري منها
          </p>
          <p className="w-full text-right text-base font-bold leading-[1.5] text-brand-500" dir="auto">
            واستفيد أكثر !
          </p>
        </div>
      </div>

      {/* mint explainer strip */}
      <div className="w-full shrink-0 rounded-2xl bg-brand-50 px-4 py-3">
        <p className="w-full text-right text-[13px] font-normal leading-[1.7] text-ink" dir="rtl">
          {'استخدم بطاقتك البنكية اللي تدفع فيها كل يوم عند المتاجر المشاركة، ونرجع لك كاش باك يصل إلى '}
          <span className="font-en font-bold text-offer-400">[X]%</span>
        </p>
      </div>

      {/* benefits carousel */}
      <p className="w-full shrink-0 text-center text-[15px] font-bold leading-[1.5] text-ink" dir="auto">
        أسهل كاش باك يجيك
      </p>
      <div dir="rtl" className="grid w-full shrink-0 grid-cols-2 gap-2" data-testid="intro-benefits">
          {TEMP_BENEFITS.map((c) => (
            <div key={c.title} className="flex flex-col items-center gap-2 rounded-2xl bg-surface-neutral p-3">
              <p className="w-full text-center text-[13px] font-bold leading-[1.5] text-ink" dir="auto">
                {c.title}
              </p>
              {c.art}
              <p className="w-full text-center text-[11px] font-normal leading-[1.6] text-ink-secondary" dir="rtl">
                {c.body}
              </p>
              {c.note && (
                <p className="w-full text-center text-[11px] font-medium leading-[1.6] text-ink-warning" dir="rtl">
                  {c.note}
                </p>
              )}
              {c.accent && (
                <p className="w-full text-center text-[11px] font-bold leading-[1.6] text-brand-500" dir="rtl">
                  {c.accent}
                </p>
              )}
            </div>
          ))}
      </div>

      {/* كيف يشتغل؟ — 3 steps, dotted separators, numbered badges */}
      <div className="w-full shrink-0 rounded-2xl bg-white">
        <p className="w-full text-center text-[15px] font-bold leading-[1.5] text-ink" dir="auto">
          كيف يشتغل؟
        </p>
        <div className="mt-3 flex w-full flex-row-reverse items-stretch justify-between">
          {TEMP_STEPS.map((s, i) => (
            <div key={s.n} className="contents">
              <div className="flex min-w-px flex-[1_0_0] flex-col items-center gap-1.5 px-1">
                <div className="relative">
                  <TempStepIcon kind={s.icon} />
                  <span className="font-en absolute -right-2.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-brand-400 text-[10px] font-bold leading-none text-ink-inverse">
                    {s.n}
                  </span>
                </div>
                <p className="w-full text-center text-[11px] font-normal leading-[1.5] text-ink-secondary" dir="auto">
                  {s.caption}
                </p>
              </div>
              {i < TEMP_STEPS.length - 1 && <div className="my-1 w-px shrink-0 border-r border-dashed border-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* security note */}
      <div className="flex w-full shrink-0 items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3">
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-0.5">
          <p className="w-full text-right text-[13px] font-bold leading-[1.5] text-ink" dir="auto">
            بيانات بطاقتك محمية
          </p>
          <p className="w-full text-right text-[11px] font-normal leading-[1.6] text-ink-secondary" dir="rtl">
            {'بيانات بطاقتك مشفرة ومحمية عبر '}
            <span className="font-en">Visa</span>
            {' من لحظة إدخالها، وما نشوفها أو نحفظها أو نشاركها مع أي جهة.'}
          </p>
        </div>
        {/* leading side in RTL — the illustration sits right of the content */}
        <ArtShieldLock />
      </div>

    </>
  );
}

/**
 * UX redesign: the linking intro as a partial-height bottom sheet over the
 * Market. Mint hero with the cards illustration, an auto-advancing 3-step
 * stepper on a right-anchored progress track (RTL: progress flows right→left,
 * step 1 sits rightmost), trust chips, terms, one CTA.
 * The /cashback/intro route still serves the full-screen original.
 * **Temp** renders the redesigned content instead (user-attached design,
 * 2026-08-19): hero with card illustration, mint explainer, benefits
 * carousel, «كيف يشتغل؟» steps, Visa security note, new CTA — the sheet
 * grows tall and scrolls; Phase 1/2 keep this markup untouched.
 */
export default function LinkIntroSheet({
  open,
  onClose,
  onStart,
}: {
  open: boolean;
  onClose: () => void;
  /** Overrides the CTA: when the sheet is already shown over the add-card
      form (Phase-2 first-time gate), starting just dismisses it. */
  onStart?: () => void;
}) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [tip, setTip] = useState<TipId | null>(null);

  useEffect(() => {
    if (!open || IS_TEMP) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2500);
    return () => clearInterval(t);
  }, [open, step]);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50">
      <style>{'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}@keyframes step-in{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}@keyframes tip-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}'}</style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-2${IS_TEMP ? ' max-h-[94%] pb-6' : ''}`}
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
      >
        {/* grabber + flow dots (RTL: step 1 = rightmost = last in the physical-LTR DOM) */}
        <div className="flex w-full flex-col items-center gap-2">
          <div className="h-1 w-9 rounded-full bg-line" />
          <div className="flex items-center gap-1.5" aria-hidden>
            <div className="size-1.5 rounded-full bg-line" />
            <div className="h-1.5 w-4 rounded-full bg-brand-400" />
          </div>
        </div>

        {/* close */}
        <div className="flex h-6 w-full items-center">
          <button type="button" aria-label="إغلاق" onClick={onClose} className="relative size-6 shrink-0 overflow-clip">
            <div className="absolute inset-1/4">
              <div className="absolute inset-[-8.33%]">
                <img alt="" className="block size-full max-w-none" src={iconClose} />
              </div>
            </div>
          </button>
        </div>

        {IS_TEMP ? (
          // Temp: the redesigned content (attached design) inside a scroll
          // area, so the tall sheet stays within the frame
          <>
            <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-4 overflow-y-auto">
              <TempIntroBody />
            </div>
            {/* CTA pinned below the scroll area — always visible */}
            <button
              type="button"
              onClick={() => {
                if (onStart) {
                  onStart();
                  return;
                }
                onClose();
                navigate('/cashback/add-card');
              }}
              className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-3"
            >
              <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
                <path d="M13.5 8H3M6.5 4.5L3 8l3.5 3.5" className="stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                أضف بطاقتك المعتادة الآن
              </p>
            </button>
          </>
        ) : (
          <>
        {/* 💳 Mint hero — compact echo of the full-screen intro's hero */}
        <div className="relative min-h-[122px] w-full shrink-0 overflow-clip rounded-2xl bg-brand-50 px-4 py-4">
          <div className="flex w-full flex-col items-end gap-1.5 pl-[128px]">
            <p className="w-full text-right text-[0px] font-bold leading-none text-ink" dir="auto">
              <span className="text-[18px] leading-[1.5]">{'كاش باك حتى '}</span>
              <span className="font-en text-[18px] font-bold not-italic leading-[1.5]">[X]%</span>
              <span className="text-[18px] leading-[1.5]">{' بدون حد'}</span>
            </p>
            <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              مرة وحدة تضيف بطاقتك.. وبعدها ادفع وبس
            </p>
          </div>
          <div className="pointer-events-none absolute bottom-[-14px] left-[-6px] h-[86px] w-[134px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={heroCards} />
          </div>
        </div>

        {/* interactive 3-step stepper on a connected right-anchored track */}
        <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-surface-neutral p-4">
          <div className="relative flex w-full flex-row-reverse items-center justify-between">
            <div className="absolute inset-x-[16.67%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-line" aria-hidden>
              <div
                className="absolute right-0 top-0 h-full rounded-full bg-brand-400 transition-[width] duration-300"
                style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                data-testid="step-track-fill"
              />
            </div>
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setStep(i)}
                className="relative flex flex-1 items-center justify-center"
                aria-label={s.title}
              >
                <span
                  className={`font-en flex size-7 items-center justify-center rounded-full text-sm font-bold leading-none shadow-xs transition-all duration-300 ${
                    i === step ? 'scale-110 bg-brand-400 text-ink-inverse' : 'bg-white text-brand-400'
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
          <div
            key={step}
            className="flex h-[58px] w-full flex-col items-end justify-center gap-0.5"
            style={{ animation: 'step-in 180ms ease-out both' }}
          >
            <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              {STEPS[step].title}
            </p>
            <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              {STEPS[step].desc}
            </p>
          </div>
        </div>

        {/* trust chips — each carries an ⓘ whose hover/tap opens a tooltip
            with the longer story behind the claim (user direction) */}
        <div className="flex w-full items-center justify-end gap-2">
          <TrustChip
            id="safe"
            label="بياناتك في أمان"
            icon={iconShieldTick}
            align="left"
            tipText="بيانات بطاقتك مشفرة بأعلى معايير الأمان وما نشاركها مع أحد.. نقرأ العمليات فقط عشان نحسب لك الكاش باك"
            openTip={tip}
            setTip={setTip}
          />
          <TrustChip
            id="rewards"
            label="فوق مكافآت بنكك"
            icon={iconCoin}
            align="right"
            tipText="الكاش باك يجيك فوق مكافآت بطاقتك البنكية نفسها.. نقاط بنكك ما تتأثر، وتكسب من الجهتين"
            openTip={tip}
            setTip={setTip}
          />
        </div>

        <p className="w-full text-center text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
          {'تطبق '}
          <span className="font-medium text-ink underline">الشروط والأحكام</span>
        </p>

        <button
          type="button"
          onClick={() => {
            if (onStart) {
              onStart();
              return;
            }
            onClose();
            navigate('/cashback/add-card');
          }}
          className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
        >
          {/* icon BEFORE the text in RTL reading order = physically right of the label */}
          <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
            أضف بطاقتك الأولى
          </p>
          <div className="relative size-5 shrink-0 overflow-clip">
            <div className="absolute inset-[20.83%]">
              <div className="absolute inset-[-7.14%]">
                <img alt="" className="block size-full max-w-none" src={iconPlus} />
              </div>
            </div>
          </div>
        </button>
          </>
        )}
      </div>
    </div>
  );
}
