import { useAppState } from '../../state/AppState';
import { useDonate } from '../../state/DonateState';
import Riyal from '../../components/Riyal';
import RedeemPinScreen from '../redeem/RedeemPinScreen';

/** تأكيد التبرع — the shared redemption PIN, wired to the donation flow. */
export default function DonatePinScreen() {
  const { spendCashback } = useAppState();
  const { charity, amount } = useDonate();

  return (
    <RedeemPinScreen
      title="تأكيد التبرع"
      subtitle="قم بكتابة الرقم السري لتأكيد التبرع"
      ready={amount > 0 && !!charity}
      backTo="/donate/amount"
      statusPath="/donate/status"
      onSettle={() => spendCashback(amount)}
      context={
        <>
          {'تبرع '}
          <span className="font-en">{amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>{' '}
          <Riyal />
          {' لـ'}
          {charity?.name}
        </>
      }
    />
  );
}
