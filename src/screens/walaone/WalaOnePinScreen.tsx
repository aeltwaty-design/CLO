import { useAppState } from '../../state/AppState';
import { useWalaOne } from '../../state/WalaOneState';
import Riyal from '../../components/Riyal';
import RedeemPinScreen from '../redeem/RedeemPinScreen';
import { WALAONE_PER_RIYAL } from './WalaOneAmountScreen';

const fmt = (n: number) => n.toLocaleString('en-US');

/** تأكيد التحويل — the shared redemption PIN, wired to the WalaOne flow. */
export default function WalaOnePinScreen() {
  const { spendCashback } = useAppState();
  const { amount, verified } = useWalaOne();

  return (
    <RedeemPinScreen
      title="تأكيد التحويل"
      subtitle="قم بكتابة الرقم السري لتأكيد التحويل"
      ready={amount > 0 && verified}
      backTo="/walaone/amount"
      statusPath="/walaone/status"
      onSettle={() => spendCashback(amount)}
      context={
        <>
          {'تحويل '}
          <span className="font-en">{fmt(amount)}</span> <Riyal />
          {' إلى '}
          <span className="font-en">{fmt(amount * WALAONE_PER_RIYAL)}</span>
          {' نقطة ولاء ون'}
        </>
      }
    />
  );
}
