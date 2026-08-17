import { RouterProvider } from 'react-router-dom';
import { AppStateProvider, useAppState } from './state/AppState';
import { WithdrawProvider } from './state/WithdrawState';
import { GiftProvider } from './state/GiftState';
import { VoucherProvider } from './state/VoucherState';
import { RechargeProvider } from './state/RechargeState';
import { DonateProvider } from './state/DonateState';
import { WalaOneProvider } from './state/WalaOneState';
import { PhaseProvider, usePhase, type Phase } from './state/PhaseState';
import { router } from './navigation/routes';
import CommentLayer from './comments/CommentLayer';
import CommentsPanel from './comments/CommentsPanel';
import { SCREEN_LINKS } from './navigation/screenLinks';

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
        {/* the 3-4 hottest demos only — everything else lives in the jump menu */}
        <span className="demo-label">Shortcuts</span>
        <button type="button" onClick={() => jump('/home', 2)}>
          Home
        </button>
        <button type="button" onClick={() => jump('/withdraw/amount?linked=1&waccount=1&wamount=50')}>
          Withdraw demo
        </button>
        <button type="button" onClick={() => jump('/recharge/operator?linked=1', 2)}>
          Recharge demo
        </button>
        <button type="button" onClick={() => jump('/donate/cause?linked=1', 2)}>
          Donate demo
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
          <code>?rop=stc</code>/<code>?rnum=</code>/<code>?ramount=</code> recharge ·{' '}
          <code>?w1amount=</code>/<code>?w1phone=</code>/<code>?w1v=1</code> WalaOne (OTP <code>00000</code> = wrong,
          number <code>5 0000 0000</code> = unlinked) ·{' '}
          <code>?dcause=</code>/<code>?dcharity=</code>/<code>?damount=</code> donation ·{' '}
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
          <GiftProvider>
            <VoucherProvider>
              <RechargeProvider>
                <DonateProvider>
                <WalaOneProvider>
                  <div className="app-shell">
                    <PhaseTabs />
                    <div className="stage">
                      <div className="phone-frame">
                        <RouterProvider router={router} />
                        <DiffOverlay />
                        <CommentLayer />
                      </div>
                      <DemoControls />
                      <CommentsPanel />
                    </div>
                  </div>
                </WalaOneProvider>
                </DonateProvider>
              </RechargeProvider>
            </VoucherProvider>
          </GiftProvider>
        </WithdrawProvider>
      </AppStateProvider>
    </PhaseProvider>
  );
}

export default App;
