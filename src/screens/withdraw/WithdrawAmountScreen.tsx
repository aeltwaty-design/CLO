import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconBack from '../../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconEdit from '../../assets/figma/30a8a7af34a2a4266156e3e7d5cbeb76da909206.svg';
import iconInfoCircle from '../../assets/figma/624fb13967c449288b47a1c491ebbe53f0d2eead.svg';
import coinWp from '../../assets/figma/1fc63f5f61f3f22b61f4543f37dec854ea9f0818.svg';
import sarInputQuadrant from '../../assets/figma/fc929d319f9212f8e5f8c5b19d3ddb54e44331db.svg';
import sarInputInk from '../../assets/figma/49ad6dbce042071ffbc989f84e44fd2cceb7b7c9.svg';
import sarChipQuadrant from '../../assets/figma/f8ba18847ee90b5644cd890fb21d0223f8af4d54.svg';
import sarChipInk from '../../assets/figma/438a0e6cdb16aae2ff23232f4ec31e0a755634ef.svg';
import arrowUpInk from '../../assets/figma/e43daaa19e9ace9253b05e95d989adb8f4d8ea29.svg';
import arrowUpGreen from '../../assets/figma/f7d3cbb0876dc160a468229daa593fb2948a7ea7.svg';
import {
  useWithdraw,
  REGISTERED_ACCOUNT,
  WITHDRAW_BALANCE,
  WITHDRAW_DAILY_LIMIT,
  WITHDRAW_FEE,
  WITHDRAW_VAT,
} from '../../state/WithdrawState';

/**
 * ادخل المبلغ — withdrawal amount entry (Figma 27:10534 empty / 27:10685
 * filled / 27:10836 max selected, "enter amount", 375×812).
 *
 * The drawn max state fills 559.5 = balance 560.50 − transfer fee 1, so the
 * withdrawable max is min(balance − fee, daily limit); amounts above it (or 0)
 * keep the CTA disabled. Quick chips over the max render inert in the grey
 * disabled style, exactly as the 1,000 chip is drawn in all three frames.
 */

/** Amounts rendered with Poppins digits, thousands-separated as drawn (1,000). */
const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

const MAX_WITHDRAW = Math.min(WITHDRAW_BALANCE - WITHDRAW_FEE, WITHDRAW_DAILY_LIMIT);

const QUICK_AMOUNTS = [1000, 500, 100, 50];

export default function WithdrawAmountScreen() {
  const navigate = useNavigate();
  const { account, amount, setAmount } = useWithdraw();
  const recipient = account ?? REGISTERED_ACCOUNT;

  // input text kept separately so typing stays verbatim; chips/max write both
  const [text, setText] = useState(amount > 0 ? fmt(amount) : '');

  const valid = amount > 0 && amount <= MAX_WITHDRAW;
  const isMax = amount > 0 && amount === MAX_WITHDRAW;
  const [balInt, balFrac] = WITHDRAW_BALANCE.toFixed(2).split('.');

  const onType = (v: string) => {
    const raw = v.replace(/,/g, '');
    if (!/^\d*\.?\d{0,2}$/.test(raw)) return;
    setText(raw);
    setAmount(raw === '' || raw === '.' ? 0 : parseFloat(raw));
  };

  const pick = (n: number) => {
    setAmount(n);
    setText(fmt(n));
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <style>{'@keyframes fade-rise{from{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:translateY(0)}}'}</style>
      <div className="flex h-full w-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full shrink-0 flex-col items-center">
          {/* 🧭 App bar */}
          <div className="flex w-full items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            {/* invisible balance pill — drawn opacity-0 as a layout placeholder */}
            <div aria-hidden className="flex h-[33px] shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 opacity-0">
              <div className="relative size-5 shrink-0">
                <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinWp} />
                </div>
              </div>
              <p className="font-en whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                500,000
              </p>
            </div>
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                ادخل المبلغ
              </p>
              <button type="button" onClick={() => navigate(-1)} className="relative block size-5 shrink-0 cursor-pointer overflow-clip">
                <div className="absolute inset-[17.71%_14.58%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBack} />
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* المرسل إليه */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-surface p-4">
              <div className="flex w-full shrink-0 items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  المرسل إليه
                </p>
              </div>
              {/* selected account chip — tap anywhere (edit glyph) to switch accounts */}
              <button
                type="button"
                onClick={() => navigate("/withdraw/account")}
                className="flex h-16 w-full shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-solid border-brand-400 bg-brand-50 px-4"
              >
                <div className="relative size-4 shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconEdit} />
                </div>
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
                  <div className="w-full flex-none -scale-y-100">
                    <div className="flex w-full flex-col items-end justify-center gap-1">
                      <div className="relative flex w-full shrink-0 items-center justify-center">
                        <div className="w-full flex-none -scale-y-100">
                          <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="ltr">
                            {recipient.masked}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex w-full shrink-0 items-center justify-center">
                        <div className="w-full flex-none -scale-y-100">
                          <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                            {recipient.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative size-10 shrink-0 overflow-clip rounded-full bg-surface">
                  <p className="font-en absolute left-1/2 top-[calc(50%-12px)] w-6 -translate-x-1/2 text-center text-base font-medium leading-[1.5] text-ink-secondary">
                    {recipient.initials}
                  </p>
                </div>
              </button>
            </div>

            {/* Amount input section */}
            <div className="flex w-full shrink-0 flex-col items-end gap-6">
              <div className="flex w-[343px] shrink-0 flex-col items-center rounded-2xl border border-solid border-line bg-surface p-4">
                <div className="flex w-full shrink-0 flex-col items-start gap-6">
                  <div className="flex w-full shrink-0 flex-col items-start gap-2.5">
                    <div className="flex w-full shrink-0 flex-col items-end gap-0.5">
                      <p className="h-6 w-[253px] shrink-0 text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                        أدخل مبلغ السحب
                      </p>
                      <div className="flex shrink-0 items-center justify-center gap-0.5">
                        <div className="relative h-4 w-[10.667px] shrink-0">
                          <p className="absolute inset-0 whitespace-nowrap text-center text-[10.67px] font-normal leading-[1.5] text-brand-400" dir="auto">
                            ﷼
                          </p>
                        </div>
                        <p className="whitespace-nowrap text-center text-[0px] font-medium leading-none" dir="auto">
                          <span className="text-xs font-normal not-italic leading-[1.5] text-ink-secondary">رصيد الكاش باك</span>
                          <span className="text-xs leading-[normal] text-ink-quadrant">{' '}</span>
                          <span className="font-en text-xs font-bold not-italic leading-[1.5] text-brand-400">{balInt}</span>
                          <span className="font-en text-[10px] font-bold not-italic leading-[normal] text-brand-400">.{balFrac}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[58px] w-full shrink-0 items-center justify-between rounded-lg border border-solid border-[#ccd2e0] bg-surface px-4">
                      <div className="relative size-[22px] shrink-0 overflow-clip">
                        <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={text !== '' ? sarInputInk : sarInputQuadrant} />
                        </div>
                      </div>
                      <input
                        type="text"
                        inputMode="decimal"
                        dir="ltr"
                        placeholder="0"
                        value={text}
                        onChange={(e) => onType(e.target.value)}
                        className="font-en h-full min-w-px flex-[1_0_0] bg-transparent text-right text-base font-semibold leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                      />
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-col items-start">
                    <div className="flex w-full shrink-0 flex-col items-start gap-4">
                      <div className="flex w-full shrink-0 items-start gap-[7px]">
                        {QUICK_AMOUNTS.map((n) => (
                          <QuickChip key={n} value={n} onPick={pick} />
                        ))}
                      </div>
                      <div className="flex w-full shrink-0 items-start justify-center">
                        <button
                          type="button"
                          onClick={() => pick(MAX_WITHDRAW)}
                          className={`flex h-[45px] min-w-px flex-[1_0_0] cursor-pointer items-center justify-center gap-1 rounded-full border-solid ${
                            isMax ? 'border-2 border-brand-400' : 'border border-line'
                          }`}
                        >
                          <p className={`whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${isMax ? 'text-brand-400' : 'text-ink'}`} dir="auto">
                            أقصى مبلغ
                          </p>
                          <div className="relative size-3.5 shrink-0 overflow-clip">
                            <div className="absolute inset-[15%_20%] flex items-center justify-center" style={{ containerType: 'size' }}>
                              <div className="h-[100cqh] w-[100cqw] flex-none rotate-180">
                                <div className="relative size-full">
                                  <div className="absolute inset-[-1.66%_-1.93%]">
                                    <img alt="" className="block size-full max-w-none" src={isMax ? arrowUpGreen : arrowUpInk} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* fee transparency (UX enhancement) — appears only once an
                  amount is set, so the empty 27:10534 capture stays stable */}
              {amount > 0 && (
                <p
                  className="-mt-4 w-[343px] text-right text-xs font-normal leading-[1.5] text-ink-tertiary"
                  style={{ animation: 'fade-rise 200ms ease-out both' }}
                  dir="rtl"
                  data-testid="fee-line"
                >
                  {'المخصوم من رصيدك: '}
                  <span className="font-en font-medium text-ink">{fmt(amount + WITHDRAW_FEE + WITHDRAW_VAT)}</span>
                  {' ﷼ (رسوم التحويل + الضريبة)'}
                </p>
              )}
            </div>

            {/* الحد اليومي للسحب — mint info bar */}
            <div className="flex w-full shrink-0 items-center justify-end gap-2.5 overflow-clip rounded-2xl bg-brand-50 px-4 py-3">
              <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start justify-center gap-2.5">
                <div className="flex w-full shrink-0 items-center justify-end gap-1">
                  <div className="flex shrink-0 items-center justify-end gap-1">
                    <div className="relative size-[15px] shrink-0 overflow-clip">
                      <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={sarChipInk} />
                      </div>
                    </div>
                    <p className="font-en whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                      {fmt(WITHDRAW_DAILY_LIMIT)}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
                    {'الحد اليومي للسحب = '}
                  </p>
                </div>
              </div>
              <div className="relative size-6 shrink-0 overflow-clip">
                <div className="absolute inset-[12.5%]">
                  <div className="absolute inset-[-5.56%]">
                    <img alt="" className="block size-full max-w-none" src={iconInfoCircle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA + home indicator */}
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex flex-col items-start">
            <button
              type="button"
              disabled={!valid}
              onClick={() => navigate('/withdraw/summary')}
              className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
                valid ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
              }`}
            >
              <p className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${valid ? 'text-ink-inverse' : 'text-ink-quadrant'}`} dir="auto">
                اللي بعده
              </p>
            </button>
          </div>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </div>
      </div>

    </div>
  );
}

/** Quick-amount chip; values above the withdrawable max render in the inert
    grey style the 1,000 chip is drawn with (balance 560.50 < 1,000). */
function QuickChip({ value, onPick }: { value: number; onPick: (n: number) => void }) {
  const off = value > MAX_WITHDRAW;
  return (
    <button
      type="button"
      disabled={off}
      onClick={() => onPick(value)}
      className={`flex h-[42px] min-w-px flex-[1_0_0] items-center justify-center gap-1 rounded-full border border-solid ${
        off ? 'border-line-subtle' : 'cursor-pointer border-line'
      }`}
    >
      <div className="relative size-[15px] shrink-0 overflow-clip">
        <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={off ? sarChipQuadrant : sarChipInk} />
        </div>
      </div>
      <p className={`font-en whitespace-nowrap text-right text-xs font-medium leading-[1.5] ${off ? 'text-ink-quadrant' : 'text-ink'}`} dir="auto">
        {fmt(value)}
      </p>
    </button>
  );
}
