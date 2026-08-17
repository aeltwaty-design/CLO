import type { Location } from 'react-router-dom';

/**
 * Screen identity for comment pins. Two views share pins only when they
 * render the same content, so the key folds in:
 * - the phase (Phase 1 and 2 draw different screens at the same paths),
 * - the pathname,
 * - the state params that actually change what renders (`tab`, `ok`, `aud`,
 *   `touchid`, `cards`),
 * - and the live card-linked flag — but ONLY on paths that branch on it.
 *   Folding it in everywhere would orphan pins on seeded deep links, which
 *   always carry `linked=1` (PIN/status/amount screens render identically
 *   either way).
 *
 * Known limitation, by design: pins cannot address an open bottom sheet —
 * they anchor to the base screen's content space.
 */
const STATE_PARAMS = ['tab', 'ok', 'aud', 'touchid', 'cards'] as const;

const LINKED_BRANCHING = [/^\/market$/, /^\/store\//, /^\/cards$/, /^\/cards\/manage$/, /^\/home$/, /^\/wallet$/];

export function variantKey(location: Location, phase: number, cardLinked: boolean): string {
  const params = new URLSearchParams(location.search);
  const parts = [`p${phase}`, location.pathname];
  for (const k of STATE_PARAMS) {
    const v = params.get(k);
    if (v !== null) parts.push(`${k}=${v}`);
  }
  if (LINKED_BRANCHING.some((re) => re.test(location.pathname))) {
    parts.push(`linked=${cardLinked ? 1 : 0}`);
  }
  return parts.join('|');
}
