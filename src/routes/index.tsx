import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFound'
import SocialLogin from '@/pages/SocialLogin'
import LoginPage from '@/pages/LoginPage'
import { PaymentCheckoutPage, SuccessPage, FailPage } from '@/shared/api/TossPayments'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
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
])


