import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Riyal from '../components/Riyal';
import ExportStatementSheet from '../components/ExportStatementSheet';
import { usePhase } from '../state/PhaseState';
import iconExport from '../assets/figma/a495e8b4f8c794ab58d35158625e671abac5391a.svg';
import batteryOutline from '../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import batteryCap from '../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import batteryFill from '../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import iconWifi from '../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import iconSignal from '../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import imgTime from '../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import iconSearch from '../assets/figma/94eebfc1b004b10817770c3aae389af4892d7357.svg';
import iconArrowBack from '../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconChevronDown from '../assets/figma/77c6ee8bdf9a8b9349b5a4993bf58b2938f73310.svg';
import iconSort from '../assets/figma/648f4717db859374e0858990712be87a0a03f9cf.svg';
import iconSwap from '../assets/figma/fb08b0206580c36e8ebb75201aca51e5584a1724.svg';
import iconMoneysGreen from '../assets/figma/d12eb8a7176f24e04418a10544cb999e26898beb.svg';
import iconMoneysPlain from '../assets/figma/3b26957fe2a5dec6e2323df1881cb78f6034af12.svg';
import lineDivider from '../assets/figma/561e1dc11b0819cb2a66aeb53cae489866c5b961.svg';
import sarQuadrant from '../assets/figma/18c98b7a54a227494cb0108892c6665057bcbb89.svg';
import sarPrimary from '../assets/figma/ac1a679bd401d9ad6103a98af0e93fc5fa6554f1.svg';
import sarGreen from '../assets/figma/123b10de626e38129e8d9732d411649a1c4e64a2.svg';
import sarDanger from '../assets/figma/7195fb13c002f49fe65a96ab305a49490747205a.svg';
import sarSheet from '../assets/figma/c679d387acba05b3c2c37d7a0c34d250c725d8b4.svg';
import mcLeft from '../assets/figma/84efa261a92f472ca4a430de051b4ad5331aeb74.svg';
import mcRight from '../assets/figma/0b6592b92012268404532c0c0c7429b794e1a004.svg';
import mcMiddle from '../assets/figma/63c38e7c92e8c1afc9d9077254653f0b0ed71aad.svg';
import iconChevronSheet from '../assets/figma/957ed175aa97bf7ddec014748f773b4e1e05f41b.svg';
import iconMessages from '../assets/figma/3c9af719f70664e2be756b23af439e2c43a4514c.svg';
import photoHm from '../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoTransfer from '../assets/figma/fc9093d8b1f3e66d5cff563745493839df241a3f.png';
import photoIkea from '../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';

type TxMedia = { kind: 'photo'; src: string } | { kind: 'icon'; src: string; framed?: boolean };

type Tx = {
  id: string;
  amount: string;
  amountClass: string;
  sar: string;
  tag?: { label: string; bg: string; text: string };
  time: ReactNode;
  timeClass: string;
  name: string;
  nameClass: string;
  media: TxMedia;
};

const timePlain = <span className="font-en">08:30</span>;

const sections: { title: string; h: number; rows: Tx[] }[] = [
  {
    title: 'اليوم', h: 118,
    rows: [
      {
        id: 'today-hm',
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
        media: { kind: 'photo', src: photoHm },
      },
    ],
  },
  {
    title: 'أمس', h: 230,
    rows: [
      {
        id: 'yd-withdraw',
        amount: '100-',
        amountClass: 'text-ink',
        sar: sarPrimary,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'سحب لحساب',
        nameClass: 'text-ink',
        media: { kind: 'photo', src: photoTransfer },
      },
      {
        id: 'yd-era',
        amount: '20-',
        amountClass: 'text-ink-danger',
        sar: sarDanger,
        tag: { label: 'مسترجعة', bg: 'bg-danger-50', text: 'text-ink-danger' },
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'قهوة إرا',
        nameClass: 'text-ink',
        media: { kind: 'photo', src: photoEra },
      },
      {
        id: 'yd-points',
        amount: '50-',
        amountClass: 'text-ink',
        sar: sarPrimary,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'تحويل لنقاط',
        nameClass: 'text-ink',
        media: { kind: 'icon', src: iconSwap, framed: true },
      },
    ],
  },
  {
    title: 'الجمعة', h: 110,
    rows: [
      {
        id: 'fri-ikea',
        amount: '20+',
        amountClass: 'text-brand-400',
        sar: sarGreen,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'ايكيا',
        nameClass: 'text-ink',
        media: { kind: 'photo', src: photoIkea },
      },
    ],
  },
  {
    title: 'الخميس', h: 222,
    rows: [
      {
        id: 'thu-withdraw',
        amount: '100-',
        amountClass: 'text-ink',
        sar: sarPrimary,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'سحب لحساب',
        nameClass: 'text-ink',
        media: { kind: 'photo', src: photoTransfer },
      },
      {
        id: 'thu-points',
        amount: '50-',
        amountClass: 'text-ink',
        sar: sarPrimary,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'تحويل لنقاط',
        nameClass: 'text-ink',
        media: { kind: 'icon', src: iconSwap, framed: true },
      },
      {
        id: 'thu-tamimi',
        amount: '20+',
        amountClass: 'text-brand-400',
        sar: sarGreen,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'اسواق التميمي',
        nameClass: 'text-ink',
        media: { kind: 'icon', src: iconMoneysGreen },
      },
    ],
  },
  {
    title: 'الأربعاء', h: 110,
    rows: [
      {
        id: 'wed-tamimi',
        amount: '20+',
        amountClass: 'text-ink',
        sar: sarPrimary,
        time: timePlain,
        timeClass: 'text-ink-secondary',
        name: 'اسواق التميمي',
        nameClass: 'text-ink',
        media: { kind: 'icon', src: iconMoneysPlain },
      },
    ],
  },
];

/** كل العمليات — full transaction history (Figma 1:10931 "all transactions",
    375×812). Phase 2 adds the statement-export affordance next to the drawn
    search glyph (derived feature — Phase 1 stays byte-identical). */
export default function TransactionsScreen() {
  const navigate = useNavigate();
  const phase = usePhase();
  const [selected, setSelected] = useState<Tx | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto bg-surface">
        <div className="flex w-full flex-col items-start bg-surface">
          <IosStatusBar />

          {/* 🧭 App bar */}
          <div className="flex w-full items-center justify-between border-b border-solid border-line-subtle px-4 pb-3.5 pt-6">
            <div className="flex shrink-0 items-center gap-4">
              <div className="relative size-5 shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
              </div>
              {phase === 2 && (
                <button
                  type="button"
                  onClick={() => setExportOpen(true)}
                  aria-label="تصدير كشف حساب"
                  data-testid="open-export"
                  className="relative size-5 shrink-0 cursor-pointer"
                >
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconExport} />
                </button>
              )}
            </div>
            <div className="flex w-[204px] shrink-0 items-center justify-end gap-4">
              <p className="whitespace-nowrap text-center text-lg font-medium leading-[1.5] text-ink" dir="auto">
                كل العمليات
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
            {/* Filter chips (inert) — row overflows the frame to the left, as drawn */}
            <div className="flex w-full shrink-0 flex-col items-end gap-3">
              <div className="flex shrink-0 items-center gap-3">
                <FilterChip label="تحويل" />
                <FilterChip label="تحويل" />
                <FilterChip label="سحب" />
                <FilterChip label="كاش باك" />
                <div className="flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-solid border-line px-2.5 py-1.5">
                  <div className="flex shrink-0 items-center">
                    <div className="relative size-5 shrink-0 overflow-clip">
                      <div className="absolute bottom-[35%] left-1/4 right-1/4 top-[35%]">
                        <div className="absolute inset-[-4.17%_-2.5%]">
                          <img alt="" className="block size-full max-w-none" src={iconChevronDown} />
                        </div>
                      </div>
                    </div>
                    <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
                      ترتيب حسب
                    </p>
                  </div>
                  <div className="relative size-4 shrink-0 overflow-clip">
                    <div className="absolute inset-[12.5%]">
                      <div className="absolute inset-[-6.25%]">
                        <img alt="" className="block size-full max-w-none" src={iconSort} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day sections — mt-[-3px] pins the list top to the design's
                y185 (chip row renders 3px taller than the Figma stroke box) */}
            <div className="mt-[-3px] flex w-full shrink-0 flex-col items-start gap-2">
              {sections.map((section) => (
                /* group height pinned to the design frame so per-row text
                   rounding cannot accumulate down the list */
                <div key={section.title} className="flex w-full shrink-0 flex-col items-start" style={{ height: section.h }}>
                  <div className="flex h-[26px] w-full shrink-0 flex-col items-end">
                    <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                      {section.title}
                    </p>
                  </div>
                  <div className={`flex w-full shrink-0 flex-col items-end rounded-[20px] border border-solid border-line p-4 ${section.rows.length > 1 ? 'gap-2' : ''}`}>
                    {section.rows.map((tx, i) => (
                      <div key={tx.id} className="contents">
                        {i > 0 && (
                          <div className="relative h-0 w-full shrink-0">
                            <div className="absolute inset-[-1px_0_0_0]">
                              <img alt="" className="block size-full max-w-none" src={lineDivider} />
                            </div>
                          </div>
                        )}
                        <TransactionRow tx={tx} onOpen={() => setSelected(tx)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 flex flex-col items-start">
        <div className="relative h-[34px] w-[375px] shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
        </div>
      </div>

      {selected !== null && <TransactionDetailsSheet tx={selected} onClose={() => setSelected(null)} />}
      <ExportStatementSheet open={exportOpen} onClose={() => setExportOpen(false)} />
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

function FilterChip({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-2xl border border-solid border-line px-2.5 py-1.5">
      <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
    </div>
  );
}

/** One transaction row (Figma "List item"): amount chip + optional status tag, flipped title stack, 40px avatar or icon disc. */
function TransactionRow({ tx, onOpen }: { tx: Tx; onOpen: () => void }) {
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
    <button type="button" onClick={onOpen} className="flex w-full shrink-0 items-center justify-end gap-3 rounded-2xl">
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
      {tx.media.kind === 'photo' ? (
        <div className="relative size-10 shrink-0 overflow-clip rounded-full">
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-full object-cover" src={tx.media.src} />
        </div>
      ) : (
        <div className="flex shrink-0 flex-col items-center justify-center gap-2">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-surface-neutral p-2.5">
            <div className="relative size-5 shrink-0">
              {tx.media.framed ? (
                <div className="absolute inset-[9.37%_9.38%_9.38%_9.38%]">
                  <div className="absolute inset-[-1.54%]">
                    <img alt="" className="block size-full max-w-none" src={tx.media.src} />
                  </div>
                </div>
              ) : (
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={tx.media.src} />
              )}
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

/**
 * تفاصيل العملية — bottom sheet (Figma 1:11098 "transaction details", 375×717).
 * Rendered over the list; merchant name + amount come from the tapped row,
 * the remaining summary fields are static as drawn. Backdrop tap closes.
 */
function TransactionDetailsSheet({ tx, onClose }: { tx: Tx; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50">
      <style>{'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'}</style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex max-h-full flex-col items-center overflow-y-auto rounded-t-xl border-l border-solid border-ink-100 bg-white"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
      >
        {/* Drawer header */}
        <div className="flex w-full shrink-0 items-center justify-end px-4">
          <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-4 pt-6">
            <div className="flex min-w-px flex-[1_0_0] flex-col items-end">
              <p className="w-full text-right text-lg font-medium leading-[1.5] text-ink" dir="auto">
                تفاصيل العملية
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center gap-10 px-4 pb-8 pt-3">
          <div className="flex w-full shrink-0 flex-col items-start gap-3">
            {/* Returned amount */}
            <div className="flex w-full shrink-0 flex-col items-end gap-4 rounded-2xl bg-brand-50 p-4">
              <div className="flex w-full shrink-0 items-center justify-center">
                <div className="flex h-[18px] shrink-0 items-center">
                  <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                    اللي رجع لك
                  </p>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col items-center gap-2.5">
                <div className="flex w-full shrink-0 flex-col items-center">
                  <div className="flex shrink-0 items-center justify-end gap-1.5">
                    <div className="flex shrink-0 items-center justify-center gap-0.5 rounded-md py-0.5">
                      <div className="relative size-[29px] shrink-0 overflow-clip">
                        <div className="absolute inset-[5.15%_11.13%_5.15%_9.6%]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={sarSheet} />
                        </div>
                      </div>
                      <p className="font-en whitespace-nowrap text-right text-[32px] font-bold not-italic leading-[1.3] text-brand-400" dir="auto">
                        {tx.amount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-end gap-1.5">
                  <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                    {'ينتهي في: '}
                    <span className="font-en">25.07.2026</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="flex w-[343px] shrink-0 flex-col items-center gap-[18px] rounded-2xl border border-solid border-line bg-white p-4">
              <div className="flex w-full shrink-0 items-center justify-end gap-1">
                <p className="whitespace-nowrap text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  ملخص العملية
                </p>
              </div>
              <SummaryRow
                label="اسم التاجر"
                value={
                  <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
                    {tx.name}
                  </p>
                }
              />
              <SheetSeparator />
              <SummaryRow
                label="قيمة العملية"
                value={
                  <p className="font-en whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="rtl">
                    {'200 '}
                    <Riyal />
                  </p>
                }
              />
              <SheetSeparator />
              <SummaryRow
                label="رقم العملية"
                value={
                  <p className="font-en whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="auto">
                    123456
                  </p>
                }
              />
              <SheetSeparator />
              <SummaryRow
                label="تاريخ العملية"
                value={
                  <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="rtl">
                    <span className="font-en">15</span> مارس <span className="font-en">2026</span>
                  </p>
                }
              />
              <SheetSeparator />
              <SummaryRow
                label="وقت العملية"
                value={
                  <p className="whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="rtl">
                    <span className="font-en">08:30</span> صباحا
                  </p>
                }
              />
              <SheetSeparator />
              <SummaryRow
                label="البطاقة المستخدمة"
                value={
                  <div className="flex shrink-0 items-center gap-1">
                    <p className="font-en whitespace-nowrap text-xs font-medium leading-[1.5] text-ink" dir="ltr">
                      **** 1234
                    </p>
                    <div className="relative size-5 shrink-0">
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
                  </div>
                }
              />
            </div>
          </div>

          {/* واجهتك مشكلة؟ */}
          <div className="flex w-full shrink-0 flex-col items-start">
            <div className="flex w-full shrink-0 items-center justify-end gap-3 rounded-2xl border border-solid border-line-subtle bg-surface px-4 py-3">
              <div className="relative size-5 shrink-0 overflow-clip">
                <div className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center" style={{ containerType: 'size' }}>
                  <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
                    <div className="relative size-full">
                      <div className="absolute inset-[-4.17%_-2.5%]">
                        <img alt="" className="block size-full max-w-none" src={iconChevronSheet} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
                <div className="w-full flex-none -scale-y-100">
                  <div className="flex w-full flex-col items-end justify-center gap-1">
                    <div className="relative flex w-full shrink-0 items-center justify-center">
                      <div className="w-full flex-none -scale-y-100">
                        <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                          تواصل معنا ونحلها لك
                        </p>
                      </div>
                    </div>
                    <div className="relative flex w-full shrink-0 items-center justify-center">
                      <div className="w-full flex-none -scale-y-100">
                        <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                          واجهتك مشكلة؟
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-center justify-center gap-2">
                <div className="flex shrink-0 items-center justify-center rounded-lg bg-surface-neutral p-2.5">
                  <div className="relative size-5 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconMessages} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex w-full shrink-0 items-center justify-end gap-3">
      <div className="flex shrink-0 items-center">{value}</div>
      <div className="flex min-w-px flex-[1_0_0] flex-col items-end">
        <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink" dir="auto">
          {label}
        </p>
      </div>
    </div>
  );
}

function SheetSeparator() {
  return (
    <div className="flex w-full shrink-0 flex-col items-start">
      <div className="h-px w-full shrink-0 bg-line-subtle" />
    </div>
  );
}
