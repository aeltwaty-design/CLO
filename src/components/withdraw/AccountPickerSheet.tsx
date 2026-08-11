import { useState } from 'react';
import { REGISTERED_ACCOUNT, type BankAccount } from '../../state/WithdrawState';
import logoRajhi from '../../assets/figma/fc9093d8b1f3e66d5cff563745493839df241a3f.png';
import logoInma from '../../assets/figma/3d1b7cac6d44e66711b96a4bfd2ee3c8fc9f4962.png';
import logoBilad from '../../assets/figma/c3fc1722916613bb5b2b87f2ec3523113731164f.png';
import logoJazira from '../../assets/figma/3fdffe9e4d884040000e121c83c846c2f5e0f57b.png';
import iconSearch from '../../assets/figma/be70612d9291d97aba8c06dc049ca660859fbab9.svg';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';

/** Per-bank logo crop, exactly as the Figma media frames draw each source. */
export type WithdrawBank = { name: string; logo: string; crop: 'zoom' | 'contain' | 'inset' };

export const WITHDRAW_BANKS: WithdrawBank[] = [
  { name: 'مصرف الراجحي', logo: logoRajhi, crop: 'zoom' },
  { name: 'مصرف الإنماء', logo: logoInma, crop: 'contain' },
  { name: 'بنك البلاد', logo: logoBilad, crop: 'contain' },
  { name: 'بنك الجزيرة', logo: logoJazira, crop: 'inset' },
];

/** The design repeats the 4 banks over 11 rows (Branch 05…16). */
const ROW_COUNT = 11;

/** 24px rounded-sm media tile with the bank's drawn crop (also used by the
    new-account screen's «بنك المستفيد» dropdown once a bank is picked). */
export function BankLogo({ bank }: { bank: WithdrawBank }) {
  return (
    <div className="relative size-6 shrink-0 rounded-sm">
      {bank.crop === 'contain' ? (
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-sm object-contain" src={bank.logo} />
      ) : (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm">
          {bank.crop === 'zoom' ? (
            <img alt="" className="absolute left-[-31.25%] top-[-31.25%] size-[162.5%] max-w-none" src={bank.logo} />
          ) : (
            <img alt="" className="absolute left-[8.25%] top-[8.33%] h-[82.7%] w-[83.82%] max-w-none" src={bank.logo} />
          )}
        </div>
      )}
    </div>
  );
}

type AccountPickerSheetProps = {
  open: boolean;
  onClose: () => void;
  onPick: (a: BankAccount) => void;
};

/**
 * «بنك المستفيد» — 754px bottom sheet (Figma 27:11408 "choose"): search field
 * plus a radio list of beneficiary banks (the 4 bank rows repeat, first row
 * selected by default, exactly as drawn). Backdrop + slide-up follow the house
 * sheet idiom (PurchaseOfferSheet keyframes).
 *
 * Note: the frame's rows are banks, not registered accounts, while the prop
 * contract carries a BankAccount — a pick maps the row label onto the
 * REGISTERED_ACCOUNT fallback shape ({ name: bank, masked, initials }).
 */
export default function AccountPickerSheet({ open, onClose, onPick }: AccountPickerSheetProps) {
  const [selected, setSelected] = useState(0);
  if (!open) return null;

  const pick = (row: number) => {
    setSelected(row);
    const bank = WITHDRAW_BANKS[row % WITHDRAW_BANKS.length];
    onPick({ name: bank.name, masked: REGISTERED_ACCOUNT.masked, initials: REGISTERED_ACCOUNT.initials });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50">
      <style>{'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'}</style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex h-[754px] flex-col items-center rounded-t-[10px] bg-surface pt-3"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
      >
        {/* Section header */}
        <div className="flex w-full shrink-0 flex-col items-end gap-1 px-4 py-2">
          <div className="flex w-full shrink-0 flex-col items-end">
            <div className="flex w-full shrink-0 items-center gap-2">
              <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-1.5">
                <p className="shrink-0 whitespace-nowrap text-right text-base font-medium leading-[1.5] text-ink" dir="auto">
                  بنك المستفيد
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🕵🏻 Search + bank list */}
        <div className="flex min-h-px w-full flex-[1_0_0] flex-col items-end gap-[18px] overflow-y-auto px-4 py-5">
          <div className="flex w-full shrink-0 flex-col items-end gap-1">
            <div className="flex w-full flex-col items-end">
              <div className="flex h-[38px] w-full items-center justify-end overflow-clip rounded-lg border border-solid border-[#ccd2e0] bg-surface px-3 py-2.5">
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
                  <input
                    type="text"
                    dir="auto"
                    placeholder="ابحث هنا .."
                    className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                  />
                  <div className="relative size-4 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2.5">
            {Array.from({ length: ROW_COUNT }, (_, row) => {
              const bank = WITHDRAW_BANKS[row % WITHDRAW_BANKS.length];
              const isSelected = row === selected;
              return (
                <div key={row} className="contents">
                  {row > 0 && (
                    <div className="flex w-full shrink-0 flex-col items-start">
                      <div className="relative h-px w-full shrink-0 bg-line-subtle" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => pick(row)}
                    className="flex w-full shrink-0 cursor-pointer items-center justify-end gap-2.5 py-1.5"
                  >
                    {isSelected ? (
                      <div className="relative size-4 shrink-0 overflow-clip rounded-lg border border-solid border-brand-400 bg-brand-400">
                        <div className="absolute inset-[calc(31.25%-0.38px)]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
                        </div>
                      </div>
                    ) : (
                      <div className="relative size-4 shrink-0 rounded-lg border border-solid border-line bg-surface" />
                    )}
                    <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
                      <p className="shrink-0 whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
                        {bank.name}
                      </p>
                      <BankLogo bank={bank} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
