import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import photoGolden from '../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import photoNamaq from '../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoJarir from '../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';
import photoAmazon from '../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoHunger from '../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoJahez from '../assets/figma/924e4f06eab7bf8031d10804ed6309bb8a93a3b4.png';
import photoHm from '../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoIkea from '../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoPanda from '../assets/figma/4fc36a8ced1a071b990cb535d493dc935eefcc30.png';
import photoZara from '../assets/figma/453784f58c394882dae76c32815f4f8dac9abc7e.png';

/** Brand strip (name · category · logo) of the Store-details designs, which
    are drawn with one merchant's content (إيكيا) — Temp routes every Market
    card to the design of the tab it was tapped in (user direction: «all
    stores under the X tab shall be the same as …»), so the page reads as the
    tapped store. Photos are the same art the Market cards carry. */
export type StoreBrand = { name: string; category: string; logo: string };

export const storeBrands: Record<string, StoreBrand> = {
  // العروض rows
  era: { name: 'قهوة إرا', category: 'المقاهي', logo: photoEra },
  namaq: { name: 'قهوة نمق', category: 'المقاهي', logo: photoNamaq },
  golden: { name: 'قولدن سنت', category: 'العطور والجمال', logo: photoGolden },
  jarir: { name: 'مكتبة جرير', category: 'المكتبات', logo: photoJarir },
  // القسائم stores
  amazon: { name: 'أمازون', category: 'التسوق الإلكتروني', logo: photoAmazon },
  hunger: { name: 'هنقرسيتشن', category: 'توصيل الطعام', logo: photoHunger },
  jahez: { name: 'جاهز برايم', category: 'توصيل الطعام', logo: photoJahez },
  // الكاش باك grid
  hm: { name: 'إتش آند إم', category: 'الأزياء والملابس', logo: photoHm },
  ikea: { name: 'إيكيا', category: 'المنزل والأثاث', logo: photoIkea },
  panda: { name: 'بنده', category: 'البقالة والسوبرماركت', logo: photoPanda },
  zara: { name: 'زارا', category: 'الأزياء والملابس', logo: photoZara },
  centrepoint: { name: 'سنتربوينت', category: 'الأزياء والملابس', logo: photoEra },
  dunkin: { name: 'دانكن دونتس', category: 'المقاهي', logo: photoEra },
};
