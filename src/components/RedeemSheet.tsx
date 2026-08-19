import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state/AppState';
import { useWithdraw } from '../state/WithdrawState';
import Riyal from './Riyal';
import MaskGlyph from './redeem/MaskGlyph';
import iconBank from '../assets/figma/b0f66261075012027d39e295d75abc4168569e6c.svg';
import iconSwap from '../assets/figma/deefd6b77894536589cb50f767e7a9c50d68ba82.svg';
import iconTicket from '../assets/figma/02d41c187946e3ed96263cd3096f1393fea2a563.svg';
import iconBriefcase from '../assets/figma/eec1cb423a0fdc92072abdd2d9c2fbfb5921b6fc.svg';
import iconPeople from '../assets/figma/c4f14edb4f3dc73aafc57568f4abb02e0ef9e857.svg';
import iconHeart from '../assets/figma/abd2930f3bda6577cc003ae3e4e50852eb9b1aa4.svg';
import iconMobile from '../assets/icons/mobile.svg';

const fmtSar = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type View = 'list' | 'gift';

/** Transition phase 1 — the cashback redemption hub («استخدمها»): one sheet
    answering "what can I do with this money?". Bank transfer routes into the
    built withdrawal flow, vouchers hand off to the Market's القسائم tab,
    «أهدِها» opens the gift flow (drawn تحويل النقاط section 73:29323 —
    audience rows in-sheet like the drawn hub, limited to زملاء العمل and
    أفراد العائلة per user direction), and «شحن رصيد جوال» / «تبرع فيها» open
    the two derived flows (operator/cause pickers of their own, so no extra
    in-sheet view). Internal views — no sheet stacking. */
export default function RedeemSheet({
  open,
  onClose,
  preview = false,
}: {
  open: boolean;
  onClose: () => void;
  /** Zero-balance preview (stakeholder #51, Temp): the same six ways to use
      cashback, shown but inert, under «لما يوصلك أول كاش باك..» and above an
      «اجمع أول كاش باك» CTA to the participating merchants. Explicit prop —
      the seeded balance is 560.50 even on the zero-balance wallet, so the
      sheet can't infer it. */
  preview?: boolean;
}) {
  const navigate = useNavigate();
  const { cashback: liveCashback } = useAppState();
  const cashback = preview ? 0 : liveCashback;
  const { account } = useWithdraw();

  const [view, setView] = useState<View>('list');

  useEffect(() => {
    if (open) setView('list');
  }, [open]);

  if (!open) return null;

  const toBank = () => {
    onClose();
    navigate(account ? '/withdraw/amount' : '/withdraw/account');
  };

  // vouchers live in the Market's القسائم tab (65:23785) — the hub hands off
  // to that grid instead of carrying its own picker
  const toVouchers = () => {
    onClose();
    navigate('/market?tab=vouchers');
  };

  const toGift = (aud: 'colleagues' | 'family') => {
    onClose();
    navigate(`/gift/pick?aud=${aud}`);
  };

  const toWalaOne = () => {
    onClose();
    navigate('/walaone/amount');
  };

  const toRecharge = () => {
    onClose();
    navigate('/recharge/operator');
  };

  const toDonate = () => {
    onClose();
    navigate('/donate/cause');
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
          '@keyframes sheet-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes sheet-fade{from{opacity:0}to{opacity:1}}'
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
            {preview && (
              <p
                className="w-full rounded-xl bg-brand-50 px-3 py-2 text-right text-xs font-medium leading-[1.5] text-brand-800"
                dir="auto"
                data-testid="redeem-preview-line"
              >
                لما يوصلك أول كاش باك.. تقدر تستخدمه بالطريقة اللي تناسبك
              </p>
            )}
            <div className="flex w-full flex-col items-stretch">
              <RedeemRow
                title="تحويل لحساب بنكي"
                sub={`${fmtSar(cashback)} ﷼ متاحة للسحب`}
                icon={iconBank}
                onPick={toBank}
                disabled={preview}
                testid="redeem-bank"
              />
              <Divider />
              <RedeemRow
                title="تحويل لنقاط ولاء ون"
                sub="حوّل كاش باك لنقاط ولاء ون"
                icon={iconSwap}
                onPick={toWalaOne}
                disabled={preview}
                testid="redeem-walaone"
              />
              <Divider />
              <RedeemRow
                title="اشترِ قسائم"
                sub="تصفّح قسائم المتاجر في السوق"
                icon={iconTicket}
                onPick={toVouchers}
                disabled={preview}
                testid="redeem-vouchers"
              />
              <Divider />
              <RedeemRow
                title="أهدِها"
                sub="لزملائك في العمل أو أفراد عائلتك"
                icon={iconPeople}
                onPick={() => setView('gift')}
                disabled={preview}
                testid="redeem-gift"
              />
              <Divider />
              <RedeemRow
                title="شحن رصيد جوال"
                sub="عبّي رصيدك بكاش باك"
                icon={iconMobile}
                onPick={toRecharge}
                disabled={preview}
                testid="redeem-recharge"
              />
              <Divider />
              <RedeemRow
                title="تبرع فيها"
                sub="خلها صدقة بضغطة"
                icon={iconHeart}
                onPick={toDonate}
                disabled={preview}
                testid="redeem-donate"
              />
            </div>
            {preview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/market');
                }}
                data-testid="redeem-preview-cta"
                className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 overflow-clip rounded-xl bg-brand-400 px-4 py-2.5"
              >
                <p className="whitespace-nowrap text-sm font-medium leading-[1.5] text-ink-inverse" dir="auto">
                  اجمع أول كاش باك
                </p>
              </button>
            )}
          </>
        )}

        {view === 'gift' && (
          <>
            <Back label="أهدِها" />
            <div className="flex w-full flex-col items-stretch">
              <RedeemRow
                title="زملاء العمل"
                sub="شارك كاش باك مع زملائك في العمل"
                icon={iconBriefcase}
                onPick={() => toGift('colleagues')}
                testid="gift-colleagues"
              />
              <Divider />
              <RedeemRow
                title="أفراد العائلة"
                sub="شارك كاش باك مع عائلتك الكريمة"
                icon={iconPeople}
                onPick={() => toGift('family')}
                testid="gift-family"
              />
            </div>
          </>
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
  icon,
  onPick,
  soon,
  disabled,
  testid,
}: {
  title: string;
  sub: string;
  /** row glyph, painted brand-green in a mint circle (cause-tile idiom) */
  icon?: string;
  onPick?: () => void;
  soon?: boolean;
  /** inert but drawn as a real row (the zero-balance preview) — unlike
      `soon`, the chevron stays and no «قريباً» chip appears */
  disabled?: boolean;
  testid?: string;
}) {
  const inert = soon || disabled;
  return (
    <button
      type="button"
      disabled={inert}
      onClick={onPick}
      data-testid={testid}
      aria-disabled={inert}
      className={`flex w-full items-center justify-between gap-3 rounded-xl px-2 py-3 ${inert ? 'opacity-50' : 'cursor-pointer'}`}
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
      {icon && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50">
          <MaskGlyph src={icon} size={20} className="bg-brand-400" />
        </span>
      )}
    </button>
  );
}
