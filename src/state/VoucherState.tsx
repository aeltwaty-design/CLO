import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { VOUCHER_LADDER, pointsFor, type Voucher } from '../data/vouchers';

export type PayMethod = 'points' | 'cashback' | 'split';

/** The voucher being bought: a drawn tier, or a custom («مبلغ مخصص») face. */
export type PickedVoucher = {
  face: number;
  points: number;
  tier?: Voucher;
  custom?: boolean;
  /** cashback price when it isn't the face value 1:1 (the CASHBACK_DEAL row) */
  cashbackPrice?: number;
};

/**
 * Voucher purchase flow (store details → شراء قسيمة drawer → PIN → success).
 * Lives above the pathname-keyed ScreenTransition like WithdrawState/GiftState.
 * Seeds for deep links + QA: `?vstore=`, `?vface=` (drawn tier or custom
 * value), `?vpay=points|cashback|split`, `?vcash=` (split's cashback part).
 */
type VoucherState = {
  storeId: string | null;
  setStoreId: (id: string | null) => void;
  voucher: PickedVoucher | null;
  setVoucher: (v: PickedVoucher | null) => void;
  method: PayMethod;
  setMethod: (m: PayMethod) => void;
  /** ﷼ paid from cashback when the method is 'split' */
  cashbackPart: number;
  setCashbackPart: (n: number) => void;
  /** minted on a successful purchase, shown on the success ticket */
  code: string | null;
  setCode: (c: string | null) => void;
};

const Ctx = createContext<VoucherState | null>(null);

function seedVoucher(faceSeed: string | null): PickedVoucher | null {
  const face = Number(faceSeed);
  if (!face || face <= 0) return null;
  const tier = VOUCHER_LADDER.find((v) => v.face === face);
  return { face, points: pointsFor(face, tier), tier, custom: !tier };
}

export function VoucherProvider({ children }: { children: ReactNode }) {
  const params = new URLSearchParams(window.location.search);
  const [storeId, setStoreId] = useState<string | null>(params.get('vstore'));
  const [voucher, setVoucher] = useState<PickedVoucher | null>(() => seedVoucher(params.get('vface')));
  const [method, setMethod] = useState<PayMethod>(() => {
    const m = params.get('vpay');
    return m === 'cashback' || m === 'split' ? m : 'points';
  });
  const [cashbackPart, setCashbackPart] = useState(() => Number(params.get('vcash')) || 0);
  const [code, setCode] = useState<string | null>(null);

  return (
    <Ctx.Provider
      value={{ storeId, setStoreId, voucher, setVoucher, method, setMethod, cashbackPart, setCashbackPart, code, setCode }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useVoucher() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useVoucher must be used inside <VoucherProvider>');
  return v;
}

/** What a purchase costs, given the picked voucher and payment method. */
export function priceOf(voucher: PickedVoucher, method: PayMethod, cashbackPart: number) {
  if (method === 'points') return { cashback: 0, points: voucher.points };
  const full = voucher.cashbackPrice ?? voucher.face;
  if (method === 'cashback') return { cashback: full, points: 0 };
  const part = Math.min(Math.max(0, cashbackPart), full);
  // the remainder bills in points at this tier's own rate, so a split never
  // costs more than either pure method
  return { cashback: part, points: Math.round(((full - part) * voucher.points) / full) };
}
