import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { causeById, charityById, type Cause, type Charity } from '../data/charities';

/**
 * «تبرع فيها» (cause → charity → amount → PIN → status) — the picked cause,
 * organisation and amount live above the keyed ScreenTransition like
 * GiftState. Seeds for deep links + QA: `?dcause=orphans|sadaqah|relief|health`,
 * `?dcharity=<id>` (also presets its cause), `?damount=N`.
 */
type DonateState = {
  cause: Cause | null;
  setCause: (c: Cause | null) => void;
  charity: Charity | null;
  setCharity: (c: Charity | null) => void;
  amount: number;
  setAmount: (n: number) => void;
};

const Ctx = createContext<DonateState | null>(null);

export function DonateProvider({ children }: { children: ReactNode }) {
  const params = new URLSearchParams(window.location.search);
  const seedCharity = charityById(params.get('dcharity'));
  const [cause, setCause] = useState<Cause | null>(
    causeById(params.get('dcause')) ?? causeById(seedCharity?.causeId),
  );
  const [charity, setCharity] = useState<Charity | null>(seedCharity);
  const [amount, setAmount] = useState(Number(params.get('damount')) || 0);
  return (
    <Ctx.Provider value={{ cause, setCause, charity, setCharity, amount, setAmount }}>{children}</Ctx.Provider>
  );
}

export function useDonate() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDonate must be used inside <DonateProvider>');
  return v;
}
