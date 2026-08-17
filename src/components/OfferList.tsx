import { useNavigate } from 'react-router-dom';
import MarketPromoBanner from './MarketPromoBanner';
import iconShop from '../assets/figma/b29c8472a920d7f72b3162de749ffef1cc4696df.svg';
import iconGlobal from '../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';
import iconBuyCrypto from '../assets/figma/6650b53b751252998b63b1038e80319c2fdff2ca.svg';
import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import photoGolden from '../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import photoNamaq from '../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoJarir from '../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';

type OfferCardData = {
  name: string;
  photo: string;
  /** mint «كسب نقاط» tag carries the coin glyph */
  earn?: boolean;
  /** warning-tinted offer tag, e.g. «خصم 15%» */
  offer?: string;
  badges: ('shop' | 'global')[];
  /** gold «ما يفوتك» ribbon on the card's bottom-left corner */
  featured?: boolean;
  storeId: string;
};

/** Offer rows as drawn in the العروض frame (91:44135). */
const offers: OfferCardData[] = [
  { name: 'قهوة إرا', photo: photoEra, offer: 'خصم 15%', earn: true, badges: ['shop', 'global'], storeId: 'namaq' },
  { name: 'قولدن سنت', photo: photoGolden, offer: 'اشتري 2 و 1 مجانا', badges: ['shop', 'global'], featured: true, storeId: 'golden' },
  { name: 'قهوة نمق', photo: photoNamaq, offer: 'خصم 20%', badges: ['shop', 'global'], storeId: 'namaq' },
  { name: 'مكتبة جرير', photo: photoJarir, offer: 'خصم 10%', earn: true, badges: ['shop', 'global'], storeId: 'jarir' },
];

/** العروض tab of the Market hub (91:44135): full-width offer rows with the
    lilac promo banner drawn after the first one. */
export default function OfferList() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-4">
      {offers.map((offer, i) => (
        <div key={`${offer.storeId}-${i}`} className="contents">
          <OfferCard data={offer} onOpen={() => navigate(`/store/${offer.storeId}`)} />
          {i === 0 && <MarketPromoBanner onClick={() => navigate('/market?tab=cashback')} />}
        </div>
      ))}
    </div>
  );
}

function OfferCard({ data, onOpen }: { data: OfferCardData; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`relative flex h-[88px] w-full shrink-0 cursor-pointer items-center overflow-clip rounded-2xl border border-solid bg-white px-4 text-start ${
        data.featured ? 'border-gold-600' : 'border-line'
      }`}
    >
      <div className="flex w-full items-center justify-end gap-3">
        <div className="flex flex-col items-end gap-2">
          <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
            {data.name}
          </p>
          <div className="flex items-center gap-2">
            {data.earn && (
              <div className="flex shrink-0 items-center justify-center gap-1 rounded-sm bg-brand-50 py-0.5 pl-2 pr-1.5">
                <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-brand-400" dir="auto">
                  كسب نقاط
                </p>
                <div className="relative size-3 shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBuyCrypto} />
                </div>
              </div>
            )}
            {data.offer && (
              <div className="flex shrink-0 items-center justify-center rounded-sm bg-warning-50 px-2 py-0.5">
                <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink-warning" dir="auto">
                  {data.offer}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="relative size-16 shrink-0 rounded-2xl">
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none rounded-2xl object-cover"
            src={data.photo}
          />
        </div>
      </div>

      {/* corner badges */}
      <div className="absolute left-2.5 top-2 flex h-5 items-center gap-[4.211px]">
        {data.badges.includes('shop') && <Badge icon={iconShop} />}
        {data.badges.includes('global') && <Badge icon={iconGlobal} />}
      </div>

      {data.featured && (
        <div className="absolute bottom-[-1px] left-[-0.5px] flex items-start">
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

function Badge({ icon }: { icon: string }) {
  return (
    <div className="flex shrink-0 items-center rounded-[5.263px] bg-surface-neutral p-[2.105px]">
      <div className="relative size-[16.842px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
    </div>
  );
}
