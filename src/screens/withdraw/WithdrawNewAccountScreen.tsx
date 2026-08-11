import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWithdraw, REGISTERED_ACCOUNT } from '../../state/WithdrawState';
import AccountPickerSheet, { BankLogo, WITHDRAW_BANKS, type WithdrawBank } from '../../components/withdraw/AccountPickerSheet';
import coinWo from '../../assets/figma/1fc63f5f61f3f22b61f4543f37dec854ea9f0818.svg';
import iconBack from '../../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconCheckRadio from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import iconCheckBox from '../../assets/figma/fe64b7045b3774889798e69f27656b671061b07f.svg';
import iconChevronDown from '../../assets/figma/c59235f22cb44aa1f7682c1a88396636bd125a76.svg';

/**
 * حساب جديد — add-bank-account form of the withdraw flow (Figma 375×812, four
 * frames folded into one interactive screen):
 *   27:10059 default — «رقم الحساب» mode, empty, bank dropdown, CTA disabled;
 *   27:10288 IBAN mode, empty (no bank dropdown), CTA enabled;
 *   27:10174 IBAN mode, name filled + «حفظ هذا الحساب» checked;
 *   27:11293 «رقم الحساب» mode fully filled — number, bank (via the
 *            AccountPickerSheet), name, save checked.
 * Demo mode (house precedent AddCardScreen): once the form leaves its pristine
 * default the CTA proceeds without requiring full data.
 */

/** 16px circular radio of the رقم الحساب / IBAN toggle. */
function ModeRadio({ checked }: { checked: boolean }) {
  return checked ? (
    <div className="relative size-4 shrink-0 overflow-clip rounded-lg border border-solid border-brand-400 bg-brand-400">
      <div className="absolute inset-[calc(31.25%-0.38px)]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheckRadio} />
      </div>
    </div>
  ) : (
    <div className="relative size-4 shrink-0 rounded-lg border border-solid border-[#ccd2e0] bg-surface" />
  );
}

/** Prototype IBAN rule: SA followed by 22 digits (24 chars). The two digits
    right after SA pick the beneficiary bank (demo map; default الراجحي). */
const IBAN_RE = /^SA\d{22}$/;
const IBAN_BANK_CODES: Record<string, string> = {
  '80': 'مصرف الراجحي',
  '05': 'مصرف الإنماء',
  '15': 'بنك البلاد',
  '60': 'بنك الجزيرة',
};

/** Valid-field tick masked in brand green (ValidTick precedent). */
function GreenTick({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden
      className={`size-4 shrink-0 bg-brand-400 transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`}
      style={{
        maskImage: `url("${iconCheckBox}")`,
        WebkitMaskImage: `url("${iconCheckBox}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}

export default function WithdrawNewAccountScreen() {
  const navigate = useNavigate();
  const { setAccount } = useWithdraw();

  const [mode, setMode] = useState<'account' | 'iban'>('account');
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState<WithdrawBank | null>(null);
  const [name, setName] = useState('');
  const [save, setSave] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // CTA is disabled only in the pristine default frame (27:10059); every other
  // drawn state — IBAN mode or anything entered — shows it enabled.
  const enabled = mode === 'iban' || number !== '' || name !== '' || bank !== null || save;

  // IBAN validation + bank auto-detect (UX enhancement) — pristine IBAN mode
  // renders exactly as 27:10288; feedback appears only once something is typed
  const iban = number.replace(/\s/g, '').toUpperCase();
  const ibanValid = mode === 'iban' && IBAN_RE.test(iban);
  const detectedBank = ibanValid
    ? (WITHDRAW_BANKS.find((b) => b.name === (IBAN_BANK_CODES[iban.slice(2, 4)] ?? 'مصرف الراجحي')) ?? WITHDRAW_BANKS[0])
    : null;

  const switchMode = (m: 'account' | 'iban') => {
    if (m === mode) return;
    setMode(m);
    setNumber('');
  };

  const submit = () => {
    setAccount({
      name: name.trim() || REGISTERED_ACCOUNT.name,
      masked: REGISTERED_ACCOUNT.masked,
      initials: REGISTERED_ACCOUNT.initials,
    });
    navigate('/withdraw/amount');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <style>{'@keyframes fade-rise{from{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:translateY(0)}}'}</style>
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
                حساب جديد
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
        <div className="mx-auto flex w-[352px] flex-col items-center gap-6 bg-surface px-4 py-5">
          <div className="flex w-full shrink-0 flex-col items-end justify-center">
            <p className="w-full text-right text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto">
              برجاءا ادخال البيانات المطلوبة
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col items-end gap-6">
            {/* 🎹 Number / IBAN field with the mode toggle */}
            <div className="flex w-full shrink-0 flex-col items-end gap-2">
              <div className="flex w-full items-start justify-end gap-16">
                <button type="button" onClick={() => switchMode('account')} className="flex shrink-0 cursor-pointer items-center justify-center gap-2.5">
                  <p
                    className={`shrink-0 whitespace-nowrap text-right text-sm leading-[1.5] ${
                      mode === 'account' ? 'font-medium text-brand-400' : 'font-normal text-ink-tertiary'
                    }`}
                    dir="auto"
                  >
                    رقم الحساب
                  </p>
                  <ModeRadio checked={mode === 'account'} />
                </button>
                <button type="button" onClick={() => switchMode('iban')} className="flex shrink-0 cursor-pointer items-center justify-center gap-2.5">
                  <p
                    className={`font-en shrink-0 whitespace-nowrap text-right text-sm leading-[1.5] ${
                      mode === 'iban' ? 'font-medium text-brand-400' : 'font-normal text-ink-tertiary'
                    }`}
                    dir="auto"
                  >
                    IBAN
                  </p>
                  <ModeRadio checked={mode === 'iban'} />
                </button>
              </div>
              <div
                className={`flex w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid bg-surface px-4 py-3 ${
                  ibanValid ? 'border-brand-400' : 'border-[#ccd2e0]'
                }`}
              >
                {mode === 'iban' && <GreenTick show={ibanValid} />}
                <input
                  type="text"
                  dir="rtl"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder={mode === 'account' ? 'مثل: ”1234567890“' : 'مثل: ”SA1234567890“'}
                  className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                />
              </div>
              {mode === 'iban' &&
                number !== '' &&
                (detectedBank ? (
                  <div
                    className="flex w-full shrink-0 items-center justify-end gap-1.5"
                    style={{ animation: 'fade-rise 200ms ease-out both' }}
                    data-testid="iban-bank"
                  >
                    <GreenTick show />
                    <BankLogo bank={detectedBank} />
                    <p className="text-right text-xs font-normal leading-[1.5] text-ink" dir="rtl">
                      {'بنك المستفيد: '}
                      <span className="font-medium">{detectedBank.name}</span>
                    </p>
                  </div>
                ) : (
                  <p
                    className="w-full text-right text-xs font-normal leading-[1.5] text-ink-tertiary"
                    dir="rtl"
                    data-testid="iban-hint"
                  >
                    {'الآيبان يبدأ بـ '}
                    <span className="font-en">SA</span>
                    {' ويتبعها '}
                    <span className="font-en">22</span>
                    {' رقم'}
                  </p>
                ))}
            </div>

            {/* ⬇ Beneficiary bank dropdown — رقم الحساب mode only (27:10059/27:11293) */}
            {mode === 'account' && (
              <div className="flex w-full shrink-0 flex-col items-end gap-2">
                <div className="flex w-full flex-col items-end gap-1.5">
                  <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                    بنك المستفيد
                  </p>
                  <button
                    type="button"
                    onClick={() => setSheetOpen(true)}
                    className="flex w-full shrink-0 cursor-pointer items-center justify-end gap-2 overflow-clip rounded-lg border border-solid border-[#ccd2e0] bg-surface px-3.5 py-2.5"
                  >
                    <div className="relative size-4 shrink-0 overflow-clip">
                      <div className="absolute inset-[34.38%_18.75%_34.37%_18.75%] flex items-center justify-center" style={{ containerType: 'size' }}>
                        <div className="h-[100cqh] w-[100cqw] flex-none rotate-180">
                          <div className="relative size-full">
                            <div className="absolute inset-[-20%_-10%]">
                              <img alt="" className="block size-full max-w-none" src={iconChevronDown} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {bank ? (
                      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
                        <p className="shrink-0 whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
                          {bank.name}
                        </p>
                        <BankLogo bank={bank} />
                      </div>
                    ) : (
                      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end">
                        <p className="shrink-0 whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                          إختر من القائمة
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 🎹 Beneficiary name */}
            <div className="flex w-full shrink-0 flex-col items-end gap-2">
              <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                اسم المستفيد
              </p>
              <div className="flex w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid border-[#ccd2e0] bg-surface px-4 py-3">
                <input
                  type="text"
                  dir="auto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثل: ”احمد محمد التميمي“"
                  className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                />
              </div>
            </div>

            {/* 🔘 Save-this-account checkbox */}
            <button type="button" onClick={() => setSave(!save)} className="flex w-full shrink-0 cursor-pointer items-center justify-end gap-3">
              <div className="flex min-w-px flex-[1_0_0] flex-col items-end">
                <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
                  حفظ هذا الحساب
                </p>
              </div>
              {save ? (
                <div className="relative size-4 shrink-0 overflow-clip rounded-sm border border-solid border-brand-400 bg-brand-400">
                  <div className="absolute inset-[calc(12.5%-0.75px)] overflow-clip">
                    <div className="absolute inset-[17.71%_14.58%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheckBox} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative size-4 shrink-0 rounded-sm border border-solid border-[#ccd2e0] bg-surface" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned CTA + home indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-surface">
        <button
          type="button"
          disabled={!enabled}
          onClick={submit}
          className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
            enabled ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
          }`}
        >
          <p
            className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
              enabled ? 'text-ink-inverse' : 'text-ink-quadrant'
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

      <AccountPickerSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onPick={(a) => setBank(WITHDRAW_BANKS.find((b) => b.name === a.name) ?? null)}
      />
    </div>
  );
}
