import StatusBar from './StatusBar';
import mapImg from '../assets/figma/e0bb1eda50ed3bcf20a507f8a0cba43dadcfd89c.png';
import ticketIcon from '../assets/figma/1fdf6a1fd2c7a046d6f6d6e20493a2bb5e009262.svg';
import searchIcon from '../assets/figma/7e784d450e713f5e771409c8ebed7f9f7b1ad69f.svg';
import arrowStroke from '../assets/figma/e4c87ab6de57c62d5f7e1680c3c53573ab3d0cd5.svg';
import pinUnion1 from '../assets/figma/d887d6001065df647ab910746f7a13c9347868af.svg';
import pinSmile1 from '../assets/figma/955bb672347d6c4e5a83151c7cc7bdd9b0409bf2.svg';
import pinUnion2 from '../assets/figma/bc206ac0ef8e8bd9399177768f222be9f03e5ee9.svg';
import pinSmile2 from '../assets/figma/66fbd50406e5110532fe1f90353dce5fcc800549.svg';
import pinUnion3 from '../assets/figma/83f2591edb33ee8d609c5a905e9f4dbb5b1f062e.svg';
import pinSmile3 from '../assets/figma/2a08752be54bf059dcab049818c1316b59291456.svg';
import pinUnion4 from '../assets/figma/49eda91cf769c2f0d422cc2ca6ec0745010ae46f.svg';
import pinSmile4 from '../assets/figma/1ab1703daa2984528fdd4dfce3d6d2be33510424.svg';
import pinPhoto1 from '../assets/figma/e1f24fbed67e58db7b5fec3280367c9c7440ad2f.png';
import pinPhoto2 from '../assets/figma/107e9280e20a4c316b271d04c6a0bcb9e0c8a18e.png';
import pinPhoto3 from '../assets/figma/15e03c282b28b56842411a1b27c3ac6eab0ce2aa.png';
import pinPhoto4 from '../assets/figma/ff8305a1ece2410e31485ffc6578dd8d26d64313.png';

/** Market screen header (Figma 1:7751): status bar, app bar, map hero. */
export default function MarketHeader() {
  return (
    <div className="flex w-full flex-col items-start">
      <StatusBar />

      {/* 🧭 App bar */}
      <div className="relative h-11 w-full">
        <div className="absolute right-4 top-[calc(50%+0.5px)] flex -translate-y-1/2 flex-col justify-center whitespace-nowrap text-right text-lg font-medium text-ink">
          <p className="leading-[1.5]" dir="auto">
            السوق
          </p>
        </div>
        <div className="absolute left-0 top-[43px] flex w-[375px] flex-col items-start">
          <div className="h-px w-full bg-line-subtle" />
        </div>
        <div className="absolute left-4 top-1/2 size-6 -translate-y-1/2">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={ticketIcon} />
        </div>
        <div className="absolute left-[34px] top-[7px] flex size-3 flex-col items-center justify-center overflow-clip rounded-full bg-red-500 px-[3px]">
          <p className="font-en w-[6px] text-right text-[9px] font-medium leading-[1.5] text-white">2</p>
        </div>
      </div>

      {/* Map hero */}
      <div className="relative h-[209px] w-full shrink-0 overflow-clip border-t-2 border-solid border-brand-400 bg-[#ccc]">
        <div className="absolute left-[-348px] top-[-181px] h-[640px] w-[1137.778px]">
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={mapImg} />
        </div>

        <MapPin left={144} top={77.16} w={61} h={68.293} union={pinUnion1} smile={pinSmile1} smileW={34} smileH={17} photo={pinPhoto1} photoSize={53.043} photoInset={3.98} />
        <MapPin left={233} top={147.2} w={41} h={45.902} union={pinUnion2} smile={pinSmile2} smileW={22.852} smileH={11.426} photo={pinPhoto2} photoSize={35.652} photoInset={2.67} />
        <MapPin left={24} top={73.36} w={35} h={39.185} union={pinUnion3} smile={pinSmile3} smileW={19.508} smileH={9.754} photo={pinPhoto3} photoSize={30.435} photoInset={2.28} />
        <MapPin left={315} top={77} w={23} h={25.75} union={pinUnion4} smile={pinSmile4} smileW={12.82} smileH={6.41} photo={pinPhoto4} photoSize={20} photoInset={1.5} />

        {/* Search input */}
        <div className="absolute left-1/2 top-[14px] flex w-[343px] -translate-x-1/2 flex-col items-end gap-1.5">
          <div className="flex w-full items-center justify-end overflow-clip rounded-full border border-solid border-line bg-surface px-3 py-2.5">
            <div className="flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
              <p className="shrink-0 whitespace-nowrap text-right text-sm leading-[1.5] text-ink-quadrant" dir="auto">
                وش ودك؟ ..
              </p>
              <div className="relative size-[18px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={searchIcon} />
              </div>
            </div>
          </div>
        </div>

        {/* قريب منك.. */}
        <button type="button" className="absolute left-4 top-[155px] flex items-center justify-center gap-1 overflow-clip rounded-lg bg-brand-400 px-2 py-1.5">
          <div className="relative size-4 shrink-0 overflow-clip">
            <div className="absolute inset-[20%_15%] flex items-center justify-center" style={{ containerType: 'size' }}>
              <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                <div className="relative size-full">
                  <div className="absolute inset-[-2.23%_-2.6%]">
                    <img alt="" className="block size-full max-w-none" src={arrowStroke} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink-inverse" dir="auto">
            قريب منك ..
          </p>
        </button>
      </div>
    </div>
  );
}

/** Composite map pin: balloon union + smile mark + circular merchant photo. */
function MapPin({
  left,
  top,
  w,
  h,
  union,
  smile,
  smileW,
  smileH,
  photo,
  photoSize,
  photoInset,
}: {
  left: number;
  top: number;
  w: number;
  h: number;
  union: string;
  smile: string;
  smileW: number;
  smileH: number;
  photo: string;
  photoSize: number;
  photoInset: number;
}) {
  return (
    <div className="absolute" style={{ left, top, width: w, height: h }}>
      <div className="absolute left-0 top-0" style={{ width: w, height: h }}>
        <div className="absolute inset-[0_-4.35%_-7.77%_-4.35%]">
          <img alt="" className="block size-full max-w-none" src={union} />
        </div>
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: 'calc(50% + 0.4px)', top: 'calc(50% + 0.15px)', width: smileW, height: smileH }}
      >
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={smile} />
      </div>
      <div className="absolute" style={{ left: photoInset, top: photoInset, width: photoSize, height: photoSize }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={photo} />
      </div>
    </div>
  );
}
