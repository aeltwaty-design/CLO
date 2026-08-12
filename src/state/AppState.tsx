import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type AppState = {
  /** Drives the before/after card-link variants of Market and Store details. */
  cardLinked: boolean;
  setCardLinked: (v: boolean) => void;
  /** Phase 2: `?intro=0` suppresses the recurring linking-intro sheet (QA /
      deep links). The sheet otherwise shows on every add-card entry until
      the first card is linked. */
  introSuppressed: boolean;
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

  return (
    <Ctx.Provider value={{ cardLinked, setCardLinked, introSuppressed }}>{children}</Ctx.Provider>
  );
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside <AppStateProvider>');
  return v;
}
