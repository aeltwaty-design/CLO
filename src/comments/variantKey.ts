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

/** Inverse of the join above — the inbox rebuilds seed URLs from it. */
export function parseVariant(variant: string): { phase: string; path: string; params: Record<string, string> } {
  const parts = variant.split('|');
  const phase = (parts[0] ?? 'p2').replace(/^p/, '');
  const path = parts[1] ?? '/';
  const params: Record<string, string> = {};
  for (const seg of parts.slice(2)) {
    const i = seg.indexOf('=');
    if (i > 0) params[seg.slice(0, i)] = seg.slice(i + 1);
  }
  return { phase, path, params };
}

/**
 * Jump-to-pin URL: seed-entry params (so guarded screens don't bounce their
 * redirects) ← overlaid by the variant's own params ← phase ← extras
 * (`comments=1&focus=<id>`).
 */
export function variantToSearch(
  variant: string,
  seedSearch: string | null,
  extra: Record<string, string>,
): { path: string; search: string } {
  const { phase, path, params } = parseVariant(variant);
  const sp = new URLSearchParams(seedSearch ?? '');
  for (const [k, v] of Object.entries(params)) sp.set(k, v);
  sp.set('phase', phase);
  for (const [k, v] of Object.entries(extra)) sp.set(k, v);
  return { path, search: sp.toString() };
}
