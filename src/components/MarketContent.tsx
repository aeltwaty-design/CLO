import { useNavigate } from 'react-router-dom';
import { IS_TEMP } from '../state/PhaseState';
import MaskGlyph from './redeem/MaskGlyph';
import sarSymbol from '../assets/icons/sar-symbol.svg';
import MarketTabs, { type MarketTab } from './MarketTabs';
import VoucherGrid from './VoucherGrid';
import OfferList from './OfferList';
import iconGame from '../assets/figma/487808c3aacf34e454858028bafa949d51fc8fc4.svg';
import iconReserve from '../assets/figma/3d431b38e487ec249d7e07be2a9758f36c9ab8fc.svg';
import iconBag2 from '../assets/figma/c659ceac8d0b427ea2ca3d470cf1021b07a0497a.svg';
import photoHm from '../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoIkea from '../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoPanda from '../assets/figma/4fc36a8ced1a071b990cb535d493dc935eefcc30.png';
import photoZara from '../assets/figma/453784f58c394882dae76c32815f4f8dac9abc7e.png';
import photoGeneric from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import iconCards from '../assets/figma/7829263638c55bcb9dddbbe8eec00ec0e4075ca2.svg';
import iconArrowLeft from '../assets/figma/b48fe1cd7576b56f97cc1cf5e90b0ed15aaa67fb.svg';
import iconZid from '../assets/figma/171223f0d13e73efa58fd15a982bd843352a4655.svg';
import iconMenuBold from '../assets/figma/14a8755f2b355da2665373a629b2124ce4b4a60d.svg';
import iconShop from '../assets/figma/b29c8472a920d7f72b3162de749ffef1cc4696df.svg';
import iconGlobal from '../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';
import iconSort from '../assets/figma/93bcf7aa79a8b96b6d35bc2268ae7f8da37bc559.svg';
import iconSetting4 from '../assets/figma/56f665cc37df1dc4bd8183e41b481c8e896e1dfb.svg';
import iconCardLinear from '../assets/figma/cfddfdc83575442fea5b41d4866b055c7e910f83.svg';
import iconCardOutline from '../assets/figma/e07df267c11566d711b4257037ae3887e9bc32db.svg';
import iconTickCircle from '../assets/figma/7d6f0d889568034a1bc416ccaf53f71b77fc8c92.svg';
import iconBuyCrypto from '../assets/figma/6650b53b751252998b63b1038e80319c2fdff2ca.svg';

type CardData = {
  name: string;
  nameEn?: boolean;
  category: string;
  photo: string;
  photoFit: 'cover' | 'contain';
  /**
   * neutral — gray "كاش باك X%" + card icon (before link)
   * link — mint "اربط البطاقة لكسب المال" (before link)
   * linked — lavender "كاش باك X%" + tick (after link)
   * none — nothing in flow; the green استرداد pill shows through
   */
  pill: 'neutral' | 'link' | 'linked' | 'none';
  cashbackPct?: number;
  featured?: boolean;
  /** gold ribbon position: before-link designs pin it bottom, after-link top */
  ribbon?: 'bottom' | 'top';
  badges: ('shop' | 'global')[];
  storeId: string;
};

/* Per user direction (2026-08-11): every card uses the same tag look —
   neutral «كاش باك X%» before linking (1:7980), lavender tick after (1:8338) —
   instead of the frames' mixed link-CTA/underlay tags. */
const beforeGrid: CardData[] = [
  { name: 'إتش آند إم', category: 'الأزياء والملابس', photo: photoHm, photoFit: 'cover', pill: 'neutral', cashbackPct: 5, featured: true, ribbon: 'bottom', badges: ['shop', 'global'], storeId: 'hm' },
  { name: 'إيكيا', category: 'المنزل والأثاث', photo: photoIkea, photoFit: 'cover', pill: 'neutral', cashbackPct: 10, badges: ['global'], storeId: 'ikea' },
  { name: 'بنده', nameEn: true, category: 'المنزل والأثاث', photo: photoPanda, photoFit: 'contain', pill: 'neutral', cashbackPct: 10, badges: [], storeId: 'panda' },
  { name: 'زارا', nameEn: true, category: 'الأزياء والملابس', photo: photoZara, photoFit: 'cover', pill: 'neutral', cashbackPct: 5, badges: [], storeId: 'zara' },
  { name: 'سنتربوينت', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'neutral', cashbackPct: 10, badges: [], storeId: 'centrepoint' },
  { name: 'دانكن دونتس', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'neutral', cashbackPct: 5, badges: [], storeId: 'dunkin' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'neutral', cashbackPct: 10, badges: [], storeId: 'ikea' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'neutral', cashbackPct: 10, badges: [], storeId: 'ikea' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'neutral', cashbackPct: 10, badges: [], storeId: 'ikea' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'neutral', cashbackPct: 10, badges: [], storeId: 'ikea' },
];

/** After-link grid (Figma 1:8238): 12 cards, lavender tick pills on the first four. */
const afterGrid: CardData[] = [
  { name: 'إتش آند إم', category: 'الأزياء والملابس', photo: photoHm, photoFit: 'cover', pill: 'linked', cashbackPct: 10, featured: true, ribbon: 'top', badges: ['shop', 'global'], storeId: 'hm' },
  { name: 'إيكيا', category: 'المنزل والأثاث', photo: photoIkea, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: ['global'], storeId: 'ikea' },
  { name: 'إتش آند إم', category: 'الأزياء والملابس', photo: photoHm, photoFit: 'cover', pill: 'linked', cashbackPct: 10, featured: true, ribbon: 'top', badges: ['shop', 'global'], storeId: 'hm' },
  { name: 'إيكيا', category: 'المنزل والأثاث', photo: photoIkea, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: ['global'], storeId: 'ikea' },
  { name: 'باندا', nameEn: true, category: 'المنزل والأثاث', photo: photoPanda, photoFit: 'contain', pill: 'linked', cashbackPct: 10, badges: [], storeId: 'panda' },
  { name: 'زارا', nameEn: true, category: 'الأزياء والملابس', photo: photoZara, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: [], storeId: 'zara' },
  { name: 'سنتربوينت', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'linked', cashbackPct: 10, badges: [], storeId: 'centrepoint' },
  { name: 'إضافي', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'linked', cashbackPct: 10, badges: [], storeId: 'centrepoint' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: [], storeId: 'ikea' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: [], storeId: 'ikea' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: [], storeId: 'ikea' },
  { name: 'إيكيا', nameEn: true, category: 'المنزل والأثاث', photo: photoGeneric, photoFit: 'cover', pill: 'linked', cashbackPct: 5, badges: [], storeId: 'ikea' },
];

/**
 * Market screen scrollable content — الكاش باك tab (Figma 1:7890 before /
 * 1:8238 after card link) and القسائم tab (65:23785). Tabs, category chips
 * and filter chips are shared; only the banner and the grid switch.
 */
/** Temp market promo (user-attached design, 2026-08-19) — cashback tab
    before linking: ink «ادفع مثل كل مرة..» over a green «وخد حتى [X]% كاش
    باك», an explainer, the violet-card + coins + bag illustration on the
    left, and a pill CTA «ابدأ تستفيد» that starts the linking flow —
    reverted to the banner's violet scheme per follow-up direction.
    The [X]% placeholder stays in the app's bracket style. */
function TempMarketPromo({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex w-full shrink-0 flex-col items-end gap-3 overflow-clip rounded-2xl bg-bravo-50 p-3" data-testid="market-promo-temp">
      <div className="flex w-full shrink-0 items-center justify-between gap-2">
        <div className="pointer-events-none relative h-[104px] w-[104px] shrink-0">
          <svg viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 size-full" aria-hidden>
            {/* violet card */}
            <g transform="rotate(-14 46 40)">
              <rect x="10" y="14" width="66" height="46" rx="8" className="fill-viola-500" />
              <rect x="10" y="14" width="66" height="46" rx="8" fill="#fff" opacity="0.06" />
              <rect x="18" y="26" width="12" height="9" rx="2" className="fill-gold-600" />
              <path d="M62 22l2.2 4.6 4.6 2.2-4.6 2.2-2.2 4.6-2.2-4.6-4.6-2.2 4.6-2.2Z" fill="#fff" opacity="0.5" />
            </g>
            {/* gold coins */}
            <circle cx="72" cy="46" r="12" className="fill-gold-600" />
            <circle cx="72" cy="46" r="8" fill="none" strokeWidth="1.8" className="stroke-white" opacity="0.85" />
            <circle cx="80" cy="66" r="10" className="fill-gold-600" />
            <circle cx="80" cy="66" r="6.5" fill="none" strokeWidth="1.6" className="stroke-white" opacity="0.85" />
            {/* sparkles */}
            <path transform="translate(90 20) scale(0.8)" d="M0-6C.6-2.2 2.2-.6 6 0 2.2.6.6 2.2 0 6-.6 2.2-2.2.6-6 0-2.2-.6-.6-2.2 0-6Z" className="fill-viola-300" />
            <path transform="translate(8 66) scale(0.7)" d="M0-6C.6-2.2 2.2-.6 6 0 2.2.6.6 2.2 0 6-.6 2.2-2.2.6-6 0-2.2-.6-.6-2.2 0-6Z" className="fill-brand-400" />
            {/* green shopping bag */}
            <path d="M22 64h34l-4 34H26l-4-34Z" className="fill-brand-400" />
            <path d="M22 64h34l-1 8H23l-1-8Z" className="fill-brand-500" />
            <path d="M31 64v-5a8 8 0 0 1 16 0v5" className="stroke-brand-800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
          {/* the bag's SAR mark — the real symbol through its mask */}
          <div className="absolute left-[30px] top-[76px]">
            <MaskGlyph src={sarSymbol} size={14} className="bg-white" />
          </div>
        </div>
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
          <p className="w-full text-right text-[15px] font-bold leading-[1.5] text-ink" dir="auto">
            ادفع مثل كل مرة..
          </p>
          <p className="w-full whitespace-nowrap text-right text-[15px] font-bold leading-[1.5]" dir="rtl">
            <span className="text-bravo-500">{'وخد حتى '}</span>
            <span className="font-en text-bravo-500">[X]%</span>
            <span className="text-bravo-500">{' كاش باك'}</span>
          </p>
          <p className="w-full text-right text-xs font-normal leading-[1.6] text-ink-secondary" dir="rtl">
            استخدم بطاقتك المعتادة عند المتاجر المشاركة. ويرجع لك كاش باك إضافي لمحفظة ولاء بلس لحظتها.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="flex h-9 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-clip rounded-full bg-bravo-500 px-4"
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
          <path d="M13.5 8H3M6.5 4.5L3 8l3.5 3.5" className="stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
          ابدأ تستفيد
        </p>
      </button>
    </div>
  );
}

export default function MarketContent({
  linked = false,
  onStart,
  tab = 'cashback',
  tabsAvailable,
  tabsOrder,
  onTabChange,
}: {
  linked?: boolean;
  onStart?: () => void;
  tab?: MarketTab;
  tabsAvailable?: MarketTab[];
  tabsOrder?: MarketTab[];
  onTabChange?: (tab: MarketTab) => void;
}) {
  const navigate = useNavigate();
  const vouchers = tab === 'vouchers';
  const offers = tab === 'offers';
  const grid = linked ? afterGrid : beforeGrid;
  const rows: CardData[][] = [];
  for (let i = 0; i < grid.length; i += 2) rows.push(grid.slice(i, i + 2));

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 bg-surface px-4 py-2.5">
      <MarketTabs active={tab} available={tabsAvailable} order={tabsOrder} onChange={onTabChange} />

      {/* Promo banner — cashback tab, before-link only. Temp renders the
          attached green design (2026-08-19) wholesale below. */}
      {!linked && !vouchers && !offers && IS_TEMP && (
        <TempMarketPromo onStart={() => (onStart ? onStart() : navigate('/cashback/intro'))} />
      )}
      {!linked && !vouchers && !offers && !IS_TEMP && (
      <div className="flex w-full shrink-0 flex-col items-end gap-3 overflow-clip rounded-2xl bg-bravo-50 p-3">
        <div className="flex w-full shrink-0 items-center justify-end gap-2.5">
          <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1.5">
            <p className="whitespace-nowrap text-[0px] leading-none text-ink" dir="auto">
              <span className="text-[14px] font-medium leading-[1.5]">{'حتى '}</span>
              <span className="font-en text-[14px] font-bold not-italic leading-[1.5] text-bravo-500">[X]%</span>
              <span className="text-[14px] font-medium leading-[1.5]">{' '}</span>
              <span className="text-[14px] font-medium not-italic leading-[1.5] text-ink">كاش باك</span>
              <span className="text-[14px] font-medium leading-[1.5]">{' .. بدون حد'}</span>
            </p>
            <p className="w-[min-content] min-w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              ادفع مثل كل مرة.. وخذ أكثر
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-full bg-bravo-500 p-2 shadow-xs">
            <div className="relative size-5 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCards} />
            </div>
          </div>
        </div>
        <div className="flex w-full shrink-0 items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => (onStart ? onStart() : navigate('/cashback/intro'))}
            className="flex h-[30px] min-w-px flex-[1_0_0] items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-surface px-2"
          >
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowLeft} />
            </div>
            <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              ابدأ
            </p>
          </button>
        </div>
      </div>
      )}

      {/* Category chips */}
      <div className="flex w-[375px] shrink-0 items-start justify-end gap-4 px-4">
        <CategoryChip label="أزياء" icon={iconBag2} />
        <CategoryChip label="مطاعم" icon={iconReserve} />
        <CategoryChip label="العاب؟" icon={iconGame} />
        <div className="flex w-[60px] shrink-0 flex-col items-center justify-center gap-1 overflow-clip">
          <div className="relative size-[60px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconZid} />
          </div>
          <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
            زد
          </p>
        </div>
        <div className="flex w-[60px] shrink-0 flex-col items-center justify-center gap-1 overflow-clip">
          <div className="flex size-[60px] shrink-0 flex-col items-center justify-center overflow-clip rounded-[50px] border border-solid border-brand-400 bg-brand-400 p-2.5">
            <div className="relative size-6 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconMenuBold} />
            </div>
          </div>
          <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-brand-400" dir="auto">
            الكل
          </p>
        </div>
      </div>

      {/* Filter chips — القسائم leads with خصومات (65:23951), العروض with
          «كسب نقاط» (91:44301) */}
      <div className="flex w-full shrink-0 items-center justify-end gap-3">
        {vouchers && (
          <div className="flex h-[30px] shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-solid border-line px-2.5">
            <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
              خصومات
            </p>
          </div>
        )}
        {offers && (
          <div className="flex h-[30px] shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-solid border-line px-2.5">
            <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
              كسب نقاط
            </p>
            <div className="relative size-[16.842px] shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBuyCrypto} />
            </div>
          </div>
        )}
        <div className="flex h-[30px] shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-solid border-line px-2.5">
          <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
            في الفروع
          </p>
          <div className="relative size-[16.842px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShop} />
          </div>
        </div>
        <div className="flex h-[30px] shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-solid border-line px-2.5">
          <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
            اونلاين
          </p>
          <div className="relative size-[16.842px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconGlobal} />
          </div>
        </div>
        <div className="flex flex-row items-center self-stretch">
          <div className="flex h-[30px] shrink-0 items-center justify-center gap-1 rounded-2xl border border-solid border-line px-2.5">
            <div className="relative size-4 shrink-0 overflow-clip">
              <div className="absolute inset-[12.5%]">
                <div className="absolute inset-[-6.25%]">
                  <img alt="" className="block size-full max-w-none" src={iconSort} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center self-stretch">
          <div className="flex h-[30px] shrink-0 items-center justify-center gap-1 rounded-2xl border border-solid border-line px-2.5">
            <div className="relative size-4 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSetting4} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid — merchants (كاش باك), offer rows (عروض) or voucher stores (قسائم) */}
      {vouchers ? (
        <VoucherGrid />
      ) : offers ? (
        <OfferList />
      ) : (
        <div className="flex h-[828px] w-[343px] shrink-0 flex-col items-end gap-4">
          {rows.map((row, i) => (
            <div key={i} className="flex w-full shrink-0 items-start justify-between">
              {row.map((card, j) => (
                <MerchantCard
                  key={`${card.storeId}-${i}-${j}`}
                  data={card}
                  // Temp (user direction): every الكاش باك card opens the cashback
                  // Store-details design (the /store/hm pages), branded as the
                  // tapped store; Phase 1/2 keep each store's own variant page.
                  onOpen={() => navigate(IS_TEMP ? `/store/${card.storeId}?variant=cashback` : `/store/${card.storeId}`)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex w-[60px] shrink-0 flex-col items-center justify-center gap-1 overflow-clip">
      <div className="flex size-[60px] shrink-0 flex-col items-center justify-center overflow-clip rounded-[50px] border border-solid border-line p-2.5">
        <div className="relative size-6 shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
        </div>
      </div>
      <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
    </div>
  );
}

function MerchantCard({ data, onOpen }: { data: CardData; onOpen: () => void }) {
  const border = data.featured ? 'border-gold-600' : 'border-line';
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex h-[173px] w-[163.5px] shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-solid ${border} bg-white px-4 py-3 text-start`}
    >
      <div className="relative flex w-full shrink-0 flex-col items-center gap-2.5">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="flex shrink-0 flex-col items-center gap-2.5">
            <div className="relative size-16 shrink-0 rounded-[16.25px]">
              <img
                alt=""
                className={`pointer-events-none absolute inset-0 size-full max-w-none rounded-[16.25px] ${data.photoFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                src={data.photo}
              />
            </div>
            <p
              className={`whitespace-nowrap text-center text-sm leading-[1.5] text-ink ${data.nameEn ? 'font-en font-semibold' : 'font-medium'}`}
              dir="auto"
            >
              {data.name}
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-center">
            <p className={`whitespace-nowrap text-right text-xs leading-[1.5] text-ink-secondary ${data.nameEn ? 'font-en font-normal' : 'font-normal'}`} dir="rtl">
              {data.category}
            </p>
          </div>
        </div>

        {/* hidden-behind green pill, exactly as drawn */}
        <div className="absolute right-[33.75px] top-[127px] flex items-start">
          <div className="flex shrink-0 items-center justify-center rounded-2xl bg-brand-400 px-2 py-0.5">
            <p className="font-en whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
              استرداد 5%
            </p>
          </div>
        </div>

        {data.pill === 'neutral' && (
          <div className="relative flex shrink-0 items-start justify-center">
            <div className="flex shrink-0 items-center justify-center gap-1 rounded-sm bg-surface-neutral py-0.5 pl-2 pr-1.5">
              <p className="whitespace-nowrap text-center text-[0px] font-medium leading-none text-ink" dir="auto">
                <span className="text-[12px] leading-[1.5]">{'كاش باك '}</span>
                <span className="font-en text-[12px] font-medium not-italic leading-[1.5]">{data.cashbackPct}%</span>
              </p>
              <div className="relative size-3 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCardLinear} />
              </div>
            </div>
          </div>
        )}
        {data.pill === 'link' && (
          <div className="flex w-full shrink-0 items-start justify-center">
            <div className="relative flex shrink-0 items-start justify-center">
              <div className="flex shrink-0 items-center justify-center gap-1 rounded-sm bg-brand-50 py-0.5 pl-1.5 pr-2">
                <div className="relative size-3 shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCardOutline} />
                </div>
                <p className="font-en whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-brand-400" dir="auto">
                  اربط البطاقة لكسب المال
                </p>
              </div>
            </div>
          </div>
        )}
        {data.pill === 'linked' && (
          <div className="relative flex shrink-0 items-start justify-center">
            <div className="flex shrink-0 items-center justify-center gap-1 rounded-sm bg-bravo-50 py-0.5 pl-2 pr-1.5">
              <p className="whitespace-nowrap text-center text-[0px] font-medium leading-none text-bravo-500" dir="auto">
                <span className="text-[12px] leading-[1.5]">{'كاش باك '}</span>
                <span className="font-en text-[12px] font-medium not-italic leading-[1.5]">{data.cashbackPct}%</span>
              </p>
              <div className="relative size-3 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTickCircle} />
              </div>
            </div>
          </div>
        )}
      </div>

      {data.badges.length > 0 && (
        <div className="absolute left-[6.5px] top-[7px] flex flex-col items-start justify-center gap-[4.211px]">
          {data.badges.includes('shop') && (
            <div className="flex shrink-0 items-center rounded-[5.263px] bg-surface-neutral p-[2.105px]">
              <div className="relative size-[16.842px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShop} />
              </div>
            </div>
          )}
          {data.badges.includes('global') && (
            <div className="flex shrink-0 items-center rounded-[5.263px] bg-surface-neutral p-[2.105px]">
              <div className="relative size-[16.842px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconGlobal} />
              </div>
            </div>
          )}
        </div>
      )}

      {data.featured && data.ribbon === 'bottom' && (
        <div className="absolute bottom-[-1px] right-[-0.5px] flex items-start justify-end">
          <div className="flex shrink-0 items-center justify-center rounded-br-2xl rounded-tl-2xl bg-gold-700 px-2 py-0.5">
            <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
              لا يفوتك
            </p>
          </div>
        </div>
      )}
      {data.featured && data.ribbon === 'top' && (
        <div className="absolute right-[-0.5px] top-[-1px] flex items-start justify-end">
          <div className="flex shrink-0 items-center justify-center rounded-bl-2xl rounded-tr-2xl bg-gold-700 px-2 py-0.5">
            <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
              ما يفوتك
            </p>
          </div>
        </div>
      )}
    </button>
  );
}
