/**
 * Voucher denominations — the ladder drawn in the القسائم section
 * (65:23784 → store details 65:25229): a face value in ﷼ bought with WO
 * points, some tiers discounted («وفر 20%»). Previously duplicated verbatim
 * inside both old store screens; this is the single source, shaped like
 * `merchants.ts`.
 */
export type Voucher = {
  /** face value of the voucher, in ﷼ */
  face: number;
  /** points price as drawn */
  points: number;
  /** struck-through points price on discounted tiers */
  wasPoints?: number;
  /** struck-through face value (tier 3 draws one) */
  wasFace?: number;
  /** «وفر N%» corner ribbon */
  save?: number;
};

export const VOUCHER_LADDER: Voucher[] = [
  { face: 100, points: 400, wasPoints: 500, save: 20 },
  { face: 200, points: 1000 },
  { face: 350, points: 1500, wasFace: 390, save: 20 },
  { face: 400, points: 2000 },
  { face: 500, points: 2500 },
];

/** Undiscounted rate (200→1,000 · 400→2,000 · 500→2,500) — used to price
    custom amounts, which don't carry a tier discount. */
export const POINTS_PER_RIYAL = 5;

export const CUSTOM_MIN = 10;
export const CUSTOM_MAX = 500;

/** Points due for a face value at a tier's own rate (custom → base rate). */
export function pointsFor(face: number, tier?: Voucher): number {
  const rate = tier ? tier.points / tier.face : POINTS_PER_RIYAL;
  return Math.round(face * rate);
}

/** Cashback price of a voucher: face value, 1:1. */
export function cashbackFor(face: number): number {
  return face;
}
