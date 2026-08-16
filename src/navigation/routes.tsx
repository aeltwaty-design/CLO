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

export const router = createBrowserRouter([
  {
    element: <ScreenTransition />,
    children: [
      // Phase 2 lands on the Home tab; Phase 1 keeps the market entry
      { path: '/', element: <Navigate to={PHASE === 2 ? '/home' : '/market'} replace /> },
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
      { path: '*', element: <Navigate to="/market" replace /> },
    ],
  },
]);
