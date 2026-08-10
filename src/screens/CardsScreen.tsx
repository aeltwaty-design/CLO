import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import batteryOutline from '../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import batteryCap from '../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import batteryFill from '../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import iconWifi from '../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import iconSignal from '../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import imgTime from '../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import iconSearch from '../assets/figma/94eebfc1b004b10817770c3aae389af4892d7357.svg';
import iconArrowBack from '../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconQuestion from '../assets/figma/08fd9a8c6914963186b300dfbef228aae5500d3a.svg';
import iconExport from '../assets/figma/a495e8b4f8c794ab58d35158625e671abac5391a.svg';
import iconBank from '../assets/figma/b0f66261075012027d39e295d75abc4168569e6c.svg';
import iconCards from '../assets/figma/8c05f1e5f6147e716d668aa6bce34eed3ff26de4.svg';
import iconPlus from '../assets/figma/bf70f48b3d5eef63682262c282b088b7fbe9fc1f.svg';
import iconClock from '../assets/figma/48986a4e85102fcc197e2b20835710b0c837cafd.svg';
import iconChevronLeft from '../assets/figma/ea1e744f0dba38ca037f977b4d23eb336ff91694.svg';
import lineDivider from '../assets/figma/561e1dc11b0819cb2a66aeb53cae489866c5b961.svg';
import sarQuadrant from '../assets/figma/18c98b7a54a227494cb0108892c6665057bcbb89.svg';
import sarPrimary from '../assets/figma/ac1a679bd401d9ad6103a98af0e93fc5fa6554f1.svg';
import sarGreen from '../assets/figma/123b10de626e38129e8d9732d411649a1c4e64a2.svg';
import sarDanger from '../assets/figma/7195fb13c002f49fe65a96ab305a49490747205a.svg';
import photoHm from '../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoTransfer from '../assets/figma/fc9093d8b1f3e66d5cff563745493839df241a3f.png';
import photoIkea from '../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';

type RecentTx = {
  id: string;
  amount: string;
  amountClass: string;
  sar: string;
  tag?: { label: string; bg: string; text: string };
  time: ReactNode;
  timeClass: string;
  name: string;
  nameClass: string;
  photo: string;
};

const recentRows: RecentTx[] = [
  {
    id: 'hm',
    amount: '20+',
    amountClass: 'text-ink-quadrant',
    sar: sarQuadrant,
    tag: { label: 'قيد الإضافة', bg: 'bg-warning-50', text: 'text-ink-warning' },
    time: (
      <>
        {' '}
        <span className="font-en">08:30</span>
        {' ،اليوم '}
      </>
    ),
    timeClass: 'text-ink-quadrant',
    name: 'اتش اند ام',
    nameClass: 'text-ink-tertiary',
    photo: photoHm,
  },
  {
    id: 'transfer',
    amount: '100-',
    amountClass: 'text-ink',
    sar: sarPrimary,
    time: (
      <>
        <span className="font-en">08:30</span>
        {' ،امس '}
      </>
    ),
    timeClass: 'text-ink-secondary',
    name: 'تحويل لحساب جاري',
    nameClass: 'text-ink',
    photo: photoTransfer,
  },
  {
    id: 'ikea',
    amount: '70+',
    amountClass: 'text-brand-400',
    sar: sarGreen,
    time: (
      <>
        <span className="font-en">08:30</span>
        {' ،امس '}
      </>
    ),
    timeClass: 'text-ink-secondary',
    name: 'ايكيا',
    nameClass: 'text-ink',
    photo: photoIkea,
  },
  {
    id: 'era',
    amount: '20-',
    amountClass: 'text-ink-danger',
    sar: sarDanger,
    tag: { label: 'مسترجعة', bg: 'bg-danger-50', text: 'text-ink-danger' },
    time: <span className="font-en">08:30</span>,
    timeClass: 'text-ink-secondary',
    name: 'قهوة إرا',
    nameClass: 'text-ink',
    photo: photoEra,
  },
];

/** الكاش باك — wallet home, populated state (Figma 1:10563 "all cards", 375×1006). */
export default function CardsScreen() {
  const navigate = useNavigate();
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto bg-surface">
        <div className="flex w-full flex-col items-start bg-surface">
          <IosStatusBar />

          {/* 🧭 App bar */}
          <div className="flex w-full items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            <div className="relative size-5 shrink-0 opacity-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
            </div>
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                الكاش باك
              </p>
              <button type="button" onClick={() => navigate(-1)} className="relative block size-5 shrink-0 cursor-pointer overflow-clip">
                <div className="absolute inset-[17.71%_14.58%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowBack} />
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-[375px] flex-col items-center gap-6 bg-surface px-4 py-5">
            {/* Balance + action tiles */}
            <div className="flex shrink-0 flex-col items-start gap-3">
              {/* Total cashback card */}
              <div
                className="relative flex h-[147px] w-[343px] shrink-0 flex-col items-start gap-2 rounded-2xl px-4 pb-12 pt-4"
                style={{ backgroundImage: 'linear-gradient(129.55369715485523deg, rgb(0, 206, 139) 3.0145%, rgb(0, 104, 70) 71.253%)' }}
              >
                <div className="flex w-full shrink-0 flex-col items-end">
                  <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                    إجمالي الكاش باك
                  </p>
                </div>
                <div className="flex w-full shrink-0 items-center justify-end gap-2">
                  <div className="relative h-[38px] w-[25.333px] shrink-0">
                    <p className="absolute inset-0 whitespace-nowrap text-center text-[25.33px] font-normal leading-[1.5] text-ink-inverse" dir="auto">
                      ﷼
                    </p>
                  </div>
                  <p className="font-en whitespace-nowrap text-[36px] font-bold not-italic leading-[54px] text-ink-inverse">560.50</p>
                </div>
                <div className="flex w-full shrink-0 items-center justify-end gap-px">
                  <div className="relative flex h-[18.288px] w-[83.062px] shrink-0 items-center justify-center">
                    <div className="flex-none rotate-[-0.2deg]">
                      <p className="whitespace-nowrap text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
                        .. لا تخليها تروح
                      </p>
                    </div>
                  </div>
                  <div className="relative flex h-[18.333px] w-[96.062px] shrink-0 items-center justify-center">
                    <div className="flex-none rotate-[-0.2deg]">
                      <p className="whitespace-nowrap text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
                        {'تنتهي '}
                        <span className="font-en">25</span>
                        {' ديسمبر '}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-end gap-0.5 whitespace-nowrap leading-[1.5] text-ink-inverse">
                    <p className="shrink-0 text-center text-xs font-normal" dir="auto">
                      ﷼
                    </p>
                    <p className="font-en shrink-0 text-xs font-normal" dir="auto">
                      50
                    </p>
                  </div>
                  <div className="relative flex h-[18.107px] w-[31.062px] shrink-0 items-center justify-center">
                    <div className="flex-none rotate-[-0.2deg]">
                      <p className="whitespace-nowrap text-xs font-normal leading-[1.5] text-ink-inverse" dir="auto">
                        عندك
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-[13px] top-[13px] size-9 overflow-clip">
                  <div className="absolute inset-[9.38%]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconQuestion} />
                  </div>
                </div>
              </div>

              {/* Action tiles */}
              <div className="flex shrink-0 flex-col items-start gap-2.5">
                <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2 rounded-[20px] border border-solid border-line px-3 py-2.5">
                  <div className="relative size-6 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconExport} />
                  </div>
                  <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
                    تحويل لحساب بنكي
                  </p>
                </div>
                <div className="flex w-[343px] shrink-0 items-start justify-end gap-2">
                  <div className="flex w-[105px] shrink-0 flex-col items-center justify-center gap-2 rounded-[20px] border border-solid border-line px-3 py-2.5">
                    <div className="relative size-6 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconBank} />
                    </div>
                    <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
                      الحسابات
                    </p>
                  </div>
                  <div className="relative flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-2 rounded-[20px] border border-solid border-line py-2.5 pl-[58px] pr-3">
                    <div className="relative size-6 shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCards} />
                    </div>
                    <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
                      البطاقات
                    </p>
                    <div className="absolute left-[-1.5px] top-[-1px] flex h-[70px] w-[47px] flex-col items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-brand-400 px-3 py-2.5">
                      <div className="relative size-5 shrink-0 overflow-clip">
                        <div className="absolute inset-[20%]">
                          <div className="absolute inset-[-2.08%]">
                            <img alt="" className="block size-full max-w-none" src={iconPlus} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending cashback */}
            <div className="flex w-full shrink-0 flex-col items-end gap-3 rounded-2xl bg-warning-50 p-4">
              <div className="flex w-full shrink-0 items-center justify-end gap-2">
                <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                  كاش باك قيد الإضافة
                </p>
                <div className="relative size-5 shrink-0 overflow-clip">
                  <div className="absolute inset-[10%]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconClock} />
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start gap-2 text-right leading-[1.5]">
                <div className="flex w-full shrink-0 items-center justify-end gap-2 whitespace-nowrap text-xl text-ink">
                  <p className="shrink-0 font-bold" dir="rtl">
                    ﷼
                  </p>
                  <p className="font-en shrink-0 font-bold" dir="rtl">
                    120.00
                  </p>
                </div>
                <p className="w-full text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                  سيضاف إلى محفظتك خلال <span className="font-en">30</span> يوم
                </p>
              </div>
            </div>

            {/* Latest transactions */}
            <div className="flex w-full shrink-0 flex-col items-end rounded-[20px] border border-solid border-line p-4">
              <div className="flex w-full flex-col items-end gap-6">
                <div className="flex w-full items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate('/transactions')}
                    className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-full bg-brand-50 py-1.5 pl-2 pr-3"
                  >
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
                  </button>
                  <p className="whitespace-nowrap text-right text-base font-medium leading-[1.5] text-ink" dir="auto">
                    اخر العمليات
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-4">
                  {recentRows.map((tx, i) => (
                    <div key={tx.id} className="contents">
                      {i > 0 && (
                        <div className="relative h-0 w-full shrink-0">
                          <div className="absolute inset-[-1px_0_0_0]">
                            <img alt="" className="block size-full max-w-none" src={lineDivider} />
                          </div>
                        </div>
                      )}
                      <RecentRow tx={tx} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-px flex w-[375px] flex-col items-center overflow-clip pt-3">
        <div className="relative h-[34px] w-[375px] shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
        </div>
      </div>
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

/** One row of «اخر العمليات» (Figma "List item"): amount chip + optional status tag, flipped title stack, 40px avatar. */
function RecentRow({ tx }: { tx: RecentTx }) {
  const amountChip = (
    <div className="flex h-6 shrink-0 items-center justify-end gap-1.5">
      <div className="flex h-[22px] shrink-0 items-center justify-center gap-0.5 rounded-md py-0.5">
        <div className="relative size-[18px] shrink-0 overflow-clip">
          <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={tx.sar} />
          </div>
        </div>
        <p className={`font-en whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${tx.amountClass}`} dir="auto">
          {tx.amount}
        </p>
      </div>
    </div>
  );
  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-3 rounded-2xl">
      {tx.tag ? (
        <div className="flex shrink-0 flex-col items-start justify-center gap-0.5">
          {amountChip}
          <div className="flex shrink-0 items-start">
            <div className={`flex shrink-0 items-center justify-center rounded-2xl px-2 py-0.5 ${tx.tag.bg}`}>
              <p className={`whitespace-nowrap text-center text-xs font-normal leading-[1.5] ${tx.tag.text}`} dir="auto">
                {tx.tag.label}
              </p>
            </div>
          </div>
        </div>
      ) : (
        amountChip
      )}
      <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
        <div className="w-full flex-none -scale-y-100">
          <div className="flex w-full flex-col items-end justify-center gap-1">
            <div className="relative flex w-full shrink-0 items-center justify-center">
              <div className="w-full flex-none -scale-y-100">
                <p className={`w-full text-right text-xs font-normal leading-[1.5] ${tx.timeClass}`} dir="ltr">
                  {tx.time}
                </p>
              </div>
            </div>
            <div className="relative flex w-full shrink-0 items-center justify-center">
              <div className="w-full flex-none -scale-y-100">
                <p className={`w-full text-right text-xs font-medium leading-[1.5] ${tx.nameClass}`} dir="auto">
                  {tx.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative size-10 shrink-0 overflow-clip rounded-full">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-full object-cover" src={tx.photo} />
      </div>
    </div>
  );
}
