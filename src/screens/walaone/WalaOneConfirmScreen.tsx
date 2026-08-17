import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useWalaOne } from '../../state/WalaOneState';
import Riyal from '../../components/Riyal';
import { IosStatusBar, FlowAppBar } from '../../components/redeem/FlowChrome';
import { W1Coin, WALAONE_PER_RIYAL } from './WalaOneAmountScreen';
import iconInfoSmall from '../../assets/figma/60e86b53328378fe6e2eaac39925383a1427b8b4.svg';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import flagSa from '../../assets/icons/flag-sa.svg';

const fmt = (n: number) => n.toLocaleString('en-US');

/** The demo user's own WalaOne line, behind «استخدم رقمي». */
const MY_W1_NUMBER = '512345678';

/** Demo rule: this number is «غير مربوط بمحفظة ولاء ون». */
const UNLINKED_NUMBER = '500000000';

/** 5 1234 5678 grouping, as drawn. */
const groupW1 = (d: string) => [d.slice(0, 1), d.slice(1, 5), d.slice(5, 9)].filter(Boolean).join(' ');

const OTP_LENGTH = 5;
const WRONG_OTP = '00000';

/**
 * تأكيد التحويل — the drawn confirm screen of the ولاء ون flow (108:45207):
 * «ملخص العملية» (WalaOne points + the converted amount — riyal here, points
 * in the drawn frames, per the flow-wide cashback adaptation), then the
 * «رقم جوال محفظة ولاء ون» card: +966 field with the KSA flag, «استخدم رقمي»,
 * «تأكيد رقم الجوال» opening the drawn OTP sheet. The footer «تمم التحويل»
 * stays disabled until the number is verified, then leads to the PIN.
 * Demo rules: number 5 0000 0000 → «غير مربوط» error; OTP 00000 → wrong.
 */
export default function WalaOneConfirmScreen() {
  const navigate = useNavigate();
  const { amount, phone, setPhone, verified, setVerified } = useWalaOne();
  const [value, setValue] = useState(phone);
  const [useMine, setUseMine] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  if (amount <= 0) return <Navigate to="/walaone/amount" replace />;

  const digits = value.replace(/\D/g, '').slice(0, 9);
  const validShape = /^5\d{8}$/.test(digits);
  const unlinked = digits === UNLINKED_NUMBER;
  const canVerify = validShape && !unlinked && !verified;

  const setNumber = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 9);
    setValue(d);
    if (d !== phone) setVerified(false);
    if (d !== MY_W1_NUMBER) setUseMine(false);
  };

  const onVerified = () => {
    setPhone(digits);
    setVerified(true);
    setOtpOpen(false);
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="flex h-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full flex-col items-center">
          <IosStatusBar />
          <FlowAppBar title="تأكيد التحويل" />

          <div className="flex w-full flex-col items-center gap-6 px-4 py-5">
            {/* ملخص العملية */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-solid border-line bg-white p-4">
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                ملخص العملية
              </p>
              <div className="flex w-full items-center justify-between">
                <div className="flex shrink-0 items-center gap-1.5">
                  <W1Coin size={18} />
                  <p className="font-en whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="ltr" data-testid="w1-sum-points">
                    {fmt(amount * WALAONE_PER_RIYAL)}
                  </p>
                </div>
                <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                  نقاط ولاء ون
                </p>
              </div>
              <div className="h-px w-full shrink-0 bg-line-subtle" />
              <div className="flex w-full items-center justify-between">
                <div className="flex shrink-0 items-center gap-1.5">
                  <p className="shrink-0 text-[15px] font-normal leading-none text-brand-400">
                    <Riyal />
                  </p>
                  <p className="font-en whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="ltr">
                    {fmt(amount)}
                  </p>
                </div>
                <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                  المبلغ المحول
                </p>
              </div>
            </div>

            {/* رقم جوال محفظة ولاء ون */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-solid border-line bg-white p-4">
              <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                رقم جوال محفظة ولاء ون
              </p>
              <div className="flex w-full items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                  يجب ان يكون الرقم مربوط بمحفظة ولاء ون نشطة
                </p>
                <div className="relative size-[13.306px] shrink-0 overflow-clip">
                  <div className="absolute inset-[12.5%]">
                    <div className="absolute inset-[-5.56%]">
                      <img alt="" className="block size-full max-w-none" src={iconInfoSmall} />
                    </div>
                  </div>
                </div>
              </div>

              {/* +966 field — flag chip at the physical right, digits ltr */}
              <div
                className={`flex w-full items-center gap-2 rounded-lg border border-solid bg-white px-3 py-[13px] ${
                  unlinked ? 'border-red-500' : verified ? 'border-brand-400' : 'border-[#ccd2e0]'
                }`}
              >
                {verified && (
                  <div className="relative size-[18px] shrink-0 overflow-clip rounded-full border border-solid border-brand-400 bg-brand-400" data-testid="w1-phone-verified">
                    <div className="absolute inset-[calc(31.25%-0.38px)]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={groupW1(digits)}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="5 xxxx xxxx"
                  data-testid="w1-phone-input"
                  className="font-en min-w-px flex-[1_0_0] bg-transparent text-right text-sm font-medium leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                  aria-label="رقم الجوال"
                />
                <p className="font-en shrink-0 whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-secondary" dir="ltr">
                  +966
                </p>
                <img alt="" className="h-4 w-[22px] shrink-0 rounded-sm" src={flagSa} />
              </div>
              {unlinked && (
                <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-danger" dir="auto" data-testid="w1-phone-error">
                  هذا الرقم غير مربوط بمحفظة ولاء ون
                </p>
              )}

              {/* استخدم رقمي */}
              <button
                type="button"
                onClick={() => {
                  const next = !useMine;
                  setUseMine(next);
                  setNumber(next ? MY_W1_NUMBER : '');
                }}
                data-testid="w1-use-mine"
                className="flex w-full cursor-pointer items-center justify-end gap-3"
              >
                <p className="text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
                  استخدم رقمي
                </p>
                <span
                  className={`relative size-4 shrink-0 overflow-clip rounded-sm border border-solid ${
                    useMine ? 'border-brand-400 bg-brand-400' : 'border-[#ccd2e0] bg-surface'
                  }`}
                >
                  {useMine && (
                    <span className="absolute inset-[calc(31.25%-0.38px)]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
                    </span>
                  )}
                </span>
              </button>

              <button
                type="button"
                disabled={!canVerify}
                onClick={() => setOtpOpen(true)}
                data-testid="w1-verify"
                className={`flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
                  canVerify ? 'cursor-pointer bg-brand-50' : 'bg-surface-disabled'
                }`}
              >
                <p
                  className={`whitespace-nowrap text-sm font-medium leading-[1.5] ${
                    canVerify ? 'text-brand-400' : 'text-ink-quadrant'
                  }`}
                  dir="auto"
                >
                  تأكيد رقم الجوال
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* terms + ⛴️ CTA */}
        <div className="flex w-full shrink-0 flex-col items-center gap-3">
          <p className="w-full text-center text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
            {'تطبق '}
            <span className="font-medium text-ink underline">الشروط والأحكام</span>
            {' و'}
            <span className="font-medium text-ink underline">سياسة الخصوصية</span>
          </p>
          <button
            type="button"
            disabled={!verified}
            onClick={() => navigate('/walaone/pin')}
            data-testid="w1-confirm"
            className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
              verified ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
            }`}
          >
            <p
              className={`whitespace-nowrap text-sm font-medium leading-[1.5] ${
                verified ? 'text-ink-inverse' : 'text-ink-quadrant'
              }`}
              dir="auto"
            >
              تمم التحويل
            </p>
          </button>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
          </div>
        </div>
      </div>

      <OtpSheet open={otpOpen} phone={digits} onClose={() => setOtpOpen(false)} onVerified={onVerified} />
    </div>
  );
}

/**
 * تأكيد رقم الجوال — the drawn OTP sheet: code sent to the +966 number,
 * «تغيير» back to the field, five boxes, resend countdown, 5-minute validity
 * hint. Demo rule: 00000 = wrong code (shake + clear), anything else passes.
 */
function OtpSheet({
  open,
  phone,
  onClose,
  onVerified,
}: {
  open: boolean;
  phone: string;
  onClose: () => void;
  onVerified: () => void;
}) {
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  const [left, setLeft] = useState(90);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setCode('');
    setWrong(false);
    setLeft(90);
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    const f = setTimeout(() => inputRef.current?.focus(), 350);
    return () => {
      clearInterval(t);
      clearTimeout(f);
    };
  }, [open]);

  useEffect(() => {
    if (code.length !== OTP_LENGTH) return;
    const t = setTimeout(() => {
      if (code === WRONG_OTP) {
        setWrong(true);
        setCode('');
        return;
      }
      onVerified();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  if (!open) return null;

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <div className="absolute inset-0 z-[60]">
      <style>{'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}@keyframes pin-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}'}</style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-2"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
        data-testid="w1-otp-sheet"
      >
        <div className="h-1 w-9 rounded-full bg-line" />
        <p className="w-full text-right text-base font-bold leading-[1.5] text-ink" dir="auto">
          تأكيد رقم الجوال
        </p>
        <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
          {'أدخل رمز التحقق المرسل على '}
          <span className="font-en font-medium text-ink" dir="ltr">{`"+966 ${phone.slice(0, 1)} ${phone.slice(1, 5)} ${phone.slice(5, 9)}"`}</span>{' '}
          <button type="button" onClick={onClose} className="cursor-pointer font-medium text-brand-400">
            تغيير
          </button>
        </p>

        {/* five boxes over one hidden input, filling right-to-left as drawn */}
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="relative w-full cursor-text"
          aria-label="رمز التحقق"
          data-testid="w1-otp-boxes"
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => {
              setWrong(false);
              setCode(e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH));
            }}
            className="absolute inset-0 opacity-0"
            aria-hidden
            tabIndex={-1}
          />
          <div
            key={wrong ? 'w' : 'k'}
            className="flex w-full flex-row-reverse items-center justify-between"
            style={wrong ? { animation: 'pin-shake 300ms ease' } : undefined}
          >
            {Array.from({ length: OTP_LENGTH }, (_, i) => (
              <div
                key={i}
                className={`flex h-14 w-[58px] items-center justify-center rounded-xl border border-solid ${
                  wrong ? 'border-red-500' : i === code.length ? 'border-viola-500' : 'border-line'
                } bg-white`}
              >
                <p className={`font-en text-lg font-medium leading-none ${code[i] ? 'text-ink' : 'text-viola-300'}`} dir="ltr">
                  {code[i] ?? '–'}
                </p>
              </div>
            ))}
          </div>
        </button>
        {wrong && (
          <p role="status" className="w-full text-right text-xs font-medium leading-[1.5] text-ink-danger" dir="auto">
            الرمز غير صحيح.. جرب مره ثانية
          </p>
        )}

        <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
          {'ما وصلك؟ بنرسله مره ثانيه بعد '}
          <span className="font-en font-medium text-brand-400" dir="ltr">{`${mm}:${ss}`}</span>
        </p>
        <div className="flex w-full items-center justify-end gap-1.5">
          <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="rtl">
            {'ستنتهي صلاحية الرمز خلال '}
            <span className="font-en">5</span>
            {' دقائق'}
          </p>
          <div className="relative size-[13.306px] shrink-0 overflow-clip">
            <div className="absolute inset-[12.5%]">
              <div className="absolute inset-[-5.56%]">
                <img alt="" className="block size-full max-w-none" src={iconInfoSmall} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
