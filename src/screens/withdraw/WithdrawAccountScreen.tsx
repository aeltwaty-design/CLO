import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWithdraw, REGISTERED_ACCOUNT, type BankAccount } from '../../state/WithdrawState';
import coinWo from '../../assets/figma/1fc63f5f61f3f22b61f4543f37dec854ea9f0818.svg';
import iconBack from '../../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconChevronLeft from '../../assets/figma/799e69f6bf3b072fd575e5ef3e7a3f09fc624b98.svg';
import iconPlus from '../../assets/figma/14c85ef465655fa993a62a1144bbd4ae741bce50.svg';
import iconSearch from '../../assets/figma/7e784d450e713f5e771409c8ebed7f9f7b1ad69f.svg';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';

/**
 * اختر الحساب — pick the payout account for the withdraw flow (Figma 27:9927
 * default / 27:10402 selected, 375×812). «حساب بنكي جديد» dashed row opens the
 * add-account form; the registered-account list is a radio group (the design
 * repeats the same account 4×). Selecting a row turns it brand-50 with a green
 * border, fills the radio, flips the avatar to white, and enables the CTA.
 */

/** The list frame draws REGISTERED_ACCOUNT four times verbatim. */
const ACCOUNTS: BankAccount[] = [REGISTERED_ACCOUNT, REGISTERED_ACCOUNT, REGISTERED_ACCOUNT, REGISTERED_ACCOUNT];

export default function WithdrawAccountScreen() {
  const navigate = useNavigate();
  const { setAccount } = useWithdraw();
  const [selected, setSelected] = useState<number | null>(null);

  const submit = () => {
    if (selected === null) return;
    setAccount(ACCOUNTS[selected]);
    navigate('/withdraw/amount');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto pb-[75px]">
        {/* 🧭 App bar */}
        <div className="flex w-full shrink-0 items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
          {/* wallet chip — drawn at opacity-0, kept for the row's geometry */}
          <div className="relative flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 py-1.5 opacity-0" aria-hidden>
            <div className="relative size-5 shrink-0">
              <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinWo} />
              </div>
            </div>
            <p className="font-en shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              500,000
            </p>
          </div>
          <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
            <div className="relative flex shrink-0 flex-col justify-center whitespace-nowrap text-center text-lg font-medium text-ink">
              <p className="leading-[1.5]" dir="auto">
                اختر الحساب
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="رجوع"
              className="relative block size-5 shrink-0 cursor-pointer overflow-clip"
            >
              <div className="absolute inset-[17.71%_14.58%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBack} />
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto flex flex-col items-center gap-6 bg-surface px-4 py-5">
          {/* ➕ New bank account — dashed row */}
          <button
            type="button"
            onClick={() => navigate('/withdraw/new-account')}
            className="flex w-[344px] shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-dashed border-line bg-surface px-4 py-3"
          >
            <div className="relative size-5 shrink-0 overflow-clip">
              <div className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center" style={{ containerType: 'size' }}>
                <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                  <div className="relative size-full">
                    <div className="absolute inset-[-4.17%_-2.5%]">
                      <img alt="" className="block size-full max-w-none" src={iconChevronLeft} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
              <div className="w-full flex-none -scale-y-100">
                <div className="flex w-full flex-col items-end justify-center gap-1">
                  <div className="relative flex w-full shrink-0 items-center justify-center">
                    <div className="w-full flex-none -scale-y-100">
                      <p className="w-full text-right text-[0px] font-normal text-ink-secondary" dir="auto">
                        <span className="text-[12px] leading-[1.5]">{'تحويل عبر '}</span>
                        <span className="font-en text-[12px] not-italic leading-[1.5]">IBAN</span>
                        <span className="text-[12px] leading-[1.5]">{' او رقم الحساب'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="relative flex w-full shrink-0 items-center justify-center">
                    <div className="w-full flex-none -scale-y-100">
                      <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                        حساب بنكي جديد
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center justify-center gap-2">
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-brand-50 p-2.5">
                <div className="relative size-5 shrink-0">
                  <div className="absolute inset-[20%]">
                    <div className="absolute inset-[-2.08%]">
                      <img alt="" className="block size-full max-w-none" src={iconPlus} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* 🎹 List picker */}
          <div className="flex w-[343px] shrink-0 flex-col items-end gap-2">
            <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              اختار من القائمة
            </p>
            <div className="flex w-full shrink-0 flex-col items-end gap-1.5">
              <div className="flex w-full items-center justify-end overflow-clip rounded-full border border-solid border-line bg-surface px-3 py-2.5">
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
                  <input
                    type="text"
                    dir="auto"
                    placeholder="ابحث عن اسم معين .."
                    className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                  />
                  <div className="relative size-[18px] shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col items-start gap-1">
              {ACCOUNTS.map((account, i) => {
                const isSelected = selected === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`flex w-full shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-solid px-4 py-3 ${
                      isSelected ? 'border-brand-400 bg-brand-50' : 'border-line-subtle bg-surface'
                    }`}
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
                    <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
                      <div className="w-full flex-none -scale-y-100">
                        <div className="flex w-full flex-col items-end justify-center gap-1">
                          <div className="relative flex w-full shrink-0 items-center justify-center">
                            <div className="w-full flex-none -scale-y-100">
                              <p className="font-en w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="ltr">
                                {account.masked}
                              </p>
                            </div>
                          </div>
                          <div className="relative flex w-full shrink-0 items-center justify-center">
                            <div className="w-full flex-none -scale-y-100">
                              <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                                {account.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`relative size-10 shrink-0 overflow-clip rounded-full ${isSelected ? 'bg-surface' : 'bg-surface-neutral'}`}>
                      <p className="font-en absolute left-1/2 top-[calc(50%-12px)] w-6 -translate-x-1/2 text-center text-base font-medium leading-[1.5] text-ink-secondary">
                        {account.initials}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned CTA + home indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-surface">
        <button
          type="button"
          disabled={selected === null}
          onClick={submit}
          className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
            selected !== null ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
          }`}
        >
          <p
            className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
              selected !== null ? 'text-ink-inverse' : 'text-ink-quadrant'
            }`}
            dir="auto"
          >
            اللي بعده
          </p>
        </button>
        <div className="relative h-[34px] w-full shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
