import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppState';
import { useGift } from '../../state/GiftState';
import Riyal from '../../components/Riyal';
import { IosStatusBar, BackArrow } from './GiftChrome';
import iconBriefcase from '../../assets/figma/eec1cb423a0fdc92072abdd2d9c2fbfb5921b6fc.svg';
import iconPeople from '../../assets/figma/c4f14edb4f3dc73aafc57568f4abb02e0ef9e857.svg';
import iconEdit from '../../assets/figma/2f32ae6cacf71bafc710b01e73dee5f65fab16be.png';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Quick chips — drawn 2×3 grid (5,000/1,000/500 + 50,000/20,000/10,000 pts) ÷100 for the cashback world. */
const CHIP_ROWS: number[][] = [
  [50, 10, 5],
  [500, 200, 100],
];

/** Glyph painted white through its alpha mask — the drawn family promo icon
    (vuesax profile-2user) refuses to export, so the Home «عائلتي» glyph is
    recolored instead (MaskIcon precedent). */
function WhiteMaskIcon({ src, size }: { src: string; size: number }) {
  return (
    <div
      aria-hidden
      className="bg-white"
      style={{
        width: size,
        height: size,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}

/**
 * كم ودك تحول؟ — gift amount (drawn 3196:31717/32019 «حولها لزميل»,
 * 3196:31868/32164 «حولها للعائلة»; points → cashback per user direction:
 * the balance chip carries the live cashback ﷼, chips scale ÷100 and the
 * WO-coin glyphs become the Riyal symbol). CTA disabled at 0 or above
 * balance; chips above balance disabled.
 */
export default function GiftAmountScreen() {
  const navigate = useNavigate();
  const { cashback } = useAppState();
  const { audience, recipient, amount, setAmount } = useGift();
  const [value, setValue] = useState(amount > 0 ? String(amount) : '');

  if (!recipient) return <Navigate to="/gift/pick?aud=colleagues" replace />;

  const family = audience === 'family';
  const parsed = Number(value.replace(/[^\d.]/g, '')) || 0;
  const valid = parsed > 0 && parsed <= cashback;

  const submit = () => {
    if (!valid) return;
    setAmount(parsed);
    navigate('/gift/pin');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="flex h-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full flex-col items-center">
          <IosStatusBar />

          {/* 🧭 App bar — live cashback chip at the left, title + back at the right */}
          <div className="flex w-full shrink-0 items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            <div className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full border border-solid border-line bg-surface px-2 py-1.5">
              <p className="shrink-0 text-[15px] font-normal leading-none text-brand-400">
                <Riyal />
              </p>
              <p className="font-en shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                {fmtSar(cashback)}
              </p>
            </div>
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                {family ? 'حولها للعائلة' : 'حولها لزميل'}
              </p>
              <BackArrow />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* Promo strip */}
            <div className="flex h-[88px] w-[343px] shrink-0 items-center justify-end gap-4 overflow-clip rounded-2xl bg-brand-50 px-3 py-4">
              <div className="flex h-full w-[259px] shrink-0 flex-col items-end gap-0.5 text-right leading-[1.5]">
                <p className="w-full text-base font-medium text-ink" dir="auto">
                  {family ? 'أرسل إلى العائلة' : 'أرسل إلى الزملاء'}
                </p>
                <p className="w-full text-xs font-normal text-ink-secondary" dir="auto">
                  {family
                    ? 'شارك كاش باك في ولاء بلس مع عائلتك الكريمة على الفور'
                    : 'شارك كاش باك في ولاء بلس مع زملائك في العمل على الفور'}
                </p>
              </div>
              <div className="relative flex size-10 shrink-0 items-center justify-center overflow-visible rounded-full bg-brand-400 shadow-[0px_2px_8px_2px_rgba(0,206,139,0.2),inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.5),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.5),inset_0px_0px_8px_0px_rgba(160,160,160,0.5)]">
                {family ? (
                  <WhiteMaskIcon src={iconPeople} size={24} />
                ) : (
                  <div className="relative size-6 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBriefcase} />
                  </div>
                )}
              </div>
            </div>

            {/* Amount card */}
            <div className="flex w-[343px] shrink-0 flex-col items-center rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full flex-col items-start gap-6">
                <div className="flex w-full flex-col items-start gap-2.5">
                  <div className="flex w-full items-center justify-end">
                    <p className="h-6 w-[253px] text-right text-base font-normal leading-[1.5] text-ink" dir="auto">
                      كم ودك تحول؟
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between rounded-lg border border-solid border-[#ccd2e0] bg-white px-4 py-[17px]">
                    <p className={`shrink-0 text-[17px] font-normal leading-none ${parsed > 0 ? 'text-brand-400' : 'text-ink-quadrant'}`}>
                      <Riyal />
                    </p>
                    <input
                      type="text"
                      inputMode="decimal"
                      dir="ltr"
                      value={value}
                      onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ''))}
                      placeholder="0"
                      className={`font-en min-w-px flex-[1_0_0] bg-transparent text-right text-base font-semibold leading-[1.5] outline-none placeholder:text-ink-quadrant ${
                        parsed > cashback ? 'text-ink-danger' : 'text-ink'
                      }`}
                      aria-label="المبلغ"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-4">
                  {CHIP_ROWS.map((row) => (
                    <div key={row[0]} className="flex w-full items-start justify-between">
                      {row.map((chip) => {
                        const off = chip > cashback;
                        return (
                          <button
                            key={chip}
                            type="button"
                            disabled={off}
                            onClick={() => setValue(String(chip))}
                            className={`flex w-24 shrink-0 items-center justify-center gap-1 rounded-full border border-solid px-[11px] py-3 ${
                              off ? 'border-line opacity-40' : 'cursor-pointer border-line'
                            }`}
                          >
                            <p className="shrink-0 text-[13px] font-normal leading-none text-brand-400">
                              <Riyal />
                            </p>
                            <p className="font-en whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                              {chip.toLocaleString('en-US')}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* المرسل إليه */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  المرسل إليه
                </p>
              </div>
              <div className="flex w-full items-center justify-end gap-3 rounded-2xl border border-solid border-brand-400 bg-brand-50 px-4 py-3">
                <button
                  type="button"
                  onClick={() => navigate(`/gift/pick?aud=${audience}`)}
                  aria-label="تغيير المستلم"
                  className="relative size-4 shrink-0 cursor-pointer"
                >
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconEdit} />
                </button>
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
                  <div className="w-full flex-none -scale-y-100">
                    <div className="flex w-full flex-col items-end justify-center gap-1">
                      <div className="relative flex w-full shrink-0 items-center justify-center">
                        <div className="w-full flex-none -scale-y-100">
                          <p
                            className={`w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary ${recipient.detailEn ? 'font-en' : ''}`}
                            dir={recipient.detailEn ? 'ltr' : 'auto'}
                          >
                            {recipient.detail}
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
                <div className="relative size-10 shrink-0 overflow-clip rounded-full">
                  <img alt="" className="absolute inset-0 block size-full max-w-none rounded-full object-cover" src={recipient.avatar} />
                </div>
              </div>
              <QuickTransferCheck />
            </div>
          </div>
        </div>

        {/* ⛴️ CTA + home indicator */}
        <div className="flex w-full shrink-0 flex-col items-center">
          <button
            type="button"
            disabled={!valid}
            onClick={submit}
            className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
              valid ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
            }`}
          >
            <p
              className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
                valid ? 'text-ink-inverse' : 'text-ink-quadrant'
              }`}
              dir="auto"
            >
              اللي بعده
            </p>
          </button>
          <div className="relative h-[34px] w-[375px] shrink-0">
            <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** «أضف إلى التحويل السريع» — drawn checkbox row (visual toggle only; the
    checked state reuses the repo check glyph, as the drawn tick refuses export). */
function QuickTransferCheck() {
  const [on, setOn] = useState(false);
  return (
    <button type="button" onClick={() => setOn((v) => !v)} className="flex w-full cursor-pointer items-center justify-end gap-3">
      <p className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
        أضف إلى التحويل السريع
      </p>
      <span
        className={`relative size-4 shrink-0 overflow-clip rounded-sm border border-solid ${
          on ? 'border-brand-400 bg-brand-400' : 'border-[#ccd2e0] bg-surface'
        }`}
      >
        {on && (
          <span className="absolute inset-[calc(31.25%-0.38px)]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
          </span>
        )}
      </span>
    </button>
  );
}
