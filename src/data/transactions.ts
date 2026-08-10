/**
 * Mock transactions — content mirrors the "all transactions" design (1:10931):
 * grouped by day, Latin digits, amounts in SAR (riyal symbol drawn as icon).
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

export type TxGroup = { day: string; items: Tx[] };

export const txGroups: TxGroup[] = [
  {
    day: 'اليوم',
    items: [
      { id: 't1', type: 'cashback', title: 'اتش اند ام', time: 'اليوم، 08:30', amount: 20, status: 'pending' },
    ],
  },
  {
    day: 'أمس',
    items: [
      { id: 't2', type: 'withdraw', title: 'سحب لحساب', time: '08:30', amount: -100 },
      { id: 't3', type: 'refund', title: 'قهوة إرا', time: '08:30', amount: -20, status: 'refunded' },
      { id: 't4', type: 'transfer', title: 'تحويل لنقاط', time: '08:30', amount: -50 },
    ],
  },
  {
    day: 'الجمعة',
    items: [{ id: 't5', type: 'cashback', title: 'ايكيا', time: '08:30', amount: 20 }],
  },
  {
    day: 'الخميس',
    items: [
      { id: 't6', type: 'withdraw', title: 'سحب لحساب', time: '08:30', amount: -100 },
      { id: 't7', type: 'transfer', title: 'تحويل لنقاط', time: '08:30', amount: -50 },
    ],
  },
];
