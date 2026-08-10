import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import photoIkea from '../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import iconX from '../assets/figma/a95744528ae429ca2d55a9829b34c578849e04e2.svg';
import iconShop from '../assets/figma/824cd0417cc698e6a27373434a2b83261ec0d57c.svg';
import iconGlobal from '../assets/figma/ccd9ba7c5407452a9fad88310bcec7558765674a.svg';
import iconImport from '../assets/figma/4330beb30b25ccf8b5ee57ba723d497fcb12440c.svg';
import lineDock from '../assets/figma/a061c4915461af5a7e80b10e814a389945e0d2bb.svg';
import iconCard from '../assets/figma/f118aa45e9460e6771ffbe8564d9b17f5ed465b3.svg';
import homeIndicator from '../assets/figma/5f04cb4b716a42ba11ba59a4acef8da61bbe12e9.svg';

type PurchaseOfferSheetProps = {
  open: boolean;
  onClose: () => void;
  /** CTA override; default closes the sheet then navigates to /cashback/intro. */
  onCta?: () => void;
};

/**
 * تسوق واربح — purchase-offer bottom sheet (Figma 1:9993 before card link /
 * 1:10105 after, 375×812 full-height). Slides up over a dimmed backdrop; X and
 * backdrop call onClose. Before linking, a dock CTA «ضفها مرة وحدة» starts the
 * card-link flow; after linking the dock disappears and the copy switches to
 * the linked wording with a third step/term.
 */
export default function PurchaseOfferSheet({ open, onClose, onCta }: PurchaseOfferSheetProps) {
  const navigate = useNavigate();
  const { cardLinked } = useAppState();
  if (!open) return null;

  const handleCta = () => {
    if (onCta) {
      onCta();
      return;
    }
    onClose();
    navigate(cardLinked ? '/cards' : '/cashback/intro');
  };

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
        className="absolute inset-0 flex flex-col items-center gap-6 border-l border-solid border-ink-100 bg-white"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
      >
        {/* Drawer header */}
        <div className="flex w-full shrink-0 items-center justify-end px-4">
          <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-4 pt-6">
            <button type="button" aria-label="إغلاق" onClick={onClose} className="relative flex shrink-0 items-center justify-center overflow-clip rounded-lg p-2.5">
              <div className="relative size-5 shrink-0 overflow-clip">
                <div className="absolute inset-1/4">
                  <div className="absolute inset-[-10%]">
                    <img alt="" className="block size-full max-w-none" src={iconX} />
                  </div>
                </div>
              </div>
            </button>
            <div className="flex min-w-px flex-[1_0_0] flex-col items-end">
              <p className="w-full text-right text-lg font-medium leading-[1.5] text-ink" dir="auto">
                تسوق واربح
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex min-h-px w-full flex-[1_0_0] flex-col items-start justify-center gap-6 px-4 pb-8">
          <div className="flex min-h-px w-full flex-[1_0_0] flex-col items-start gap-6">
            {/* Merchant offer card */}
            <div className="flex w-full shrink-0 flex-col items-end gap-4 rounded-2xl bg-surface-neutral p-4">
              <div className="flex w-full shrink-0 items-center justify-between">
                <div className="flex shrink-0 items-center gap-1">
                  <div className="flex shrink-0 items-center rounded-[5px] bg-surface p-0.5">
                    <div className="relative size-4 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShop} />
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center rounded-[5px] bg-surface p-0.5">
                    <div className="relative size-4 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconGlobal} />
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex flex-row items-center self-stretch">
                    <div className="flex h-full w-[76px] flex-col items-start gap-0.5 text-right">
                      <p className="w-full text-base font-medium leading-[1.5] text-ink" dir="auto">
                        إيكيا
                      </p>
                      <p className="w-full text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                        المنزل والأثاث
                      </p>
                    </div>
                  </div>
                  <div className="relative size-[50px] shrink-0 rounded-[12.5px]">
                    <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12.5px] object-cover" src={photoIkea} />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-end">
                <div className="flex w-full shrink-0 flex-col items-end">
                  <div className="flex shrink-0 items-center">
                    {cardLinked ? (
                      <p className="w-[313px] text-right text-lg font-bold leading-[1.5] text-brand-400" dir="auto">
                        {'استخدم بطاقتك واربح '}
                        <span className="font-en not-italic">10%</span>
                        {' كاش باك'}
                      </p>
                    ) : (
                      <p className="w-[313px] text-right text-lg font-bold leading-[1.5] text-brand-400" dir="auto">
                        {'حاسب ببطاقتك وخذ لك حتى '}
                        <span className="font-en not-italic">[X]%</span>
                        {' كاش باك'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                {cardLinked
                  ? 'ادفع ببطاقتك واربح الكاش باك مع كل عملية شراء تقوم بها'
                  : 'ادفع مثل عادتك.. والكاش باك يرجع لك أول بأول على مشترياتك المؤهلة'}
              </p>
            </div>

            {/* Cashback rate strip */}
            <div className="flex w-full shrink-0 flex-col items-end gap-3">
              <div className="flex w-full shrink-0 flex-col items-end">
                <div className="flex w-full shrink-0 flex-col items-start">
                  <div className="relative flex w-full shrink-0 items-center justify-center gap-4 rounded-2xl bg-surface-neutral px-[25px] py-4">
                    <div className="flex shrink-0 items-center">
                      <p className="whitespace-nowrap text-center text-[0px] text-ink" dir="auto">
                        <span className="text-[18px] font-bold leading-[1.5]">كاش باك</span>
                        <span className="text-[18px] leading-[1.5]">{' '}</span>
                        <span className="font-en text-[18px] font-bold not-italic leading-[1.5]">10%</span>
                      </p>
                    </div>
                    <div className="absolute right-0.5 top-0.5 flex size-[55px] items-center justify-center gap-[8.428px] overflow-clip rounded-[16.561px] bg-surface p-[16.857px] shadow-[0px_1.054px_2.107px_0px_rgba(16,24,40,0.05)]">
                      <div className="relative size-[25.286px] shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconImport} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* كيف يتم؟ */}
            <div className="flex w-full shrink-0 flex-col items-start gap-3">
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                كيف يتم؟
              </p>
              <div className="flex w-full shrink-0 flex-col items-start gap-3">
                <div className="flex w-full shrink-0 flex-col items-end justify-center rounded-2xl border border-solid border-line bg-white px-4 py-3">
                  <div className="flex w-full shrink-0 flex-col items-start gap-3">
                    <StepItem index={1} text="اذهب للمتجر او تسوق اونلاين" />
                    <StepItem index={2} text="استخدم بطاقتك المربوطة في الدفع" />
                    {cardLinked && <StepItem index={3} text="انتظر مدة اقصاها 15 يوم وستحصل على الكاش باك" />}
                  </div>
                </div>
              </div>
            </div>

            {/* الشروط والأحكام */}
            <div className="flex w-full shrink-0 flex-col items-start gap-3">
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                الشروط والأحكام
              </p>
              <div className="flex w-full shrink-0 flex-col items-start gap-3">
                <div className="flex w-full shrink-0 flex-col items-end justify-center rounded-2xl border border-solid border-line bg-white px-4 py-3">
                  <div className="flex w-full shrink-0 flex-col items-start gap-3">
                    <StepItem index={1} text="يكتب هنا الشرط الأول كاملا" />
                    <StepItem index={2} text="يكتب هنا الشرط الثاني كاملا" />
                    {cardLinked && <StepItem index={3} text="يكتب هنا الشرط الثالث كاملا" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ⛴️ Dock — CTA copy switches after linking (1:10105: «إدارة البطاقات») */}
          <div className="absolute bottom-[0.23px] left-[calc(50%+0.5px)] flex -translate-x-1/2 flex-col items-center bg-white">
            <div className="relative flex w-[376px] shrink-0 flex-col items-center gap-4 bg-white px-4 pb-4 pt-0">
              <div className="relative h-0 w-[376px] shrink-0">
                <div className="absolute inset-[-1px_0_0_0]">
                  <img alt="" className="block size-full max-w-none" src={lineDock} />
                </div>
              </div>
              <div className="flex w-full shrink-0 items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCta}
                  className="flex min-w-px flex-[1_0_0] items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
                >
                  <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                    {cardLinked ? 'إدارة البطاقات' : 'ضفها مرة وحدة'}
                  </p>
                  <div className="relative size-5 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCard} />
                  </div>
                </button>
              </div>
            </div>
            <div className="relative h-[20.771px] w-[343px] shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={homeIndicator} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Single numbered line of the «كيف يتم؟» / terms cards — decimal marker on the right, as drawn. */
function StepItem({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-2.5">
      <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-[5px]">
        <ol className="block w-[min-content] min-w-full list-decimal text-right text-xs font-normal text-ink" dir="rtl" start={index}>
          <li className="ms-[18px]">
            <span className="leading-[1.5]">{text}</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
