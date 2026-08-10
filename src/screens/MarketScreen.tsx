import MarketHeader from '../components/MarketHeader';
import MarketContent from '../components/MarketContent';
import TabBar from '../components/TabBar';
import { useAppState } from '../state/AppState';

/** السوق — Market hub, cashback tab (Figma 1:7750 before-link, 1:8098 after). */
export default function MarketScreen() {
  const { cardLinked } = useAppState();
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <MarketHeader />
        <MarketContent linked={cardLinked} />
      </div>
      <TabBar />
    </div>
  );
}
