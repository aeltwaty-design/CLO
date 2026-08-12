import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

/** Transition phase 1 — points → cashback conversion rate: 10 pts = 1 ﷼. */
export const POINTS_RATE = 10;

type AppState = {
  /** Drives the before/after card-link variants of Market and Store details. */
  cardLinked: boolean;
  setCardLinked: (v: boolean) => void;
  /** Phase 2: `?intro=0` suppresses the recurring linking-intro sheet (QA /
      deep links). The sheet otherwise shows on every add-card entry until
      the first card is linked. */
  introSuppressed: boolean;
  /** Transition phase 1: live two-wallet balances. Defaults match the drawn
      demo world (5,000 pts / 560.50 ﷼); the converter and the redemption hub
      move them live. The withdrawal flow keeps its own pixel-pinned 560.50
      constants (documented seam). `?pts=` seeds the points balance. */
  points: number;
  cashback: number;
  convertPoints: (pts: number) => void;
  spendCashback: (amount: number) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  // The flow always starts at scenario 1 (before card linking); completing the
  // linking journey flips it live, and a page reload restarts the demo.
  // ?linked=1 / ?linked=0 remains as an explicit deep-link override (used by
  // scripts/qa-diff.mjs and demo links).
  const [cardLinked, setCardLinked] = useState(() => {
    const override = new URLSearchParams(window.location.search).get('linked');
    return override === '1';
  });

  // ?intro=0 suppresses the linking-intro sheet (deep links / QA)
  const [introSuppressed] = useState(
    () => new URLSearchParams(window.location.search).get('intro') === '0',
  );

  const [points, setPoints] = useState(() => {
    const seed = new URLSearchParams(window.location.search).get('pts');
    return seed !== null && Number.isFinite(Number(seed)) ? Math.max(0, Number(seed)) : 5000;
  });
  const [cashback, setCashback] = useState(560.5);

  const convertPoints = (pts: number) => {
    setPoints((p) => Math.max(0, p - pts));
    setCashback((c) => c + pts / POINTS_RATE);
  };
  const spendCashback = (amount: number) => setCashback((c) => Math.max(0, c - amount));

  return (
    <Ctx.Provider
      value={{ cardLinked, setCardLinked, introSuppressed, points, cashback, convertPoints, spendCashback }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside <AppStateProvider>');
  return v;
}
