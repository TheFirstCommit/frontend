import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFound'
import DaumApiTest from '@/components/DaumApiTest'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '/daumapitest',
		element: <DaumApiTest />
	}
])


