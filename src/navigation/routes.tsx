import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScreenTransition from './ScreenTransition';
import MarketScreen from '../screens/MarketScreen';
import StoreRouter from '../screens/store/StoreRouter';
import CashbackIntroScreen from '../screens/CashbackIntroScreen';
import AddCardScreen from '../screens/AddCardScreen';
import LinkSuccessScreen from '../screens/LinkSuccessScreen';
import { CardsHome, CardsManage } from '../screens/CardsDispatch';
import TransactionsScreen from '../screens/TransactionsScreen';
import WithdrawAccountScreen from '../screens/withdraw/WithdrawAccountScreen';
import WithdrawNewAccountScreen from '../screens/withdraw/WithdrawNewAccountScreen';
import WithdrawAmountScreen from '../screens/withdraw/WithdrawAmountScreen';
import WithdrawSummaryScreen from '../screens/withdraw/WithdrawSummaryScreen';
import WithdrawPinScreen from '../screens/withdraw/WithdrawPinScreen';
import WithdrawStatusScreen from '../screens/withdraw/WithdrawStatusScreen';

export const router = createBrowserRouter([
  {
    element: <ScreenTransition />,
    children: [
      { path: '/', element: <Navigate to="/market" replace /> },
      { path: '/market', element: <MarketScreen /> },
      { path: '/store/:id', element: <StoreRouter /> },
      { path: '/cashback/intro', element: <CashbackIntroScreen /> },
      { path: '/cashback/add-card', element: <AddCardScreen /> },
      { path: '/cashback/success', element: <LinkSuccessScreen /> },
      { path: '/cards', element: <CardsHome /> },
      { path: '/cards/manage', element: <CardsManage /> },
      { path: '/transactions', element: <TransactionsScreen /> },
      // WithdrawProvider lives in App.tsx (above the keyed ScreenTransition,
      // which remounts per route and would reset nested provider state)
      { path: '/withdraw/account', element: <WithdrawAccountScreen /> },
      { path: '/withdraw/new-account', element: <WithdrawNewAccountScreen /> },
      { path: '/withdraw/amount', element: <WithdrawAmountScreen /> },
      { path: '/withdraw/summary', element: <WithdrawSummaryScreen /> },
      { path: '/withdraw/pin', element: <WithdrawPinScreen /> },
      { path: '/withdraw/status', element: <WithdrawStatusScreen /> },
      { path: '*', element: <Navigate to="/market" replace /> },
    ],
  },
]);
