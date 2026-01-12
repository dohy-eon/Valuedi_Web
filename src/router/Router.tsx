import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages';
import LoginPage from '@/pages/Login/LoginPage';
import SignUpPage from '@/pages/SignUp/SignUpPage';
import DefaultLogin from '@/pages/Login/DefaultLogin';
import EmailForm from '@/pages/SignUp/EmailForm';
import SplashPage from '@/pages/Splash/SplashPage';
import OnboardingPage from '@/pages/Onboarding/OnboardingPage';
import AssetPage from '@/pages/Asset/AssetPage';
import RecommendPage from '@/pages/Recommend/RecommendPage';
import GoalPage from '@/pages/Goal/GoalPage';
import {
  BankConnectionStartPage,
  BankSelectPage,
  BankIdInputPage,
  BankPasswordInputPage,
  BankConnectingPage,
  BankConnectedPage,
  BankAdditionalConnectionPage,
} from '@/pages/Bank';
import {
  CardConnectionStartPage,
  CardSelectPage,
  CardIdInputPage,
  CardPasswordInputPage,
  CardConnectingPage,
  CardConnectedPage,
  CardAdditionalConnectionPage,
} from '@/pages/Card';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <SplashPage /> },
      { path: 'onboarding', element: <OnboardingPage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'asset', element: <AssetPage /> },
      { path: 'recommend', element: <RecommendPage /> },
      { path: 'goal', element: <GoalPage /> },
      { path: 'login', element: <DefaultLogin /> },
      { path: 'login/form', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: '/signup/email', element: <EmailForm /> },
      { path: 'bank/start', element: <BankConnectionStartPage /> },
      { path: 'bank/select', element: <BankSelectPage /> },
      { path: 'bank/input-id', element: <BankIdInputPage /> },
      { path: 'bank/input-password', element: <BankPasswordInputPage /> },
      { path: 'bank/connecting', element: <BankConnectingPage /> },
      { path: 'bank/connected', element: <BankConnectedPage /> },
      { path: 'bank/additional', element: <BankAdditionalConnectionPage /> },
      { path: 'card/start', element: <CardConnectionStartPage /> },
      { path: 'card/select', element: <CardSelectPage /> },
      { path: 'card/input-id', element: <CardIdInputPage /> },
      { path: 'card/input-password', element: <CardPasswordInputPage /> },
      { path: 'card/connecting', element: <CardConnectingPage /> },
      { path: 'card/connected', element: <CardConnectedPage /> },
      { path: 'card/additional', element: <CardAdditionalConnectionPage /> },
    ],
  },
]);
