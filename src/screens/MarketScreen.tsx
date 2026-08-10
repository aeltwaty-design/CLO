import MarketHeader from '../components/MarketHeader';
import MarketContent from '../components/MarketContent';
import TabBar from '../components/TabBar';

/** السوق — Market hub, cashback tab (Figma 1:7750 before-link). */
export default function MarketScreen() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <MarketHeader />
        <MarketContent />
      </div>
      <TabBar />
    </div>
  );
}
