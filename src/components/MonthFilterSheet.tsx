/**
 * «اختر الشهر» — month picker for the transactions list (derived, Phase 2).
 * Lists only the months that actually carry activity, newest first, in the
 * house bottom-sheet shell.
 */
export default function MonthFilterSheet({
  open,
  onClose,
  months,
  selected,
  labelOf,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  /** month keys (`YYYY-M`), in the order they should appear */
  months: string[];
  selected: string;
  labelOf: (key: string) => string;
  onPick: (key: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50">
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
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-2"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
        data-testid="month-sheet"
      >
        <div className="h-1 w-9 rounded-full bg-line" />

        <div className="flex w-full items-center justify-end">
          <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
            اختر الشهر
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-1">
          {months.map((key) => {
            const active = key === selected;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onPick(key);
                  onClose();
                }}
                data-testid={`month-${key}`}
                className={`flex w-full cursor-pointer items-center justify-end rounded-2xl border border-solid px-4 py-3 ${
                  active ? 'border-brand-400 bg-brand-50' : 'border-line-subtle bg-surface'
                }`}
              >
                <p
                  className={`text-right text-sm leading-[1.5] ${active ? 'font-medium text-brand-400' : 'font-normal text-ink'}`}
                  dir="auto"
                >
                  {labelOf(key)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
