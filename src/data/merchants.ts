/**
 * Mock merchants — names/categories verbatim from the Figma designs.
 * `variant` maps a merchant to the Store-details design it demos, so every
 * design variant is reachable from the Market grid.
 */
export type StoreVariant = 'cashback' | 'offers' | 'vouchers';

export type Merchant = {
  id: string;
  name: string;
  category: string;
  cashbackPct: number;
  /** gold "لا يفوتك / ما يفوتك" badge + gold border */
  featured?: boolean;
  variant: StoreVariant;
  online?: boolean;
  inBranch?: boolean;
};

export const merchants: Record<string, Merchant> = {
  hm: {
    id: 'hm',
    name: 'إتش آند إم',
    category: 'الأزياء والملابس',
    cashbackPct: 5,
    featured: true,
    variant: 'cashback',
    online: true,
    inBranch: true,
  },
  ikea: {
    id: 'ikea',
    name: 'إيكيا',
    category: 'المنزل والأثاث',
    cashbackPct: 10,
    variant: 'offers',
    online: true,
  },
  panda: {
    id: 'panda',
    name: 'بنده',
    category: 'المنزل والأثاث',
    cashbackPct: 10,
    variant: 'cashback',
    inBranch: true,
  },
  zara: {
    id: 'zara',
    name: 'زارا',
    category: 'الأزياء والملابس',
    cashbackPct: 5,
    variant: 'vouchers',
    online: true,
    inBranch: true,
  },
  centrepoint: {
    id: 'centrepoint',
    name: 'سنتربوينت',
    category: 'المنزل والأثاث',
    cashbackPct: 10,
    variant: 'cashback',
    inBranch: true,
  },
  dunkin: {
    id: 'dunkin',
    name: 'دانكن دونتس',
    category: 'المنزل والأثاث',
    cashbackPct: 5,
    variant: 'cashback',
    inBranch: true,
  },
};

/** Grid order exactly as drawn in the before-link Market design (1:7750). */
export const marketGridBefore: Merchant[] = [
  merchants.hm,
  merchants.ikea,
  merchants.panda,
  merchants.zara,
  merchants.centrepoint,
  merchants.dunkin,
];

/** Grid order exactly as drawn in the after-link Market design (1:8098). */
export const marketGridAfter: Merchant[] = [
  merchants.hm,
  merchants.ikea,
  merchants.panda,
  merchants.zara,
  merchants.centrepoint,
  merchants.dunkin,
];

/** Store-details demo merchant (the designs show Hungerstation). */
export const storeDemo = {
  name: 'هنقرسيتشن',
  related: 'قهوة نمق',
};
