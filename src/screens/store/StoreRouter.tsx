import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import StoreScreen from '../StoreScreen';
import StoreCashbackAfter from './StoreCashbackAfter';
import StoreOffersBefore from './StoreOffersBefore';
import StoreOffersAfter from './StoreOffersAfter';
import StoreVouchersBefore from './StoreVouchersBefore';
import StoreVouchersAfter from './StoreVouchersAfter';
import StoreVoucherDetails from './StoreVoucherDetails';
import StoreVoucherHub from './StoreVoucherHub';
import { usePhase, IS_TEMP } from '../../state/PhaseState';
import PurchaseOfferSheet from '../../components/PurchaseOfferSheet';
import LinkIntroSheet, { useLinkIntroGate } from '../../components/LinkIntroSheet';
import { merchants } from '../../data/merchants';
import { offerStoreBrands } from '../../data/offerStores';
import { useAppState } from '../../state/AppState';

/**
 * /store/:id — picks the Store-details design by the merchant's product
 * variant (cashback / offers / vouchers) × card-link state, mirroring the
 * six Figma frames. Offer rows and voucher tiles open the تسوّق واربح sheet.
 *
 * Phase 2 routes every vouchers merchant to the buyable store page
 * (65:25229); Phase 1 keeps the frozen drawn pair.
 */
export default function StoreRouter() {
  const { id } = useParams();
  const { cardLinked } = useAppState();
  const phase = usePhase();
  const [offerOpen, setOfferOpen] = useState(false);
  const [params] = useSearchParams();
  // ?variant=offers — Temp's العروض rows force the +offers design for any
  // store; the brand strip then reads as that store (data/offerStores.ts)
  const forcedOffers = params.get('variant') === 'offers';
  const variant = forcedOffers ? 'offers' : (id && merchants[id]?.variant) || 'cashback';
  const brand = variant === 'offers' && id ? offerStoreBrands[id] : undefined;
  const openOffer = () => setOfferOpen(true);
  // Temp (user direction): every «ضفها مرة وحدة» on the store pages — the
  // before-link dock and the offer sheet's CTA — starts the new linking flow
  // (intro sheet over the store, then add-card) instead of the drawn
  // full-screen /cashback/intro. Phase 1/2 keep the old target.
  const { introOpen, startLinking, closeIntro } = useLinkIntroGate();
  const onLink = IS_TEMP ? startLinking : undefined;
  const offerCta =
    IS_TEMP && !cardLinked
      ? () => {
          setOfferOpen(false);
          startLinking();
        }
      : undefined;

  return (
    <div className="relative h-full">
      {variant === 'offers' &&
        (cardLinked ? (
          <StoreOffersAfter onOfferTap={openOffer} brand={brand} />
        ) : (
          <StoreOffersBefore onOfferTap={openOffer} onLink={onLink} brand={brand} />
        ))}
      {variant === 'vouchers' &&
        (phase >= 2 ? (
          // Temp: the redrawn vouchers page (135:6477); Phase 2 keeps 65:25229
          IS_TEMP ? (
            <StoreVoucherHub />
          ) : (
            <StoreVoucherDetails />
          )
        ) : cardLinked ? (
          <StoreVouchersAfter onOfferTap={openOffer} />
        ) : (
          <StoreVouchersBefore onOfferTap={openOffer} />
        ))}
      {variant === 'cashback' && (cardLinked ? <StoreCashbackAfter /> : <StoreScreen onLink={onLink} />)}
      <PurchaseOfferSheet open={offerOpen} onClose={() => setOfferOpen(false)} onCta={offerCta} />
      <LinkIntroSheet open={introOpen} onClose={closeIntro} />
    </div>
  );
}
