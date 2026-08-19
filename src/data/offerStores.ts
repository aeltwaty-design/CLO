import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import photoGolden from '../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import photoNamaq from '../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoJarir from '../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';

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
};
