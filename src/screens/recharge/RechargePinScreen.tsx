import { useAppState } from '../../state/AppState';
import { useRecharge } from '../../state/RechargeState';
import { groupMsisdn } from '../../data/telcos';
import Riyal from '../../components/Riyal';
import RedeemPinScreen from '../redeem/RedeemPinScreen';

/** تأكيد الشحن — the shared redemption PIN, wired to the recharge flow. */
export default function RechargePinScreen() {
  const { spendCashback } = useAppState();
  const { telco, number, amount } = useRecharge();

  return (
    <RedeemPinScreen
      title="تأكيد الشحن"
      subtitle="قم بكتابة الرقم السري لتأكيد الشحن"
      ready={amount > 0 && !!telco && !!number}
      backTo="/recharge/amount"
      statusPath="/recharge/status"
      onSettle={() => spendCashback(amount)}
      context={
        <>
          {'شحن '}
          <span className="font-en">{amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>{' '}
          <Riyal />
          {' لـ'}
          <span className="font-en" dir="ltr">
            {groupMsisdn(number)}
          </span>
        </>
      }
    />
  );
}
