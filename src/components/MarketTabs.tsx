import inkBar from '../assets/figma/bab1ce16d7a8ee274f4360fff6cc3b8442c1eb17.svg';

export type MarketTab = 'cashback' | 'offers' | 'vouchers';

const LABELS: Record<MarketTab, string> = {
  cashback: 'الكاش باك',
  offers: 'العروض',
  vouchers: 'القسائم',
};

/** Physical left→right order as drawn — reads الكاش باك … القسائم, so the
    القسائم tab is the first one in the RTL row. */
const DRAWN_ORDER: MarketTab[] = ['cashback', 'offers', 'vouchers'];

/**
 * 🗂️ السوق segment tabs — one component for every tab state, so the
 * cashback frame (1:7891) and the vouchers frame (65:23927) can't drift.
 * The selected tab carries the ink bar + brand-colored medium label.
 *
 * `order` is the physical left→right sequence; RTL reads it backwards, so
 * the last entry is the row's first tab. Inert unless `onChange` is passed
 * with the tabs that have a built screen: Phase 1 keeps the frozen,
 * unclickable version in its drawn order.
 */
export default function MarketTabs({
  active = 'cashback',
  available,
  order = DRAWN_ORDER,
  onChange,
}: {
  active?: MarketTab;
  available?: MarketTab[];
  order?: MarketTab[];
  onChange?: (tab: MarketTab) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex h-[45px] w-[375px] items-end justify-between border-b border-solid border-line bg-surface">
        {order.map((key) => (
          <div key={key} className="flex flex-[1_0_0] flex-row items-end self-stretch">
            <Tab
              label={LABELS[key]}
              active={active === key}
              onSelect={onChange && available?.includes(key) ? () => onChange(key) : undefined}
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
