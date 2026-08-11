import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type BankAccount = {
  name: string;
  /** masked account tail as displayed, e.g. "**** 1234" */
  masked: string;
  initials: string;
};

/** Values drawn in the Figma section (27:9923). */
export const WITHDRAW_BALANCE = 560.5;
export const WITHDRAW_DAILY_LIMIT = 1000;
export const WITHDRAW_FEE = 1;
export const WITHDRAW_VAT = 0.15;

export const REGISTERED_ACCOUNT: BankAccount = { name: 'حمود الخضر', masked: '**** 1234', initials: 'HK' };

type WithdrawState = {
  account: BankAccount | null;
  setAccount: (a: BankAccount | null) => void;
  amount: number;
  setAmount: (n: number) => void;
};

const Ctx = createContext<WithdrawState | null>(null);

export function WithdrawProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [amount, setAmount] = useState(0);
  return <Ctx.Provider value={{ account, setAccount, amount, setAmount }}>{children}</Ctx.Provider>;
}

export function useWithdraw() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWithdraw must be used inside <WithdrawProvider>');
  return v;
}
