import { RouterProvider } from 'react-router-dom';
import { AppStateProvider, useAppState } from './state/AppState';
import { WithdrawProvider } from './state/WithdrawState';
import { PhaseProvider, usePhase, type Phase } from './state/PhaseState';
import { router } from './navigation/routes';

/**
 * Dev-only pixel-diff overlay: ?diff=<refId> renders design/refs/<refId>.png
 * in difference blend (matching pixels go black), ?onion=<refId> renders it
 * at 50% opacity. Used by the automated Figma-comparison loop.
 */
function DiffOverlay() {
  const params = new URLSearchParams(window.location.search);
  const diff = params.get('diff');
  const onion = params.get('onion');
  const id = diff ?? onion;
  if (!import.meta.env.DEV || !id) return null;
  return (
    <img
      src={`/refs/${id}.png`}
      alt=""
      className="pointer-events-none absolute left-0 top-0 z-[9999] w-[375px] max-w-none"
      style={diff ? { mixBlendMode: 'difference' } : { opacity: 0.5 }}
    />
  );
}

/** Demo chrome (desktop shell only): switch between the two prototype
    versions. A switch hard-navigates so each phase starts at scenario 1. */
function PhaseTabs() {
  const phase = usePhase();
  const go = (p: Phase) => {
    if (p === phase) return;
    sessionStorage.setItem('cashback-phase', String(p));
    window.location.href = `/?phase=${p}`;
  };
  return (
    <div className="phase-tabs" role="tablist" aria-label="Prototype version">
      {([2, 1] as const).map((p) => (
        <button key={p} type="button" role="tab" aria-selected={phase === p} onClick={() => go(p)}>
          Phase {p}
        </button>
      ))}
    </div>
  );
}

/** Screens quick-jump — labels → seeded deep links. `p: 2` forces Phase 2
    (screens that only exist there); everything else keeps the current phase. */
const SCREEN_LINKS: { label: string; url: string; p?: 2 }[] = [
  { label: 'Home (Phase 2)', url: '/home', p: 2 },
  { label: 'Market — before card', url: '/market?linked=0' },
  { label: 'Market — after card', url: '/market?linked=1' },
  { label: 'Store: cashback — before', url: '/store/hm?linked=0' },
  { label: 'Store: cashback — after', url: '/store/hm?linked=1' },
  { label: 'Store: offers — before', url: '/store/ikea?linked=0' },
  { label: 'Store: offers — after', url: '/store/ikea?linked=1' },
  { label: 'Store: vouchers — before', url: '/store/zara?linked=0' },
  { label: 'Store: vouchers — after', url: '/store/zara?linked=1' },
  { label: 'Linking: intro', url: '/cashback/intro' },
  { label: 'Linking: add card', url: '/cashback/add-card' },
  { label: 'Linking: success', url: '/cashback/success' },
  { label: 'Cashback wallet — before', url: '/cards?linked=0' },
  { label: 'Cashback wallet — after', url: '/cards?linked=1' },
  { label: 'Manage cards', url: '/cards/manage?linked=1' },
  { label: 'Manage cards — 3-card cap', url: '/cards/manage?linked=1&cards=3' },
  { label: 'Transactions', url: '/transactions?linked=1' },
  { label: 'Points wallet — before (Phase 2)', url: '/wallet?linked=0', p: 2 },
  { label: 'Points wallet — after (Phase 2)', url: '/wallet?linked=1', p: 2 },
  { label: 'Withdraw: choose account', url: '/withdraw/account?linked=1' },
  { label: 'Withdraw: new account', url: '/withdraw/new-account?linked=1' },
  { label: 'Withdraw: amount (seeded)', url: '/withdraw/amount?linked=1&waccount=1' },
  { label: 'Withdraw: summary (seeded)', url: '/withdraw/summary?linked=1&waccount=1&wamount=50' },
  { label: 'Withdraw: PIN (seeded)', url: '/withdraw/pin?linked=1&waccount=1&wamount=50' },
  { label: 'Withdraw: Touch ID', url: '/withdraw/pin?linked=1&touchid=1' },
  { label: 'Withdraw: success', url: '/withdraw/status?ok=1' },
  { label: 'Withdraw: success + receipt', url: '/withdraw/status?ok=1&waccount=1&wamount=50&linked=1' },
  { label: 'Withdraw: failure', url: '/withdraw/status?ok=0' },
];

/** Demo chrome (desktop shell only): card-state toggle, seeded edge-case
    shortcuts, screens quick-jump, cheat-sheet, and the factory reset. */
function DemoControls() {
  const phase = usePhase();
  const { cardLinked, setCardLinked } = useAppState();

  // hard navigation so URL-seeded provider state (linked/waccount/wamount/
  // cards/touchid) is re-read at load; current phase rides along
  const jump = (url: string, forced?: 2) => {
    const p = forced ?? phase;
    window.location.href = `${url}${url.includes('?') ? '&' : '?'}phase=${p}`;
  };

  return (
    <div className="demo-controls">
      <div className="demo-group">
        <span className="demo-label">Card state</span>
        <button type="button" aria-pressed={!cardLinked} onClick={() => setCardLinked(false)}>
          Before card
        </button>
        <button type="button" aria-pressed={cardLinked} onClick={() => setCardLinked(true)}>
          After card
        </button>
      </div>
      <div className="demo-group">
        <span className="demo-label">Shortcuts</span>
        <button type="button" onClick={() => jump('/home', 2)}>
          Home
        </button>
        <button type="button" onClick={() => jump('/withdraw/amount?linked=1&waccount=1&wamount=50')}>
          Withdraw demo
        </button>
        <button type="button" onClick={() => jump('/cards/manage?linked=1&cards=3')}>
          3 cards
        </button>
        <select
          value=""
          aria-label="Jump to screen"
          onChange={(e) => {
            const link = SCREEN_LINKS[Number(e.target.value)];
            if (link) jump(link.url, link.p);
          }}
        >
          <option value="" disabled>
            Jump to screen…
          </option>
          {SCREEN_LINKS.map((s, i) => (
            <option key={s.label} value={i}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="demo-group">
        <span className="demo-label">Cashback wallet</span>
        <button type="button" onClick={() => jump('/cards?linked=0')}>
          Empty state
        </button>
        <button type="button" onClick={() => jump('/cards?linked=1')}>
          Filled state
        </button>
      </div>
      <button
        type="button"
        className="demo-reset"
        onClick={() => {
          sessionStorage.clear();
          window.location.href = '/';
        }}
      >
        ↺ Reset
      </button>
      <details className="demo-cheats">
        <summary>Demo rules</summary>
        <p>
          PIN <code>000000</code> = wrong PIN (3 tries → failure) · <code>999999</code> = transfer failure · any other
          PIN succeeds. Seeds: <code>?linked=1/0</code> card state · <code>?waccount=1</code> account on file ·{' '}
          <code>?wamount=50</code> amount · <code>?cards=3</code> card cap · <code>?touchid=1</code> Touch ID ·{' '}
          <code>?phase=1/2</code> version. A reload restarts the demo.
        </p>
      </details>
    </div>
  );
}

function App() {
  return (
    <PhaseProvider>
      <AppStateProvider>
        <WithdrawProvider>
          <div className="app-shell">
            <PhaseTabs />
            <div className="stage">
              <div className="phone-frame">
                <RouterProvider router={router} />
                <DiffOverlay />
              </div>
              <DemoControls />
            </div>
          </div>
        </WithdrawProvider>
      </AppStateProvider>
    </PhaseProvider>
  );
}

export default App;
