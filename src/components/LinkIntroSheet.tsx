import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { usePhase } from '../state/PhaseState';
import iconClose from '../assets/figma/77832851b14d0014584c317e4f6da6aaba991b57.svg';
import heroCards from '../assets/figma/b4ee0f8753c19b40ccfa4d1d2ab5f3fd3d853273.svg';
import iconCoin from '../assets/figma/49b2ad063a16e501dd1724af42efd55bad984f01.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';
import iconPlus from '../assets/figma/1782ca329908717a3751d66c5fff07ae32e411f5.svg';
import iconInfoSmall from '../assets/figma/60e86b53328378fe6e2eaac39925383a1427b8b4.svg';

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
    if (phase === 2 && !cardLinked && !introSuppressed) {
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
  { title: 'خذ الكاش باك في محفظة ولاء بلس', desc: 'يوصلك خلال 15 يوم من الشراء' },
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

/**
 * UX redesign: the linking intro as a partial-height bottom sheet over the
 * Market. Mint hero with the cards illustration, an auto-advancing 3-step
 * stepper on a right-anchored progress track (RTL: progress flows right→left,
 * step 1 sits rightmost), trust chips, terms, one CTA.
 * The /cashback/intro route still serves the full-screen original.
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
    if (!open) return;
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
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-2"
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
      </div>
    </div>
  );
}
