import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import statusBattery from '../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import statusBatteryCap from '../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import statusBatteryFill from '../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import statusWifi from '../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import statusSignal from '../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import statusTime from '../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import coinLayer1 from '../assets/figma/8932e435a715d7d81aa1ff0f66393978b62fca73.svg';
import coinLayer2 from '../assets/figma/e19bddb60b0a93b329b0ff8504048a401ba3c554.svg';
import coinLayer3 from '../assets/figma/f3e1148e3fc68cfc63a2dbb1d26358e8778b35ca.svg';
import coinLayer4 from '../assets/figma/9f6067323de47f223044ef0ed85d8c5bcdacb283.svg';
import coinPayment from '../assets/figma/7ea7d9c90a9a59119411dd34f3a397feacea6b77.svg';
import coinLayer5 from '../assets/figma/98b8c4c60f78fb14151386901216b763161c31e6.svg';
import iconBack from '../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconLock from '../assets/figma/bfb1520ddc4c6ae04b6d2745b97951abb1225429.svg';
import visaMask from '../assets/figma/8c19cdc6c340655ee715e5c0e021047e5e537124.svg';
import visaLogo from '../assets/figma/7cde00b8a4c1cec2de1c941b422f78393310b2b5.svg';
import iconTick from '../assets/figma/7d6f0d889568034a1bc416ccaf53f71b77fc8c92.svg';
import mcLeft from '../assets/figma/84efa261a92f472ca4a430de051b4ad5331aeb74.svg';
import mcRight from '../assets/figma/0b6592b92012268404532c0c0c7429b794e1a004.svg';
import scanGlyph from '../assets/icons/nav-scan.svg';
import LinkIntroSheet from '../components/LinkIntroSheet';
import { useAppState } from '../state/AppState';
import { usePhase } from '../state/PhaseState';

/**
 * إضافة بطاقة — card-linking form (Figma 1:10416 "linking card", 375×812),
 * UX-upgraded: live card preview that fills in as the user types, inline
 * validation ticks, 4-4-4-4 grouping, expiry auto-advance, collapsed optional
 * nickname, and a CTA that explains what's missing. The design marks this
 * region as a PCI iframe in production — validation here is prototype-side.
 */

/** Valid-field tick — the tick-circle glyph masked in brand green
    (the source asset is the bravo-purple pill variant). */
function ValidTick({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden
      className={`size-4 shrink-0 bg-brand-400 transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`}
      style={{
        maskImage: `url("${iconTick}")`,
        WebkitMaskImage: `url("${iconTick}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}
export default function AddCardScreen() {
  const navigate = useNavigate();
  const phase = usePhase();
  const { introSeen, setIntroSeen } = useAppState();
  // Phase 2: whatever entry point led here, the FIRST time shows the intro
  // sheet over the form; dismissing it (CTA or backdrop) marks it seen
  const [introOpen, setIntroOpen] = useState(phase === 2 && !introSeen);
  const dismissIntro = () => {
    setIntroSeen(true);
    setIntroOpen(false);
  };

  const [name, setName] = useState('');
  const [digits, setDigits] = useState(''); // card number, digits only
  const [expiry, setExpiry] = useState(''); // MM/YY progressive
  const [cvv, setCvv] = useState('');
  const [nickOpen, setNickOpen] = useState(false);
  const cvvRef = useRef<HTMLInputElement>(null);

  const nameOk = name.trim().length >= 3;
  const numOk = digits.length === 16;
  const expOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  const cvvOk = /^\d{3}$/.test(cvv);

  const scheme = digits.startsWith('4') ? 'visa' : digits.startsWith('5') ? 'mc' : null;
  const groupedPreview = digits
    .padEnd(16, '•')
    .replace(/(.{4})/g, '$1 ')
    .trim();
  const groupedInput = digits.replace(/(.{4})/g, '$1 ').trim();

  const onNumber = (v: string) => setDigits(v.replace(/\D/g, '').slice(0, 16));
  const onExpiry = (v: string) => {
    const raw = v.replace(/\D/g, '').slice(0, 4);
    setExpiry(raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw);
    if (raw.length === 4) cvvRef.current?.focus();
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto pb-[121px]">
        {/* 📶 Status bar */}
        <div className="relative h-11 w-[375px] shrink-0 overflow-clip">
          <div className="absolute right-[17px] top-[17.33px] h-[11.333px] w-[22px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBattery} />
          </div>
          <div className="absolute right-[14.67px] top-[21px] h-1 w-[1.328px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBatteryCap} />
          </div>
          <div className="absolute right-[19px] top-[19.33px] h-[7.333px] w-[18px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusBatteryFill} />
          </div>
          <div className="absolute right-[44.03px] top-[17.33px] h-[10.966px] w-[15.272px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusWifi} />
          </div>
          <div className="absolute right-[64.33px] top-[17.67px] h-[10.667px] w-[17px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusSignal} />
          </div>
          <div className="absolute left-[21px] top-3 h-[21px] w-[54px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={statusTime} />
          </div>
        </div>

        {/* 🧭 App bar */}
        <div className="flex w-full shrink-0 items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
          {/* wallet chip — drawn at opacity-0, kept for the row's geometry */}
          <div className="relative flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 py-1.5 opacity-0">
            <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
              <div className="relative col-1 row-1 ml-[1.35px] mt-0 size-[16.438px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer1} />
              </div>
              <div className="relative col-1 row-1 ml-0 mt-0 size-[16.438px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer2} />
              </div>
              <div className="relative col-1 row-1 ml-px mt-[1.03px] h-[14.387px] w-[14.428px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer3} />
              </div>
              <div className="relative col-1 row-1 ml-[2.06px] mt-[2.06px] size-[12.326px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer4} />
              </div>
              <div className="relative col-1 row-1 ml-[4.11px] mt-[3.96px] flex h-[8.553px] w-[8.211px] flex-col items-center overflow-clip px-[13.685px] py-[1.026px]">
                <div className="relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
                  <div className="relative col-1 row-1 ml-0 mt-0 h-[6.642px] w-[7.804px]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinPayment} />
                  </div>
                </div>
              </div>
              <div className="relative col-1 row-1 ml-[2.06px] mt-[2.06px] h-[11.402px] w-[10.008px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinLayer5} />
              </div>
            </div>
            <p className="font-en shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              500,000
            </p>
          </div>
          <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
            <div className="relative flex shrink-0 flex-col items-end gap-0.5">
              <div className="relative flex shrink-0 flex-col justify-center whitespace-nowrap text-center text-lg font-medium text-ink">
                <p className="leading-[1.5]" dir="auto">
                  إضافة بطاقة
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="رجوع"
              className="relative block size-5 shrink-0 overflow-clip"
            >
              <div className="absolute inset-[17.71%_14.58%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBack} />
              </div>
            </button>
          </div>
        </div>

        {/* flow step dots (RTL: step 1 rightmost, active step 2 to its left) */}
        <div className="flex w-full items-center justify-center gap-1.5 pt-2" aria-hidden>
          <div className="h-1.5 w-4 rounded-full bg-brand-400" />
          <div className="size-1.5 rounded-full bg-line" />
        </div>

        {/* Content */}
        <div className="flex w-[375px] flex-col items-center gap-5 bg-surface px-4 py-4">
          {/* 🔒 Security note */}
          <div className="flex w-full shrink-0 items-start justify-end gap-2.5 overflow-clip rounded-2xl bg-brand-50 px-4 py-3">
            <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-2 leading-[1.5]">
              <p className="shrink-0 whitespace-nowrap text-center text-sm font-medium text-ink" dir="auto">
                معلوماتك محمية
              </p>
              <p className="h-10 w-[min-content] min-w-full shrink-0 text-right text-xs font-normal text-ink-secondary" dir="auto">
                بياناتك مشفرة بأعلى معايير الأمان.. وما نشاركها مع أحد
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-full bg-brand-400 p-2 shadow-xs">
              <div className="relative size-5 shrink-0 overflow-clip">
                <div className="absolute inset-[9.38%_18.75%]">
                  <div className="absolute inset-[-6.15%_-8%]">
                    <img alt="" className="block size-full max-w-none" src={iconLock} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 💳 Live card preview — fills in as the user types */}
          <div
            className="relative flex h-[176px] w-full shrink-0 flex-col justify-between overflow-clip rounded-2xl p-4"
            style={{ backgroundImage: 'linear-gradient(129.55deg, rgb(0, 206, 139) 3.0145%, rgb(0, 104, 70) 71.253%)' }}
            data-testid="card-preview"
          >
            <div className="flex w-full items-start justify-between">
              <div
                className={`flex h-7 items-center rounded-md bg-white px-1.5 transition-opacity duration-300 ${scheme ? 'opacity-100' : 'opacity-0'}`}
              >
                {scheme === 'visa' && (
                  <div className="relative flex shrink-0 items-center justify-center leading-none">
                    <div className="flex-none -scale-y-100">
                      <div className="relative inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start">
                        <div
                          className="relative col-1 row-1 ml-[-3.35px] mt-[-10.39px] h-[31.137px] w-[38.702px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.351px_10.393px] mask-size-[32px_10.35px]"
                          style={{ maskImage: `url("${visaMask}")` }}
                        >
                          <img alt="VISA" className="absolute inset-0 block size-full max-w-none" src={visaLogo} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {scheme === 'mc' && (
                  <div className="flex items-center">
                    <div className="relative size-5">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={mcLeft} />
                    </div>
                    <div className="relative -ml-2 size-5">
                      <img alt="Mastercard" className="absolute inset-0 block size-full max-w-none" src={mcRight} />
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[26px] w-[34px] rounded-md bg-white/25" aria-hidden />
            </div>
            <p className="font-en w-full text-center text-lg font-medium tracking-[0.14em] text-ink-inverse" dir="ltr">
              {groupedPreview}
            </p>
            <div className="flex w-full items-end justify-between">
              <p className={`font-en text-xs font-medium leading-[1.5] text-ink-inverse ${expiry ? '' : 'opacity-60'}`} dir="ltr">
                {expiry || 'MM/YY'}
              </p>
              <p className={`max-w-[200px] truncate text-xs font-medium leading-[1.5] text-ink-inverse ${name ? '' : 'opacity-60'}`} dir="auto">
                {name || 'اسم حامل البطاقة'}
              </p>
            </div>
          </div>

          {/* 🎹 Form fields */}
          <div className="flex w-full shrink-0 flex-col items-end justify-center gap-[18px]">
            <div className="flex w-full shrink-0 flex-col items-end gap-2">
              <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                اسم حامل البطاقة
              </p>
              <div
                className={`flex w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid bg-surface px-4 py-2 transition-colors ${nameOk ? 'border-brand-400' : 'border-line'}`}
              >
                <ValidTick show={nameOk} />
                <input
                  type="text"
                  dir="auto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="الاسم كما هو موجود على البطاقة"
                  className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                />
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-end gap-2">
              <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                رقم البطاقة
              </p>
              <div
                className={`flex h-9 w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid bg-surface px-4 py-2 transition-colors ${numOk ? 'border-brand-400' : 'border-line'}`}
              >
                <ValidTick show={numOk} />
                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={groupedInput}
                  onChange={(e) => onNumber(e.target.value)}
                  placeholder="****   ****   ****   ****"
                  className="font-en min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                />
                {/* scan affordance — placeholder glyph (tab-bar scan icon), inert in the prototype */}
                <button type="button" aria-label="مسح البطاقة بالكاميرا" className="shrink-0 opacity-40">
                  <img alt="" src={scanGlyph} className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex w-full shrink-0 items-start justify-end gap-2.5">
              <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-2">
                <p className="font-en shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                  CVV
                </p>
                <div
                  className={`flex w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid bg-surface px-4 py-2 transition-colors ${cvvOk ? 'border-brand-400' : 'border-line'}`}
                >
                  <ValidTick show={cvvOk} />
                  <input
                    ref={cvvRef}
                    type="text"
                    inputMode="numeric"
                    dir="ltr"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="***"
                    className="font-en min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                  />
                </div>
              </div>
              <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-2">
                <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                  تاريخ الإنتهاء
                </p>
                <div
                  className={`flex w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid bg-surface px-4 py-2 transition-colors ${expOk ? 'border-brand-400' : 'border-line'}`}
                >
                  <ValidTick show={expOk} />
                  <input
                    type="text"
                    inputMode="numeric"
                    dir="ltr"
                    value={expiry}
                    onChange={(e) => onExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="font-en min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                  />
                </div>
              </div>
            </div>

            {/* optional nickname — collapsed behind a link */}
            {nickOpen ? (
              <div className="flex w-full shrink-0 flex-col items-end gap-2">
                <p className="shrink-0 whitespace-nowrap text-right text-[0px] font-medium leading-none text-ink" dir="auto">
                  <span className="text-[12px] leading-[1.5]">{'اسم مستعار '}</span>
                  <span className="text-[12px] font-normal not-italic leading-[1.5] text-ink-tertiary">(إختياري)</span>
                </p>
                <div className="flex w-full shrink-0 items-center justify-end gap-2 rounded-xl border border-solid border-line bg-surface px-4 py-2">
                  <input
                    type="text"
                    dir="auto"
                    placeholder="مثل ”البطاقة الأساسية“"
                    className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-tertiary"
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setNickOpen(true)}
                className="w-full text-right text-xs font-medium leading-[1.5] text-brand-400"
                dir="auto"
              >
                + إضافة اسم مستعار (إختياري)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned dock + home indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-surface">
        <div className="flex w-full shrink-0 flex-col items-start gap-2 px-4 pb-4 pt-2.5">
          {/* demo mode: the CTA always proceeds — no data required */}
          <button
            type="button"
            onClick={() => navigate('/cashback/success')}
            className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
          >
            <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
              أضف البطاقة
            </p>
          </button>
        </div>
        <div className="relative h-[34px] w-full shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>

      <LinkIntroSheet open={introOpen} onClose={dismissIntro} onStart={dismissIntro} />
    </div>
  );
}
