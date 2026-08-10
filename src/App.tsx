import { RouterProvider } from 'react-router-dom';
import { AppStateProvider } from './state/AppState';
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

function App() {
  return (
    <AppStateProvider>
      <div className="app-shell">
        <div className="phone-frame">
          <RouterProvider router={router} />
          <DiffOverlay />
        </div>
      </div>
    </AppStateProvider>
  );
}

export default App;
