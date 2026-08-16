import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { giftLists, type GiftAudience, type GiftContact } from '../data/giftContacts';

/**
 * «أهدِها» gift flow (pick → amount → PIN → status) — audience, recipient
 * and amount live above the keyed ScreenTransition like WithdrawState.
 * Seeds for deep links + QA: `?gaud=colleagues|family` (also presets the
 * audience's first drawn contact as recipient) and `?gamount=N`.
 */
type GiftState = {
  audience: GiftAudience;
  setAudience: (a: GiftAudience) => void;
  recipient: GiftContact | null;
  setRecipient: (c: GiftContact | null) => void;
  amount: number;
  setAmount: (n: number) => void;
};

const Ctx = createContext<GiftState | null>(null);

export function GiftProvider({ children }: { children: ReactNode }) {
  const params = new URLSearchParams(window.location.search);
  const seedAud = params.get('gaud');
  const audSeed: GiftAudience | null = seedAud === 'family' ? 'family' : seedAud === 'colleagues' ? 'colleagues' : null;
  const [audience, setAudience] = useState<GiftAudience>(audSeed ?? 'colleagues');
  const [recipient, setRecipient] = useState<GiftContact | null>(audSeed ? giftLists[audSeed][0] : null);
  const [amount, setAmount] = useState(Number(params.get('gamount')) || 0);
  return (
    <Ctx.Provider value={{ audience, setAudience, recipient, setRecipient, amount, setAmount }}>
      {children}
    </Ctx.Provider>
  );
}

export function useGift() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useGift must be used inside <GiftProvider>');
  return v;
}
