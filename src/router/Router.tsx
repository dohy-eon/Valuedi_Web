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
import { CurrentGoalPage } from '@/pages/Goal/List/CurrentGoalPage';
import { PastGoalPage } from '@/pages/Goal/List/PastGoalPage';
import AmountAchievedPage from '@/pages/Goal/Detail/AmountAchievedPage';
import GoalCreatePage from '@/pages/Goal/Create/GoalCreatePage';
import GoalCreateStep from '@/pages/Goal/Create/GoalCreateStep';
import GoalCompletePage from '@/pages/Goal/Create/GoalCompletePage';
import SavingSimulationPage from '@/pages/Goal/Detail/SavingSimulationPage';

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
import { AssetAccountDetailPage } from '@/pages/Asset/tab/AssetDetails/AssetAccountDetailPage';
import { MbtiPage } from '@/features/mbti/MbtiPage';

export const paths = {
  goal: {
    current: '/goal/current',
    past: '/goal/past',
    // (옵션) id 없이 접근하는 절약 시뮬레이션 페이지
    savingSimulation: '/goal/saving-simulation',
    amountAchieved: (id: string | number) => `/goal/detail/${id}/amount-achieved`,
    savingsSimulation: (id: string | number) => `/goal/detail/${id}/savingsimulation`,
    amountAchievedRoute: '/goal/detail/:id/amount-achieved',
    savingsSimulationRoute: '/goal/detail/:id/savingsimulation',
    create: '/goal/create',
    createStep: '/goal/create/step',
    createComplete: '/goal/create/complete',
  },
} as const;

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <SplashPage /> },
      { path: 'onboarding', element: <OnboardingPage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'asset', element: <AssetPage /> },
      { path: 'asset/account/:id', element: <AssetAccountDetailPage /> },
      { path: 'recommend', element: <RecommendPage /> },
      { path: paths.goal.current, element: <CurrentGoalPage /> },
      { path: paths.goal.past, element: <PastGoalPage /> },
      { path: paths.goal.savingSimulation, element: <SavingSimulationPage /> },
      { path: paths.goal.amountAchievedRoute, element: <AmountAchievedPage /> },
      { path: paths.goal.savingsSimulationRoute, element: <SavingSimulationPage /> },
      { path: paths.goal.create, element: <GoalCreatePage /> },
      { path: paths.goal.createStep, element: <GoalCreateStep /> },
      { path: paths.goal.createComplete, element: <GoalCompletePage /> },
      { path: 'login', element: <DefaultLogin /> },
      { path: 'login/form', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: '/signup/email', element: <EmailForm /> },
      { path: 'mbti', element: <MbtiPage /> },
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
