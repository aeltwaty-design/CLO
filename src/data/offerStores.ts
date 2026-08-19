import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import photoGolden from '../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import photoNamaq from '../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoJarir from '../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';
import photoAmazon from '../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoHunger from '../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoJahez from '../assets/figma/924e4f06eab7bf8031d10804ed6309bb8a93a3b4.png';

/** Brand strip of the +offers Store-details design (1:9221 / 1:9807, drawn
    with إيكيا content) for the stores the Market's العروض tab lists — Temp
    routes every offer row to that design (user direction: «all stores under
    the Offers tab shall have the same as /store/ikea»), so the page reads as
    the tapped store rather than إيكيا. Photos are the same offer-row art. */
export type OfferStoreBrand = { name: string; category: string; logo: string };

export const offerStoreBrands: Record<string, OfferStoreBrand> = {
  era: { name: 'قهوة إرا', category: 'المقاهي', logo: photoEra },
  namaq: { name: 'قهوة نمق', category: 'المقاهي', logo: photoNamaq },
  golden: { name: 'قولدن سنت', category: 'العطور والجمال', logo: photoGolden },
  jarir: { name: 'مكتبة جرير', category: 'المكتبات', logo: photoJarir },
  // القسائم stores — the redrawn vouchers page (135:6477) shares this strip
  // and its العروض tab opens the +offers design for them
  amazon: { name: 'أمازون', category: 'التسوق الإلكتروني', logo: photoAmazon },
  hunger: { name: 'هنقرسيتشن', category: 'توصيل الطعام', logo: photoHunger },
  jahez: { name: 'جاهز برايم', category: 'توصيل الطعام', logo: photoJahez },
};
