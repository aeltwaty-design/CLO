import { RouterProvider } from 'react-router-dom';
import { AppStateProvider } from './state/AppState';
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
    window.location.href = `/market?phase=${p}`;
  };
  return (
    <div className="phase-tabs" role="tablist" aria-label="Prototype version">
      {([1, 2] as const).map((p) => (
        <button key={p} type="button" role="tab" aria-selected={phase === p} onClick={() => go(p)}>
          Phase {p}
        </button>
      ))}
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
            <div className="phone-frame">
              <RouterProvider router={router} />
              <DiffOverlay />
            </div>
          </div>
        </WithdrawProvider>
      </AppStateProvider>
    </PhaseProvider>
  );
}

export default App;
