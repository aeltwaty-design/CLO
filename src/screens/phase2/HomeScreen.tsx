import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Riyal from '../../components/Riyal';
import { useAppState } from '../../state/AppState';
import LinkIntroSheet, { useLinkIntroGate } from '../../components/LinkIntroSheet';
import { useWithdraw } from '../../state/WithdrawState';
import CashbackStrip from '../../components/CashbackStrip';
import RedeemSheet from '../../components/RedeemSheet';
import LinkPromoBanner from '../../components/LinkPromoBanner';
import iconClockNudge from '../../assets/figma/48986a4e85102fcc197e2b20835710b0c837cafd.svg';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
import TabBar from '../../components/TabBar';
// ── header assets ──
import chip3dServices from '../../assets/figma/c36caeba00fb8eb98e69d0d6753d5fec74a8e0ab.png';
import chip3dEducation from '../../assets/figma/e259e3ebdad543bd56a381a4032723e1c956db13.png';
import chip3dTravel from '../../assets/figma/efe0881a752766db69a668f7981298d369a17778.png';
import chip3dHome from '../../assets/figma/7ea705257a0a0a7cb3431019b863508680ffba5f.png';
import chip3dHealth from '../../assets/figma/5f627ffa41b6bcf0da831c28cf043e2636237c40.png';
import chip3dBeauty from '../../assets/figma/2e9a029b0c86187d8bd8703440acf3edfefd59ec.png';
import chip3dFashion from '../../assets/figma/fa38894937a80efafb5587796751f66df05e8d6f.png';
import chip3dFood from '../../assets/figma/2837c7b189e70d13f63cac83f75906463f83c187.png';
import heroBanner from '../../assets/figma/4eb368ea9a991152e138a2b813337a34690c71f2.png';
import iconSearch from '../../assets/figma/7e784d450e713f5e771409c8ebed7f9f7b1ad69f.svg';
import heroDotGray from '../../assets/figma/56893a4ea95e167f2a349881b41d02341192cabf.svg';
import heroDotDark from '../../assets/figma/296f8899729c61f32e662ca573233d499e5c8473.svg';
import iconNotification from '../../assets/figma/faf791f2529e68a7ef2f5914bc21d4645c571329.svg';
import iconTicket from '../../assets/figma/02d41c187946e3ed96263cd3096f1393fea2a563.svg';
import ctaDiscountShape from '../../assets/figma/b696ce7fb6adfd3c08e9ccb0af72f4ed58db7266.svg';
import ctaBuyCrypto from '../../assets/figma/6650b53b751252998b63b1038e80319c2fdff2ca.svg';
// ── section/card assets ──
import chevronStroke from '../../assets/figma/e8b3d916f4a8ca674ba7587240e11d98df1d209d.svg';
import photoKebab from '../../assets/figma/48c5873ea5e66de261a045220b3c4780dba6f242.png';
import photoAmazon from '../../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoExtra from '../../assets/figma/b4c221fa2bf4465f143d9fbf5faf7b20a417cbec.png';
import photoNamaq from '../../assets/figma/24bcb3d583bab67b3092d93efb38facf8d22ddf0.png';
import photoCosta from '../../assets/figma/2002e139960f6fb62a07dea9eaf24cc0ca8eb858.png';
import photoHm from '../../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoIkea from '../../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoNoon from '../../assets/figma/698a38ae0271c32c85a05df977621f61da6608ae.png';
import iconShop from '../../assets/figma/b29c8472a920d7f72b3162de749ffef1cc4696df.svg';
import iconGlobal from '../../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';
import iconBuyCrypto from '../../assets/figma/c03fb20f4a024c12351087985f13c0bff8d70ca5.svg';
import iconTickCircle from '../../assets/figma/7d6f0d889568034a1bc416ccaf53f71b77fc8c92.svg';
import iconPlus from '../../assets/figma/7e1ea9a4c50bc8f9b508158adeb3a718cd7787a2.svg';
import favLogo1 from '../../assets/figma/d3d5e0678cb15d2b6557fbc53e1b480d56282713.png';
import favLogo2 from '../../assets/figma/66e44278ffdfd4a0b7f234fc3692b985c87bc1da.png';
import bannerGrocery from '../../assets/figma/acc7990fc2280ecd8b7685554ad37c3b7371e081.png';
import iconArrowBanner from '../../assets/figma/bcfddb457e1454e3133d68214c0ae8ac87008d52.svg';
import dotCurrentSmall from '../../assets/figma/e95db42495b6eca41288a042088352160c0bb991.svg';
import dotWhiteSmall from '../../assets/figma/c6efebdcc1b734d4cff28623ab84d7d4c624c5d9.svg';
import imgTortilla from '../../assets/figma/54e5c839c0daa229f16c0aa724e9879b8f649140.png';
import imgMilkshake from '../../assets/figma/cdd3b00148ceb588406ceae942deda56efbaae27.png';
import coinWp24 from '../../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';
import iconTimer from '../../assets/figma/a33727ada5a77a9e98387ec7255c59a12202683f.svg';
// ── «قسائم خاصة» artwork ──
import specialMaskRed from '../../assets/figma/5450730031a6b8bd6f6e8fedfb7d045e805fa171.svg';
import specialPizza from '../../assets/figma/fcf4aac595023ccd895b5e77afd27ca5aef7c687.svg';
import specialDrink from '../../assets/figma/66af0f121b37a6871e879559cc7ad6495ab03b61.svg';
import specialFries from '../../assets/figma/b7d6daf33766864ba63aa718327d901dd321f508.svg';
import specialMaskGreen from '../../assets/figma/e7e496a0265b17e9c5dd63eff0d040586a55fe1c.svg';
import specialCloudA from '../../assets/figma/f3d523dd044c38913d906f1e515930b2a7a4707d.svg';
import specialCloudB from '../../assets/figma/fabb1b1ce32d1ecdf9341fa20d71622103913d48.svg';
import specialCloudC from '../../assets/figma/335e37721e40100908daf09bdd58d99c6e78d9b4.svg';
import specialTravel from '../../assets/figma/86bd34b8b37fb104e0c9a59992a9d7b7f495843e.svg';
import specialMaskPurple from '../../assets/figma/bcbf2f3ad98cdf9162c31e7f9fb3beac6317008b.svg';
import specialTickets from '../../assets/figma/bc039bcf801a46f1c15f6c469767836efdb0bda2.svg';
import specialParticles from '../../assets/figma/85d9ec9e7edcb2720855d5902aecac7fab61c97d.svg';

/**
 * الرئيسية — Home (Figma 47:3538 "Home", 375×2443, Phase 2 only).
 *
 * Physical-LTR DOM copied from the generated design contexts
 * (design/phase2/ctx/ctx-47_*.txt); horizontal carousels rest scrolled to
 * their RIGHT end (flash sale: centered) so the at-rest view matches the
 * renders. The header's «الرصيد الإجمالي» balance block is drawn at
 * opacity-0 in the design and is skipped.
 */
export default function HomeScreen() {
  // first-time add-card gate: the intro sheet rises over Home itself
  const { introOpen, startLinking, closeIntro } = useLinkIntroGate();
  const { cardLinked } = useAppState();
  // the cashback section's «استخدمه» opens the redemption hub over Home
  const [redeemOpen, setRedeemOpen] = useState(false);
  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-x-hidden overflow-y-auto">
        <HomeHeader onStartLinking={startLinking} />
        {/* content column (Figma 47:3725, 375×1872 at y585) — relative so it
            paints over the header sheet's 30px spill below y585 */}
        <div className="relative flex w-full flex-col items-start gap-7 px-4 pb-[104px] pt-6">
          <DailyOffersSection />
          <AddCardPromo onStart={startLinking} onRedeem={() => setRedeemOpen(true)} />
          {cardLinked && <ExpiringNudge />}
          <FavoriteStoresEmpty />
          <GroceryBanner />
          <FoodOffersSection />
          <ExclusiveVouchersSection />
          <FlashSaleSection />
          <RetailersSection />
          <SpecialVouchersSection />
        </div>
      </div>
      <TabBar active="home" />
      <LinkIntroSheet open={introOpen} onClose={closeIntro} />
      <RedeemSheet open={redeemOpen} onClose={() => setRedeemOpen(false)} />
    </div>
  );
}

/** Rest a horizontal carousel at its physical right end (RTL "start"),
    or centered for the flash-sale row. Physical-LTR scroll container. */
function useRestScroll(align: 'end' | 'center' = 'end') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      const max = el.scrollWidth - el.clientWidth;
      el.scrollLeft = align === 'center' ? max / 2 : max;
    }
  }, [align]);
  return ref;
}

/* ────────────────────────────── header ────────────────────────────── */

/** Immersive header background (47:3620): mint block, greeting row, hero
    promo banner + dots, category tiles, white sheet with search + chips. */
function HomeHeader({ onStartLinking }: { onStartLinking: () => void }) {
  const navigate = useNavigate();
  const { cardLinked, cashback } = useAppState();
  const chipsRef = useRestScroll();
  return (
    <div className="relative h-[585px] w-full shrink-0 rounded-bl-[40px] rounded-br-[40px] bg-[#daebe4]">
      {/* decorative blurred circles */}
      <div className="absolute right-[-40px] top-[-40px] size-[256px] rounded-full bg-[rgba(255,255,255,0.1)] blur-[32px]" />
      <div className="absolute left-[-40px] top-[80px] size-[160px] rounded-full bg-[rgba(255,255,255,0.1)] blur-[20px]" />

      {/* greeting row (47:3695) — 44px status-bar zone above stays empty */}
      <div className="absolute inset-x-4 top-14 flex items-center justify-between">
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="relative size-10 shrink-0 overflow-clip rounded-[100px] border border-solid border-[rgba(255,255,255,0.74)] bg-[rgba(246,246,246,0.74)]"
            aria-label="الإشعارات"
          >
            <div className="absolute left-[9px] top-[9px] size-5">
              <div className="absolute inset-[-20%_0_0_0]">
                <img alt="" className="block size-full max-w-none" src={iconNotification} />
              </div>
            </div>
          </button>
          {/* cashback pill — before a card exists it is another linking entry
              (intro sheet over Home); after linking it opens the cashback
              wallet with the live balance (drawn 53px width kept for 0) */}
          <button
            type="button"
            onClick={cardLinked ? () => navigate('/cards') : onStartLinking}
            aria-label="الكاش باك"
            className={`flex h-10 ${
              cardLinked ? '' : 'w-[53px] '
            }shrink-0 cursor-pointer flex-col items-start justify-center overflow-clip rounded-[100px] border border-solid border-[rgba(255,255,255,0.74)] bg-[rgba(246,246,246,0.74)] px-3`}
          >
            <div className="flex w-full items-center gap-1 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink">
              <p className="relative shrink-0" dir="auto">
                <Riyal />
              </p>
              <p className="font-en relative shrink-0" dir="auto">
                {cardLinked ? fmtSar(cashback) : '0'}
              </p>
            </div>
          </button>
        </div>
        <div className="flex w-[78px] shrink-0 flex-col items-start">
          <p className="whitespace-nowrap text-right text-base font-medium leading-[1.5] text-ink" dir="auto">
            {'هلا، '}
            <span className="text-brand-400">محمد</span>
          </p>
        </div>
      </div>

      {/* hero promo banner + carousel dots (47:3686) */}
      <div className="absolute left-4 top-32 flex w-[343px] flex-col items-start gap-3.5">
        <button type="button" className="relative h-[131px] w-full shrink-0">
          <div className="absolute left-0 top-0 h-[131px] w-[343px] rounded-2xl">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <img alt="" className="absolute left-0 top-[-77.92%] h-[209.9%] w-full max-w-none" src={heroBanner} />
            </div>
          </div>
        </button>
        <div className="flex w-full shrink-0 items-center justify-center gap-2">
          <div className="relative size-2 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={heroDotGray} />
          </div>
          <div className="relative size-2 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={heroDotGray} />
          </div>
          <div className="relative size-2 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={heroDotGray} />
          </div>
          <div className="relative size-2 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={heroDotDark} />
          </div>
        </div>
      </div>

      {/* main CTAs (83:6940) — RTL reads قسائم · كاش باك · عروض خاصة.
          Each opens its own Market tab now that العروض is built (91:44135). */}
      <div className="absolute left-4 top-[313px] flex w-[343px] items-start gap-3">
        <CategoryTile icon={ctaDiscountShape} label="عروض خاصة" onClick={() => navigate('/market?tab=offers')} />
        <CategoryTile icon={ctaBuyCrypto} label="كاش باك" badge="حتى 10%" onClick={() => navigate('/market')} />
        <CategoryTile icon={iconTicket} label="قسائم" onClick={() => navigate('/market?tab=vouchers')} />
      </div>

      {/* floating white sheet (47:3646): search + colorful category chips */}
      <div className="absolute inset-x-0 top-[416px] flex h-[199px] flex-col items-start gap-4 rounded-3xl bg-white px-4 py-6 [filter:drop-shadow(0px_20px_12.5px_rgba(229,231,235,0.5))_drop-shadow(0px_8px_5px_rgba(229,231,235,0.5))]">
        <div className="flex w-full shrink-0 flex-col items-start justify-center gap-1.5">
          <div className="flex h-[41px] w-full items-center justify-end overflow-clip rounded-full border border-solid border-line bg-surface px-3">
            <div className="flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
              <input
                type="text"
                dir="rtl"
                placeholder="ابحث عما تحتاجه.."
                className="min-w-px flex-[1_0_0] bg-transparent text-right text-sm font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
              />
              <div className="relative size-[18px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
              </div>
            </div>
          </div>
        </div>
        {/* chips carousel — bleeds under the sheet padding to the screen edge */}
        <div ref={chipsRef} className="-mx-4 self-stretch overflow-x-auto px-4">
          <div className="flex w-max items-center gap-1">
            <HeaderChip icon={chip3dServices} label="خدمات" />
            <HeaderChip icon={chip3dEducation} label="تعليم" />
            <HeaderChip icon={chip3dTravel} label="سفر" />
            <HeaderChip icon={chip3dHome} label="المنزل" />
            <HeaderChip icon={chip3dHealth} label="صحة" />
            <HeaderChip icon={chip3dBeauty} label="جمال" />
            <HeaderChip icon={chip3dFashion} label="أزياء" />
            <HeaderChip icon={chip3dFood} label="طعام" food />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryTile({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  /** pill floating above the tile, e.g. «حتى 10%» */
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-2.5 rounded-xl bg-[linear-gradient(-28.8166385645347deg,rgba(255,255,255,0.5)_31.621%,rgb(255,255,255)_135.4%)] px-[13px] pb-3 pt-3.5"
    >
      <div className="relative size-8 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
      <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
      {badge && (
        <div className="absolute left-[calc(50%+0.48px)] top-[-7px] flex w-[41.961px] -translate-x-1/2 flex-col items-center">
          <div className="flex shrink-0 items-start justify-center overflow-clip rounded-full bg-brand-400 px-2 py-[0.5px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
            <p className="whitespace-nowrap text-center text-[9px] font-bold leading-[13.5px] text-ink-inverse" dir="auto">
              {badge}
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

function HeaderChip({ icon, label, food }: { icon: string; label: string; food?: boolean }) {
  return (
    <button
      type="button"
      className={`flex shrink-0 flex-col items-center gap-2 ${food ? 'pl-[11.75px]' : 'px-[11.75px]'}`}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-neutral">
        <div className={`relative shrink-0 ${food ? 'size-8' : 'size-[39px]'}`}>
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={icon} />
        </div>
      </div>
      <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
    </button>
  );
}

/* ─────────────────────────── shared pieces ─────────────────────────── */

/** Section heading row: chevron-left + 18px semibold title (+ optional
    trailing images), right-aligned. Chevron inert as drawn. */
function SectionHeading({ children, trailing }: { children: ReactNode; trailing?: ReactNode }) {
  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-3">
      <div className="flex shrink-0 items-center justify-end">
        <div className="relative size-5 shrink-0 overflow-clip">
          <div
            className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center"
            style={{ containerType: 'size' }}
          >
            <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
              <div className="relative size-full">
                <div className="absolute inset-[-4.17%_-2.5%]">
                  <img alt="" className="block size-full max-w-none" src={chevronStroke} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="whitespace-nowrap text-lg font-medium leading-[1.5] text-ink" dir="auto">
          {children}
        </p>
        {trailing}
      </div>
    </div>
  );
}

/** Full-bleed horizontal carousel: escapes the 16px column gutter so the
    overflowing cards clip at the screen edge exactly like the frame does. */
function Carousel({
  align = 'end',
  bleed = 16,
  gap,
  children,
}: {
  align?: 'end' | 'center';
  bleed?: number;
  gap: string;
  children: ReactNode;
}) {
  const ref = useRestScroll(align);
  return (
    <div ref={ref} className="self-stretch overflow-x-auto" style={{ marginInline: -bleed, paddingInline: bleed }}>
      <div className={`flex w-max items-center ${gap}`}>{children}</div>
    </div>
  );
}

type BadgeKind = 'shop' | 'global';

/** Badge stack pinned to a card's top-left (physical), as drawn. */
function CardBadges({ badges, pos }: { badges: BadgeKind[]; pos: string }) {
  return (
    <div className={`absolute -translate-x-1/2 ${pos}`}>
      <div className="flex flex-col items-center gap-1">
        {badges.map((b) => (
          <div key={b} className="flex size-5 shrink-0 items-center rounded-[5.263px] bg-surface-neutral p-[2.105px]">
            <div className="relative size-[16.842px] shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={b === 'shop' ? iconShop : iconGlobal} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Shared 150-wide merchant offer card (Figma "Card N", 150×158/160). */
function OfferCard({
  photo,
  photoRound,
  name,
  nameBold,
  badges,
  badgePos,
  tall,
  onOpen,
  children,
}: {
  photo: string;
  photoRound?: boolean;
  name: string;
  nameBold?: boolean;
  badges?: BadgeKind[];
  badgePos?: string;
  tall?: boolean;
  onOpen?: () => void;
  children: ReactNode;
}) {
  const round = photoRound ? 'rounded-[500px]' : 'rounded-2xl';
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex ${tall ? 'h-[160px]' : 'h-[158px]'} w-[150px] shrink-0 items-center overflow-clip rounded-2xl border border-solid border-line bg-surface p-4 shadow-[0px_4px_15px_-5px_rgba(0,0,0,0.05)]`}
    >
      <div className="relative w-[116px] shrink-0">
        <div className="flex w-full flex-col items-center gap-3">
          <div className={`relative size-16 shrink-0 ${round}`}>
            <img
              alt=""
              className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover ${round}`}
              src={photo}
            />
          </div>
          <div className="flex w-full shrink-0 flex-col items-center gap-0.5">
            <div
              className={`flex h-3.5 w-full flex-col justify-center text-center text-xs leading-[0] text-ink ${nameBold ? 'font-bold' : 'font-medium'}`}
            >
              <p className="leading-[1.5]" dir="auto">
                {name}
              </p>
            </div>
          </div>
          {children}
        </div>
      </div>
      {badges && badges.length > 0 && <CardBadges badges={badges} pos={badgePos ?? 'left-[calc(50%-56px)] top-2'} />}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_0px_0px_rgba(0,0,0,0.05)]" />
    </button>
  );
}

/** 🏷️ Tag. The drawn Tag component places its icon at the physical LEFT of
    the text (the generated context emitted the un-mirrored order — the
    section renders are the ground truth here). */
function Tag({
  tone,
  icon,
  children,
  dir = 'auto',
}: {
  tone: 'warning' | 'teal' | 'success' | 'bravo';
  icon?: string;
  children: ReactNode;
  dir?: 'auto' | 'ltr';
}) {
  const colors =
    tone === 'warning'
      ? 'bg-warning-50 text-ink-warning'
      : tone === 'teal'
        ? 'bg-[#e7f6f8] text-[#12a1ba]'
        : tone === 'success'
          ? 'bg-brand-50 text-brand-800'
          : 'bg-bravo-50 text-bravo-500';
  return (
    <div className="flex shrink-0 items-start">
      <div
        className={`flex shrink-0 items-center justify-center rounded-sm py-0.5 ${colors} ${icon ? 'gap-1 pl-1.5 pr-2' : 'px-2'}`}
      >
        {icon && (
          <div className="relative size-3 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
          </div>
        )}
        <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5]" dir={dir}>
          {children}
        </p>
      </div>
    </div>
  );
}

/** #Carousel indicator frame base — Small/White/Dot: current green dot then
    three white dots (physical order as drawn). */
function DotsSmall() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-2">
      <div className="relative size-2 shrink-0">
        <div className="absolute inset-[-12.5%]">
          <img alt="" className="block size-full max-w-none" src={dotCurrentSmall} />
        </div>
      </div>
      <div className="relative size-2 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotWhiteSmall} />
      </div>
      <div className="relative size-2 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotWhiteSmall} />
      </div>
      <div className="relative size-2 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={dotWhiteSmall} />
      </div>
    </div>
  );
}

/* ──────────────────────────── sections ──────────────────────────── */

/** «عروض يومك» (47:4024). */
function DailyOffersSection() {
  return (
    <section className="flex w-full shrink-0 flex-col items-start gap-4">
      <SectionHeading>
        {'عروض '}
        <span className="text-brand-400">يومك</span>
      </SectionHeading>
      <Carousel gap="gap-3">
        <OfferCard photo={photoKebab} photoRound name="كباب هب">
          <Tag tone="warning">
            {'خصم '}
            <span className="font-en">25%</span>
          </Tag>
        </OfferCard>
        <OfferCard photo={photoAmazon} name="أمازون" nameBold badges={['shop']} badgePos="left-[calc(50%-56px)] top-2">
          <div className="flex w-full shrink-0 items-center justify-end gap-2">
            <Tag tone="warning">
              {'خصم '}
              <span className="font-en">15%</span>{' '}
            </Tag>
            <Tag tone="teal">
              {'اشترِ '}
              <span className="font-en">1</span>
              {' واحصل على '}
              <span className="font-en">1</span>
            </Tag>
            <Tag tone="success" icon={iconBuyCrypto}>
              اكسب نقاط
            </Tag>
          </div>
        </OfferCard>
        <OfferCard
          photo={photoExtra}
          name="اكسترا"
          nameBold
          badges={['shop', 'global']}
          badgePos="left-[calc(50%-56px)] top-2"
        >
          <div className="flex w-full shrink-0 items-center justify-end gap-2">
            <Tag tone="warning">
              {'خصم '}
              <span className="font-en">15%</span>{' '}
            </Tag>
            <Tag tone="success" icon={iconBuyCrypto}>
              اكسب نقاط
            </Tag>
          </div>
        </OfferCard>
      </Carousel>
    </section>
  );
}

/** Expiring-cashback nudge surfaced on Home after linking (CardsScreen
    pattern): «حوّلها الحين» presets the expiring 50 ﷼ into the withdrawal. */
function ExpiringNudge() {
  const navigate = useNavigate();
  const { account, setAmount } = useWithdraw();
  const send = () => {
    setAmount(50);
    navigate(account ? '/withdraw/amount' : '/withdraw/account');
  };
  return (
    <div
      className="flex w-full shrink-0 items-center justify-between gap-3 rounded-2xl bg-bravo-50 px-4 py-3"
      data-testid="home-expiring-nudge"
    >
      <button
        type="button"
        onClick={send}
        className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-brand-400 px-3 py-2"
      >
        <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
          حوّلها الحين
        </p>
      </button>
      <div className="flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-0.5 text-right leading-[1.5]">
          <p className="w-full text-xs font-medium text-ink" dir="rtl">
            {'عندك '}
            <span className="font-en">50</span> <Riyal />
            {' تنتهي '}
            <span className="font-en">25</span>
            {' ديسمبر'}
          </p>
          <p className="w-full text-xs font-normal text-ink-tertiary" dir="auto">
            لا تخليها تروح
          </p>
        </div>
        <div className="relative size-5 shrink-0 overflow-clip">
          <div className="absolute inset-[10%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconClockNudge} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** After linking, the promo slot becomes the cashback-total strip (derived
    after-state — the Points Wallet idiom; live balance, matching the cashback
    wallet it opens). */
function HomeCashbackStrip({ onRedeem }: { onRedeem: () => void }) {
  const navigate = useNavigate();
  return (
    <CashbackStrip
      onRedeem={onRedeem}
      onDetails={() => navigate('/cards')}
      testId="home-cashback-strip"
      redeemTestId="home-redeem-cta"
    />
  );
}

/** Add-card promo (47:4067) — the shared `LinkPromoBanner` per user direction,
    so Home and the Points Wallet make the same offer in the same words and
    can't drift; the drawn Home promo was a smaller card of its own. CTA enters
    the add-card flow (first time via the intro sheet over Home); once the card
    is linked the slot renders the cashback strip instead. */
function AddCardPromo({ onStart, onRedeem }: { onStart: () => void; onRedeem: () => void }) {
  const { cardLinked } = useAppState();
  if (cardLinked) return <HomeCashbackStrip onRedeem={onRedeem} />;
  return <LinkPromoBanner onLink={onStart} />;
}

/** «المتاجر المفضلة» empty state (47:4077) with scattered floating logos. */
function FavoriteStoresEmpty() {
  return (
    <section className="relative flex h-[103px] w-full shrink-0 flex-col items-start gap-2">
      <div className="flex w-full shrink-0 items-center justify-end gap-3">
        <p className="whitespace-nowrap text-right text-lg font-medium leading-[1.5] text-ink" dir="auto">
          المتاجر المفضلة
        </p>
      </div>
      <div className="flex w-full shrink-0 items-center justify-end gap-3">
        <p className="whitespace-nowrap text-xs font-normal leading-[1.5] text-ink" dir="ltr">
          اكتشف وأضف تجار التجزئة المفضلين لديك
        </p>
        <button
          type="button"
          className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-2xl bg-brand-50 p-4 shadow-xs"
          aria-label="أضف متجرًا"
        >
          <div className="relative size-6 shrink-0 overflow-clip">
            <div className="absolute inset-[20%]">
              <div className="absolute inset-[-1.74%]">
                <img alt="" className="block size-full max-w-none" src={iconPlus} />
              </div>
            </div>
          </div>
        </button>
      </div>
      {/* floating rotated store logos */}
      <div className="absolute left-[247px] top-[23.89px] flex size-[31.719px] items-center justify-center">
        <div className="flex-none rotate-[20.16deg]">
          <div className="relative size-[24.716px] rounded-full">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-full object-cover" src={favLogo1} />
          </div>
        </div>
      </div>
      <div className="absolute left-[80.36px] top-[71.63px] flex size-[27.144px] items-center justify-center">
        <div className="-rotate-15 flex-none">
          <div className="relative size-[22.163px] rounded-md">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-md object-contain" src={photoIkea} />
          </div>
        </div>
      </div>
      <div className="absolute left-[169.2px] top-[35.2px] flex size-[19.596px] items-center justify-center">
        <div className="-rotate-15 flex-none">
          <div className="relative size-4 rounded-full">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-full object-cover" src={photoNoon} />
          </div>
        </div>
      </div>
      <div className="absolute left-[22.03px] top-[45.03px] flex size-[24.94px] items-center justify-center">
        <div className="flex-none rotate-[12.12deg]">
          <div className="relative size-[21px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img alt="" className="absolute left-[2.67%] top-[5.51%] h-[89.88%] w-[256.93%] max-w-none" src={favLogo2} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[215.67px] top-[71.67px] flex size-[18.658px] items-center justify-center">
        <div className="flex-none rotate-[10.54deg]">
          <div className="relative size-4 rounded-sm">
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-sm object-cover" src={photoHm} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Grocery marketing banner (47:4093). */
function GroceryBanner() {
  return (
    <button
      type="button"
      className="relative flex h-[127.037px] w-full shrink-0 flex-col items-end justify-center overflow-clip rounded-2xl shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
    >
      <div className="relative flex w-full shrink-0 items-center justify-center">
        <div className="w-full flex-none -scale-y-100 rotate-180">
          <div className="relative aspect-[343/141.47] size-full">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img alt="" className="absolute left-0 top-[-23.64%] h-[147.28%] w-full max-w-none" src={bannerGrocery} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-[0_0_-0.43px_0] flex flex-col items-end justify-center bg-[rgba(0,0,0,0.1)] px-6">
        <div className="flex w-[222.66px] shrink-0 flex-col items-end">
          <div className="flex flex-col justify-center whitespace-nowrap text-right text-xl font-bold leading-[0] text-ink-inverse">
            <p className="leading-[1.5]" dir="auto">
              كاش باك مضاعف على
            </p>
            <p className="leading-[1.5]" dir="auto">
              البقالة
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col items-start pt-2">
          <div className="flex w-full shrink-0 items-center justify-between">
            <DotsSmall />
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex shrink-0 items-center justify-center">
                <div className="flex-none rotate-180">
                  <div className="relative size-3">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowBanner} />
                  </div>
                </div>
              </div>
              <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
                اكتشف المزيد
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

/** «عروض الطعام والمشروبات» (47:4107). */
function FoodOffersSection() {
  return (
    <section className="flex w-full shrink-0 flex-col items-start gap-4">
      <SectionHeading
        trailing={
          <>
            <div className="relative h-[27.333px] w-[18.718px] shrink-0">
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgTortilla} />
            </div>
            <div className="relative h-[27.3px] w-[16.136px] shrink-0">
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgMilkshake} />
            </div>
          </>
        }
      >
        عروض الطعام والمشروبات
      </SectionHeading>
      <Carousel gap="gap-3">
        <OfferCard photo={photoKebab} photoRound name="كباب هب">
          <Tag tone="warning">
            {'خصم '}
            <span className="font-en">25%</span>
          </Tag>
        </OfferCard>
        <OfferCard
          photo={photoNamaq}
          photoRound
          name="نمق"
          badges={['shop']}
          badgePos="left-[calc(50%-57px)] top-[7.63px]"
        >
          <Tag tone="teal">
            {'اشترِ '}
            <span className="font-en">1</span>
            {' وحَصِل '}
            <span className="font-en">1</span>
            {' مجانًا'}
          </Tag>
        </OfferCard>
        <OfferCard
          photo={photoCosta}
          name="كوستا كوفي"
          badges={['shop', 'global']}
          badgePos="left-[calc(50%-57px)] top-[7.63px]"
        >
          <Tag tone="warning">
            {'خصم '}
            <span className="font-en">25%</span>
          </Tag>
        </OfferCard>
      </Carousel>
    </section>
  );
}

/** «قسائم حصرية» (47:4146) — voucher cards priced in WP coins. */
function ExclusiveVouchersSection() {
  const navigate = useNavigate();
  return (
    <section className="flex w-full shrink-0 flex-col items-start gap-4">
      <SectionHeading>قسائم حصرية</SectionHeading>
      <Carousel gap="gap-3">
        <OfferCard photo={photoKebab} photoRound name="كباب هب" tall>
          <VoucherPrice value="25" />
        </OfferCard>
        <OfferCard
          photo={photoExtra}
          name="اكسترا"
          tall
          badges={['shop', 'global']}
          badgePos="left-[calc(50%-57px)] top-[7.3px]"
        >
          <VoucherPrice value="200" />
        </OfferCard>
        <OfferCard
          photo={photoIkea}
          name="آيكيا"
          tall
          badges={['shop']}
          badgePos="left-[calc(50%-57px)] top-[7.3px]"
          onOpen={() => navigate('/store/ikea')}
        >
          <VoucherPrice value="400" />
        </OfferCard>
      </Carousel>
    </section>
  );
}

function VoucherPrice({ value }: { value: string }) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-1">
      <div className="relative size-6 shrink-0">
        <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={coinWp24} />
        </div>
      </div>
      <p className="font-en whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
        {value}
      </p>
      <p className="whitespace-nowrap text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
        يبدأ من
      </p>
    </div>
  );
}

/** Flash-sale section (47:4192): static countdown chip + voucher carousel
    resting CENTERED on the إتش آند إم card, as drawn. */
function FlashSaleSection() {
  const navigate = useNavigate();
  return (
    <section className="flex h-[220px] w-full shrink-0 flex-col items-center gap-6 rounded-2xl border border-solid border-[#ea98a0] bg-danger-50 px-3 py-4">
      <div className="w-full shrink-0">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full shrink-0 items-center justify-between">
            <div className="flex h-[34px] shrink-0 items-center gap-[8.01px] rounded-full bg-ink-danger px-4">
              <div className="font-en flex h-full flex-col justify-center text-xs font-bold tracking-[1.2px] text-ink-inverse">
                <p className="whitespace-pre leading-4">{`02h  15m  30s`}</p>
              </div>
              <div className="relative size-3.5 shrink-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTimer} />
              </div>
            </div>
            <p className="min-w-px flex-[1_0_0] text-right text-base font-medium leading-[1.5] text-ink-danger" dir="auto">
              عروض محدودة الوقت
            </p>
          </div>
        </div>
      </div>
      <div className="w-full shrink-0">
        <div className="flex w-full flex-col items-center gap-3">
          <Carousel align="center" bleed={29} gap="gap-3">
            <FlashVoucherCard name="نمق" pct="5%" photo={photoNamaq} photoRound />
            <FlashVoucherCard name="إتش آند إم" pct="25%" photo={photoHm} onOpen={() => navigate('/store/hm')} />
            <FlashVoucherCard name="آيكيا" pct="25%" photo={photoIkea} wideGap onOpen={() => navigate('/store/ikea')} />
          </Carousel>
          <DotsSmall />
        </div>
      </div>
    </section>
  );
}

function FlashVoucherCard({
  name,
  pct,
  photo,
  photoRound,
  wideGap,
  onOpen,
}: {
  name: string;
  pct: string;
  photo: string;
  photoRound?: boolean;
  wideGap?: boolean;
  onOpen?: () => void;
}) {
  const round = photoRound ? 'rounded-[500px]' : 'rounded-[16.25px]';
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-[257px] shrink-0 items-start rounded-2xl bg-white p-3 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
    >
      <div className={`flex min-w-px flex-[1_0_0] items-center justify-end ${wideGap ? 'gap-3' : 'gap-2.5'}`}>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink-tertiary" dir="auto">
            عروض كاش باك
          </p>
          <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.5] text-ink" dir="auto">
            {name}
          </p>
          {/* dir=ltr keeps the drawn run order: number left, كاش باك right */}
          <Tag tone="bravo" icon={iconTickCircle} dir="ltr">
            <span className="font-en">{pct}</span>
            {' كاش باك'}
          </Tag>
        </div>
        <div className={`relative size-[84px] shrink-0 ${round}`}>
          <img alt="" className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover ${round}`} src={photo} />
        </div>
      </div>
    </button>
  );
}

/** «تجار التجزئة المفضلين» (47:4235) — square retailer tiles. */
function RetailersSection() {
  const navigate = useNavigate();
  return (
    <section className="flex w-full shrink-0 flex-col items-start gap-4">
      <SectionHeading>تجار التجزئة المفضلين</SectionHeading>
      <Carousel gap="gap-3">
        <RetailerTile photo={photoNoon} label="نوون" />
        <RetailerTile photo={photoHm} label="إتش آند إم" onOpen={() => navigate('/store/hm')} />
        <RetailerTile photo={photoExtra} label="إكسترا" />
        <RetailerTile photo={photoNamaq} label="نمق" />
        <RetailerTile photo={photoHm} label="اتش اند ام" onOpen={() => navigate('/store/hm')} />
      </Carousel>
    </section>
  );
}

function RetailerTile({ photo, label, onOpen }: { photo: string; label: string; onOpen?: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative flex size-20 shrink-0 flex-col items-center justify-center gap-1 overflow-clip rounded-2xl border border-solid border-line bg-white p-2 shadow-[0px_10px_20px_-5px_rgba(92,246,161,0.2)]"
    >
      <div className="relative size-[36.074px] shrink-0 rounded-[9.019px]">
        <img
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[9.019px] object-cover"
          src={photo}
        />
      </div>
      <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-4px_0px_0px_rgba(0,0,0,0.05)]" />
    </button>
  );
}

/** «قسائم خاصة» (47:4263) — illustrated coupon cards. */
function SpecialVouchersSection() {
  return (
    <section className="flex w-full shrink-0 flex-col items-end justify-center gap-4">
      <SectionHeading>قسائم خاصة</SectionHeading>
      <Carousel gap="gap-3">
        {/* Component 32 — food & drinks 20% */}
        <button type="button" className="relative h-[155.628px] w-[138.954px] shrink-0">
          <div className="absolute left-0 top-0 h-[155.628px] w-[138.954px] rounded-[23.622px] bg-[#f55]" />
          <div className="absolute left-0 top-0 h-[155.628px] w-[138.954px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialMaskRed} />
          </div>
          <p
            className="absolute left-[129px] top-[109.3px] w-[122px] -translate-x-full text-right text-[12px] font-medium leading-4 text-[#f0f0f0]"
            dir="auto"
          >
            {'احصل على '}
            <span className="font-en">20%</span>
            {' على الطعام والمشروبات'}
          </p>
          <div className="absolute inset-[8.45%_41.91%_45.57%_5.82%] flex items-center justify-center" style={{ containerType: 'size' }}>
            <div className="h-[hypot(25.5807cqw,73.208cqh)] w-[hypot(74.4193cqw,-26.792cqh)] flex-none rotate-[-19.53deg]">
              <div className="relative size-full">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialPizza} />
              </div>
            </div>
          </div>
          <div className="absolute inset-[39.33%_25.29%_40.39%_52%] flex items-center justify-center" style={{ containerType: 'size' }}>
            <div className="h-[hypot(-91.1278cqw,-8.8725cqh)] w-[hypot(8.87225cqw,-91.1275cqh)] flex-none -scale-x-100 rotate-[95.56deg]">
              <div className="relative size-full">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialDrink} />
              </div>
            </div>
          </div>
          <div className="absolute inset-[46.83%_71.96%_43.26%_16.95%] flex items-center justify-center" style={{ containerType: 'size' }}>
            <div className="h-[hypot(23.0986cqw,76.9018cqh)] w-[hypot(-76.9014cqw,23.0982cqh)] flex-none -scale-x-100 rotate-[-16.72deg]">
              <div className="relative size-full">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialFries} />
              </div>
            </div>
          </div>
        </button>
        {/* Component 32 — travel 15% */}
        <button type="button" className="relative h-[155.628px] w-[138.954px] shrink-0">
          <div className="absolute left-0 top-0 flex h-[155.628px] w-[138.954px] items-center justify-center">
            <div className="flex-none -scale-y-100">
              <div className="relative h-[155.628px] w-[138.954px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialMaskGreen} />
              </div>
            </div>
          </div>
          <div className="absolute inset-[17.86%_43%_63.39%_11%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialCloudA} />
          </div>
          <div className="absolute inset-[41.96%_22%_45.54%_48%] flex items-center justify-center" style={{ containerType: 'size' }}>
            <div className="h-[100cqh] w-[100cqw] flex-none -scale-x-100">
              <div className="relative size-full">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialCloudB} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-[44.64%] left-[18%] right-[69%] top-1/2 flex items-center justify-center" style={{ containerType: 'size' }}>
            <div className="h-[100cqh] w-[100cqw] flex-none -scale-x-100">
              <div className="relative size-full">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialCloudC} />
              </div>
            </div>
          </div>
          <div className="absolute left-[30.57px] top-[37.52px] size-[55.581px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialTravel} />
          </div>
          <p
            className="absolute left-[129.05px] top-[109.3px] w-[117px] -translate-x-full text-right text-[12px] font-medium leading-4 text-[#f0f0f0]"
            dir="auto"
          >
            {'احصل على خصم '}
            <span className="font-en">15%</span>
            {' على السفر والفنادق'}
          </p>
        </button>
        {/* Component 33 — voucher tickets 25% */}
        <button type="button" className="relative h-[155.628px] w-[138.954px] shrink-0">
          <div className="absolute left-0 top-0 flex h-[155.628px] w-[138.954px] items-center justify-center">
            <div className="flex-none rotate-180">
              <div className="relative h-[155.628px] w-[138.954px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialMaskPurple} />
              </div>
            </div>
          </div>
          <div className="absolute left-[16.67px] top-[19.45px] flex size-[78.515px] items-center justify-center">
            <div className="flex-none rotate-[-42.27deg]">
              <div className="relative size-[55.581px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialTickets} />
              </div>
            </div>
          </div>
          <div className="absolute inset-[5.36%_15.64%_41.96%_7%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={specialParticles} />
          </div>
          <p
            className="absolute left-[129.09px] top-[109.3px] w-[123px] -translate-x-full text-right text-[12px] font-medium leading-4 text-[#f0f0f0]"
            dir="auto"
          >
            {'احصل على خصم '}
            <span className="font-en">25%</span>
            {' على تذاكر القسائم'}
          </p>
        </button>
      </Carousel>
    </section>
  );
}
