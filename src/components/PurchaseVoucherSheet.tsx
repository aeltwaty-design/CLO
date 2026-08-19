import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { IS_TEMP } from '../state/PhaseState';
import { priceOf, useVoucher, type PayMethod } from '../state/VoucherState';
import type { Merchant } from '../data/merchants';
import InsufficientBalanceSheet from './InsufficientBalanceSheet';
import Riyal from './Riyal';
import iconClose from '../assets/figma/77832851b14d0014584c317e4f6da6aaba991b57.svg';
import iconGlobal from '../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';
import iconShop from '../assets/figma/b29c8472a920d7f72b3162de749ffef1cc4696df.svg';
import woCoin24 from '../assets/figma/4f328542e0854cb816be90133862402160edb1f7.svg';
import photoNamaq from '../assets/figma/9058c524c17f20227eae51a2f833010fdbd061c9.png';
import photoAmazon from '../assets/figma/9c23031a270d25995df3cc93349eadd584c7bd69.png';
import photoHunger from '../assets/figma/4b164b7f5ecaa2aa67b3d72edea0f481e157265b.png';
import photoJahez from '../assets/figma/924e4f06eab7bf8031d10804ed6309bb8a93a3b4.png';
import photoJarir from '../assets/figma/93ab5957f0a6c94b2e162254d26692fdd0570a88.png';
import photoGolden from '../assets/figma/cef23dd57b79374c94e78dff0f9021f042b79b3a.png';
import photoZara from '../assets/figma/453784f58c394882dae76c32815f4f8dac9abc7e.png';

const LOGOS: Record<string, string> = {
  namaq: photoNamaq,
  amazon: photoAmazon,
  hunger: photoHunger,
  jahez: photoJahez,
  jarir: photoJarir,
  golden: photoGolden,
  zara: photoZara,
};

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const HOW_ONLINE = ['قم بزيارة موقع او تطبيق المتجر', 'قم بإضافة مشترياتك إلى السلة', 'عند الدفع ادخل كود القسيمة'];
const HOW_BRANCH = ['قم بزيارة أي من فروع المتجر', 'اختر مشترياتك من الفرع', 'عند الدفع ادخل كود القسيمة'];
const TERMS = ['يكتب هنا الشرط الأول كاملا', 'يكتب هنا الشرط الثاني كاملا', 'يكتب هنا الشرط الثالث كاملا'];

const METHODS: { key: PayMethod; label: string }[] = [
  { key: 'points', label: 'نقاط' },
  { key: 'cashback', label: 'كاش باك' },
  { key: 'split', label: 'مقسّم' },
];

/**
 * شراء قسيمة — purchase drawer (Figma 65:24960 online-only / 65:25073 with
 * the في الفرع·اونلاين tabs). Beyond the drawn sheet it carries the
 * user-directed **«طريقة الدفع»** block: pay in points as drawn, in cashback
 * (face value 1:1), or **split** — a slider moves ﷼ from the cashback
 * balance and the remainder bills in points at this tier's own rate.
 * Unaffordable combinations open the drawn insufficient-balance state.
 */
export default function PurchaseVoucherSheet({
  open,
  onClose,
  merchant,
}: {
  open: boolean;
  onClose: () => void;
  merchant: Merchant;
}) {
  const navigate = useNavigate();
  const { points, cashback, cardLinked } = useAppState();
  const { voucher, method, setMethod, cashbackPart, setCashbackPart } = useVoucher();
  // Temp (user direction): «طريقة الدفع» exists only once a card is linked —
  // before that there is no cashback to spend, so the drawer bills in points
  // and hides the chooser. Phase 2 keeps the block in both states.
  const flexible = !IS_TEMP || cardLinked;
  const [channel, setChannel] = useState<'branch' | 'online'>(merchant.inBranch ? 'branch' : 'online');
  const [shortOpen, setShortOpen] = useState(false);

  if (!open || !voucher) return null;

  const bothChannels = Boolean(merchant.inBranch && merchant.online);
  const due = priceOf(voucher, flexible ? method : 'points', cashbackPart);
  const affordable = due.points <= points && due.cashback <= cashback;
  const steps = bothChannels && channel === 'branch' ? HOW_BRANCH : merchant.inBranch && !merchant.online ? HOW_BRANCH : HOW_ONLINE;

  const pay = () => {
    if (!affordable) {
      setShortOpen(true);
      return;
    }
    onClose();
    navigate('/vouchers/pin');
  };

  return (
    <div className="absolute inset-0 z-50">
      <style>
        {'@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'}
      </style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex h-[760px] flex-col rounded-t-2xl bg-white"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
        data-testid="purchase-sheet"
      >
        {/* Drawer header */}
        <div className="flex w-full shrink-0 items-center justify-between px-4 py-5">
          <button type="button" onClick={onClose} aria-label="إغلاق" className="relative size-6 shrink-0 cursor-pointer overflow-clip">
            <div className="absolute inset-1/4">
              <div className="absolute inset-[-8.33%]">
                <img alt="" className="block size-full max-w-none" src={iconClose} />
              </div>
            </div>
          </button>
          <p className="text-lg font-medium leading-[1.5] text-ink" dir="auto">
            شراء قسيمة
          </p>
        </div>

        <div className="flex min-h-px flex-[1_0_0] flex-col gap-5 overflow-y-auto px-4 pb-4">
          {/* Merchant + face value */}
          <div className="relative flex w-full shrink-0 flex-col gap-2.5 rounded-2xl bg-surface-neutral p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex shrink-0 items-center gap-1">
                {merchant.inBranch && <Badge icon={iconShop} />}
                {merchant.online && <Badge icon={iconGlobal} />}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <div className="flex flex-col items-end gap-0.5 text-right">
                  <p className="text-sm font-medium leading-[1.5] text-ink" dir="auto">
                    {merchant.name}
                  </p>
                  <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                    {merchant.online && !merchant.inBranch ? 'متجر إلكتروني' : (merchant.category ?? 'متجر')}
                  </p>
                </div>
                <div className="relative size-[50px] shrink-0 rounded-[12.5px]">
                  <img
                    alt=""
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12.5px] object-cover"
                    src={LOGOS[merchant.id] ?? photoAmazon}
                  />
                </div>
              </div>
            </div>
            <p className="w-full text-right text-lg font-bold leading-[1.5] text-brand-400" dir="rtl" data-testid="sheet-face">
              {'قسيمة شراء بقيمة '}
              <span className="font-en">{fmt(voucher.face)}</span>
              {' '}
              <Riyal />
              {voucher.custom && <span className="text-xs font-medium text-ink-secondary">{' (مبلغ مخصص)'}</span>}
            </p>
          </div>

          {/* طريقة الدفع — the flexible-payment block */}
          <div className="flex w-full shrink-0 flex-col gap-3">
            {flexible && (
              <>
                <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
                  طريقة الدفع
                </p>
                <div className="flex w-full flex-row-reverse items-center gap-2">
                  {METHODS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setMethod(m.key)}
                      data-testid={`pay-${m.key}`}
                      className={`flex min-w-px flex-[1_0_0] items-center justify-center rounded-2xl border border-solid px-3 py-2 ${
                        method === m.key ? 'border-brand-400 bg-brand-50' : 'cursor-pointer border-line bg-surface'
                      }`}
                    >
                      <p
                        className={`whitespace-nowrap text-center text-xs leading-[1.5] ${
                          method === m.key ? 'font-medium text-brand-400' : 'font-normal text-ink'
                        }`}
                        dir="auto"
                      >
                        {m.label}
                      </p>
                    </button>
                  ))}
                </div>

                {method === 'split' && (
                  <div className="flex w-full flex-col gap-2 rounded-2xl border border-solid border-line p-3">
                    <div className="flex w-full items-center justify-between">
                      <p className="font-en text-xs font-semibold text-brand-400" dir="ltr">
                        {fmtSar(due.cashback)}
                      </p>
                      <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                        كم تبي تدفع كاش باك؟
                      </p>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={Math.floor(Math.min(voucher.face, cashback))}
                      step={5}
                      value={Math.min(cashbackPart, Math.floor(Math.min(voucher.face, cashback)))}
                      onChange={(e) => setCashbackPart(Number(e.target.value))}
                      aria-label="المبلغ المدفوع كاش باك"
                      data-testid="split-slider"
                      className="w-full accent-brand-400"
                    />
                  </div>
                )}
              </>
            )}

            {/* what this purchase costs */}
            <div className="flex w-full items-center justify-between rounded-2xl bg-surface-neutral px-4 py-3" data-testid="pay-summary">
              <div className="flex shrink-0 items-center gap-2">
                {due.cashback > 0 && (
                  <p className="font-en text-sm font-semibold text-ink" dir="ltr">
                    {fmtSar(due.cashback)} <span className="text-ink-secondary"><Riyal /></span>
                  </p>
                )}
                {due.cashback > 0 && due.points > 0 && <span className="text-xs text-ink-tertiary">+</span>}
                {due.points > 0 && (
                  <div className="flex shrink-0 items-center gap-1">
                    <WoCoin24 />
                    <p className="font-en text-sm font-semibold text-ink">{fmt(due.points)}</p>
                  </div>
                )}
              </div>
              <p className="text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
                تدفع
              </p>
            </div>

            {!affordable && (
              <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink-danger" dir="auto" data-testid="pay-short">
                رصيدك ما يكفي — بدّل طريقة الدفع أو اختر قيمة أقل
              </p>
            )}
          </div>

          {/* عن القسيمة */}
          <Section title="عن القسيمة">
            <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
              هذه القسيمة صالحة للاستخدام مرة واحدة ولا يمكن استبدالها بمبلغ نقدي. يُرجى تقديم القسيمة عند الدفع للاستفادة من العرض. تسري الشروط والأحكام…
            </p>
          </Section>

          {/* كيف تستخدمها؟ */}
          <div className="flex w-full shrink-0 flex-col gap-3">
            <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
              كيف تستخدمها؟
            </p>
            <div className="flex w-full flex-col gap-3 rounded-2xl border border-solid border-line p-3">
              {bothChannels && (
                <div className="flex w-full flex-row-reverse items-end border-b border-solid border-line">
                  {(['branch', 'online'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setChannel(c)}
                      className={`flex min-w-px flex-[1_0_0] items-center justify-center gap-1.5 pb-2 ${
                        channel === c ? 'border-b-2 border-solid border-brand-400' : 'cursor-pointer'
                      }`}
                    >
                      <p
                        className={`whitespace-nowrap text-center text-xs leading-[1.5] ${
                          channel === c ? 'font-medium text-brand-400' : 'font-normal text-ink'
                        }`}
                        dir="auto"
                      >
                        {c === 'branch' ? 'في الفرع' : 'اونلاين'}
                      </p>
                      <div className="relative size-4 shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={c === 'branch' ? iconShop : iconGlobal} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <NumberedList items={steps} />
            </div>
          </div>

          {/* الشروط والأحكام */}
          <Section title="الشروط والأحكام">
            <NumberedList items={TERMS} />
          </Section>
        </div>

        {/* ⛴️ CTA */}
        <div className="flex w-full shrink-0 flex-col items-center gap-3 px-4 pb-8 pt-3">
          {/* stays tappable when short: the drawn flow answers with the
              insufficient-balance screen rather than a dead button */}
          <button
            type="button"
            onClick={pay}
            data-testid="confirm-pay"
            className={`flex h-[46px] w-full cursor-pointer items-center justify-between rounded-xl px-4 ${
              affordable ? 'bg-brand-400' : 'bg-surface-disabled'
            }`}
          >
            <span className={`flex shrink-0 items-center gap-1 ${affordable ? 'text-ink-inverse' : 'text-ink-quadrant'}`}>
              {due.points > 0 && <WoCoin24 />}
              <span className="font-en text-sm font-semibold" dir="ltr">
                {due.points > 0 ? fmt(due.points) : ''}
                {due.points > 0 && due.cashback > 0 ? ' + ' : ''}
                {due.cashback > 0 ? `${fmtSar(due.cashback)} ﷼` : ''}
              </span>
            </span>
            <span className={`text-sm font-medium leading-[1.5] ${affordable ? 'text-ink-inverse' : 'text-ink-quadrant'}`} dir="auto">
              تمم الدفع
            </span>
          </button>
        </div>
      </div>

      <InsufficientBalanceSheet
        open={shortOpen}
        onClose={() => setShortOpen(false)}
        currency={due.points > points ? 'points' : 'cashback'}
        price={due.points > points ? due.points : due.cashback}
        balance={due.points > points ? points : cashback}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3">
      <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
        {title}
      </p>
      <div className="flex w-full flex-col gap-2 rounded-2xl border border-solid border-line p-3">{children}</div>
    </div>
  );
}

/** Numbered steps as drawn: «1.» prefix, right-aligned. */
function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((step, i) => (
        <p key={i} className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="rtl">
          <span className="font-en">{i + 1}.</span> {step}
        </p>
      ))}
    </div>
  );
}

function Badge({ icon }: { icon: string }) {
  return (
    <div className="flex shrink-0 items-center rounded-[5.263px] bg-white p-[2.105px]">
      <div className="relative size-[16.842px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
      </div>
    </div>
  );
}

function WoCoin24() {
  return (
    <div className="relative size-6 shrink-0">
      <div className="absolute inset-[12.5%_7.47%_9.69%_8.33%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={woCoin24} />
      </div>
    </div>
  );
}
