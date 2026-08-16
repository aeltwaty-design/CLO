import { useNavigate } from 'react-router-dom';
import MarketPromoBanner from './MarketPromoBanner';
import photoNamaq from '../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoAmazon from '../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoAmazonRound from '../assets/figma/d3d5e0678cb15d2b6557fbc53e1b480d56282713.png';
import photoHunger from '../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoJahez from '../assets/figma/924e4f06eab7bf8031d10804ed6309bb8a93a3b4.png';
import photoJarir from '../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';
import photoGolden from '../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import woCoin24 from '../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';
import iconUserGroup from '../assets/figma/c04ddb73b1f16fee418ee0a379afe3efa825e126.svg';
import iconHeart from '../assets/figma/abd2930f3bda6577cc003ae3e4e50852eb9b1aa4.svg';
import iconShop from '../assets/figma/b29c8472a920d7f72b3162de749ffef1cc4696df.svg';
import iconGlobal from '../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';

/** Figma zoom-crop of a padded logo export: offsets + square size, in %. */
type Crop = { left: string; top: string; size: string };

type VoucherCardData = {
  name: string;
  photo: string;
  crop?: Crop;
  /** circular logo mask (rounded/500) instead of the 16px squircle */
  round?: boolean;
  /** gap between logo and name — the frame varies it per card */
  gap: 6 | 8 | 14;
  /** «تبدأ من N» voucher price row (Latin digits, WO coin) */
  from?: string;
  /** «15.2K متابع» follower row */
  followers?: string;
  /** mint «N% خصم» tag; `left` is its pinned x, as drawn */
  discount?: { pct: string; left: number };
  /** gold border + «ما يفوتك» ribbon */
  featured?: boolean;
  heart?: boolean;
  badges: ('shop' | 'global')[];
  /** badges laid out in a row instead of the default vertical stack */
  badgesRow?: boolean;
  storeId: string;
};

/** Vouchers grid exactly as drawn (65:23981): 4 rows × 2 cards. */
const grid: VoucherCardData[] = [
  { name: 'قهوة نمق', photo: photoNamaq, gap: 8, from: '2,400', discount: { pct: '10%', left: 81 }, featured: true, badges: ['shop', 'global'], storeId: 'namaq' },
  { name: 'أمازون', photo: photoAmazon, gap: 8, from: '400', discount: { pct: '10%', left: 81.5 }, badges: ['global'], badgesRow: true, storeId: 'amazon' },
  { name: 'هنقرسيتشن', photo: photoHunger, crop: { left: '-20.07%', top: '-16.92%', size: '138.57%' }, gap: 14, followers: '15.2K', badges: ['global'], badgesRow: true, storeId: 'hunger' },
  { name: 'جاهز برايم', photo: photoJahez, crop: { left: '-14.76%', top: '-15.6%', size: '129.51%' }, gap: 14, followers: '15.2K', badges: ['global'], badgesRow: true, storeId: 'jahez' },
  { name: 'مكتبة جرير', photo: photoJarir, gap: 14, heart: true, badges: ['shop', 'global'], storeId: 'jarir' },
  { name: 'قولدن سنت', photo: photoGolden, gap: 14, heart: true, badges: ['shop', 'global'], storeId: 'golden' },
  { name: 'أمازون', photo: photoAmazonRound, crop: { left: '-9.77%', top: '-11.25%', size: '124.08%' }, round: true, gap: 6, heart: true, badges: ['shop', 'global'], badgesRow: true, storeId: 'amazon' },
  { name: 'أمازون', photo: photoAmazonRound, crop: { left: '-9.77%', top: '-11.25%', size: '124.08%' }, round: true, gap: 6, heart: true, badges: ['shop', 'global'], badgesRow: true, storeId: 'amazon' },
];

/** القسائم tab grid of the Market hub (Figma 65:23785 → 65:23981), with the
    lilac promo banner drawn under the first row (91:43784). */
export default function VoucherGrid() {
  const navigate = useNavigate();
  const rows: VoucherCardData[][] = [];
  for (let i = 0; i < grid.length; i += 2) rows.push(grid.slice(i, i + 2));

  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-4">
      {rows.map((row, i) => (
        <div key={i} className="contents">
          <div className="flex w-full shrink-0 items-start justify-between">
            {row.map((card, j) => (
              <VoucherCard key={`${card.storeId}-${i}-${j}`} data={card} onOpen={() => navigate(`/store/${card.storeId}`)} />
            ))}
          </div>
          {i === 0 && <MarketPromoBanner onClick={() => navigate('/cashback/add-card')} />}
        </div>
      ))}
    </div>
  );
}

function VoucherCard({ data, onOpen }: { data: VoucherCardData; onOpen: () => void }) {
  const radius = data.round ? 'rounded-[500px]' : 'rounded-2xl';
  const hasRow = Boolean(data.from || data.followers);
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex w-[163.5px] shrink-0 flex-col items-center gap-2.5 rounded-2xl border border-solid ${data.featured ? 'border-gold-600' : 'border-line'} bg-white px-4 py-3 text-start`}
    >
      <div className={`flex shrink-0 flex-col items-center${hasRow ? ' gap-2.5' : ''}`}>
        <div className="flex shrink-0 flex-col items-center" style={{ gap: data.gap }}>
          <div className={`relative size-16 shrink-0 ${radius}`}>
            {data.crop ? (
              <div className={`pointer-events-none absolute inset-0 overflow-hidden ${radius}`}>
                <img
                  alt=""
                  className="absolute max-w-none"
                  src={data.photo}
                  style={{ left: data.crop.left, top: data.crop.top, width: data.crop.size, height: data.crop.size }}
                />
              </div>
            ) : (
              <img
                alt=""
                className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover ${radius}`}
                src={data.photo}
              />
            )}
          </div>
          <p className="whitespace-nowrap text-center text-sm font-medium leading-[1.5] text-ink" dir="auto">
            {data.name}
          </p>
        </div>

        {data.from && (
          <div className="flex shrink-0 items-center gap-1">
            <WoCoin24 />
            <p className="font-en whitespace-nowrap text-right text-sm font-semibold leading-[1.5] text-ink">{data.from}</p>
            <p className="w-10 shrink-0 text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
              تبدأ من
            </p>
          </div>
        )}

        {data.followers && (
          <div className="flex shrink-0 items-center justify-center gap-2">
            <p className="whitespace-nowrap text-[0px] text-ink-secondary" dir="rtl">
              <span className="font-en text-[12px] font-normal leading-[1.5]">{data.followers}</span>
              <span className="text-[12px] font-normal leading-[1.5]">{' متابع'}</span>
            </p>
            <div className="relative size-[17.5px] shrink-0 overflow-clip">
              <div className="absolute inset-[12.5%_6.25%_9.38%_6.25%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconUserGroup} />
              </div>
            </div>
          </div>
        )}
      </div>

      {data.badges.length > 0 && (
        <div
          className={`absolute left-[6.5px] top-[7px] flex gap-[4.211px] ${data.badgesRow ? 'h-5 items-center' : 'flex-col items-start justify-center'}`}
        >
          {data.badges.includes('shop') && <Badge icon={iconShop} />}
          {data.badges.includes('global') && <Badge icon={iconGlobal} />}
        </div>
      )}

      {data.discount && (
        <div className="absolute top-[7px] flex items-start" style={{ left: data.discount.left }}>
          <div className="flex shrink-0 items-center justify-center rounded-2xl bg-brand-50 px-2 py-0.5">
            <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-brand-400" dir="auto">
              {data.discount.pct} خصم
            </p>
          </div>
        </div>
      )}

      {data.featured && (
        <div className="absolute bottom-[-1px] right-[-0.5px] flex items-start justify-end">
          <div className="flex shrink-0 items-center justify-center rounded-br-2xl rounded-tl-2xl bg-gold-700 px-2 py-0.5">
            <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
              ما يفوتك
            </p>
          </div>
        </div>
      )}

      {data.heart && (
        <div className="absolute left-[136.5px] top-[9px] size-4">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconHeart} />
        </div>
      )}
    </button>
  );
}

function Badge({ icon }: { icon: string }) {
  return (
    <div className="flex shrink-0 items-center rounded-[5.263px] bg-surface-neutral p-[2.105px]">
      <div className="relative size-[16.842px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
    </div>
  );
}

/** WO Coin (24px) of the «تبدأ من» price row. */
function WoCoin24() {
  return (
    <div className="relative size-6 shrink-0">
      <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={woCoin24} />
      </div>
    </div>
  );
}
