import { useSearchParams } from 'react-router-dom';
import CardsScreen from './CardsScreen';
import { CardsEmpty, CardsThree, CardsZero } from './CardsVariants';
import { useAppState } from '../state/AppState';

/**
 * /cards — wallet home. Before any linking the design shows the zero-balance
 * onboarding wallet (1:10736); after linking, the populated wallet (1:10563).
 */
export function CardsHome() {
  const { cardLinked } = useAppState();
  return cardLinked ? <CardsScreen /> : <CardsZero />;
}

/**
 * /cards/manage — «البطاقات المضافة» list. One linked card by default
 * (1:10520); `?cards=3` demos the three-card cap state (1:10838).
 */
export function CardsManage() {
  const [params] = useSearchParams();
  return params.get('cards') === '3' ? <CardsThree /> : <CardsEmpty />;
}
