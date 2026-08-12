import { useNavigate } from 'react-router-dom';
import navHome from '../assets/icons/nav-home.svg';
import navBagActive from '../assets/icons/nav-bag-active.svg';
import navScan from '../assets/icons/nav-scan.svg';
import navWallet from '../assets/icons/nav-wallet.svg';
import navProfile from '../assets/icons/nav-profile.svg';
import navHomeActive from '../assets/figma/fb03e43bba6c59a5ffc3c39e261d88daa80f86f5.svg';
import navBag from '../assets/figma/eeacd3a51803c89b26f5136148817d0af54966f0.svg';
import { usePhase } from '../state/PhaseState';

/**
 * Bottom tab bar (Figma "Navbar", 375×80): frosted glass, rounded top,
 * elevated gradient scan button. DOM order matches the generated code's
 * physical order (حسابي leftmost … الرئيسية rightmost).
 * `active` picks the highlighted tab: 'market' (default, unchanged look) or
 * 'home' (Phase 2 Home — green bold home icon per Figma 47:4415, gray
 * outline bag). الرئيسية navigates to /home in Phase 2 only; السوق always
 * goes to /market; المحفظة jumps to the cashback wallet; the rest are visual.
 */
export default function TabBar({ active = 'market' }: { active?: 'market' | 'home' }) {
  const navigate = useNavigate();
  const phase = usePhase();
  const home = active === 'home';

  return (
    <nav className="absolute inset-x-0 bottom-0 flex h-20 items-center justify-between rounded-t-[32px] border border-white/40 bg-white/70 px-[19px] py-px backdrop-blur-[20px] shadow-[0px_25px_50px_0px_rgba(0,206,139,0.1)]">
      <TabItem icon={navProfile} label="حسابي" />
      <TabItem icon={navWallet} label="المحفظة" onClick={() => navigate('/cards')} />

      {/* elevated scan button */}
      <div className="relative h-4 w-16 shrink-0">
        <button
          type="button"
          className="absolute left-0 top-[-48px] flex size-16 items-center justify-center rounded-full border-4 border-[#f8fafc] bg-[linear-gradient(135deg,#00ce8b_0%,#00a16c_100%)] p-1 shadow-[0px_20px_25px_-5px_rgba(0,206,139,0.4),0px_8px_10px_-6px_rgba(0,206,139,0.1)]"
          aria-label="مسح"
        >
          <img src={navScan} alt="" className="size-8" />
        </button>
      </div>

      <TabItem icon={home ? navBag : navBagActive} label="السوق" active={!home} onClick={() => navigate('/market')} />
      <TabItem
        icon={home ? navHomeActive : navHome}
        label="الرئيسية"
        active={home}
        onClick={phase === 2 ? () => navigate('/home') : undefined}
      />
    </nav>
  );
}

function TabItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex shrink-0 flex-col items-center gap-1">
      <img src={icon} alt="" className="size-6" />
      <span
        className={
          active ? 'text-xs font-medium text-brand-400' : 'text-xs font-normal text-ink-secondary'
        }
      >
        {label}
      </span>
    </button>
  );
}
