import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../../components/TabBar';
import LinkIntroSheet, { useLinkIntroGate } from '../../components/LinkIntroSheet';
import ConvertSheet from '../../components/ConvertSheet';
import RedeemSheet from '../../components/RedeemSheet';
import CashbackStrip from '../../components/CashbackStrip';
import LinkPromoBanner from '../../components/LinkPromoBanner';

const fmtPts = (n: number) => n.toLocaleString('en-US');
import { useAppState } from '../../state/AppState';
// ── status bar ──
import statusBarMask from '../../assets/figma/863c90e2bcf523e5186af44ac3700298ea5b0759.svg';
// ── points card ──
import coinLg from '../../assets/figma/0f48dfe840fac9c35481a311895b2dd54a2580f9.svg';
import coinSm from '../../assets/figma/1fc63f5f61f3f22b61f4543f37dec854ea9f0818.svg';
import chevronWhiteStroke from '../../assets/figma/c27ef403c630aa9b072d1b2bb88a934a6b692437.svg';
import ellipseGreen from '../../assets/figma/0e1559e739afd9e82a2b44c1d16782eb658a719d.svg';
import ellipseTeal from '../../assets/figma/801bfe6575903f6eacc63597843a5f838ab43c19.svg';
import iconSwap from '../../assets/figma/deefd6b77894536589cb50f767e7a9c50d68ba82.svg';
import iconCoin from '../../assets/figma/a27fa6b604fa9efcfe3a83817d43b2c495574690.svg';
import plusUnionLg from '../../assets/figma/484d463f82d7c82740fd72674eb91804123c7aca.svg';
// ── tabs + chips ──
import iconCart20 from '../../assets/figma/dc54c8c0c41664277ae4d981d87b010f6a84ba2b.svg';
import iconReceipt20 from '../../assets/figma/4302f8a12f0957461edfe25791837c13cc5a1a26.svg';
import inkBar from '../../assets/figma/5ffb5daa4f7717307a3ff760e4385942741dc99c.svg';
import chevronDownStroke from '../../assets/figma/77c6ee8bdf9a8b9349b5a4993bf58b2938f73310.svg';
import arrowsUpDown from '../../assets/figma/93bcf7aa79a8b96b6d35bc2268ae7f8da37bc559.svg';
// ── transaction rows ──
import plusUnionSm from '../../assets/figma/20f6536c1e817822a6e89239b9dd635ccaa7b2f5.svg';
import arrowRightStroke from '../../assets/figma/519d696982209f8e1ed4e0fbfbbb14f2e9c2839a.svg';
import photoIkea from '../../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoHm from '../../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoWife from '../../assets/figma/fbc7f3ce06113005d0e39cdc99820760ef452381.png';
import photoAramco from '../../assets/figma/932e7b4602f1cc673079f43957f538f27d65cec7.png';
import photoFayez from '../../assets/figma/dc6c00fea95e48e04fd052616502079664381b14.png';
import photoCompany from '../../assets/figma/fd1c21afe12f77e67e0b4b08bb72091f2ed8f233.png';
import photoAmazon from '../../assets/figma/9707750f1378407cddae96a725789148538ef210.png';
import photoEra from '../../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import photoGift from '../../assets/figma/0c6d191dd1ade215c4e588f984b1e2a7d881ae15.png';
// ── WalaOne bar (below-fold block, after linking) ──
import woRectBase from '../../assets/figma/d80d73563d497feddf13013a8e9469865dba5ab8.svg';
import woRectStroke from '../../assets/figma/6e802684a8c002fc81efdd83abc74bd1212f8e08.svg';
import woIconProfile from '../../assets/figma/913b16a49f888139daf47d27e4aa1afcea47fb70.svg';
import woIconCoin from '../../assets/figma/42d5884592d93afa401bd54e1619b3acd7f65dfe.svg';
import woIconTicket from '../../assets/figma/f22441bdc47a259412adf2c94f4d62a798ef1204.svg';
import woIconHome from '../../assets/figma/65daf7dc128edf6b8d475f5d7505282079ec3d79.svg';
import woIconScan from '../../assets/figma/56dd8f91f43722021902758f8ca4276b1c10da4a.svg';

/** 12:30 status bar drawn as one alpha-masked shape (WithdrawStatusScreen). */
function MaskStatusBar() {
  const maskClasses =
    'absolute inset-0 bg-ink mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[16.448px_9.333px] mask-size-[324.886px_13.333px]';
  return (
    <div className="relative h-11 w-[375px] shrink-0">
      <div className={`${maskClasses} backdrop-blur-[125px]`} style={{ maskImage: `url("${statusBarMask}")` }} />
      <div className={maskClasses} style={{ maskImage: `url("${statusBarMask}")` }} />
    </div>
  );
}

/** WP Coin glyph (WO Coin inset within its square frame). */
function WpCoin({ size, src }: { size: number; src: string }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
        <img alt="" className="block size-full max-w-none" src={src} />
      </div>
    </div>
  );
}

/* ─────────────────────────── points card ─────────────────────────── */

/** One circular glass action (40px halo circle + white label). */
function PointsAction({
  ellipse,
  label,
  col,
  onClick,
  children,
}: {
  ellipse: string;
  label: string;
  col?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className={`flex shrink-0 flex-col items-center gap-1 ${col ?? ''}`}>
      <div className="relative flex size-10 shrink-0 items-center justify-center gap-2.5 overflow-clip rounded-full px-[17px] py-4 shadow-[0px_2px_8px_2px_rgba(0,0,0,0.1)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-[6px]" />
        <div className="absolute left-[calc(50%+0.25px)] top-0 size-10 -translate-x-1/2">
          <div className="absolute inset-[-25%]">
            <img alt="" className="block size-full max-w-none" src={ellipse} />
          </div>
        </div>
        {children}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.5),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.5),inset_0px_0px_8px_0px_rgba(160,160,160,0.5)]" />
      </div>
      <p className={`text-center text-xs font-normal leading-[1.5] text-ink-inverse ${col ? 'whitespace-nowrap' : 'w-[87px]'}`} dir="auto">
        {label}
      </p>
    </button>
  );
}

/** Green gradient points card (54:10247): WP coin + live points balance
    (transition phase 1 rebases the drawn 500,000 to 5,000), «استخدمها» pill,
    three circular actions — «حول نقاطك» and the pill open the converter. */
function PointsCard({ onConvert }: { onConvert: () => void }) {
  const { points } = useAppState();
  return (
    <div className="relative flex w-full shrink-0 flex-col items-center justify-center gap-4 overflow-clip rounded-2xl bg-gradient-to-b from-[#002015] to-brand-400 px-4 py-6">
      <div className="absolute contents left-[-95px] top-[70px]">
        <div className="absolute left-[142px] top-[70px] h-[203px] w-[296px] rounded-[500px] bg-[#b54806] opacity-50 blur-[57px]" />
        <div className="absolute left-[-95px] top-[70px] h-[203px] w-[275px] rounded-[500px] bg-[#009263] opacity-50 blur-[57px]" />
      </div>

      {/* balance row (h pinned: Poppins 32×1.3 rounds 0.4px short of the drawn 44) */}
      <div className="relative flex h-11 w-[343px] shrink-0 flex-col items-center gap-0.5 px-[17px] py-px">
        <div className="flex shrink-0 items-center justify-center gap-2.5">
          <WpCoin size={38} src={coinLg} />
          <p
            className="font-en whitespace-nowrap text-center text-[32px] font-semibold leading-[1.3] text-ink-inverse"
            data-testid="wallet-points-balance"
          >
            {fmtPts(points)}
          </p>
        </div>
      </div>

      {/* «استخدمها» pill with the expiring-points note — opens the converter */}
      <button
        type="button"
        onClick={onConvert}
        className="relative flex h-[61px] w-[299px] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full px-[17px] py-3 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(83,65,153,0.1)] backdrop-blur-[6px]" />
        <div className="relative flex shrink-0 items-start">
          <div className="flex shrink-0 items-center justify-center gap-1 rounded-2xl py-0.5">
            <div className="relative size-3 shrink-0 overflow-clip">
              <div className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center" style={{ containerType: 'size' }}>
                <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                  <div className="relative size-full">
                    <div className="absolute inset-[-6.94%_-4.17%]">
                      <img alt="" className="block size-full max-w-none" src={chevronWhiteStroke} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
              استخدمها
            </p>
          </div>
        </div>
        <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
          <div className="flex w-full flex-col items-end justify-center">
            <p className="whitespace-nowrap text-right text-[0px] leading-[0]" dir="rtl">
              <span className="font-en text-xs font-semibold not-italic leading-[1.5] text-[#fac333]">2,500</span>
              <span className="text-xs leading-[1.2] text-[#fac333]">{` `}</span>
              <span className="text-xs font-medium leading-[1.5] text-[#fac333]">نقطة</span>
              <span className="text-xs leading-[1.2]">
                <br aria-hidden />
              </span>
              <span className="text-[10px] font-normal leading-[1.5] text-ink-inverse">
                {'تنتهي خلال '}
                <span className="font-en">30</span>
                {' يوم. أقربها بعد '}
                <span className="font-en">5</span>
                {' أيام'}
              </span>
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_8px_0px_rgba(160,160,160,0.5)]" />
      </button>

      {/* circular actions — physical order حول / استبدل / اشحن */}
      <div className="relative flex w-[343px] shrink-0 items-start justify-center gap-5">
        <PointsAction ellipse={ellipseGreen} label="حول نقاطك" col="w-[77.5px] px-[15px]" onClick={onConvert}>
          <div className="relative size-6 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSwap} />
          </div>
        </PointsAction>
        <PointsAction ellipse={ellipseGreen} label="استبدل نقاطك">
          <div className="relative size-6 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCoin} />
          </div>
        </PointsAction>
        <PointsAction ellipse={ellipseTeal} label="اشحن نقاطك" col="w-[77.5px] px-[15px]">
          <div className="relative size-5 shrink-0 overflow-clip">
            <div className="absolute inset-[20%]">
              <div className="absolute inset-[-2.08%]">
                <img alt="" className="block size-full max-w-none" src={plusUnionLg} />
              </div>
            </div>
          </div>
        </PointsAction>
      </div>
    </div>
  );
}



/* ──────────────────── tabs · chips · transactions ──────────────────── */

/** 🗂️ Tabs (54:10319/54:10667): مشترياتي inactive · العمليات active (ink-bar). */
function TabsBar() {
  return (
    <div className="flex h-[45px] w-[375px] shrink-0 items-end justify-between border-b border-solid border-line bg-surface">
      <div className="flex min-w-px flex-[1_0_0] items-end self-stretch">
        <div className="relative flex h-full min-w-px flex-[1_0_0] items-center justify-center gap-3 overflow-clip">
          <button type="button" className="flex shrink-0 items-center justify-center gap-3">
            <div className="flex shrink-0 items-center gap-1">
              <div className="flex shrink-0 items-center justify-center gap-2.5 overflow-clip py-2">
                <p className="whitespace-nowrap text-right text-sm font-normal leading-[1.5] text-ink" dir="auto">
                  مشترياتي
                </p>
              </div>
            </div>
            <div className="relative size-5 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCart20} />
            </div>
          </button>
        </div>
      </div>
      <div className="relative flex min-w-px flex-[1_0_0] flex-col items-end justify-center overflow-clip">
        <div className="absolute bottom-0 left-0 right-0 h-0">
          <div className="absolute inset-[-2px_0_0_0]">
            <img alt="" className="block size-full max-w-none" src={inkBar} />
          </div>
        </div>
        <button type="button" className="flex w-full shrink-0 items-center justify-center gap-3 py-1">
          <div className="flex shrink-0 items-center gap-1">
            <div className="flex shrink-0 items-center justify-center gap-2.5 overflow-clip py-2">
              <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-brand-400" dir="auto">
                العمليات
              </p>
            </div>
          </div>
          <div className="relative size-5 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconReceipt20} />
          </div>
        </button>
      </div>
    </div>
  );
}

/** Sort/filter chips row (54:10320): نقاط فقدتها / نقاط كسبتها / رتبها ⇅. */
function ChipsRow() {
  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-3">
      <button
        type="button"
        className="flex h-[30px] shrink-0 items-center justify-center rounded-2xl border border-solid border-line px-2.5 py-1.5"
      >
        <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
          نقاط فقدتها
        </p>
      </button>
      <button
        type="button"
        className="flex h-[30px] shrink-0 items-center justify-center rounded-2xl border border-solid border-line px-2.5 py-1.5"
      >
        <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
          نقاط كسبتها
        </p>
      </button>
      <button
        type="button"
        className="flex h-[32px] shrink-0 items-center justify-center gap-1 rounded-2xl border border-solid border-line px-2.5 py-1.5"
      >
        <div className="flex shrink-0 items-center">
          <div className="relative size-5 shrink-0 overflow-clip">
            <div className="absolute bottom-[35%] left-1/4 right-1/4 top-[35%]">
              <div className="absolute inset-[-4.17%_-2.5%]">
                <img alt="" className="block size-full max-w-none" src={chevronDownStroke} />
              </div>
            </div>
          </div>
          <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
            رتبها
          </p>
        </div>
        <div className="relative size-4 shrink-0 overflow-clip">
          <div className="absolute inset-[12.5%]">
            <div className="absolute inset-[-6.25%]">
              <img alt="" className="block size-full max-w-none" src={arrowsUpDown} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

/** Date group: right-aligned label + 4px-spaced rows. */
function TxSection({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex w-full shrink-0 flex-col items-start">
      <div className="flex w-full shrink-0 items-center justify-end gap-1.5 py-2.5">
        <p className="h-[18px] whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
          {label}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-1">{children}</div>
    </div>
  );
}

/** Circular 40px row media (brand photo); `contain` for the gift logo. */
function MediaPhoto({ src, contain }: { src: string; contain?: boolean }) {
  return (
    <div className="relative flex size-10 shrink-0 flex-col items-start overflow-clip rounded-[500px]">
      {contain ? (
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[500px] object-contain" src={src} />
      ) : (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[500px]">
          <img alt="" className="absolute left-0 top-0 size-full max-w-none" src={src} />
        </div>
      )}
    </div>
  );
}

/** Transaction row (List item, 344×64). Title above, time below; WP-coin
    amount on the physical left; media/avatar on the right. */
function TxRow({
  highlight,
  amount,
  green,
  dir = 'rtl',
  gap = 'gap-0.5',
  wrap,
  title,
  timeDir = 'auto',
  badge,
  children,
}: {
  highlight?: boolean;
  amount: string;
  green?: boolean;
  dir?: 'rtl' | 'ltr';
  gap?: string;
  wrap?: boolean;
  title: string;
  timeDir?: 'auto' | 'rtl';
  badge?: boolean;
  children: ReactNode;
}) {
  const amountCell = (
    <div className={`flex ${gap} shrink-0 items-center justify-center overflow-clip ${wrap ? 'w-full' : ''}`}>
      <WpCoin size={20} src={coinSm} />
      <p
        className={`font-en whitespace-nowrap text-right text-xs font-medium leading-[1.5] ${green ? 'text-brand-400' : 'text-ink'}`}
        dir={dir}
      >
        {amount}
      </p>
    </div>
  );
  return (
    <button
      type="button"
      className={`relative flex h-[64px] w-[344px] shrink-0 items-center justify-end gap-3 rounded-2xl border border-solid px-4 py-3 ${
        highlight ? 'border-brand-400 bg-brand-50' : 'border-line-subtle bg-surface'
      }`}
    >
      {wrap ? <div className="flex w-[52px] shrink-0 flex-col items-start">{amountCell}</div> : amountCell}
      <div className="flex min-w-px flex-[1_0_0] flex-col items-end justify-center gap-1">
        <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
          {title}
        </p>
        <p className="font-en w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir={timeDir}>
          08:30
        </p>
      </div>
      {children}
      {badge && (
        <div className="absolute left-[312.5px] top-[33px] flex size-5 flex-col items-center justify-center overflow-clip rounded-[625px] border-2 border-solid border-white bg-ink px-[5px]">
          <div className="relative size-[9.649px] shrink-0 overflow-clip">
            <div className="absolute inset-[20%_15%] flex items-center justify-center" style={{ containerType: 'size' }}>
              <div className="h-[100cqw] w-[100cqh] flex-none -rotate-90">
                <div className="relative size-full">
                  <div className="absolute inset-[-1.79%_-2.08%]">
                    <img alt="" className="block size-full max-w-none" src={arrowRightStroke} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

/** Shared tabs + chips + grouped transactions column (54:10316 / 54:10664). */
function TransactionsBlock() {
  return (
    <div className="flex w-full shrink-0 flex-col items-end gap-3">
      <div className="flex w-full shrink-0 flex-col items-start gap-4">
        <div className="flex w-full shrink-0 flex-col items-center">
          <TabsBar />
        </div>
        <ChipsRow />
      </div>

      <div className="flex w-full shrink-0 flex-col items-start gap-2">
        <TxSection label="اليوم">
          <TxRow highlight amount="+500" green wrap title="كسب نقاط من إيكيا">
            <MediaPhoto src={photoIkea} />
          </TxRow>
          <TxRow amount="-500" title="حولت إلى اشرف القاسم">
            <div className="relative size-10 shrink-0 overflow-clip rounded-[500px] bg-surface-neutral">
              <p className="font-en absolute left-1/2 top-[calc(50%-12px)] w-10 -translate-x-1/2 text-center text-base font-medium leading-[1.5] text-ink-secondary">
                AQ
              </p>
            </div>
          </TxRow>
          <TxRow amount="-500" title="حولت إلى زوجتك">
            <div className="relative size-10 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" height="40" src={photoWife} width="40" />
            </div>
          </TxRow>
          <TxRow amount="-5,000" title="حولت إلى حساب آرامكو ..">
            <div className="relative size-10 shrink-0 rounded-[32px]">
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[32px] object-cover" src={photoAramco} />
            </div>
          </TxRow>
          <TxRow amount="+1,000" green title="استلمت من فايز القحط..">
            <div className="relative size-10 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" height="40" src={photoFayez} width="40" />
            </div>
          </TxRow>
        </TxSection>

        <TxSection label="أمس">
          <TxRow highlight amount="+500" green wrap title="كسب نقاط من إتش اند ..">
            <MediaPhoto src={photoHm} />
          </TxRow>
          <TxRow amount="+200,000" green title="شحن نقاط">
            <div className="flex shrink-0 flex-col items-center justify-center gap-2">
              <div className="flex shrink-0 items-center justify-center rounded-[500px] bg-surface-neutral p-2.5">
                <div className="relative size-5 shrink-0 overflow-clip">
                  <div className="absolute inset-[20%]">
                    <div className="absolute inset-[-2.08%]">
                      <img alt="" className="block size-full max-w-none" src={plusUnionSm} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TxRow>
          <TxRow amount="+10,000" green title="نقاط من شركتك">
            <div className="relative size-10 shrink-0 rounded-[32px]">
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[32px] object-cover" src={photoCompany} />
            </div>
          </TxRow>
        </TxSection>

        <TxSection
          label={
            <>
              <span className="font-en">30</span>
              {' يونيو'}
            </>
          }
        >
          <TxRow highlight amount="+500" green wrap title="كسب نقاط من إتش اند إم">
            <MediaPhoto src={photoHm} />
          </TxRow>
          <TxRow amount="-50,000" title="شراء قسيمة">
            <MediaPhoto src={photoAmazon} />
          </TxRow>
          <TxRow amount="-500" title="شراء عرض">
            <div className="relative size-10 shrink-0 rounded-[500px]">
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[500px] object-cover" src={photoEra} />
            </div>
          </TxRow>
          <TxRow amount="100,000-" dir="ltr" gap="gap-1" title="إهداء قسيمة" timeDir="rtl" badge>
            <MediaPhoto src={photoGift} contain />
          </TxRow>
        </TxSection>
      </div>
    </div>
  );
}

/* ───────────────── WalaOne bar (below the fold, linked) ───────────────── */

function WoTab({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <div className="flex h-14 w-[75px] shrink-0 flex-col items-center justify-center overflow-clip">
      <div className="flex h-14 w-full shrink-0 flex-col items-center justify-center gap-0.5">
        <div className="relative size-6 shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
        </div>
        <p
          className={`w-[min-content] min-w-full text-center text-xs leading-[1.5] ${
            active ? 'font-medium text-viola-500' : 'font-normal text-ink'
          }`}
          dir="auto"
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/** Group 68818 (54:10844) — the WalaOne super-app tab bar drawn at the very
    end of the linked wallet's scroll (below the 812 fold, as designed). */
function WalaOneBar() {
  return (
    <div className="relative h-[97px] w-full shrink-0" data-testid="walaone-bar">
      <div className="absolute left-0 top-[27px] h-[70px] w-[375px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={woRectBase} />
      </div>
      <div className="absolute left-0 top-[27px] h-[70px] w-[375px]">
        <div className="absolute inset-[-8.57%_-2.13%_-14.29%_-2.13%]">
          <img alt="" className="block size-full max-w-none" src={woRectStroke} />
        </div>
      </div>
      <div className="absolute left-[2px] top-[32px] flex items-start">
        <WoTab icon={woIconProfile} label="حسابي" />
        <WoTab icon={woIconCoin} label="محفظتي" active />
        <div className="relative h-6 w-[71px] shrink-0" />
        <WoTab icon={woIconTicket} label="السوق" />
        <WoTab icon={woIconHome} label="الرئيسية" />
      </div>
      <div className="absolute left-[157px] top-0 size-[62px] overflow-clip rounded-[369.048px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[369.048px] bg-gradient-to-t from-[rgba(52,34,123,0.9)] to-[rgba(98,72,195,0.9)] backdrop-blur-[6px]" />
        <div className="absolute left-[calc(50%-0.12px)] top-[calc(50%-0.12px)] size-[23.759px] -translate-x-1/2 -translate-y-1/2">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={woIconScan} />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_1px_1px_0.5px_0px_#917ce0,inset_-1px_-1px_0.5px_0px_#917ce0,inset_0px_0px_8px_0px_rgba(160,160,160,0.5)]" />
      </div>
    </div>
  );
}

/* ─────────────────────────────── screen ─────────────────────────────── */

/**
 * المحفظة — Points Wallet (Figma section 54:11541 "Wallet", Phase 2 only).
 * 54:10152 = before linking (promo banner), 54:10497 = after linking
 * (viola cashback strip + WalaOne bar below the fold); `cardLinked` picks
 * the variant. Everything else — green points card, العمليات tabs, sort
 * chips and the grouped transactions — is shared, copied verbatim from
 * design/phase2/ctx/ctx-54_10246.txt / ctx-54_10591.txt (physical LTR).
 */
export default function WalletScreen() {
  const navigate = useNavigate();
  const { cardLinked } = useAppState();
  // first-time add-card gate: the intro sheet rises over the wallet itself
  const { introOpen, startLinking, closeIntro } = useLinkIntroGate();
  // transition phase 1: converter + redemption hub
  const [convertOpen, setConvertOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto">
        <MaskStatusBar />
        <div className="flex w-full flex-col items-center gap-6 bg-surface px-4 py-5">
          <PointsCard onConvert={() => setConvertOpen(true)} />
          {cardLinked ? (
            <div className="flex w-full shrink-0 flex-col items-start gap-[18px]">
              <CashbackStrip
                onRedeem={() => setRedeemOpen(true)}
                onDetails={() => navigate('/cards')}
                testId="wallet-cashback-card"
                balanceTestId="wallet-cashback-balance"
                redeemTestId="wallet-redeem-cta"
              />
              <TransactionsBlock />
            </div>
          ) : (
            <>
              <LinkPromoBanner onLink={startLinking} variant="wallet" />
              <div className="flex w-full shrink-0 flex-col items-start">
                <TransactionsBlock />
              </div>
            </>
          )}
        </div>
        {cardLinked && <WalaOneBar />}
      </div>
      <TabBar active="wallet" />
      <LinkIntroSheet open={introOpen} onClose={closeIntro} />
      <ConvertSheet open={convertOpen} onClose={() => setConvertOpen(false)} />
      <RedeemSheet open={redeemOpen} onClose={() => setRedeemOpen(false)} />
    </div>
  );
}
