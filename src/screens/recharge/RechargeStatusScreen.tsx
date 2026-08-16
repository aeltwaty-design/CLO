import { useRecharge } from '../../state/RechargeState';
import { groupMsisdn } from '../../data/telcos';
import Riyal from '../../components/Riyal';
import RedeemStatusScreen from '../redeem/RedeemStatusScreen';

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/** Recharge result — the shared redemption status screen, picked by `?ok=`. */
export default function RechargeStatusScreen() {
  const { telco, number, amount } = useRecharge();
  const live = amount > 0 && !!telco && !!number;

  return (
    <RedeemStatusScreen
      successTitle="تم شحن الرصيد بنجاح"
      successBody="وصل الرصيد للرقم، ويقدر يستخدمه على طول"
      retryTo="/recharge/pin"
      continueTo="/cards"
      receipt={
        live ? (
          <>
            {'وصل '}
            <span className="font-en font-medium text-ink">{fmt(amount)}</span> <Riyal />
            {' رصيد '}
            <span className="text-ink">{telco.name}</span>
            {' لـ'}
            <span className="font-en text-ink" dir="ltr">
              {groupMsisdn(number)}
            </span>
          </>
        ) : null
      }
    />
  );
}
