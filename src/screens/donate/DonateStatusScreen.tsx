import { useDonate } from '../../state/DonateState';
import Riyal from '../../components/Riyal';
import RedeemStatusScreen from '../redeem/RedeemStatusScreen';

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

/** Donation result — the shared redemption status screen, picked by `?ok=`. */
export default function DonateStatusScreen() {
  const { charity, amount } = useDonate();
  const live = amount > 0 && !!charity;

  return (
    <RedeemStatusScreen
      successTitle="تم التبرع بنجاح"
      successBody="وصل تبرعك للجهة، تقبل الله منك"
      retryTo="/donate/pin"
      continueTo="/cards"
      receipt={
        live ? (
          <>
            {'تبرعت بـ'}
            <span className="font-en font-medium text-ink">{fmt(amount)}</span> <Riyal />
            {' لـ'}
            <span className="text-ink">{charity.name}</span>
            {' — تقبل الله منك'}
          </>
        ) : null
      }
    />
  );
}
