import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type AppState = {
  /** Drives the before/after card-link variants of Market and Store details. */
  cardLinked: boolean;
  setCardLinked: (v: boolean) => void;
};

const Ctx = createContext<AppState | null>(null);

const KEY = 'cashback.cardLinked';

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [cardLinked, setCardLinked] = useState(() => {
    // ?linked=1 / ?linked=0 lets a demo start in either state explicitly
    const override = new URLSearchParams(window.location.search).get('linked');
    if (override === '1') return true;
    if (override === '0') return false;
    return sessionStorage.getItem(KEY) === '1';
  });

  useEffect(() => {
    sessionStorage.setItem(KEY, cardLinked ? '1' : '0');
  }, [cardLinked]);

  return <Ctx.Provider value={{ cardLinked, setCardLinked }}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside <AppStateProvider>');
  return v;
}
