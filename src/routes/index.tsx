import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
])


