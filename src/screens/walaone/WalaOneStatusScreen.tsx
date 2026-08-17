import { useWalaOne } from '../../state/WalaOneState';
import RedeemStatusScreen from '../redeem/RedeemStatusScreen';
import { WALAONE_PER_RIYAL } from './WalaOneAmountScreen';

const fmt = (n: number) => n.toLocaleString('en-US');

/** WalaOne result — drawn success «تم تحويل النقاط بنجاح» / «ما ضبطت»,
    picked by `?ok=`; the shared redemption status screen carries both. */
export default function WalaOneStatusScreen() {
  const { amount, phone, verified } = useWalaOne();
  const live = amount > 0 && verified;

  return (
    <RedeemStatusScreen
      successTitle="تم تحويل النقاط بنجاح"
      successBody="ستصل نقاطك قريبا إلى الجهة الأخرى"
      retryTo="/walaone/pin"
      continueTo="/cards"
      receipt={
        live ? (
          <>
            {'وصلت '}
            <span className="font-en font-medium text-ink">{fmt(amount * WALAONE_PER_RIYAL)}</span>
            {' نقطة ولاء ون لمحفظة '}
            <span className="font-en text-ink" dir="ltr">
              {`+966 ${phone.slice(0, 1)} ${phone.slice(1, 5)} ${phone.slice(5, 9)}`}
            </span>
          </>
        ) : null
      }
    />
  );
}
