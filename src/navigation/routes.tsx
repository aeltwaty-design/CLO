import { createBrowserRouter, Navigate } from 'react-router-dom';
import ScreenTransition from './ScreenTransition';
import MarketScreen from '../screens/MarketScreen';
import StoreScreen from '../screens/StoreScreen';
import CashbackIntroScreen from '../screens/CashbackIntroScreen';
import AddCardScreen from '../screens/AddCardScreen';
import LinkSuccessScreen from '../screens/LinkSuccessScreen';
import CardsScreen from '../screens/CardsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';

export const router = createBrowserRouter([
  {
    element: <ScreenTransition />,
    children: [
      { path: '/', element: <Navigate to="/market" replace /> },
      { path: '/market', element: <MarketScreen /> },
      { path: '/store/:id', element: <StoreScreen /> },
      { path: '/cashback/intro', element: <CashbackIntroScreen /> },
      { path: '/cashback/add-card', element: <AddCardScreen /> },
      { path: '/cashback/success', element: <LinkSuccessScreen /> },
      { path: '/cards', element: <CardsScreen /> },
      { path: '/transactions', element: <TransactionsScreen /> },
      { path: '*', element: <Navigate to="/market" replace /> },
    ],
  },
]);
