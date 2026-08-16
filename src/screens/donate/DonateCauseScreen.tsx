import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppState';
import { useDonate } from '../../state/DonateState';
import { CAUSES, type Cause } from '../../data/charities';
import Riyal from '../../components/Riyal';
import { IosStatusBar, FlowAppBar } from '../../components/redeem/FlowChrome';
import MaskGlyph from '../../components/redeem/MaskGlyph';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * وين تبي تتبرع؟ — first step of «تبرع فيها» (derived, no drawn frame). A
 * two-up tile grid in the Home `CategoryTile` language; a tap commits and
 * moves on, like the Market cards, so there is no CTA to press. Every glyph is
 * painted brand-green through its mask, since the four reused icons carry
 * different baked colours.
 */
export default function DonateCauseScreen() {
  const navigate = useNavigate();
  const { cashback } = useAppState();
  const { setCause, setCharity } = useDonate();

  const pick = (cause: Cause) => {
    setCause(cause);
    setCharity(null);
    navigate('/donate/charity');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto">
        <div className="flex w-full flex-col items-center gap-6 px-4 pb-8">
          <div className="-mx-4 flex w-[375px] flex-col items-start">
            <IosStatusBar />
            <FlowAppBar />
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 py-1.5">
              <p className="shrink-0 text-[15px] font-normal leading-none text-brand-400">
                <Riyal />
              </p>
              <p className="font-en shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                {fmtSar(cashback)}
              </p>
            </div>
            <p className="whitespace-nowrap text-right text-lg font-bold leading-[1.5] text-ink" dir="auto">
              تبرع فيها
            </p>
          </div>

          <div className="flex w-full flex-col items-end gap-3">
            <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              وين تبي تتبرع؟
            </p>
            <div className="flex w-[343px] flex-wrap items-start justify-between gap-3">
              {CAUSES.map((cause) => (
                <button
                  key={cause.id}
                  type="button"
                  onClick={() => pick(cause)}
                  data-testid={`cause-${cause.id}`}
                  className="flex w-[165px] shrink-0 cursor-pointer flex-col items-end gap-3 rounded-2xl border border-solid border-line bg-white p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <MaskGlyph src={cause.icon} size={20} className="bg-brand-400" />
                  </div>
                  <div className="flex w-full flex-col items-end gap-0.5 text-right leading-[1.5]">
                    <p className="w-full text-sm font-medium text-ink" dir="auto">
                      {cause.label}
                    </p>
                    <p className="w-full text-xs font-normal text-ink-tertiary" dir="auto">
                      {cause.blurb}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
