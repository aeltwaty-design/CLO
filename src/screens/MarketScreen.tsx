import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MarketHeader from '../components/MarketHeader';
import MarketContent from '../components/MarketContent';
import type { MarketTab } from '../components/MarketTabs';
import TabBar from '../components/TabBar';
import LinkIntroSheet from '../components/LinkIntroSheet';
import { useAppState } from '../state/AppState';
import { usePhase } from '../state/PhaseState';

/** Tabs with a built screen. */
const PHASE2_TABS: MarketTab[] = ['cashback', 'vouchers', 'offers'];

/** Physical left→right order, so the RTL row reads الكاش باك · القسائم ·
    العروض (user direction: cashback first and default, vouchers next).
    Phase 1 keeps the drawn order. */
const PHASE2_TAB_ORDER: MarketTab[] = ['offers', 'vouchers', 'cashback'];

/**
 * السوق — Market hub. الكاش باك tab: Figma 1:7750 before-link / 1:8098 after.
 * Phase 2 adds the live القسائم tab (65:23785) — `?tab=vouchers` deep-links
 * it; Phase 1 keeps the frozen, single-tab version.
 */
export default function MarketScreen() {
  const { cardLinked } = useAppState();
  const phase = usePhase();
  // `?tab=vouchers` seeds the tab and re-selects it on later arrivals (the
  // route transition is keyed by pathname, so /market → /market?tab= is a
  // same-screen update — e.g. the redemption hub's «اشترِ قسائم»)
  const [params] = useSearchParams();
  const seed = params.get('tab');
  const urlTab: MarketTab = seed === 'vouchers' ? 'vouchers' : seed === 'offers' ? 'offers' : 'cashback';
  const [tab, setTab] = useState<MarketTab>(urlTab);
  useEffect(() => setTab(urlTab), [urlTab]);
  const [introOpen, setIntroOpen] = useState(false);
  const openIntro = () => setIntroOpen(true);
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto">
        <MarketHeader />
        <MarketContent
          linked={cardLinked}
          onStart={openIntro}
          tab={phase === 2 ? tab : 'cashback'}
          tabsAvailable={phase === 2 ? PHASE2_TABS : undefined}
          tabsOrder={phase === 2 ? PHASE2_TAB_ORDER : undefined}
          onTabChange={phase === 2 ? setTab : undefined}
        />
      </div>
      <TabBar />
      <LinkIntroSheet open={introOpen} onClose={() => setIntroOpen(false)} />
    </div>
  );
}
