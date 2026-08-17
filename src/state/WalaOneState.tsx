import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * «تحويل لنقاط ولاء ون» (drawn ولاء ون section 108:45207; adapted points →
 * cashback per user direction: the converter spends the live cashback
 * balance at the drawn 1:50 rate). Amount, wallet phone number and its
 * verified flag live above the keyed ScreenTransition like GiftState.
 * Seeds for deep links + QA: `?w1amount=N`, `?w1phone=5XXXXXXXX`,
 * `?w1v=1` (phone already verified).
 */
type WalaOneState = {
  amount: number;
  setAmount: (n: number) => void;
  phone: string;
  setPhone: (p: string) => void;
  verified: boolean;
  setVerified: (v: boolean) => void;
};

const Ctx = createContext<WalaOneState | null>(null);

export function WalaOneProvider({ children }: { children: ReactNode }) {
  const params = new URLSearchParams(window.location.search);
  const [amount, setAmount] = useState(Number(params.get('w1amount')) || 0);
  const [phone, setPhone] = useState((params.get('w1phone') ?? '').replace(/\D/g, '').slice(0, 9));
  const [verified, setVerified] = useState(params.get('w1v') === '1');
  return (
    <Ctx.Provider value={{ amount, setAmount, phone, setPhone, verified, setVerified }}>{children}</Ctx.Provider>
  );
}

export function useWalaOne() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWalaOne must be used inside <WalaOneProvider>');
  return v;
}
