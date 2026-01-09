import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages';
import LoginPage from '@/pages/Login/LoginPage';
import SignUpPage from '@/pages/SignUp/SignUpPage';
import DefaultLogin from '@/pages/Login/DefaultLogin';
import EmailForm from '@/pages/SignUp/EmailForm';
import SplashPage from '@/pages/Splash/SplashPage';
import OnboardingPage from '@/pages/Onboarding/OnboardingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <SplashPage /> },
      { path: 'onboarding', element: <OnboardingPage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'login', element: <DefaultLogin /> },
      { path: 'login/form', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: '/signup/email', element: <EmailForm /> },
    ],
  },
]);
