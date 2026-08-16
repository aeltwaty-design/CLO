import inkBar from '../assets/figma/bab1ce16d7a8ee274f4360fff6cc3b8442c1eb17.svg';

export type MarketTab = 'cashback' | 'offers' | 'vouchers';

/** DOM order = physical order (الكاش باك leftmost … القسائم rightmost). */
const TABS: { key: MarketTab; label: string }[] = [
  { key: 'cashback', label: 'الكاش باك' },
  { key: 'offers', label: 'العروض' },
  { key: 'vouchers', label: 'القسائم' },
];

/**
 * 🗂️ السوق segment tabs — one component for every tab state, so the
 * cashback frame (1:7891) and the vouchers frame (65:23927) can't drift.
 * The selected tab carries the ink bar + brand-colored medium label.
 *
 * Inert unless `onChange` is passed with the tabs that have a built screen:
 * Phase 1 keeps the frozen, unclickable version.
 */
export default function MarketTabs({
  active = 'cashback',
  available,
  onChange,
}: {
  active?: MarketTab;
  available?: MarketTab[];
  onChange?: (tab: MarketTab) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex h-[45px] w-[375px] items-end justify-between border-b border-solid border-line bg-surface">
        {TABS.map((tab) => (
          <div key={tab.key} className="flex flex-[1_0_0] flex-row items-end self-stretch">
            <Tab
              label={tab.label}
              active={active === tab.key}
              onSelect={onChange && available?.includes(tab.key) ? () => onChange(tab.key) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Tab({ label, active, onSelect }: { label: string; active: boolean; onSelect?: () => void }) {
  const className = `relative flex h-full min-w-px flex-[1_0_0] ${active ? 'flex-col ' : ''}items-center justify-center overflow-clip`;
  const body = (
    <>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0">
          <div className="absolute inset-[-2px_0_0_0]">
            <img alt="" className="block size-full max-w-none" src={inkBar} />
          </div>
        </div>
      )}
      <div className="flex shrink-0 items-center justify-center gap-1">
        <div className="flex shrink-0 items-center justify-center gap-2.5 overflow-clip py-2">
          <p
            className={`whitespace-nowrap text-right text-[14px] leading-[1.5] ${active ? 'font-medium text-brand-400' : 'font-normal text-ink'}`}
            dir="auto"
          >
            {label}
          </p>
        </div>
      </div>
    </>
  );

  if (!onSelect) return <div className={className}>{body}</div>;
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onSelect} className={className}>
      {body}
    </button>
  );
}
