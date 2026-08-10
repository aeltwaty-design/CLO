import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StoreScreen from '../StoreScreen';
import StoreCashbackAfter from './StoreCashbackAfter';
import StoreOffersBefore from './StoreOffersBefore';
import StoreOffersAfter from './StoreOffersAfter';
import StoreVouchersBefore from './StoreVouchersBefore';
import StoreVouchersAfter from './StoreVouchersAfter';
import PurchaseOfferSheet from '../../components/PurchaseOfferSheet';
import { merchants } from '../../data/merchants';
import { useAppState } from '../../state/AppState';

/**
 * /store/:id — picks the Store-details design by the merchant's product
 * variant (cashback / offers / vouchers) × card-link state, mirroring the
 * six Figma frames. Offer rows and voucher tiles open the تسوّق واربح sheet.
 */
export default function StoreRouter() {
  const { id } = useParams();
  const { cardLinked } = useAppState();
  const [offerOpen, setOfferOpen] = useState(false);
  const variant = (id && merchants[id]?.variant) || 'cashback';
  const openOffer = () => setOfferOpen(true);

  return (
    <div className="relative h-full">
      {variant === 'offers' &&
        (cardLinked ? <StoreOffersAfter onOfferTap={openOffer} /> : <StoreOffersBefore onOfferTap={openOffer} />)}
      {variant === 'vouchers' &&
        (cardLinked ? <StoreVouchersAfter onOfferTap={openOffer} /> : <StoreVouchersBefore onOfferTap={openOffer} />)}
      {variant === 'cashback' && (cardLinked ? <StoreCashbackAfter /> : <StoreScreen />)}
      <PurchaseOfferSheet open={offerOpen} onClose={() => setOfferOpen(false)} />
    </div>
  );
}
