import { useNavigate } from 'react-router-dom';
import Riyal from './Riyal';
import woCoin24 from '../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/**
 * «للاسف رصيد نقاطك ما يكفي» — drawn 65:25194: the shortfall breakdown
 * (voucher price · current balance · what's still missing) over a top-up
 * CTA. Rendered in points or cashback depending on which balance fell
 * short, since Phase 2 can pay either way.
 */
export default function InsufficientBalanceSheet({
  open,
  onClose,
  currency,
  price,
  balance,
}: {
  open: boolean;
  onClose: () => void;
  currency: 'points' | 'cashback';
  price: number;
  balance: number;
}) {
  const navigate = useNavigate();
  if (!open) return null;

  const short = Math.max(0, price - balance);
  const isPoints = currency === 'points';
  const unit = (
    <span className="inline-flex items-center gap-1 align-middle">
      {isPoints ? (
        <span className="relative inline-block size-5">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={woCoin24} />
        </span>
      ) : (
        <Riyal />
      )}
    </span>
  );

  return (
    <div className="absolute inset-0 z-[60]">
      <style>
        {'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'}
      </style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-6"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
        data-testid="insufficient-sheet"
      >
        {/* stacked-coins mark, drawn as an illustration */}
        <div className="relative flex h-[120px] w-full items-center justify-center">
          <div className="absolute size-[120px] rounded-full bg-surface-neutral" />
          <div className="relative flex flex-col items-center gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`block h-3 w-16 rounded-full border border-solid border-ink ${i === 0 ? 'bg-brand-400' : 'bg-white'}`}
              />
            ))}
          </div>
          <div className="absolute bottom-1 left-[calc(50%+26px)] flex size-9 items-center justify-center rounded-full bg-brand-400">
            <span className="text-lg font-bold leading-none text-white">↓</span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-1 text-center">
          <p className="text-lg font-bold leading-[1.5] text-ink" dir="auto">
            {isPoints ? 'للاسف رصيد نقاطك ما يكفي' : 'للاسف رصيد الكاش باك ما يكفي'}
          </p>
          <p className="text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto">
            {isPoints ? 'اشحن عشان تقدر تشتري القسيمة' : 'بدّل طريقة الدفع أو اختر قيمة أقل'}
          </p>
        </div>

        <div className="flex w-full flex-col rounded-2xl border border-solid border-line p-4">
          <BreakdownRow label="قيمة القسيمة" value={price} unit={unit} />
          <BreakdownRow label="رصيدك الحالي" value={balance} unit={unit} />
          <BreakdownRow label={isPoints ? 'النقاط اللي تحتاجها' : 'اللي ناقصك'} value={short} unit={unit} emphasis />
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            navigate(isPoints ? '/wallet' : '/cards');
          }}
          className="flex w-full items-center justify-center rounded-xl bg-brand-400 px-4 py-2.5"
        >
          <p className="text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
            {isPoints ? 'اشحن' : 'روح للمحفظة'}
          </p>
        </button>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  unit,
  emphasis,
}: {
  label: string;
  value: number;
  unit: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between border-t border-solid border-line-subtle py-2.5 first-of-type:border-0 first-of-type:pt-0">
      <div className={`font-en flex items-center gap-1.5 text-sm ${emphasis ? 'font-semibold text-ink' : 'font-medium text-ink'}`} dir="ltr">
        {unit}
        {fmt(value)}
      </div>
      <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
        {label}
      </p>
    </div>
  );
}
