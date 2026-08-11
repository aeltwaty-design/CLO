import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconClose from '../assets/figma/77832851b14d0014584c317e4f6da6aaba991b57.svg';
import iconCoin from '../assets/figma/49b2ad063a16e501dd1724af42efd55bad984f01.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';
import iconPlus from '../assets/figma/1782ca329908717a3751d66c5fff07ae32e411f5.svg';

const STEPS = [
  { title: 'ضفها مرة وحدة', desc: 'إضافة آمنة لبطاقتك' },
  { title: 'ادفع مثل كل مرة', desc: 'بالبطاقة أو من جوالك (أبل باي، سامسونج باي، جوجل باي) عند أي متجر مشارك' },
  { title: 'خذ الكاش باك في محفظة ولاء بلس', desc: 'يوصلك خلال 15 يوم من الشراء' },
];

/**
 * UX redesign: the linking intro as a partial-height bottom sheet over the
 * Market (was the full-screen 1190px onboarding push). One headline, an
 * auto-advancing 3-step mini-stepper (tap to select), two trust chips,
 * terms link, one CTA. The /cashback/intro route still exists for deep links.
 */
export default function LinkIntroSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

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
      <style>{'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'}</style>
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
        {/* grabber + flow step dots */}
        <div className="flex w-full flex-col items-center gap-2">
          <div className="h-1 w-9 rounded-full bg-line" />
          <div className="flex items-center gap-1.5" aria-hidden>
            <div className="h-1.5 w-4 rounded-full bg-brand-400" />
            <div className="size-1.5 rounded-full bg-line" />
          </div>
        </div>

        {/* header */}
        <div className="flex w-full items-center justify-between">
          <button type="button" aria-label="إغلاق" onClick={onClose} className="relative size-6 shrink-0 overflow-clip">
            <div className="absolute inset-1/4">
              <div className="absolute inset-[-8.33%]">
                <img alt="" className="block size-full max-w-none" src={iconClose} />
              </div>
            </div>
          </button>
          <p className="text-right text-[0px] font-bold leading-none text-ink" dir="auto">
            <span className="text-[18px] leading-[1.5]">{'كاش باك حتى '}</span>
            <span className="font-en text-[18px] font-bold not-italic leading-[1.5]">[X]%</span>
            <span className="text-[18px] leading-[1.5]">{' مع كل عملية مؤهلة'}</span>
          </p>
        </div>
        <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
          مرة وحدة تضيف بطاقتك.. وبعدها ادفع وبس
        </p>

        {/* interactive 3-step stepper */}
        <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-solid border-line p-4">
          <div className="flex w-full flex-row-reverse items-center justify-between">
            {STEPS.map((s, i) => (
              <button key={s.title} type="button" onClick={() => setStep(i)} className="flex flex-1 items-center justify-center" aria-label={s.title}>
                <span
                  className={`font-en flex size-7 items-center justify-center rounded-full text-sm font-bold leading-none transition-colors duration-300 ${
                    i === step ? 'bg-brand-400 text-ink-inverse' : 'bg-brand-50 text-brand-400'
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
          <div className="flex h-[58px] w-full flex-col items-end justify-center gap-0.5">
            <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              {STEPS[step].title}
            </p>
            <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              {STEPS[step].desc}
            </p>
          </div>
          <div className="flex items-center gap-1" aria-hidden>
            {STEPS.map((s, i) => (
              <div key={s.title} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-brand-400' : 'w-1 bg-line'}`} />
            ))}
          </div>
        </div>

        {/* trust chips */}
        <div className="flex w-full items-center justify-end gap-2">
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-neutral py-1.5 pl-3 pr-2.5">
            <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
              بياناتك في أمان
            </p>
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShieldTick} />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-neutral py-1.5 pl-3 pr-2.5">
            <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
              فوق مكافآت بنكك
            </p>
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCoin} />
            </div>
          </div>
        </div>

        <p className="w-full text-center text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
          {'تطبق '}
          <span className="font-medium text-ink underline">الشروط والأحكام</span>
        </p>

        <button
          type="button"
          onClick={() => {
            onClose();
            navigate('/cashback/add-card');
          }}
          className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
        >
          <div className="relative size-5 shrink-0 overflow-clip">
            <div className="absolute inset-[20.83%]">
              <div className="absolute inset-[-7.14%]">
                <img alt="" className="block size-full max-w-none" src={iconPlus} />
              </div>
            </div>
          </div>
          <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
            أضف بطاقتك الأولى
          </p>
        </button>
      </div>
    </div>
  );
}
