import { useState } from 'react';
import MarketHeader from '../components/MarketHeader';
import MarketContent from '../components/MarketContent';
import TabBar from '../components/TabBar';
import LinkIntroSheet from '../components/LinkIntroSheet';
import { useAppState } from '../state/AppState';

/** السوق — Market hub, cashback tab (Figma 1:7750 before-link, 1:8098 after). */
export default function MarketScreen() {
  const { cardLinked, setIntroSeen } = useAppState();
  const [introOpen, setIntroOpen] = useState(false);
  // seeing the sheet here counts as the one-time intro (Phase-2 gate)
  const openIntro = () => {
    setIntroOpen(true);
    setIntroSeen(true);
  };
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <MarketHeader />
        <MarketContent linked={cardLinked} onStart={openIntro} />
      </div>
      <TabBar />
      <LinkIntroSheet open={introOpen} onClose={() => setIntroOpen(false)} />
    </div>
  );
}
