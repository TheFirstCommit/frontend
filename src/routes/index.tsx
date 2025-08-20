import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/app/layouts/RootLayout'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFound'
import SocialLogin from '@/pages/SocialLogin'
import LoginPage from '@/pages/OnBoarding/LoginPage'
import { PaymentCheckoutPage, SuccessPage, FailPage } from '@/shared/api/TossPayments'
import { ComponentTestPage } from '@/pages/ComponentTestPage'
import SignUpPage from '@/pages/OnBoarding/SignUpPage'
import SignUpComplete from '@/pages/OnBoarding/SignUpComplete'
import FamilyGroup from '@/pages/OnBoarding/FamilyGroup'
import CreateGroup from '@/pages/OnBoarding/CreateGroup'
import PaymentRegister from '@/pages/OnBoarding/PaymentRegister'
import JoinPage from '@/pages/OnBoarding/JoinPage'
import LandingPage from '@/pages/LandingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signup/complete',
        element: <SignUpComplete />,
      },
      {
        path: 'family-group',
        element: <FamilyGroup />,
      },
      {
        path: 'family-group/create',
        element: <CreateGroup />,
      },
      {
        path: 'family-group/create/payment',
        element: <PaymentRegister />,
      },
      {
        path: 'family-group/join',
        element: <JoinPage />,
      },
      {
        path: 'social/:provider',
        element: <SocialLogin />,
      },
      {
        path: 'billing',
        children: [
          {
            path: 'payment',
            element: <PaymentCheckoutPage />,
          },
          {
            path: 'payment/success',
            element: <SuccessPage />,
          },
          {
            path: 'payment/fail',
            element: <FailPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/test',
    element: <ComponentTestPage />,
  },
])


