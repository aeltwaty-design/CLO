import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { normalizeMsisdn, telcoById, type Telco } from '../data/telcos';

/**
 * «شحن رصيد جوال» (operator → number → amount → PIN → status) — the picked
 * operator, number and amount live above the keyed ScreenTransition like
 * GiftState. Seeds for deep links + QA: `?rop=stc|mobily|zain|virgin`,
 * `?rnum=05XXXXXXXX`, `?ramount=N`.
 */
type RechargeState = {
  telco: Telco | null;
  setTelco: (t: Telco | null) => void;
  number: string;
  setNumber: (n: string) => void;
  amount: number;
  setAmount: (n: number) => void;
};

const Ctx = createContext<RechargeState | null>(null);

export function RechargeProvider({ children }: { children: ReactNode }) {
  const params = new URLSearchParams(window.location.search);
  const [telco, setTelco] = useState<Telco | null>(telcoById(params.get('rop')));
  const [number, setNumber] = useState(normalizeMsisdn(params.get('rnum') ?? ''));
  const [amount, setAmount] = useState(Number(params.get('ramount')) || 0);
  return (
    <Ctx.Provider value={{ telco, setTelco, number, setNumber, amount, setAmount }}>{children}</Ctx.Provider>
  );
}

export function useRecharge() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useRecharge must be used inside <RechargeProvider>');
  return v;
}
