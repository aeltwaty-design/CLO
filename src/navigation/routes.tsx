import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScreenTransition from './ScreenTransition';
import { PHASE } from '../state/PhaseState';
import HomeScreen from '../screens/phase2/HomeScreen';
import WalletScreen from '../screens/phase2/WalletScreen';
import MarketScreen from '../screens/MarketScreen';
import StoreRouter from '../screens/store/StoreRouter';
import CashbackIntroScreen from '../screens/CashbackIntroScreen';
import AddCardScreen from '../screens/AddCardScreen';
import LinkSuccessScreen from '../screens/LinkSuccessScreen';
import { CardsHome, CardsManage } from '../screens/CardsDispatch';
import { BankAccountsScreen, CardsSettingsScreen } from '../screens/CardsSettings';
import TransactionsScreen from '../screens/TransactionsScreen';
import WithdrawAccountScreen from '../screens/withdraw/WithdrawAccountScreen';
import WithdrawNewAccountScreen from '../screens/withdraw/WithdrawNewAccountScreen';
import WithdrawAmountScreen from '../screens/withdraw/WithdrawAmountScreen';
import WithdrawSummaryScreen from '../screens/withdraw/WithdrawSummaryScreen';
import WithdrawPinScreen from '../screens/withdraw/WithdrawPinScreen';
import WithdrawStatusScreen from '../screens/withdraw/WithdrawStatusScreen';
import GiftPickScreen from '../screens/gift/GiftPickScreen';
import GiftAmountScreen from '../screens/gift/GiftAmountScreen';
import GiftPinScreen from '../screens/gift/GiftPinScreen';
import GiftStatusScreen from '../screens/gift/GiftStatusScreen';
import VoucherPinScreen from '../screens/vouchers/VoucherPinScreen';
import VoucherSuccessScreen from '../screens/vouchers/VoucherSuccessScreen';
import RechargeOperatorScreen from '../screens/recharge/RechargeOperatorScreen';
import RechargeNumberScreen from '../screens/recharge/RechargeNumberScreen';
import RechargeAmountScreen from '../screens/recharge/RechargeAmountScreen';
import RechargePinScreen from '../screens/recharge/RechargePinScreen';
import RechargeStatusScreen from '../screens/recharge/RechargeStatusScreen';
import WalaOneAmountScreen from '../screens/walaone/WalaOneAmountScreen';
import WalaOneConfirmScreen from '../screens/walaone/WalaOneConfirmScreen';
import WalaOnePinScreen from '../screens/walaone/WalaOnePinScreen';
import WalaOneStatusScreen from '../screens/walaone/WalaOneStatusScreen';
import DonateCauseScreen from '../screens/donate/DonateCauseScreen';
import DonateCharityScreen from '../screens/donate/DonateCharityScreen';
import DonateAmountScreen from '../screens/donate/DonateAmountScreen';
import DonatePinScreen from '../screens/donate/DonatePinScreen';
import DonateStatusScreen from '../screens/donate/DonateStatusScreen';

export const router = createBrowserRouter([
  {
    element: <ScreenTransition />,
    children: [
      // Phase 2 lands on the Home tab; Phase 1 keeps the market entry
      { path: '/', element: <Navigate to={PHASE >= 2 ? '/home' : '/market'} replace /> },
      { path: '/home', element: <HomeScreen /> },
      { path: '/wallet', element: <WalletScreen /> },
      { path: '/market', element: <MarketScreen /> },
      { path: '/store/:id', element: <StoreRouter /> },
      { path: '/cashback/intro', element: <CashbackIntroScreen /> },
      { path: '/cashback/add-card', element: <AddCardScreen /> },
      { path: '/cashback/success', element: <LinkSuccessScreen /> },
      { path: '/cards', element: <CardsHome /> },
      { path: '/cards/manage', element: <CardsManage /> },
      { path: '/cards/settings', element: <CardsSettingsScreen /> },
      { path: '/cards/accounts', element: <BankAccountsScreen /> },
      { path: '/transactions', element: <TransactionsScreen /> },
      // WithdrawProvider lives in App.tsx (above the keyed ScreenTransition,
      // which remounts per route and would reset nested provider state)
      { path: '/withdraw/account', element: <WithdrawAccountScreen /> },
      { path: '/withdraw/new-account', element: <WithdrawNewAccountScreen /> },
      { path: '/withdraw/amount', element: <WithdrawAmountScreen /> },
      { path: '/withdraw/summary', element: <WithdrawSummaryScreen /> },
      { path: '/withdraw/pin', element: <WithdrawPinScreen /> },
      { path: '/withdraw/status', element: <WithdrawStatusScreen /> },
      // GiftProvider lives in App.tsx (same reasoning as WithdrawProvider)
      { path: '/gift/pick', element: <GiftPickScreen /> },
      { path: '/gift/amount', element: <GiftAmountScreen /> },
      { path: '/gift/pin', element: <GiftPinScreen /> },
      { path: '/gift/status', element: <GiftStatusScreen /> },
      // VoucherProvider lives in App.tsx (same reasoning as the others)
      { path: '/vouchers/pin', element: <VoucherPinScreen /> },
      { path: '/vouchers/success', element: <VoucherSuccessScreen /> },
      // RechargeProvider/DonateProvider live in App.tsx (same reasoning as the
      // others). Both flows share the PIN and status screens under
      // screens/redeem, wired by a thin per-flow wrapper.
      { path: '/recharge/operator', element: <RechargeOperatorScreen /> },
      { path: '/recharge/number', element: <RechargeNumberScreen /> },
      { path: '/recharge/amount', element: <RechargeAmountScreen /> },
      { path: '/recharge/pin', element: <RechargePinScreen /> },
      { path: '/recharge/status', element: <RechargeStatusScreen /> },
      // WalaOneProvider lives in App.tsx too — drawn ولاء ون flow (108:45207)
      { path: '/walaone/amount', element: <WalaOneAmountScreen /> },
      { path: '/walaone/confirm', element: <WalaOneConfirmScreen /> },
      { path: '/walaone/pin', element: <WalaOnePinScreen /> },
      { path: '/walaone/status', element: <WalaOneStatusScreen /> },
      { path: '/donate/cause', element: <DonateCauseScreen /> },
      { path: '/donate/charity', element: <DonateCharityScreen /> },
      { path: '/donate/amount', element: <DonateAmountScreen /> },
      { path: '/donate/pin', element: <DonatePinScreen /> },
      { path: '/donate/status', element: <DonateStatusScreen /> },
      { path: '*', element: <Navigate to="/market" replace /> },
    ],
  },
]);
