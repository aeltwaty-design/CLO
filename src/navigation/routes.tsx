import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScreenTransition from './ScreenTransition';
import MarketScreen from '../screens/MarketScreen';
import StoreRouter from '../screens/store/StoreRouter';
import CashbackIntroScreen from '../screens/CashbackIntroScreen';
import AddCardScreen from '../screens/AddCardScreen';
import LinkSuccessScreen from '../screens/LinkSuccessScreen';
import { CardsHome, CardsManage } from '../screens/CardsDispatch';
import TransactionsScreen from '../screens/TransactionsScreen';

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
      { path: '*', element: <Navigate to="/market" replace /> },
    ],
  },
]);
