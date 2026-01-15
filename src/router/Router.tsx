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
import { AssetAccountDetailPage } from '@/pages/Asset/tab/AssetDetails/AssetAccountDetailPage';
import { SectorDetailPage } from '@/pages/Asset/tab/SectorAnalysis/SectorDetailPage';
import { SectorFullListPage } from '@/pages/Asset/tab/SectorAnalysis/SectorFullListPage';
import { AssetDetails } from '@/pages/Asset/tab/AssetDetails/AssetDetailsPage';
import { SectorAnalysis } from '@/pages/Asset/tab/SectorAnalysis/SectorAnalysisPage';
import { CompareAnalysis } from '@/pages/Asset/tab/CompareAnalysis/CompareAnalysisPage';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <SplashPage /> },
      { path: 'onboarding', element: <OnboardingPage /> },
      { path: 'home', element: <HomePage /> },
      {
        path: 'asset',
        element: <AssetPage />, // 여기에 탭 버튼과 레이아웃이 있음
        children: [
          { index: true, element: <AssetDetails /> }, // /asset (기본탭)
          { path: 'sector', element: <SectorAnalysis /> }, // /asset/sector (분야별)
          { path: 'compare', element: <CompareAnalysis /> }, // /asset/compare (비교)
        ],
      },
      { path: 'asset/account/:id', element: <AssetAccountDetailPage /> },
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
      { path: 'asset/sector-full', element: <SectorFullListPage /> },
      { path: 'asset/sector/:categoryKey', element: <SectorDetailPage /> },
    ],
  },
]);
