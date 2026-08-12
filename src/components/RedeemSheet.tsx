import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { useWithdraw } from '../state/WithdrawState';
import Riyal from './Riyal';
import iconCheck from '../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import photoHm from '../assets/figma/ed7a3c23092808422fbfc30dfd4f7b5bdf0e5159.png';
import photoIkea from '../assets/figma/6dedcd791b30b76750f5c949e275384ca26de5e0.png';
import photoEra from '../assets/figma/dd4a3adad978f80c4ff16fb2f52a4d5543742f4c.png';
import photoWife from '../assets/figma/fbc7f3ce06113005d0e39cdc99820760ef452381.png';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const VOUCHERS = [
  { name: 'اتش اند ام', price: 20, photo: photoHm },
  { name: 'آيكيا', price: 40, photo: photoIkea },
  { name: 'قهوة إرا', price: 10, photo: photoEra },
];

const CONTACTS: { name: string; initials?: string; photo?: string }[] = [
  { name: 'اشرف القاسم', initials: 'AQ' },
  { name: 'زوجتك', photo: photoWife },
];

const GIFT_AMOUNTS = [10, 25, 50];

type View = 'list' | 'vouchers' | 'gift' | 'success';

/** Transition phase 1 — the cashback redemption hub («استخدمها»): one sheet
    answering "what can I do with this money?". Bank transfer routes into the
    built withdrawal flow; vouchers and gifting are live demo redemptions
    (balance moves app-wide); phone top-up and donation are honest «قريباً»
    roadmap tiles. Internal views — no sheet stacking. */
export default function RedeemSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { cashback, spendCashback } = useAppState();
  const { account } = useWithdraw();

  const [view, setView] = useState<View>('list');
  const [voucher, setVoucher] = useState<(typeof VOUCHERS)[number] | null>(null);
  const [contact, setContact] = useState(0);
  const [giftAmount, setGiftAmount] = useState(GIFT_AMOUNTS[1]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (open) {
      setView('list');
      setVoucher(null);
      setContact(0);
      setGiftAmount(GIFT_AMOUNTS[1]);
      setSuccessMsg('');
    }
  }, [open]);

  if (!open) return null;

  const toBank = () => {
    onClose();
    navigate(account ? '/withdraw/amount' : '/withdraw/account');
  };

  const buyVoucher = () => {
    if (!voucher) return;
    spendCashback(voucher.price);
    setSuccessMsg(`قسيمة ${voucher.name} صارت في مشترياتك`);
    setView('success');
  };

  const sendGift = () => {
    spendCashback(giftAmount);
    setSuccessMsg(`وصلت ${fmtSar(giftAmount)} ﷼ لـ${CONTACTS[contact].name}`);
    setView('success');
  };

  const Back = ({ label }: { label: string }) => (
    <div className="flex w-full items-center justify-between">
      <button type="button" onClick={() => setView('list')} className="text-xs font-medium leading-[1.5] text-ink-tertiary" dir="auto">
        ‹ رجوع
      </button>
      <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
        {label}
      </p>
    </div>
  );

  return (
    <div className="absolute inset-0 z-50">
      <style>
        {
          '@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}@keyframes pop-in{0%{transform:scale(0);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}'
        }
      </style>
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 block w-full cursor-pointer bg-black/40"
        style={{ animation: 'sheet-fade 200ms ease-out both' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-2xl bg-white px-4 pb-8 pt-2"
        style={{ animation: 'sheet-rise 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
        data-testid="redeem-sheet"
      >
        <div className="h-1 w-9 rounded-full bg-line" />

        {view === 'list' && (
          <>
            <div className="flex w-full items-center justify-between">
              <p className="text-xs font-normal leading-[1.5] text-ink-tertiary" dir="rtl">
                {'رصيدك: '}
                <span className="font-en font-medium text-ink">{fmtSar(cashback)}</span> <Riyal />
              </p>
              <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
                استخدم كاش باك
              </p>
            </div>
            <div className="flex w-full flex-col items-stretch">
              <RedeemRow
                title="تحويل لحساب بنكي"
                sub={`${fmtSar(cashback)} ﷼ متاحة للسحب`}
                onPick={toBank}
                testid="redeem-bank"
              />
              <Divider />
              <RedeemRow
                title="اشترِ قسائم"
                sub="قسائم المتاجر تبدأ من 10 ﷼"
                onPick={() => setView('vouchers')}
                testid="redeem-vouchers"
              />
              <Divider />
              <RedeemRow title="أهدِها لصديق" sub="حوّلها لأي شخص في ثواني" onPick={() => setView('gift')} testid="redeem-gift" />
              <Divider />
              <RedeemRow title="شحن رصيد جوال" sub="عبّي رصيدك بكاش باك" soon />
              <Divider />
              <RedeemRow title="تبرع فيها" sub="خلها صدقة بضغطة" soon />
            </div>
          </>
        )}

        {view === 'vouchers' && (
          <>
            <Back label="اشترِ قسائم" />
            <div className="flex w-full flex-col items-stretch">
              {VOUCHERS.map((v, i) => {
                const off = v.price > cashback;
                const active = voucher?.name === v.name;
                return (
                  <div key={v.name} className="contents">
                    {i > 0 && <Divider />}
                    <button
                      type="button"
                      disabled={off}
                      onClick={() => setVoucher(v)}
                      className={`flex w-full items-center justify-end gap-3 rounded-xl px-2 py-2.5 ${
                        off ? 'opacity-40' : 'cursor-pointer'
                      } ${active ? 'bg-brand-50' : ''}`}
                    >
                      <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-0.5 text-right leading-[1.5]">
                        <p className="w-full text-sm font-medium text-ink" dir="auto">
                          {v.name}
                        </p>
                        <p className="w-full text-xs font-normal text-ink-tertiary" dir="rtl">
                          {'قسيمة بـ '}
                          <span className="font-en">{v.price}</span> <Riyal />
                        </p>
                      </div>
                      <img alt="" className="size-10 shrink-0 rounded-full object-cover" src={v.photo} />
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              disabled={!voucher}
              onClick={buyVoucher}
              className={`flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
                voucher ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
              }`}
            >
              <p className={`whitespace-nowrap text-sm font-medium leading-[1.5] ${voucher ? 'text-ink-inverse' : 'text-ink-quadrant'}`} dir="rtl">
                {voucher ? (
                  <>
                    {'اشترِ بـ '}
                    <span className="font-en">{voucher.price}</span>
                    {' ﷼'}
                  </>
                ) : (
                  'اختر قسيمة'
                )}
              </p>
            </button>
          </>
        )}

        {view === 'gift' && (
          <>
            <Back label="أهدِها لصديق" />
            <div className="flex w-full items-stretch gap-2">
              {CONTACTS.map((c, i) => {
                const active = contact === i;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setContact(i)}
                    className={`flex min-w-px flex-[1_0_0] items-center justify-end gap-2 rounded-2xl border border-solid px-3 py-2.5 ${
                      active ? 'border-2 border-brand-400 bg-brand-50' : 'border-line bg-surface'
                    }`}
                  >
                    <p className="min-w-px flex-[1_0_0] text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                      {c.name}
                    </p>
                    {c.photo ? (
                      <img alt="" className="size-8 shrink-0 rounded-full object-cover" src={c.photo} />
                    ) : (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-neutral">
                        <p className="font-en text-xs font-medium leading-[1.5] text-ink-secondary">{c.initials}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex w-full items-stretch gap-2">
              {GIFT_AMOUNTS.map((a) => {
                const off = a > cashback;
                const active = giftAmount === a;
                return (
                  <button
                    key={a}
                    type="button"
                    disabled={off}
                    onClick={() => setGiftAmount(a)}
                    className={`flex min-w-px flex-[1_0_0] items-center justify-center gap-1 rounded-full border border-solid py-2 ${
                      off ? 'border-line-subtle opacity-40' : active ? 'border-2 border-brand-400' : 'cursor-pointer border-line'
                    }`}
                  >
                    <p className={`font-en text-sm font-medium leading-[1.5] ${active ? 'text-brand-400' : 'text-ink'}`}>{a}</p>
                    <span className={`text-xs ${active ? 'text-brand-400' : 'text-ink'}`}>
                      <Riyal />
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={sendGift}
              className="flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="rtl">
                {'أرسل '}
                <span className="font-en">{giftAmount}</span>
                {' ﷼'}
              </p>
            </button>
          </>
        )}

        {view === 'success' && (
          <div className="flex w-full flex-col items-center gap-3 py-4 text-center">
            <div
              className="relative flex size-14 items-center justify-center rounded-full bg-brand-400"
              style={{ animation: 'pop-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
            >
              <div className="relative size-6">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
              </div>
            </div>
            <p className="text-base font-bold leading-[1.5] text-ink" dir="auto">
              تم!
            </p>
            <p className="text-sm font-normal leading-[1.5] text-ink-secondary" dir="auto" data-testid="redeem-success-msg">
              {successMsg}
            </p>
            <p className="text-xs font-normal leading-[1.5] text-ink-tertiary" dir="rtl">
              {'رصيدك الحين: '}
              <span className="font-en font-medium text-ink">{fmtSar(cashback)}</span> <Riyal />
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 flex w-full shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
            >
              <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                تم
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full shrink-0 bg-line-subtle" />;
}

function RedeemRow({
  title,
  sub,
  onPick,
  soon,
  testid,
}: {
  title: string;
  sub: string;
  onPick?: () => void;
  soon?: boolean;
  testid?: string;
}) {
  return (
    <button
      type="button"
      disabled={soon}
      onClick={onPick}
      data-testid={testid}
      aria-disabled={soon}
      className={`flex w-full items-center justify-between gap-3 rounded-xl px-2 py-3 ${soon ? 'opacity-50' : 'cursor-pointer'}`}
    >
      {soon ? (
        <span className="shrink-0 rounded-full bg-surface-neutral px-2.5 py-0.5 text-[10px] font-medium leading-[1.5] text-ink-tertiary" dir="auto">
          قريباً
        </span>
      ) : (
        <span className="shrink-0 text-sm font-normal text-ink-quadrant" dir="auto">
          ‹
        </span>
      )}
      <span className="flex min-w-px flex-[1_0_0] flex-col items-end gap-0.5 text-right leading-[1.5]">
        <span className="w-full text-sm font-medium text-ink" dir="auto">
          {title}
        </span>
        <span className="w-full text-xs font-normal text-ink-tertiary" dir="auto">
          {sub}
        </span>
      </span>
    </button>
  );
}
