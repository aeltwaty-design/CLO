import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
import iconPeople from '../../assets/figma/c4f14edb4f3dc73aafc57568f4abb02e0ef9e857.svg';
import iconLocation from '../../assets/figma/7390df9053d9d9aac60c03a290c91afd2e7323fa.svg';
import iconTicket from '../../assets/figma/02d41c187946e3ed96263cd3096f1393fea2a563.svg';
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
import iconCards from '../../assets/figma/7829263638c55bcb9dddbbe8eec00ec0e4075ca2.svg';
import iconArrowLeft from '../../assets/figma/b48fe1cd7576b56f97cc1cf5e90b0ed15aaa67fb.svg';
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
import svVuesaxLinearArrowRight from '../../assets/figma/7d7cf649d92eeb33ef18e6ddf3ce44611724cd29.svg';
import svVector from '../../assets/figma/d06d9219221795b3f0dfd7c42d073635fc121c26.svg';
import svVector1 from '../../assets/figma/d1fbaa5dbb16b794b6d25f09d4280477f7868042.svg';
import svGroup from '../../assets/figma/b6cb9a2654796948d6e5f7c2004292673d16c14a.svg';
import svVector2 from '../../assets/figma/8b191215ce6ee572902c8a986a097defcd979954.svg';
import svVector3 from '../../assets/figma/3faed03b8aedd71fb4fbe0ca84c56e35e37c98b3.svg';
import svGroup1 from '../../assets/figma/4f7349493e115498b06c5f29456b3c5fbecfb635.svg';
import svVector4 from '../../assets/figma/af689301a7014f60731793755142ea19a957c2ad.svg';
import svVector5 from '../../assets/figma/f38569f96eab43733af9e6bfb400cf94a98ae28b.svg';
import svGroup2 from '../../assets/figma/85ab228f02087e06f7635b6d77f43161c087fc37.svg';
import svVector6 from '../../assets/figma/cecb1ab6b9e0a66b578f71c87f43e4c81a237bd3.svg';
import svGroup3 from '../../assets/figma/a1636480c629e18703b6ab7b5619a8fcb14745c0.svg';
import svVector7 from '../../assets/figma/e79bc86aab43d129f48da1cc680c92e865a001d6.svg';
import svGroup4 from '../../assets/figma/f8da08a14af8cfe75d2dbea2616aa5f960c01d71.svg';
import svVector8 from '../../assets/figma/9e675c526e6d090f3ccf7d8c6505fcfea07e3636.svg';
import svVector9 from '../../assets/figma/951d94701a1aed21a12d932edaa0e7afd5f910ac.svg';
import svGroup5 from '../../assets/figma/28658f9f5d7fe394b6643b7294289c05ba1b31e4.svg';
import svVector10 from '../../assets/figma/9cdf857872f122e1a399843d9d2cd41adf2bd6c9.svg';
import svVector11 from '../../assets/figma/dcb862be7f8522d23a90a009fe1ba1fdf1a3a5d6.svg';
import svGroup6 from '../../assets/figma/6bf91c6eebe7249dbdb3e6f9ba4de3847822dd36.svg';
import svVector12 from '../../assets/figma/103ec2b603ab07620910f5c2b2d4aefe9df77dde.svg';
import svVector13 from '../../assets/figma/4328fe78c4e4a8c6927451310de97e80ab3cb1a5.svg';
import svGroup7 from '../../assets/figma/fd0ef592b0720b20f1d15765e653e061ca949985.svg';
import svVector14 from '../../assets/figma/48f3d6bd613d2f3dd3b259880350425b29cb1190.svg';
import svVector15 from '../../assets/figma/431e08490a170737247bf211993f47c57ac3535f.svg';
import svGroup8 from '../../assets/figma/69f31a28c4a503cc3cb6feda3c3108ffd43edb55.svg';
import svVector16 from '../../assets/figma/e3c12cbda4b441f4a56be5529e893175a3534433.svg';
import svGroup9 from '../../assets/figma/1d2d0e6360b15812ea8fcd82fb7d41ff892db97b.svg';
import svVector17 from '../../assets/figma/a65fb85ab70949de6b5ecbf7ff2306a31333a37c.svg';
import svGroup10 from '../../assets/figma/7142fad6ad0ecf07c4831de2a6520ac968f43fb3.svg';
import svVector18 from '../../assets/figma/70d3037fdcfbf2926d6dd94bf7af575dcd7f8609.svg';
import svVector19 from '../../assets/figma/2c01899fbe7943235a772dd47877c232644494bc.svg';
import svGroup11 from '../../assets/figma/4400f4e90e65c9b34a291be864ec680a0cd77fbf.svg';
import svVector20 from '../../assets/figma/88acbc54a419e025cc68e2809b1b0b2e6541f27a.svg';
import svVector21 from '../../assets/figma/b34b537a1220ee2b9c40121a4cca5e5a014dd4d1.svg';
import svVector22 from '../../assets/figma/6ad510520e756d0cdb14ea1179abfd94250eb4c6.svg';
import svGroup12 from '../../assets/figma/ef04e70f19c4bfb7d5d3f8075bf8f1b557c8d536.svg';
import svGroup13 from '../../assets/figma/c0faea03a7ddc4a969c9251cebac6925882255a9.svg';
import svVector23 from '../../assets/figma/69c2029293da85307bae0ac45241b638e47fb13e.svg';
import svGroup14 from '../../assets/figma/cff351c08e3536d6ee7a37cd9beb79376db5d491.svg';
import svVector24 from '../../assets/figma/04559ea02d25d372faffadf1d458ea0b0be33293.svg';
import svVector25 from '../../assets/figma/ac4e0a36273cdfc0496fd4c070b5a9b23dc12360.svg';
import svGroup15 from '../../assets/figma/4b60a4bf9332a7a6eecc861e7554a0dbd2cc4cc0.svg';
import svVector26 from '../../assets/figma/ff4d0e8d88ae13d3dcc162a5c3e74e2cf8f31390.svg';
import svVector27 from '../../assets/figma/7f57b1ea0a7b626a36374110af0a471db4684123.svg';
import svGroup16 from '../../assets/figma/01340fdec560dcb88b7a1ba22c1840476e32f54b.svg';
import svVector28 from '../../assets/figma/8b63c3d18e23e42427ccf2ecdcace4dcac1341b8.svg';
import svVector29 from '../../assets/figma/add995fcd91f852ceef57c379dd9b92fc277a871.svg';
import svGroup17 from '../../assets/figma/fa4d211cac0791a688e4dfb16ee392be89aa610e.svg';
import svVector30 from '../../assets/figma/ec9998d442e96d4abba48a4205628a8235cb5a3a.svg';
import svVector31 from '../../assets/figma/6080ab2ffaf850d2dbc6415fabe2f699b489bb9f.svg';
import svGroup18 from '../../assets/figma/3acc7bb3a5505f9e635db5c1568e8392e88559aa.svg';
import svVector32 from '../../assets/figma/9f9c0763da5c6bf34b732745419559688c895350.svg';
import svVector33 from '../../assets/figma/398f2e00c6e4036658a1606e2d8a45c46ec3ef87.svg';
import svGroup19 from '../../assets/figma/61ba3725e6e79e459de32c6b6c5b609ab64feb2e.svg';
import svVector34 from '../../assets/figma/5f8f9bb23020124f42b936ee779544df1d25efb1.svg';
import svVector35 from '../../assets/figma/d98a599db4dcbeb5f4356601fe06b637f1b7e33d.svg';
import svGroup20 from '../../assets/figma/6eaa61a73b4b1398555d64f6cc9a8e56906e7f81.svg';
import svVector36 from '../../assets/figma/2a46f3fa0c35847484773feda9c527f1ee6eb5d1.svg';
import svVector37 from '../../assets/figma/fdf568ef89f4587205cea07a34a2b1dc84027be8.svg';
import svGroup21 from '../../assets/figma/1dea80b7a24cf12d40acede4ebb7d902ba39b908.svg';
import svVector38 from '../../assets/figma/accca2673a2af7651cee39e682922d86cdb077f3.svg';
import svVector39 from '../../assets/figma/9b581d314d06c9a4ca582eaa3a501917620d60ef.svg';
import svGroup22 from '../../assets/figma/f7c3efa47b109cb8a1fa48a9a828992113a42058.svg';
import svVector40 from '../../assets/figma/9dff35fa4f5a48560c0c2a0c19a45f4c1771961a.svg';
import svVector41 from '../../assets/figma/8a427392f6cb98a076f18980dab9132e3cc66850.svg';
import svGroup23 from '../../assets/figma/9cbf225f29c31da56cb989b74187b0147350867d.svg';
import svVector42 from '../../assets/figma/fbd2d16884a3f2f4c6d69a3eb9b65bd94c3de2a4.svg';
import svVector43 from '../../assets/figma/742cf263709c6bfb0d7431a142bacb63f192cac3.svg';
import svGroup24 from '../../assets/figma/15d4d1d75616c12c25f09e4a311fdca90a1b137d.svg';
import svVector44 from '../../assets/figma/e62e1dcf778577c6a4f2f48c5cf71bd99633bfd9.svg';
import svVector45 from '../../assets/figma/a590814d2e00c9969d4dcbfeede2f05e5c4bedec.svg';
import svGroup25 from '../../assets/figma/616fb47c3e6c4342645dae478c9d5ba4b01399b1.svg';
import svVector46 from '../../assets/figma/817eb004b0f6b0c7243405cb65a54e296b69abac.svg';
import svVector47 from '../../assets/figma/3ffd5ffb16e518c2903995feee4fa22a993ced14.svg';
import svGroup26 from '../../assets/figma/7886933a842c76d3ef9b717b0170686017047367.svg';
import svVector48 from '../../assets/figma/7b098599338930cba3a0af74d6b9201702755833.svg';
import svVector49 from '../../assets/figma/08c4f7fb2fd8972d5cf60c8c2a7fd736d3718569.svg';
import svGroup27 from '../../assets/figma/5e12bb14baffed8fd4bf730f62b1fcfbabd7c817.svg';
import svVector50 from '../../assets/figma/72c1fa709f1279d86d2342a69d90f1cdb14ff959.svg';
import svVector51 from '../../assets/figma/5aaa273ddcd89bd249ac1d225810989179fc16b9.svg';
import svGroup28 from '../../assets/figma/ce2ea2cb2d942f11782cd8d3283029b34e9f89ea.svg';
import svVector52 from '../../assets/figma/5e4d6ae670f6508f53640913353e16acd550fff2.svg';
import svVector53 from '../../assets/figma/e401c751d3059bd2236d57516ec9eedb97079de2.svg';
import svGroup29 from '../../assets/figma/084f6b3f42eb8b2966fe0a3c4eb1082f106cf18b.svg';
import svVector54 from '../../assets/figma/25edc92e1323c53cbe521784b3cbbe4eec5c72fc.svg';
import svVector55 from '../../assets/figma/568ad173c0962a236c5f835cff4758925b2f1bc6.svg';
import svGroup30 from '../../assets/figma/a884559f237b298e79db340b37acdf66021be17f.svg';
import svVector56 from '../../assets/figma/95d1125ae2ec5bdd49bb11be1624b68a9ad3b22c.svg';
import svVector57 from '../../assets/figma/66168b2eac22fffc81fd22ea8277f8a5810b3c80.svg';
import svGroup31 from '../../assets/figma/ad6b83c060fae5b2247c08abdaccea769658da56.svg';
import svVector58 from '../../assets/figma/65a6121e05a8095bd7042bfc1b5031920f8eff3e.svg';
import svVector59 from '../../assets/figma/e6300c7cd77b5b28cf3dbc1b1ee73cdb148a6e8d.svg';
import svGroup32 from '../../assets/figma/e1505fd63ee42882fa75603552b34ea4c04989e8.svg';
import svVector60 from '../../assets/figma/636a18ca3763cce3516d0c2beac88f00562f52d3.svg';
import svVector61 from '../../assets/figma/66524729951d3a6ab915a5de5ae6fb5ca4da3717.svg';
import svGroup33 from '../../assets/figma/d05484846f5506f778cd2f680347b886ea767563.svg';
import svVector62 from '../../assets/figma/00a13614ee2b1436ae3d1ec6678ca5a0c3445272.svg';
import svVector63 from '../../assets/figma/cea9d36aefd53a38f76452214d74c6844dda327c.svg';
import svGroup34 from '../../assets/figma/e0967624ffb1eb54256be8f10653b53e2ba715a3.svg';
import svVector64 from '../../assets/figma/f3fb0336a48409ec6ada2698683e795e79515e06.svg';
import svVector65 from '../../assets/figma/64ff92daefa621e294bc9f0df8d2c0aff6c32725.svg';
import svGroup35 from '../../assets/figma/b1b5ac8cceb03cc12512c8567833d884248360b8.svg';
import svVector66 from '../../assets/figma/c6390b513ab6e8773a05ea41530f5d37f4a1b050.svg';
import svVector67 from '../../assets/figma/048357ec0ae994eb6adbe40d8cfedbaf49a96453.svg';
import svGroup36 from '../../assets/figma/93a7e1f481d60ad20bcd7bb4808e346da791f374.svg';
import svVector68 from '../../assets/figma/e9650481bbdb9da5809ebdcc8e81c5bd62bc3c22.svg';
import svVector69 from '../../assets/figma/c4dbd876fed17a001d1009caac52986e13e38e20.svg';
import svGroup37 from '../../assets/figma/912d02334856b0f94153db69eff29c858f9c0401.svg';
import svVector70 from '../../assets/figma/f69e9a2d8b5510e0a72dbee9927d42691500c908.svg';
import svGroup38 from '../../assets/figma/cf07c936868b88dd63d7c19c33fdc19069eac10f.svg';
import svVector71 from '../../assets/figma/124ec1992fd1c86ab9d25fdba7d8c1a8caf96657.svg';
import svVector72 from '../../assets/figma/6228762a9148156b6c0faee5599524b941c4ac39.svg';
import svVector73 from '../../assets/figma/17dcdfa52cc663e1cac02d5e1fcdfe2067b98404.svg';
import svVector74 from '../../assets/figma/4dfbfd28ec4a5350ae378b1a3e21e94e3188fb60.svg';
import svVector75 from '../../assets/figma/b3e839d2989155a1761275dea0a76d24f0adb317.svg';
import svGroup39 from '../../assets/figma/12ec8f09349929ab606c066bd42da31f0e1a3377.svg';
import svVector76 from '../../assets/figma/fc5880da6fe8ec8ca62cf07a9d3e57bd67914c7e.svg';
import svGroup40 from '../../assets/figma/94bf6be11f289e32f483a1571b1b07c22fa042c0.svg';
import svGroup41 from '../../assets/figma/71faa8eeb6f3e7274710b350999874115e18d3db.svg';
import svGroup42 from '../../assets/figma/b069396f23fa378328828c23976820512fd62de6.svg';
import svEllipse467 from '../../assets/figma/de0a9e9a8d74b898f88a179ff4709771f135a77f.svg';
import svVector77 from '../../assets/figma/b0d7de10fd04001395971932bd6a1ab65f4acd21.svg';

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
  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-x-hidden overflow-y-auto">
        <HomeHeader />
        {/* content column (Figma 47:3725, 375×1872 at y585) — relative so it
            paints over the header sheet's 30px spill below y585 */}
        <div className="relative flex w-full flex-col items-start gap-7 px-4 pb-[104px] pt-6">
          <SavingsCard />
          <DailyOffersSection />
          <AddCardPromo />
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
function HomeHeader() {
  const navigate = useNavigate();
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
          {/* cashback pill — opens the cashback wallet (user direction) */}
          <button
            type="button"
            onClick={() => navigate('/cards')}
            aria-label="الكاش باك"
            className="flex h-10 w-[53px] shrink-0 cursor-pointer flex-col items-start justify-center overflow-clip rounded-[100px] border border-solid border-[rgba(255,255,255,0.74)] bg-[rgba(246,246,246,0.74)] px-3"
          >
            <div className="flex w-full items-center gap-1 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink">
              <p className="relative shrink-0" dir="auto">
                ﷼
              </p>
              <p className="font-en relative shrink-0" dir="auto">
                0
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

      {/* category tiles (47:3709) */}
      <div className="absolute left-4 top-[313px] flex w-[343px] items-start gap-3">
        <CategoryTile icon={iconPeople} label="عائلتي" />
        <CategoryTile icon={iconLocation} label="بالقرب مني" />
        <CategoryTile icon={iconTicket} label="القسائم" badge />
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

function CategoryTile({ icon, label, badge }: { icon: string; label: string; badge?: boolean }) {
  return (
    <button
      type="button"
      className="relative flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-2.5 rounded-xl bg-[linear-gradient(-28.8166385645347deg,rgba(255,255,255,0.5)_31.621%,rgb(255,255,255)_135.4%)] px-[13px] pb-3 pt-3.5"
    >
      <div className="relative size-8 shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
      <p className="whitespace-nowrap text-center text-xs font-medium leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
      {badge && (
        <div className="absolute left-[calc(50%+0.15px)] top-[-7px] flex w-[41.961px] -translate-x-1/2 flex-col items-center">
          <div className="flex shrink-0 items-start justify-center gap-0.5 overflow-clip whitespace-nowrap rounded-full bg-brand-400 px-2 py-[0.5px] text-center text-[9px] text-ink-inverse shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex shrink-0 items-center font-bold">
              <p className="whitespace-pre leading-[13.5px]" dir="ltr">{`﷼  `}</p>
              <p className="font-en leading-[13.5px]" dir="ltr">
                50
              </p>
            </div>
            <p className="font-bold leading-[13.5px]" dir="ltr">
              من
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

/** ctg_01 (47:3726): total-savings card with the money-pot illustration. */
function SavingsCard() {
  return (
    <button
      type="button"
      className="relative h-[90px] w-full shrink-0 overflow-clip rounded-2xl bg-surface-neutral text-start"
    >
      <div className="absolute left-[126px] top-1/2 flex -translate-y-1/2 flex-col items-end justify-center">
        <div className="mb-[-1px] flex w-[78px] shrink-0 items-center justify-end">
          <p className="whitespace-nowrap text-right text-sm font-normal leading-[1.5] text-ink" dir="auto">
            إجمالي المدخرات حتى الآن
          </p>
        </div>
        <div className="mb-[-1px] flex h-[35px] shrink-0 items-center gap-1">
          <p className="font-en w-[85px] whitespace-nowrap text-right text-[24px] font-bold leading-[1.4] text-[#e85d07]" dir="auto">
            15,000
          </p>
          <div className="relative h-[30px] w-5 shrink-0">
            <p className="absolute inset-0 whitespace-nowrap text-center text-[24px] font-bold leading-[1.4] text-[#e85d07]" dir="auto">
              ﷼
            </p>
          </div>
        </div>
        <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="ltr">
          {'هذا الشهر: ﷼ '}
          <span className="font-en">50</span>
        </p>
      </div>
      <div className="absolute right-[300.77px] top-[calc(50%+0.12px)] flex size-[26.233px] -translate-y-1/2 items-center justify-center">
        <div className="flex-none -scale-y-100 rotate-180">
          <div className="relative size-[26.233px] overflow-clip rounded-[6.558px] bg-white">
            <div className="absolute right-[5.47px] top-[5.46px] size-[15.302px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={svVuesaxLinearArrowRight} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[97px] items-center justify-center right-[-14.77px] top-[-7px] w-[110.683px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[97px] overflow-clip relative w-[110.683px]">
            <div className="absolute contents inset-0">
              <div className="absolute contents inset-0">
                <div className="absolute contents inset-0">
                  <div className="absolute contents inset-[0_0_39.96%_11.39%]">
                    <div className="absolute contents inset-[38.72%_82.22%_57.8%_11.39%]">
                      <div className="absolute inset-[39.02%_82.3%_57.8%_11.39%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector} />
                      </div>
                      <div className="absolute inset-[38.72%_82.22%_58.4%_11.47%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector1} />
                      </div>
                      <div className="absolute inset-[39.12%_83.61%_59.61%_12.33%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[42.15%_52.96%_53.85%_40.32%]">
                      <div className="absolute inset-[42.98%_53.24%_53.85%_40.45%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector2} />
                      </div>
                      <div className="absolute flex inset-[42.15%_52.96%_53.93%_40.32%] items-center justify-center" style={{ containerType: "size" }}>
                        <div className="flex-none h-[hypot(93.5213cqw,36.2676cqh)] rotate-[-78.77deg] w-[hypot(6.47872cqw,-63.7324cqh)]">
                          <div className="relative size-full">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector3} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-[43.07%_54.55%_55.66%_41.39%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup1} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[43.1%_47.38%_53.42%_46.24%]">
                      <div className="absolute inset-[43.4%_47.45%_53.42%_46.24%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector4} />
                      </div>
                      <div className="absolute inset-[43.1%_47.38%_54.02%_46.32%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector5} />
                      </div>
                      <div className="absolute inset-[43.5%_48.76%_55.23%_47.18%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup2} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[40.77%_76.78%_55.75%_16.84%]">
                      <div className="absolute inset-[41.07%_76.86%_55.75%_16.84%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector6} />
                      </div>
                      <div className="absolute inset-[40.77%_76.78%_56.35%_16.92%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector1} />
                      </div>
                      <div className="absolute inset-[41.17%_78.17%_57.56%_17.77%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup3} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[38.62%_76.5%_57.9%_17.12%]">
                      <div className="absolute inset-[38.92%_76.57%_57.9%_17.12%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector6} />
                      </div>
                      <div className="absolute inset-[38.62%_76.5%_58.5%_17.2%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector7} />
                      </div>
                      <div className="absolute inset-[39.02%_77.88%_59.71%_18.06%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup4} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[37.33%_63%_59.19%_30.61%]">
                      <div className="absolute inset-[37.63%_63.08%_59.19%_30.61%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector8} />
                      </div>
                      <div className="absolute inset-[37.33%_63%_59.79%_30.69%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector9} />
                      </div>
                      <div className="absolute inset-[37.73%_64.39%_61.01%_31.55%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup5} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[39.2%_54.98%_57.11%_38.69%]">
                      <div className="absolute inset-[39.51%_55.08%_57.11%_38.69%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector10} />
                      </div>
                      <div className="absolute inset-[39.2%_54.98%_57.69%_38.8%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector11} />
                      </div>
                      <div className="absolute inset-[39.62%_56.32%_58.9%_39.66%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup6} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[35.51%_56.61%_61.15%_36.98%]">
                      <div className="absolute inset-[35.81%_56.61%_61.15%_37.03%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector12} />
                      </div>
                      <div className="absolute inset-[35.51%_56.67%_61.76%_36.98%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector13} />
                      </div>
                      <div className="absolute inset-[35.97%_58.15%_62.79%_37.79%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup7} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[57.16%_28.34%_39.96%_66.14%]">
                      <div className="absolute inset-[57.42%_28.34%_39.96%_66.19%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector14} />
                      </div>
                      <div className="absolute inset-[57.16%_28.39%_40.49%_66.14%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector15} />
                      </div>
                      <div className="absolute inset-[57.56%_29.67%_41.37%_66.84%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup8} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[44.4%_59.37%_52.11%_34.25%]">
                      <div className="absolute inset-[44.71%_59.44%_52.11%_34.25%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector16} />
                      </div>
                      <div className="absolute inset-[44.4%_59.37%_52.71%_34.33%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector7} />
                      </div>
                      <div className="absolute inset-[44.81%_60.75%_53.92%_35.19%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup9} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[41.57%_59.37%_54.94%_34.25%]">
                      <div className="absolute inset-[41.88%_59.44%_54.94%_34.25%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector17} />
                      </div>
                      <div className="absolute inset-[41.57%_59.37%_55.54%_34.33%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector7} />
                      </div>
                      <div className="absolute inset-[41.98%_60.75%_56.76%_35.19%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup10} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[45.96%_47.41%_50.55%_46.2%]">
                      <div className="absolute inset-[46.27%_47.49%_50.55%_46.2%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector18} />
                      </div>
                      <div className="absolute inset-[45.96%_47.41%_51.15%_46.28%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector19} />
                      </div>
                      <div className="absolute inset-[46.37%_48.8%_52.36%_47.14%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup11} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[45.44%_53.06%_51.08%_40.56%]">
                      <div className="absolute inset-[45.75%_53.13%_51.08%_40.56%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector18} />
                      </div>
                      <div className="absolute inset-[45.44%_53.06%_51.67%_40.64%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector20} />
                      </div>
                      <div className="absolute inset-[45.85%_54.44%_52.88%_41.5%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup11} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[43.8%_65.68%_52.73%_27.94%]">
                      <div className="absolute inset-[44.1%_65.75%_52.73%_27.94%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector21} />
                      </div>
                      <div className="absolute inset-[43.8%_65.68%_53.32%_28.02%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector22} />
                      </div>
                      <div className="absolute inset-[44.2%_67.06%_54.54%_28.88%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup12} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[41.57%_65.29%_54.94%_28.33%]">
                      <div className="absolute inset-[41.88%_65.37%_54.94%_28.33%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector17} />
                      </div>
                      <div className="absolute inset-[41.57%_65.29%_55.54%_28.41%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector7} />
                      </div>
                      <div className="absolute inset-[41.98%_66.67%_56.76%_29.26%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup13} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[38.45%_69.16%_58.07%_24.46%]">
                      <div className="absolute inset-[38.75%_69.24%_58.07%_24.46%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector23} />
                      </div>
                      <div className="absolute inset-[38.45%_69.16%_58.67%_24.54%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector7} />
                      </div>
                      <div className="absolute inset-[38.85%_70.54%_59.88%_25.4%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup14} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[32.17%_72.12%_63.73%_21.69%]">
                      <div className="absolute inset-[32.5%_72.26%_63.73%_21.69%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector24} />
                      </div>
                      <div className="absolute inset-[32.17%_72.12%_64.27%_21.85%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector25} />
                      </div>
                      <div className="absolute inset-[32.64%_73.39%_65.5%_22.71%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup15} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[18.07%_54.12%_78.03%_39.62%]">
                      <div className="absolute inset-[18.39%_54.24%_78.03%_39.62%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector26} />
                      </div>
                      <div className="absolute inset-[18.07%_54.12%_78.59%_39.76%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector27} />
                      </div>
                      <div className="absolute inset-[18.52%_55.42%_79.8%_40.62%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup16} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[31.03%_63.12%_65.04%_30.17%]">
                      <div className="absolute flex inset-[31.03%_63.12%_65.04%_30.17%] items-center justify-center" style={{ containerType: "size" }}>
                        <div className="flex-none h-[hypot(94.4992cqw,27.1081cqh)] rotate-[-81.63deg] w-[hypot(5.50078cqw,-72.8919cqh)]">
                          <div className="relative size-full">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector28} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-[31.17%_63.24%_66.09%_30.41%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector29} />
                      </div>
                      <div className="absolute inset-[31.56%_64.65%_67.32%_31.27%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup17} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[16.37%_42.68%_80.43%_50.9%]">
                      <div className="absolute inset-[16.66%_42.68%_80.43%_50.92%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector30} />
                      </div>
                      <div className="absolute inset-[16.37%_42.7%_81.05%_50.9%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector31} />
                      </div>
                      <div className="absolute inset-[16.79%_44.16%_82.24%_51.73%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup18} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[16.35%_29.53%_79%_64.54%]">
                      <div className="absolute inset-[16.67%_29.7%_79%_64.53%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector32} />
                      </div>
                      <div className="absolute inset-[16.35%_29.53%_79.49%_64.74%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector33} />
                      </div>
                      <div className="absolute inset-[16.89%_30.69%_80.79%_65.6%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup19} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[24.73%_57.17%_71.61%_36.49%]">
                      <div className="absolute inset-[25.04%_57.27%_71.61%_36.49%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector34} />
                      </div>
                      <div className="absolute inset-[24.73%_57.17%_72.19%_36.6%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector35} />
                      </div>
                      <div className="absolute inset-[25.14%_58.51%_73.4%_37.47%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup20} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[22.43%_66.09%_73.37%_27.14%]">
                      <div className="absolute flex inset-[22.43%_66.09%_73.37%_27.14%] items-center justify-center" style={{ containerType: "size" }}>
                        <div className="flex-none h-[hypot(6.94934cqw,67.6983cqh)] rotate-[-10.69deg] w-[hypot(93.0507cqw,-32.3017cqh)]">
                          <div className="relative size-full">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector36} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-[22.65%_66.39%_74.5%_27.3%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector37} />
                      </div>
                      <div className="absolute inset-[23.12%_67.88%_75.48%_28.09%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup21} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[30.24%_51.22%_65.46%_42.68%]">
                      <div className="absolute inset-[30.56%_51.37%_65.46%_42.68%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector38} />
                      </div>
                      <div className="absolute inset-[30.24%_51.22%_65.99%_42.85%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector39} />
                      </div>
                      <div className="absolute inset-[30.74%_52.46%_67.24%_43.71%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup22} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[32.87%_65.86%_62.84%_28.04%]">
                      <div className="absolute inset-[33.19%_66.01%_62.84%_28.04%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector40} />
                      </div>
                      <div className="absolute inset-[32.87%_65.86%_63.36%_28.21%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector41} />
                      </div>
                      <div className="absolute inset-[33.36%_67.1%_64.61%_29.07%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup23} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[36.37%_42.68%_60.43%_50.89%]">
                      <div className="absolute inset-[36.66%_42.7%_60.43%_50.89%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector42} />
                      </div>
                      <div className="absolute inset-[36.37%_42.68%_61.06%_50.91%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector43} />
                      </div>
                      <div className="absolute inset-[36.77%_44.13%_62.4%_51.75%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup24} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[36.01%_28.56%_60.16%_65.16%]">
                      <div className="absolute inset-[36.32%_28.56%_60.16%_65.28%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector44} />
                      </div>
                      <div className="absolute inset-[36.01%_28.68%_60.72%_65.16%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector45} />
                      </div>
                      <div className="absolute inset-[36.55%_30.17%_61.62%_65.92%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup25} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[52.49%_36.39%_43.67%_58.25%]">
                      <div className="absolute inset-[52.8%_36.53%_43.67%_58.25%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector46} />
                      </div>
                      <div className="absolute inset-[52.49%_36.39%_44.22%_58.4%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector47} />
                      </div>
                      <div className="absolute inset-[52.94%_37.48%_45.42%_59.15%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup26} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[24.81%_43.73%_71.94%_49.84%]">
                      <div className="absolute inset-[25.11%_43.73%_71.94%_49.88%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector48} />
                      </div>
                      <div className="absolute inset-[24.81%_43.76%_72.57%_49.84%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector49} />
                      </div>
                      <div className="absolute inset-[25.24%_45.25%_73.69%_50.67%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup27} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[43.61%_32.93%_52.48%_60.81%]">
                      <div className="absolute inset-[43.92%_33.06%_52.48%_60.81%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector50} />
                      </div>
                      <div className="absolute inset-[43.61%_32.93%_53.04%_60.94%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector51} />
                      </div>
                      <div className="absolute inset-[44.05%_34.23%_54.26%_61.81%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup28} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[26.62%_15.51%_68.93%_78.46%]">
                      <div className="absolute inset-[26.94%_15.51%_68.93%_78.63%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector52} />
                      </div>
                      <div className="absolute inset-[26.62%_15.69%_69.44%_78.46%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector53} />
                      </div>
                      <div className="absolute inset-[27.29%_17.15%_70.31%_79.18%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup29} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[0_0_96.75%_93.58%]">
                      <div className="absolute inset-[0.3%_0.04%_96.75%_93.58%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector54} />
                      </div>
                      <div className="absolute inset-[0_0_97.37%_93.61%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector55} />
                      </div>
                      <div className="absolute inset-[0.39%_1.42%_98.64%_94.47%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup30} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[34.99%_78.19%_61.79%_15.39%]">
                      <div className="absolute inset-[35.28%_78.19%_61.79%_15.41%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector56} />
                      </div>
                      <div className="absolute inset-[34.99%_78.22%_62.42%_15.39%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector57} />
                      </div>
                      <div className="absolute inset-[35.41%_79.69%_63.57%_16.21%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup31} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[26.38%_76.44%_70.1%_17.18%]">
                      <div className="absolute inset-[26.69%_76.52%_70.1%_17.18%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector58} />
                      </div>
                      <div className="absolute inset-[26.38%_76.44%_70.7%_17.27%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector59} />
                      </div>
                      <div className="absolute inset-[26.79%_77.82%_71.9%_18.13%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup32} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[28.54%_69.43%_68.03%_24.18%]">
                      <div className="absolute inset-[28.84%_69.43%_68.03%_24.24%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector60} />
                      </div>
                      <div className="absolute inset-[28.54%_69.5%_68.63%_24.18%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector61} />
                      </div>
                      <div className="absolute inset-[29.01%_70.99%_69.62%_24.98%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup33} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[25.71%_30.19%_70.27%_63.59%]">
                      <div className="absolute inset-[26.03%_30.19%_70.27%_63.72%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector62} />
                      </div>
                      <div className="absolute inset-[25.71%_30.33%_70.82%_63.59%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector63} />
                      </div>
                      <div className="absolute inset-[26.29%_31.81%_71.69%_64.35%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup34} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[16.49%_17.52%_79.62%_76.22%]">
                      <div className="absolute inset-[16.8%_17.64%_79.62%_76.22%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector64} />
                      </div>
                      <div className="absolute inset-[16.49%_17.52%_80.18%_76.36%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector65} />
                      </div>
                      <div className="absolute inset-[16.93%_18.82%_81.39%_77.22%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup35} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[8.38%_10.15%_88.39%_83.42%]">
                      <div className="absolute inset-[8.67%_10.15%_88.39%_83.45%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector66} />
                      </div>
                      <div className="absolute inset-[8.38%_10.18%_89.01%_83.42%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector67} />
                      </div>
                      <div className="absolute inset-[8.81%_11.66%_90.15%_84.25%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup36} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[42.27%_71.79%_54.25%_21.82%]">
                      <div className="absolute inset-[42.58%_71.87%_54.25%_21.82%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector68} />
                      </div>
                      <div className="absolute inset-[42.27%_71.79%_54.85%_21.9%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector69} />
                      </div>
                      <div className="absolute inset-[42.67%_73.17%_56.06%_22.76%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup37} />
                      </div>
                    </div>
                    <div className="absolute contents inset-[40.67%_71.05%_55.85%_22.57%]">
                      <div className="absolute inset-[40.97%_71.13%_55.85%_22.57%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector68} />
                      </div>
                      <div className="absolute inset-[40.67%_71.05%_56.45%_22.65%]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector70} />
                      </div>
                      <div className="absolute inset-[41.07%_72.43%_57.66%_23.5%] mix-blend-overlay">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup38} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute contents inset-[40.77%_42.29%_0_0]">
                    <div className="absolute inset-[82.65%_85.28%_6.33%_5.49%]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector71} />
                    </div>
                    <div className="absolute inset-[88.29%_58.92%_0_33.8%]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector72} />
                    </div>
                    <div className="absolute inset-[47.73%_89.03%_39.63%_0]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector73} />
                    </div>
                    <div className="absolute inset-[57.63%_42.29%_29.74%_46.73%]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector74} />
                    </div>
                    <div className="absolute inset-[45%_47.42%_6.51%_4.61%]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector75} />
                    </div>
                    <div className="absolute inset-[45.01%_56.25%_6.69%_4.61%] mix-blend-multiply">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup39} />
                    </div>
                    <div className="absolute inset-[40.77%_45.87%_43.69%_6.32%]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector76} />
                    </div>
                    <div className="absolute inset-[43.48%_45.87%_43.71%_6.32%] mix-blend-multiply">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup40} />
                    </div>
                    <div className="absolute inset-[62.61%_49.88%_14.76%_36.89%] mix-blend-overlay">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup41} />
                    </div>
                    <div className="absolute inset-[83.87%_69.4%_12.12%_18.22%] mix-blend-overlay">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={svGroup42} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-[56.7%_61.15%_19.59%_18.07%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={svEllipse467} />
            </div>
            <div className="absolute flex inset-[63.92%_65.42%_25.6%_20.78%] items-center justify-center" style={{ containerType: "size" }}>
              <div className="-scale-x-100 flex-none h-[hypot(11.0589cqw,-66.7842cqh)] rotate-[-166.03deg] w-[hypot(88.9411cqw,33.2158cqh)]">
                <div className="relative size-full">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={svVector77} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

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

/** Add-card promo (47:4067) — CTA enters the add-card flow. */
function AddCardPromo() {
  const navigate = useNavigate();
  return (
    <section className="flex w-full shrink-0 flex-col items-end gap-3 overflow-clip rounded-2xl bg-bravo-50 p-3">
      <div className="flex w-full shrink-0 items-center gap-2.5">
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1.5 text-right">
          <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink" dir="auto">
            {'أضف بطاقتك واحصل علي '}
            <span className="text-viola-500">الكاش باك</span>
          </p>
          <p className="w-[min-content] min-w-full text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
            ادفع ببطاقتك واكسب استرداد نقدي مع كل عملية شراء تقوم بها
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
          onClick={() => navigate('/cashback/add-card')}
          className="flex h-[30px] min-w-px flex-[1_0_0] items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-surface px-2"
        >
          <div className="relative size-4 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowLeft} />
          </div>
          <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
            أضف بطاقتك
          </p>
        </button>
      </div>
    </section>
  );
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
