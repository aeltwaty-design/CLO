import { useMemo, useState } from 'react';
import { useAppState } from '../state/AppState';
import { statementTxs, type StatementTx } from '../data/transactions';
import { exportStatementPdf } from '../lib/statementPdf';
import Riyal from './Riyal';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const MONTHS_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

/** `YYYY-M` key for a date's month. */
const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

/** «تصدير كشف حساب» — bank-statement export sheet (derived, Phase 2 only).
    Month pills only, per user direction (replacing the earlier presets +
    custom from–to): the sheet lists the months that carry activity, newest
    first; picking one shows the count/net preview and the CTA exports that
    month's statement. A month still in progress exports through today. */
export default function ExportStatementSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cashback } = useAppState();
  // no month until the user picks one — the preview/CTA follow the choice
  const [month, setMonth] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const all = useMemo(() => statementTxs(), []);
  // months carrying activity, newest first (matches the screen's month filter)
  const months = useMemo(() => {
    const seen = new Map<string, Date>();
    for (const t of all) {
      const k = monthKey(t.date);
      if (!seen.has(k)) seen.set(k, new Date(t.date.getFullYear(), t.date.getMonth(), 1));
    }
    return [...seen.entries()]
      .sort((a, b) => b[1].getTime() - a[1].getTime())
      .map(([key, first]) => ({ key, label: `${MONTHS_AR[first.getMonth()]} ${first.getFullYear()}` }));
  }, [all]);

  if (!open) return null;

  const range = ((): { from: Date; to: Date } | null => {
    if (month === null) return null;
    const [y, m] = month.split('-').map(Number);
    const from = new Date(y, m, 1);
    const endOfMonth = new Date(y, m + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return { from, to: endOfMonth < today ? endOfMonth : today };
  })();

  const txs: StatementTx[] = range ? all.filter((t) => t.date >= range.from && t.date <= range.to) : [];
  const net = txs.reduce((s, t) => s + t.amount, 0);

  const exportPdf = async () => {
    if (busy || !range || txs.length === 0) return;
    setBusy(true);
    try {
      await exportStatementPdf({
        txs,
        from: range.from,
        to: range.to,
        holder: 'محمد',
        cardMasked: '**** 1234',
        balance: cashback,
      });
      onClose();
    } finally {
      setBusy(false);
    }
  };

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
        data-testid="export-sheet"
      >
        <div className="h-1 w-9 rounded-full bg-line" />

        <div className="flex w-full flex-col items-end gap-0.5">
          <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
            تصدير كشف حساب
          </p>
          <p className="text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            اختر الشهر اللي تبي كشفه
          </p>
        </div>

        {/* month pills — newest first, rightmost in RTL */}
        <div className="flex w-full flex-row-reverse flex-wrap items-center gap-2">
          {months.map((m) => (
            <MonthPill
              key={m.key}
              label={m.label}
              active={month === m.key}
              testid={`export-month-${m.key}`}
              onPick={() => setMonth(m.key)}
            />
          ))}
        </div>

        {/* live preview — appears once a month is picked */}
        {range && (
          <div className="flex w-full items-center justify-between rounded-2xl bg-surface-neutral px-4 py-3">
            <p className="text-xs font-medium leading-[1.5]" dir="rtl" data-testid="export-preview">
              {txs.length === 0 ? (
                <span className="text-ink-tertiary">ما فيه عمليات في هذا الشهر</span>
              ) : (
                <span className="text-ink">
                  {'الصافي: '}
                  <span className={`font-en ${net >= 0 ? 'text-brand-400' : 'text-ink-danger'}`}>
                    {net > 0 ? '+' : ''}
                    {fmtSar(net)}
                  </span>{' '}
                  <Riyal />
                </span>
              )}
            </p>
            <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
              <span className="font-en font-medium text-ink">{txs.length}</span>
              {' عمليات'}
            </p>
          </div>
        )}

        <button
          type="button"
          disabled={busy || !range || txs.length === 0}
          onClick={exportPdf}
          data-testid="export-pdf"
          className={`flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
            busy || !range || txs.length === 0 ? 'bg-surface-disabled' : 'cursor-pointer bg-brand-400'
          }`}
        >
          <p
            className={`whitespace-nowrap text-sm font-medium leading-[1.5] ${
              busy || !range || txs.length === 0 ? 'text-ink-quadrant' : 'text-ink-inverse'
            }`}
            dir="auto"
          >
            {busy ? 'جاري التصدير…' : 'تصدير PDF'}
          </p>
        </button>
      </div>
    </div>
  );
}

/** Month pill — mint + green border when active (gift-chip idiom). */
function MonthPill({
  label,
  active,
  testid,
  onPick,
}: {
  label: string;
  active: boolean;
  testid: string;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      data-testid={testid}
      className={`flex shrink-0 items-center justify-center rounded-2xl border border-solid px-3 py-1.5 ${
        active ? 'border-brand-400 bg-brand-50' : 'cursor-pointer border-line bg-surface'
      }`}
    >
      <p
        className={`whitespace-nowrap text-center text-xs leading-[1.5] ${
          active ? 'font-medium text-brand-400' : 'font-normal text-ink'
        }`}
        dir="auto"
      >
        {label}
      </p>
    </button>
  );
}
