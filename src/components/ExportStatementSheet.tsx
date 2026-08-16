import { useMemo, useState } from 'react';
import { useAppState } from '../state/AppState';
import { statementTxs, type StatementTx } from '../data/transactions';
import { exportStatementPdf } from '../lib/statementPdf';
import Riyal from './Riyal';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Preset = 'week' | 'month' | 'days30' | 'custom';

const PRESETS: { key: Exclude<Preset, 'custom'>; label: string }[] = [
  { key: 'week', label: 'آخر 7 أيام' },
  { key: 'month', label: 'هذا الشهر' },
  { key: 'days30', label: 'آخر 30 يوم' },
];

const iso = (d: Date) => {
  const z = new Date(d);
  z.setMinutes(z.getMinutes() - z.getTimezoneOffset());
  return z.toISOString().slice(0, 10);
};

/** Parse an `<input type=date>` value as LOCAL midnight (the bare string
    would parse as UTC and shift the day in non-UTC timezones). */
const parseLocal = (s: string): Date | null => {
  const [y, m, d] = s.split('-').map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};

/** «تصدير كشف حساب» — bank-statement export sheet (derived, Phase 2 only):
    period presets + custom from–to, live count/net preview, one-tap PDF. */
export default function ExportStatementSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cashback } = useAppState();
  // no period until the user picks one — the preview/CTA follow the choice
  const [preset, setPreset] = useState<Preset | null>(null);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [customFrom, setCustomFrom] = useState(() => iso(new Date(today.getTime() - 6 * 86400000)));
  const [customTo, setCustomTo] = useState(() => iso(today));
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const range = ((): { from: Date; to: Date } | null => {
    if (preset === null) return null;
    const to = new Date(today);
    if (preset === 'week') return { from: new Date(today.getTime() - 6 * 86400000), to };
    if (preset === 'days30') return { from: new Date(today.getTime() - 29 * 86400000), to };
    if (preset === 'month') return { from: new Date(today.getFullYear(), today.getMonth(), 1), to };
    const from = parseLocal(customFrom) ?? to;
    const t = parseLocal(customTo) ?? to;
    return from <= t ? { from, to: t } : { from: t, to: from };
  })();

  const txs: StatementTx[] = range
    ? statementTxs().filter((t) => t.date >= range.from && t.date <= range.to)
    : [];
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

        <div className="flex w-full items-center justify-end">
          <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
            تصدير كشف حساب
          </p>
        </div>

        {/* period presets */}
        <div className="flex w-full flex-row-reverse flex-wrap items-center gap-2">
          {PRESETS.map((p) => {
            const active = preset === p.key;
            return (
              <PresetChip key={p.key} label={p.label} active={active} onPick={() => setPreset(p.key)} />
            );
          })}
        </div>

        {/* ➗ custom period sits under its own divider */}
        <div className="h-px w-full shrink-0 bg-line-subtle" />
        <div className="flex w-full flex-row-reverse items-center">
          <PresetChip label="فترة مخصصة" active={preset === 'custom'} onPick={() => setPreset('custom')} />
        </div>

        {/* custom from–to */}
        {preset === 'custom' && (
          <div className="flex w-full items-stretch gap-2">
            <DateField label="إلى" value={customTo} max={iso(today)} onChange={setCustomTo} />
            <DateField label="من" value={customFrom} max={iso(today)} onChange={setCustomFrom} />
          </div>
        )}

        {/* live preview — appears once a period is picked */}
        {range && (
          <div className="flex w-full items-center justify-between rounded-2xl bg-surface-neutral px-4 py-3">
            <p className="text-xs font-medium leading-[1.5]" dir="rtl" data-testid="export-preview">
              {txs.length === 0 ? (
                <span className="text-ink-tertiary">ما فيه عمليات في هذي الفترة</span>
              ) : (
                <span className="text-ink">
                  {'الصافي: '}
                  <span className={`font-en ${net >= 0 ? 'text-brand-400' : 'text-ink-danger'}`}>{net > 0 ? '+' : ''}{fmtSar(net)}</span>
                  {' '}
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

/** Period chip — mint + green border when active (gift-chip idiom). */
function PresetChip({ label, active, onPick }: { label: string; active: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`flex shrink-0 items-center justify-center rounded-2xl border border-solid px-3 py-1.5 ${
        active ? 'border-brand-400 bg-brand-50' : 'cursor-pointer border-line bg-surface'
      }`}
    >
      <p className={`whitespace-nowrap text-center text-xs leading-[1.5] ${active ? 'font-medium text-brand-400' : 'font-normal text-ink'}`} dir="auto">
        {label}
      </p>
    </button>
  );
}

/** Native date input styled like the app's rounded fields. */
function DateField({ label, value, max, onChange }: { label: string; value: string; max: string; onChange: (v: string) => void }) {
  return (
    <label className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
      <span className="text-xs font-medium leading-[1.5] text-ink" dir="auto">
        {label}
      </span>
      <input
        type="date"
        value={value}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="font-en w-full rounded-xl border border-solid border-line bg-surface px-3 py-2 text-right text-xs font-normal leading-[1.5] text-ink outline-none"
      />
    </label>
  );
}
