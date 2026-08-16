/**
 * Mobile operators for the «شحن رصيد جوال» flow (derived, no drawn frame).
 * The Figma file carries no telecom branding at all, so every row stands on a
 * monogram tile (`BrandMark`) rather than a logo, and the tints below are
 * approximations of each operator's public colour — placeholders until real
 * assets exist, in the spirit of the drawn-hex exceptions already in the repo.
 */
export type Telco = {
  id: string;
  /** row title, as shown */
  name: string;
  /** short wordmark painted into the monogram tile */
  mark: string;
  /** monogram background — a Tailwind class, so tokens win where one exists */
  tint: string;
  /** the KSA mobile prefixes this operator issues */
  prefixes: string[];
};

export const TELCOS: Telco[] = [
  { id: 'stc', name: 'stc', mark: 'stc', tint: 'bg-[#4f008c]', prefixes: ['050', '053', '055'] },
  { id: 'mobily', name: 'موبايلي', mark: 'M', tint: 'bg-[#00a9e0]', prefixes: ['054', '056'] },
  { id: 'zain', name: 'زين', mark: 'Z', tint: 'bg-[#6c2c91]', prefixes: ['058', '059'] },
  { id: 'virgin', name: 'Virgin', mark: 'V', tint: 'bg-[#e10a0a]', prefixes: ['051'] },
];

export const telcoById = (id: string | null | undefined): Telco | null =>
  TELCOS.find((t) => t.id === id) ?? null;

/** Quick chips — written in physical order, so the RTL row reads 10 → 200. */
export const RECHARGE_CHIPS: number[][] = [
  [30, 20, 10],
  [200, 100, 50],
];

/** The demo user's own line, behind the «رقمي» chip. */
export const MY_NUMBER = '0551234567';

/** «اشحن لهم مره ثانية» — recents carry their operator, so a tap fills both. */
export type RecentTopup = { number: string; telcoId: string };

export const RECENT_TOPUPS: RecentTopup[] = [
  { number: '0561234567', telcoId: 'mobily' },
  { number: '0501112233', telcoId: 'stc' },
];

/** digits only, capped at a KSA mobile's ten (AddCardScreen precedent) */
export const normalizeMsisdn = (v: string) => v.replace(/\D/g, '').slice(0, 10);

export const isValidKsaMobile = (v: string) => /^05\d{8}$/.test(normalizeMsisdn(v));

/** 0551234567 → «055 123 4567» */
export function groupMsisdn(v: string): string {
  const d = normalizeMsisdn(v);
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6)].filter(Boolean).join(' ');
}

/** Whoever issues this prefix — powers the soft mismatch hint, never a block. */
export function telcoForNumber(v: string): Telco | null {
  const prefix = normalizeMsisdn(v).slice(0, 3);
  if (prefix.length < 3) return null;
  return TELCOS.find((t) => t.prefixes.includes(prefix)) ?? null;
}
