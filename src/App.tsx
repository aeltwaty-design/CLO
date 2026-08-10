import { RouterProvider } from 'react-router-dom';
import { AppStateProvider } from './state/AppState';
import { router } from './navigation/routes';

function App() {
  return (
    <AppStateProvider>
      <div className="app-shell">
        <div className="phone-frame">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppStateProvider>
  );
}

export default App;
