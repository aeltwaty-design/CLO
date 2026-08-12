import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type Phase = 1 | 2;

/** Prototype version switch — Phase 1 = the frozen approved experience,
    Phase 2 = the working copy for upcoming iterations (identical until
    changes land) and the default tab. Resolved once per load: `?phase=`
    wins, then the browser tab's sessionStorage (so a mid-flow refresh stays
    in the chosen phase), else 2. The shell's Phase tabs hard-navigate with
    the param, restarting the demo at scenario 1. The QA gate pins itself to
    Phase 1 via an init script (see scripts/qa-diff.mjs). */
function resolvePhase(): Phase {
  const param = new URLSearchParams(window.location.search).get('phase');
  const stored = param ?? sessionStorage.getItem('cashback-phase');
  const phase: Phase = stored === '1' ? 1 : 2;
  sessionStorage.setItem('cashback-phase', String(phase));
  return phase;
}

export const PHASE: Phase = resolvePhase();

const Ctx = createContext<Phase>(PHASE);

export function PhaseProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={PHASE}>{children}</Ctx.Provider>;
}

/** Screens branch Phase-2 behavior on this; every screen reads 1 today. */
export function usePhase(): Phase {
  return useContext(Ctx);
}
