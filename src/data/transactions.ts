/**
 * Mock transactions — semantic mirror of the "all transactions" design
 * (1:10931): grouped by day, Latin digits, amounts in SAR (riyal symbol
 * drawn as an icon glyph). The drawn screen keeps its own pixel-pinned
 * presentational rows (TransactionsScreen `sections`); this list carries the
 * same 9 rows with real dates for the statement export.
 */
export type TxType = 'cashback' | 'withdraw' | 'transfer' | 'refund';

export type Tx = {
  id: string;
  type: TxType;
  /** merchant or operation label, verbatim */
  title: string;
  time: string;
  /** signed amount as displayed (Latin digits) */
  amount: number;
  /** status pill under the amount, when present */
  status?: 'pending' | 'refunded';
};

export type TxGroup = { day: string; dayOffset: number; items: Tx[] };

/** Statement labels for the semantic type. */
export const TX_TYPE_LABEL: Record<TxType, string> = {
  cashback: 'كاش باك',
  withdraw: 'سحب',
  transfer: 'تحويل نقاط',
  refund: 'مسترجعة',
};

export const TX_STATUS_LABEL: Record<NonNullable<Tx['status']>, string> = {
  pending: 'قيد الإضافة',
  refunded: 'مسترجعة',
};

/** Absolute date for a drawn day label, anchored to runtime "today". */
export function txDate(dayOffset: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - dayOffset);
  return d;
}

/** Day labels as drawn: اليوم، أمس، then the trailing weekday sections. */
export const txGroups: TxGroup[] = [
  {
    day: 'اليوم',
    dayOffset: 0,
    items: [
      { id: 't1', type: 'cashback', title: 'اتش اند ام', time: '08:30', amount: 20, status: 'pending' },
    ],
  },
  {
    day: 'أمس',
    dayOffset: 1,
    items: [
      { id: 't2', type: 'withdraw', title: 'سحب لحساب', time: '08:30', amount: -100 },
      { id: 't3', type: 'refund', title: 'قهوة إرا', time: '08:30', amount: -20, status: 'refunded' },
      { id: 't4', type: 'transfer', title: 'تحويل لنقاط', time: '08:30', amount: -50 },
    ],
  },
  {
    day: 'الجمعة',
    dayOffset: 2,
    items: [{ id: 't5', type: 'cashback', title: 'ايكيا', time: '08:30', amount: 20 }],
  },
  {
    day: 'الخميس',
    dayOffset: 3,
    items: [
      { id: 't6', type: 'withdraw', title: 'سحب لحساب', time: '08:30', amount: -100 },
      { id: 't7', type: 'transfer', title: 'تحويل لنقاط', time: '08:30', amount: -50 },
      { id: 't8', type: 'cashback', title: 'اسواق التميمي', time: '08:30', amount: 20 },
    ],
  },
  {
    day: 'الأربعاء',
    dayOffset: 4,
    items: [{ id: 't9', type: 'cashback', title: 'اسواق التميمي', time: '08:30', amount: 20 }],
  },
];

/** Flat statement rows (newest first), each with its absolute date. */
export type StatementTx = Tx & { date: Date };

export function statementTxs(): StatementTx[] {
  return txGroups.flatMap((g) => g.items.map((t) => ({ ...t, date: txDate(g.dayOffset) })));
}
