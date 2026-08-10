import { Outlet, useLocation } from 'react-router-dom';

/**
 * Enter-only RTL push: every route change slides the new screen in from the
 * left edge (forward direction in RTL). Each screen is its own scroll
 * container; the frame itself never scrolls.
 */
export default function ScreenTransition() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="screen screen-enter">
      <Outlet />
    </div>
  );
}
