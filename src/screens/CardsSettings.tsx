import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IS_TEMP } from '../state/PhaseState';
import { useWithdraw, REGISTERED_ACCOUNT } from '../state/WithdrawState';
import batteryOutline from '../assets/figma/788edad32bb1dc3a825015b2d5158bcce7bbf0da.svg';
import batteryCap from '../assets/figma/a7c637c279075077d68a57f58de59394cee4cb79.svg';
import batteryFill from '../assets/figma/4cdee40e45ca5410a8730fa3ec4b39097fe560e7.svg';
import iconWifi from '../assets/figma/9d037ff58c396adae71068bf487b499250fca644.svg';
import iconSignal from '../assets/figma/f192404e6429d17169474171bdc045888f5cada9.svg';
import imgTime from '../assets/figma/0df437cb81db5679e48b4bd0954f6de88d23f868.svg';
import iconSearch from '../assets/figma/94eebfc1b004b10817770c3aae389af4892d7357.svg';
import iconArrowBack from '../assets/figma/fd6f26534a87f4d8bbe62b710db8bf509383bda4.svg';
import iconChevronLeft from '../assets/figma/799e69f6bf3b072fd575e5ef3e7a3f09fc624b98.svg';
import iconCards from '../assets/figma/8c05f1e5f6147e716d668aa6bce34eed3ff26de4.svg';
import iconBank from '../assets/figma/b0f66261075012027d39e295d75abc4168569e6c.svg';
import iconPlus from '../assets/figma/14c85ef465655fa993a62a1144bbd4ae741bce50.svg';

/**
 * Cashback-wallet settings, reached from the wallet's «الاعدادات» tile
 * (user direction — no drawn frame; built from the wallet's own row /
 * app-bar language):
 *
 * - CardsSettingsScreen — الاعدادات hub: البطاقات المضافة · الحسابات البنكية
 * - BankAccountsScreen  — الحسابات البنكية list + «حساب بنكي جديد»
 *
 * Saved cards keep their drawn screen (`/cards/manage`, Figma 1:10520 /
 * 1:10838); accounts get this companion list, which hands off to the
 * withdrawal flow's add-bank form.
 */

/** الاعدادات — the two managed things, each on its own screen. */
export function CardsSettingsScreen() {
  const navigate = useNavigate();
  const { account } = useWithdraw();
  const accounts = account ? 2 : 1;

  return (
    <Screen title="الاعدادات">
      <div className="flex w-full flex-col items-end gap-2">
        <SettingsRow
          icon={iconCards}
          title={IS_TEMP ? 'بطاقاتك اللي عليها كاش باك' : 'البطاقات المضافة'} // #40
          subtitle={
            <>
              <span className="font-en">1</span>
              {' من '}
              <span className="font-en">3</span>
              {/* #41 */}
              {IS_TEMP ? ' بطاقات مفعّلة' : ' بطاقات مربوطة'}
            </>
          }
          onClick={() => navigate('/cards/manage')}
        />
        <SettingsRow
          icon={iconBank}
          title="الحسابات البنكية"
          subtitle={
            <>
              <span className="font-en">{accounts}</span>
              {/* #42 */}
              {IS_TEMP ? ' حساب للتحويل' : ' حساب للسحب'}
            </>
          }
          onClick={() => navigate('/cards/accounts')}
        />
      </div>
    </Screen>
  );
}

/** الحسابات البنكية — payout accounts on file + the add-account entry. */
export function BankAccountsScreen() {
  const navigate = useNavigate();
  const { account } = useWithdraw();
  // the account picked mid-flow rides along next to the registered one
  const accounts = account && account.masked !== REGISTERED_ACCOUNT.masked ? [REGISTERED_ACCOUNT, account] : [REGISTERED_ACCOUNT];

  return (
    <Screen title="الحسابات البنكية">
      <button
        type="button"
        onClick={() => navigate('/withdraw/new-account')}
        className="flex w-full shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-dashed border-line bg-surface px-4 py-3"
      >
        <div className="relative size-5 shrink-0 opacity-0" aria-hidden />
        <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
          <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
            حساب بنكي جديد
          </p>
          <p className="w-full text-right text-[0px] font-normal text-ink-secondary" dir="auto">
            {/* #52 */}
            {IS_TEMP ? (
              <span className="text-[12px] leading-[1.5]">باستخدام الآيبان أو رقم الحساب</span>
            ) : (
              <>
                <span className="text-[12px] leading-[1.5]">{'تحويل عبر '}</span>
                <span className="font-en text-[12px] not-italic leading-[1.5]">IBAN</span>
                <span className="text-[12px] leading-[1.5]">{' او رقم الحساب'}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center rounded-lg bg-brand-50 p-2.5">
          <div className="relative size-5 shrink-0">
            <div className="absolute inset-[20%]">
              <div className="absolute inset-[-2.08%]">
                <img alt="" className="block size-full max-w-none" src={iconPlus} />
              </div>
            </div>
          </div>
        </div>
      </button>

      <div className="flex w-full flex-col items-end gap-1">
        {accounts.map((acc, i) => (
          <div
            key={`${acc.masked}-${i}`}
            className="flex w-full shrink-0 items-center justify-end gap-3 rounded-2xl border border-solid border-line-subtle bg-surface px-4 py-3"
          >
            <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
              <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                {acc.name}
              </p>
              <p className="font-en w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="ltr">
                {acc.masked}
              </p>
            </div>
            <div className="relative size-10 shrink-0 overflow-clip rounded-full bg-surface-neutral">
              <p className="font-en absolute left-1/2 top-[calc(50%-12px)] w-6 -translate-x-1/2 text-center text-base font-medium leading-[1.5] text-ink-secondary">
                {acc.initials}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/** Shared shell for both settings screens: status bar, app bar, 375 content. */
function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="h-full overflow-y-auto bg-surface pb-[46px]">
        <div className="flex w-full flex-col items-start bg-surface">
          <IosStatusBar />
          <AppBar title={title} />
          <div className="flex w-[375px] flex-col items-center gap-3 bg-surface px-4 py-5">{children}</div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-px flex w-[375px] flex-col items-center overflow-clip">
        <div className="relative h-[34px] w-[375px] shrink-0 bg-surface">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-[100px] bg-ink" />
        </div>
      </div>
    </div>
  );
}

/** Settings entry: 40px icon chip at right, title/subtitle stack, chevron left. */
function SettingsRow({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-solid border-line-subtle bg-surface px-4 py-3"
    >
      <div className="relative size-5 shrink-0 overflow-clip">
        <div className="absolute bottom-1/4 left-[35%] right-[35%] top-1/4 flex items-center justify-center" style={{ containerType: 'size' }}>
          <div className="h-[100cqw] w-[100cqh] flex-none rotate-90">
            <div className="relative size-full">
              <div className="absolute inset-[-4.17%_-2.5%]">
                <img alt="" className="block size-full max-w-none" src={iconChevronLeft} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-w-px flex-[1_0_0] flex-col items-end gap-1">
        <p className="w-full text-right text-sm font-medium leading-[1.5] text-ink" dir="auto">
          {title}
        </p>
        <p className="w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary" dir="auto">
          {subtitle}
        </p>
      </div>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-neutral">
        <div className="relative size-6 shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon} />
        </div>
      </div>
    </button>
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

/** App bar as drawn on the wallet screens: title + back arrow at the right. */
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
        <button type="button" onClick={() => navigate(-1)} aria-label="رجوع" className="relative block size-5 shrink-0 cursor-pointer overflow-clip">
          <div className="absolute inset-[17.71%_14.58%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconArrowBack} />
          </div>
        </button>
      </div>
    </div>
  );
}
