import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFound'
import SocialLogin from '@/pages/SocialLogin'
import LoginPage from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/social/:provider',
    element: <SocialLogin />,
  },
])


