import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type Phase = 1 | 2 | 3;

/** Prototype version switch — Phase 1 = the frozen approved experience,
    Phase 2 = the working copy for upcoming iterations and the default tab,
    Phase 3 = «Temp»: Phase 2 plus the stakeholder copy pass (and the #51
    zero-balance preview), kept apart so it can be reviewed side by side
    before anything is promoted into Phase 2. Resolved once per load:
    `?phase=` wins, then the browser tab's sessionStorage (so a mid-flow
    refresh stays in the chosen phase), else 2. The shell's Phase tabs
    hard-navigate with the param, restarting the demo at scenario 1. The QA
    gate pins itself to Phase 1 via an init script (see scripts/qa-diff.mjs).

    Two branching rules keep the three apart:
    - lineage gates («is this the Phase-2 experience?») test `phase >= 2`,
      so Temp inherits every Phase-2 behavior;
    - Temp-only deltas branch on `IS_TEMP` as `IS_TEMP ? <new> : <old>` — new
      first, old second, at the smallest node that contains the change — so
      Phase 1 and Phase 2 both take the old branch and `git grep IS_TEMP` is
      the exact list to promote (keep each `<new>`, delete the constant). */
function resolvePhase(): Phase {
  const param = new URLSearchParams(window.location.search).get('phase');
  const stored = param ?? sessionStorage.getItem('cashback-phase');
  const phase: Phase = stored === '1' ? 1 : stored === '3' ? 3 : 2;
  sessionStorage.setItem('cashback-phase', String(phase));
  return phase;
}

export const PHASE: Phase = resolvePhase();

/** True in the «Temp» copy-review version only. */
export const IS_TEMP = PHASE === 3;

export const PHASE_LABEL: Record<Phase, string> = { 1: 'Phase 1', 2: 'Phase 2', 3: 'Temp' };

const Ctx = createContext<Phase>(PHASE);

export function PhaseProvider({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={PHASE}>{children}</Ctx.Provider>;
}

/** Screens branch Phase-2 lineage on `usePhase() >= 2`. */
export function usePhase(): Phase {
  return useContext(Ctx);
}
