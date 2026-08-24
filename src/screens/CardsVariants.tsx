import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Riyal from '../components/Riyal';
import LinkIntroSheet, { useLinkIntroGate } from '../components/LinkIntroSheet';
import RedeemSheet from '../components/RedeemSheet';
import { IS_TEMP } from '../state/PhaseState';
import { ActionTile } from './CardsScreen';
import batteryOutline from '../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import batteryCap from '../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import batteryFill from '../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import iconWifi from '../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import iconSignal from '../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import imgTime from '../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import iconSearch from '../assets/figma/94eebfc1b004b10817770c3aae389af4892d7357.svg';
import iconArrowBack from '../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconInfoCircle from '../assets/figma/624fb13967c449288b47a1c491ebbe53f0d2eead.svg';
import mcLeft from '../assets/figma/56c15b891ab15dc8e8401930f99778d16a9ff955.svg';
import mcRight from '../assets/figma/ca3004b8151cd6ccfe1f083cc2a5233ba83e0b0a.svg';
import mcMiddle from '../assets/figma/62e34406083d641e674199c403e681a5bf94fe84.svg';
import madaLogo from '../assets/figma/c3d6a016d62ca41775252737c0cd237d727e1e3f.svg';
import visaMask from '../assets/figma/8c19cdc6c340655ee715e5c0e021047e5e537124.svg';
import visaLogo from '../assets/figma/7cde00b8a4c1cec2de1c941b422f78393310b2b5.svg';
import lineDivider from '../assets/figma/561e1dc11b0819cb2a66aeb53cae489866c5b961.svg';
import iconTrash from '../assets/figma/363d85e6a8cce52a41631333c9b708a8e110ecda.svg';
import plusWhite from '../assets/figma/1782ca329908717a3751d66c5fff07ae32e411f5.svg';
import plusMuted from '../assets/figma/91223892d4ae26767df85ad2af33e1200bebb0a8.svg';
import iconExport from '../assets/figma/a495e8b4f8c794ab58d35158625e671abac5391a.svg';
import iconSetting from '../assets/figma/56f665cc37df1dc4bd8183e41b481c8e896e1dfb.svg';
import iconArrowLeftMini from '../assets/figma/9d26d5f8332ff3f5f0f39a2a066bc6a3e9b9d038.svg';
import iconChevronLeft from '../assets/figma/ea1e744f0dba38ca037f977b4d23eb336ff91694.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';
import promoCoinsRight from '../assets/figma/c133d46124697695c166c9121006e44e2859cf63.svg';
import promoShoppingBag from '../assets/figma/92edbd53e8d39116bfe70874bd8ffe4bd6c915f5.svg';
import promoRiyal from '../assets/figma/275c5abc488fae59a1077c0ac5c7a4c5ec643087.svg';
import promoCoinLeft from '../assets/figma/60106800a3373f468a41e5dcae3c98300cd4fec9.svg';

/**
 * Cashback-wallet state variants of the cards page (companion states to
 * CardsScreen, which is the populated 1:10563 frame):
 *
 * - CardsEmpty  — «البطاقات المضافة» just-linked state (Figma 1:10520, 375×812)
 * - CardsZero   — «الكاش باك» wallet home zero state (Figma 1:10736, 375×812)
 * - CardsThree  — «البطاقات المضافة» at the 3-card cap (Figma 1:10838, 375×812)
 */

/** البطاقات المضافة — one linked card, no cashback yet (Figma 1:10520). */
export function CardsEmpty() {
  // Phase 1 keeps the direct-to-form behavior (user direction); Phase 2 gates
  // the first tap behind the intro sheet over this screen
  const { introOpen, startLinking, closeIntro } = useLinkIntroGate();
  return (
    <div className="relative h-full overflow-hidden">
      {/* pb = dock block (12 + 41 CTA + 34 indicator) so content can scroll clear */}
      <div className="h-full overflow-y-auto bg-surface pb-[87px]">
        <div className="flex w-full flex-col items-start bg-surface">
          <IosStatusBar />
          {/* #43 */}
          <AppBar title={IS_TEMP ? 'بطاقاتك اللي عليها كاش باك' : 'البطاقات المضافة'} />

          {/* Content */}
          <div className="flex w-[375px] flex-col items-center gap-3 bg-surface px-4 py-5">
            <AddCardsBanner />
            <LinkedCardPanel title="البطاقة الرئيسية" logo={<MastercardLogo />} amount="0.00" />
          </div>
        </div>
      </div>

      <AddCardDock onAdd={startLinking} />
      <LinkIntroSheet open={introOpen} onClose={closeIntro} />
    </div>
  );
}

/** الكاش باك — wallet home, zero balance / no transactions yet (Figma 1:10736). */
export function CardsZero() {
  const navigate = useNavigate();
  const [redeemOpen, setRedeemOpen] = useState(false);
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto bg-surface">
        <div className="flex w-full flex-col items-start bg-surface">
          <IosStatusBar />
          {/* #47 */}
          <AppBar title={IS_TEMP ? 'كاش باكك' : 'الكاش باك'} />

          {/* Content */}
          <div className="flex w-[375px] flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* Balance + action tiles */}
            <div className="flex shrink-0 flex-col items-start gap-3">
              {/* Total cashback card — flat zero state (no expiry teaser line) */}
              <div className="flex w-[343px] shrink-0 flex-col items-start rounded-2xl">
                <div
                  className="relative flex w-full shrink-0 flex-col items-start gap-2 rounded-2xl p-4"
                  style={{ backgroundImage: 'linear-gradient(136.55289941714605deg, rgb(0, 206, 139) 3.0145%, rgb(0, 104, 70) 71.253%)' }}
                >
                  <div className="flex w-full shrink-0 flex-col items-end">
                    <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                      إجمالي الكاش باك
                    </p>
                  </div>
                  <div className="flex w-full shrink-0 items-center justify-end gap-2">
                    <div className="relative h-[38px] w-[25.333px] shrink-0">
                      <p className="absolute inset-0 whitespace-nowrap text-center text-[25.33px] font-normal leading-[1.5] text-ink-inverse" dir="auto">
                        <Riyal />
                      </p>
                    </div>
                    <p className="font-en whitespace-nowrap text-[36px] font-bold not-italic leading-[54px] text-ink-inverse">0.00</p>
                  </div>
                </div>
              </div>

              {/* Action tiles — same pair as the populated wallet (user
                  direction): «استخدمه» (redemption hub) + «الاعدادات».
                  Before linking the balance is 0.00: in Phase 1/2 «استخدمه»
                  stays muted; in Temp (stakeholder #51) it opens the hub as
                  a preview — the six ways shown but inert, plus «اجمع أول
                  كاش باك» to the merchants. */}
              <div className="flex w-[343px] shrink-0 items-start gap-2">
                <ActionTile icon={iconSetting} label="الاعدادات" onClick={() => navigate('/cards/settings')} />
                <ActionTile icon={iconExport} label="استخدمه" onClick={() => setRedeemOpen(true)} muted={!IS_TEMP} />
              </div>
            </div>

            {/* «أسهل كاش باك يجيك» — the attached zero-state promo (Temp);
                Phase 1/2 keep the drawn onboarding card below */}
            {IS_TEMP ? (
              <div
                className="relative flex w-[343px] shrink-0 flex-col items-center gap-2.5 overflow-clip rounded-[20px] bg-brand-50 px-4 py-5"
                data-testid="zero-promo-temp"
              >
                <p className="relative text-center text-[17px] font-bold leading-[1.5] text-brand-800" dir="auto">
                  أسهل كاش باك يجيك
                </p>
                <p className="relative w-[256px] text-center text-xs font-normal leading-[1.8] text-ink-secondary" dir="rtl">
                  {'استخدم بطاقتك المعتادة أو '}
                  <span className="font-en">Apple Pay</span>
                  {' أو '}
                  <span className="font-en">Samsung Pay</span>
                  {' أو '}
                  <span className="font-en">Google Pay</span>
                  {' عند المتاجر المشاركة، بدون أي خطوات إضافية، وخذ حتى '}
                  <span className="font-en">[X]%</span>
                  {' كاش باك يرجع لمحفظة ولاء بلس لحظتها.'}
                </p>
                <div className="relative flex w-[280px] items-center justify-center gap-2">
                  <p className="text-center text-xs font-medium leading-[1.6] text-brand-800" dir="auto">
                    خلك تستخدم نفس بطاقتك عشان يستمر الكاش باك على مشترياتك.
                  </p>
                  <div className="relative size-6 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconShieldTick} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/market')}
                  data-testid="discover-stores"
                  className="relative flex h-10 w-[190px] shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-clip rounded-xl bg-white px-4"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
                    <path d="M13.5 8H3M6.5 4.5L3 8l3.5 3.5" className="stroke-brand-800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-brand-800" dir="auto">
                    اكتشف المتاجر
                  </p>
                </button>
                {/* the drawn decorations of the original card — bag + coins
                    top-right, coin at the left edge, clear of the centred copy */}
                <div className="pointer-events-none absolute left-[256.53px] top-[-0.04px] h-[52px] w-[83.474px]">
                  <div className="absolute left-0 top-0 h-[52px] w-[83.474px]">
                    <div className="absolute inset-[11.28%_-4.93%_-2.63%_48.03%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoCoinsRight} />
                    </div>
                    <div className="absolute flex inset-[1.33%_57.05%_56.04%_16.39%] items-center justify-center" style={{ containerType: 'size' }}>
                      <div className="h-[hypot(-23.9734cqw,105.572cqh)] w-[hypot(105.572cqw,23.9734cqh)] flex-none rotate-[12.79deg]">
                        <div className="relative size-full">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoShoppingBag} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[52px] top-[16.42px] flex h-[27.629px] w-[25.423px] items-center justify-center">
                    <div className="flex-none rotate-[-33.16deg]">
                      <div className="relative h-[22.965px] w-[15.364px]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoRiyal} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute left-[5px] top-[118px] h-[17px] w-[34px]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoCoinLeft} />
                </div>
              </div>
            ) : (
              <div className="relative flex w-[343px] shrink-0 flex-col items-center gap-2.5 overflow-clip rounded-[20px] bg-brand-50 px-4 py-5">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  كيف تكسب الكاش باك؟
                </p>
                <p className="w-[min-content] min-w-full text-center text-[0px] font-normal leading-[0] text-ink-secondary" dir="auto">
                  <span className="text-xs leading-[1.5]">استخدم بطاقاتك المربوطة في الشراء من شركاؤنا واربح كاش باك فوري يصل ل</span>
                  <span className="font-en text-xs not-italic leading-[1.5]">50%</span>
                </p>
                {/* CTA → the Market's cashback tab (its default tab, so the
                    plain route lands there in both phases) */}
                <button
                  type="button"
                  onClick={() => navigate('/market')}
                  data-testid="discover-stores"
                  className="flex w-[157px] shrink-0 cursor-pointer items-center justify-center gap-1 overflow-clip rounded-lg border border-solid border-line bg-surface px-2 py-1.5"
                >
                  <div className="relative size-4 shrink-0 overflow-clip">
                    <div className="absolute flex inset-[20%_15%] items-center justify-center" style={{ containerType: 'size' }}>
                      <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                        <div className="relative size-full">
                          <div className="absolute inset-[-2.23%_-2.6%]">
                            <img alt="" className="block size-full max-w-none" src={iconArrowLeftMini} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                    اكتشف المتاجر
                  </p>
                </button>
                {/* Decorative bag + coins, top-right */}
                <div className="absolute left-[256.53px] top-[-0.04px] h-[52px] w-[83.474px]">
                  <div className="absolute left-0 top-0 h-[52px] w-[83.474px]">
                    <div className="absolute inset-[11.28%_-4.93%_-2.63%_48.03%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoCoinsRight} />
                    </div>
                    <div className="absolute flex inset-[1.33%_57.05%_56.04%_16.39%] items-center justify-center" style={{ containerType: 'size' }}>
                      <div className="h-[hypot(-23.9734cqw,105.572cqh)] w-[hypot(105.572cqw,23.9734cqh)] flex-none rotate-[12.79deg]">
                        <div className="relative size-full">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoShoppingBag} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[52px] top-[16.42px] flex h-[27.629px] w-[25.423px] items-center justify-center">
                    <div className="flex-none rotate-[-33.16deg]">
                      <div className="relative h-[22.965px] w-[15.364px]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoRiyal} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative coin, left edge */}
                <div className="absolute inset-[20.95%_88.69%_67.81%_1.4%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={promoCoinLeft} />
                </div>
              </div>
            )}

            {/* Latest transactions — empty */}
            <div className="flex w-full shrink-0 flex-col items-center rounded-[20px] border border-solid border-line p-4">
              <div className="flex w-full flex-col items-end gap-4">
                <div className="flex w-full items-center justify-between">
                  {/* «الكل» chip drawn opacity-0 in this state → inert placeholder */}
                  <div className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full bg-[rgba(150,160,182,0.2)] py-1.5 pl-2 pr-3 opacity-0">
                    <div className="relative size-4 shrink-0 overflow-clip">
                      <div className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center" style={{ containerType: 'size' }}>
                        <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                          <div className="relative size-full">
                            <div className="absolute inset-[-5.21%_-3.12%_-5.21%_-3.13%]">
                              <img alt="" className="block size-full max-w-none" src={iconChevronLeft} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                      الكل
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-right text-base font-medium leading-[1.5] text-ink" dir="auto">
                    اخر العمليات
                  </p>
                </div>
                <div className="flex w-full flex-col items-end gap-4">
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p className="w-[303px] text-right text-xs font-normal leading-[1.5] text-ink-tertiary" dir="auto">
                      {/* #49 */}
                      {IS_TEMP ? 'أول كاش باك لك بيظهر هنا' : 'لم تقم بأي عملية حتى الأن'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-px flex w-[375px] flex-col items-center overflow-clip pt-3">
        <HomeIndicator />
      </div>

      <RedeemSheet open={redeemOpen} onClose={() => setRedeemOpen(false)} preview />
    </div>
  );
}

/** البطاقات المضافة — three linked cards, add CTA disabled at the cap (Figma 1:10838). */
export function CardsThree() {
  return (
    <div className="relative h-full overflow-hidden">
      {/* pb = dock block (12 + 41 CTA + 34 indicator) so content can scroll clear */}
      <div className="h-full overflow-y-auto bg-surface pb-[87px]">
        <div className="flex w-full flex-col items-start bg-surface">
          <IosStatusBar />
          {/* #43 */}
          <AppBar title={IS_TEMP ? 'بطاقاتك اللي عليها كاش باك' : 'البطاقات المضافة'} />

          {/* Content */}
          <div className="flex w-[375px] flex-col items-center gap-3 bg-surface px-4 py-5">
            <AddCardsBanner />
            <LinkedCardPanel title="البطاقة الرئيسية" titleHidden logo={<MastercardLogo />} amount="1,000.00" />
            <LinkedCardPanel title="بطاقة مدى" logo={<MadaLogo />} amount="500.00" />
            <LinkedCardPanel title="بطاقة العمل" logo={<VisaLogo />} amount="0.00" />
          </div>
        </div>
      </div>

      <AddCardDock disabled />
    </div>
  );
}

/** iOS status bar as drawn (375×44): 9:41 at left, signal/wifi/battery at right. */
function IosStatusBar() {
  return (
    <div className="relative h-11 w-[375px] shrink-0 overflow-clip">
      <div className="absolute right-[17px] top-[17.33px] h-[11.333px] w-[22px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryOutline} />
      </div>
      <div className="absolute right-[14.67px] top-[21px] h-1 w-[1.328px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryCap} />
      </div>
      <div className="absolute right-[19px] top-[19.33px] h-[7.333px] w-[18px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={batteryFill} />
      </div>
      <div className="absolute right-[44.03px] top-[17.33px] h-[10.966px] w-[15.272px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconWifi} />
      </div>
      <div className="absolute right-[64.33px] top-[17.67px] h-[10.667px] w-[17px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSignal} />
      </div>
      <div className="absolute left-[21px] top-3 h-[21px] w-[54px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgTime} />
      </div>
    </div>
  );
}

/** App bar: hidden search stub at left, centered title + back arrow at right. */
function AppBar({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
      <div className="relative size-5 shrink-0 opacity-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
      </div>
      <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
        <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
          {title}
        </p>
        <button type="button" onClick={() => navigate(-1)} className="relative block size-5 shrink-0 cursor-pointer overflow-clip">
          <div className="absolute inset-[17.71%_14.58%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowBack} />
          </div>
        </button>
      </div>
    </div>
  );
}

/** «تقدر تضيف حتى 3 بطاقات ائتمانية» info banner (brand-50, info icon at right). */
function AddCardsBanner() {
  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-2.5 overflow-clip rounded-2xl bg-brand-50 px-4 py-3">
      <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-2">
        <p className="w-[min-content] min-w-full text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
          {/* #44 */}
          {IS_TEMP ? 'فعّل الكاش باك على ' : 'تقدر تضيف حتى '}
          <span className="font-en">3</span>
          {' بطاقات ائتمانية'}
        </p>
      </div>
      <div className="relative size-6 shrink-0 overflow-clip">
        <div className="absolute inset-[12.5%]">
          <div className="absolute inset-[-5.56%]">
            <img alt="" className="block size-full max-w-none" src={iconInfoCircle} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One linked-card panel (Figma "offers" block): scheme logo + name row, expiry
 * «صالحة حتى 07/29» + masked «**** 1234» row, divider, delete button + total
 * cashback amount. `titleHidden` mirrors the design's opacity-0 label on the
 * first card of the 3-card frame.
 */
function LinkedCardPanel({
  title,
  titleHidden,
  logo,
  amount,
}: {
  title: string;
  titleHidden?: boolean;
  logo: ReactNode;
  amount: string;
}) {
  return (
    <div className="flex w-full shrink-0 flex-col items-end gap-3 rounded-2xl border border-solid border-line p-4">
      <div className="flex w-full shrink-0 flex-col items-end gap-4 rounded-2xl">
        <div className="flex w-full items-center justify-between">
          <p
            className={`whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink${titleHidden ? ' opacity-0' : ''}`}
            dir="auto"
          >
            {title}
          </p>
          {logo}
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex w-[146px] shrink-0 flex-col items-start gap-0.5 whitespace-nowrap text-right leading-[1.5] text-ink-secondary">
            <p className="text-[10px] font-normal" dir="auto">
              صالحة حتى
            </p>
            <p className="font-en text-xs font-normal" dir="auto">
              07/29
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-center">
            {/* h pinned to the drawn 22px box; nowrap so the masked number
                never wraps over the divider */}
            <p className="font-en h-[22px] whitespace-nowrap text-right text-xl font-medium leading-[22px] text-ink" dir="auto">
              **** 1234
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-0 w-full shrink-0">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block size-full max-w-none" src={lineDivider} />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-lg border border-solid border-danger-50 bg-danger-50 p-2 shadow-xs">
          <div className="relative size-5 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconTrash} />
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end justify-center gap-1">
          <p className="whitespace-nowrap text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
            {/* #45 */}
            {IS_TEMP ? 'الكاش باك من هالبطاقة' : 'إجمالي الكاش باك'}
          </p>
          <div className="flex h-[37px] w-full shrink-0 items-center justify-end gap-2">
            <div className="relative h-[29px] w-[19.333px] shrink-0">
              <p className="absolute inset-0 whitespace-nowrap text-center text-[19.33px] font-normal leading-[1.5] text-ink" dir="auto">
                <Riyal />
              </p>
            </div>
            <p className="font-en whitespace-nowrap text-[28px] font-bold not-italic leading-[54px] text-ink">{amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mastercard mark, 32px (left/right discs + overlap). */
function MastercardLogo() {
  return (
    <div className="relative size-8 shrink-0">
      <div className="absolute inset-[21.88%_40.63%_21.88%_3.13%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={mcLeft} />
      </div>
      <div className="absolute inset-[21.88%_3.13%_21.88%_40.63%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={mcRight} />
      </div>
      <div className="absolute inset-[29.04%_40.63%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={mcMiddle} />
      </div>
    </div>
  );
}

/** mada mark, 32px. */
function MadaLogo() {
  return (
    <div className="relative size-8 shrink-0">
      <div className="absolute inset-[15.62%_6.25%_15.66%_6.25%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={madaLogo} />
      </div>
    </div>
  );
}

/** Visa wordmark, 32px (masked group flipped back upright, as drawn). */
function VisaLogo() {
  return (
    <div className="relative size-8 shrink-0 overflow-clip">
      <div className="absolute flex inset-[1.32%_-10.47%_1.38%_-10.47%] items-center justify-center" style={{ containerType: 'size' }}>
        <div className="h-[100cqh] w-[100cqw] flex-none -rotate-180 -scale-x-100">
          <div
            className="relative size-full mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.351px_10.394px] mask-size-[32px_10.35px]"
            style={{ maskImage: `url("${visaMask}")` }}
          >
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={visaLogo} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Bottom dock: «أضف بطاقة جديدة» CTA over the home indicator on a white plate.
 * Enabled (brand-400) navigates via `onAdd`; `disabled` renders the greyed-out
 * 3-card-cap variant as drawn (inert).
 */
function AddCardDock({ disabled, onAdd }: { disabled?: boolean; onAdd?: () => void }) {
  return (
    <div className="absolute bottom-0 left-px flex w-[375px] flex-col items-center overflow-clip bg-surface pt-3">
      <div className="flex w-[343px] shrink-0 flex-col items-center gap-3">
        {disabled ? (
          <div className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-surface-disabled px-4 py-2.5">
            <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-quadrant" dir="auto">
              {/* #46 */}
              {IS_TEMP ? 'فعّل الكاش باك على بطاقة إضافية' : 'أضف بطاقة جديدة'}
            </p>
            <div className="relative size-5 shrink-0 overflow-clip">
              <div className="absolute inset-[20%]">
                <div className="absolute inset-[-2.08%]">
                  <img alt="" className="block size-full max-w-none" src={plusMuted} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
          >
            <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
              {/* #46 */}
              {IS_TEMP ? 'فعّل الكاش باك على بطاقة إضافية' : 'أضف بطاقة جديدة'}
            </p>
            <div className="relative size-5 shrink-0 overflow-clip">
              <div className="absolute inset-[20%]">
                <div className="absolute inset-[-2.08%]">
                  <img alt="" className="block size-full max-w-none" src={plusWhite} />
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
      <HomeIndicator />
    </div>
  );
}

/** iOS home indicator strip (375×34). */
function HomeIndicator() {
  return (
    <div className="relative h-[34px] w-[375px] shrink-0">
      <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
    </div>
  );
}
