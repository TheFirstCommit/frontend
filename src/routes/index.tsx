import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/app/layouts/RootLayout'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFound'
import SocialLogin from '@/pages/SocialLogin'
import LoginPage from '@/pages/OnBoarding/LoginPage'
import {SuccessPage, FailPage } from '@/shared/api/TossPayments'
import { ComponentTestPage } from '@/pages/ComponentTestPage'
import SignUpPage from '@/pages/OnBoarding/SignUpPage'
import SignUpComplete from '@/pages/OnBoarding/SignUpComplete'
import FamilyGroup from '@/pages/OnBoarding/FamilyGroup'
import CreateGroup from '@/pages/OnBoarding/CreateGroup'
import PaymentRegister from '@/pages/OnBoarding/PaymentRegister'
import JoinPage from '@/pages/OnBoarding/JoinPage'
import LandingPage from '@/pages/LandingPage'
import MyFamily from '@/pages/Family/MyFamily'
import ElderInfoPage from '@/pages/Family/ElderInfoPage'
import ElderInfo_EditPage from '@/pages/Family/ElderInfo_EditPage'
import DaumApiTest from '@/components/DaumApiTest'
import PdfTestPage from "@/pages/PdfTestPage";
import RemotePdfPage from '@/pages/RemotePdfPage';
import LayoutsPage from "@/pages/FeedPages/LayoutsPage";
import ComposePhotosPage from "@/pages/FeedPages/ComposePhotosPage"
import MyPage from '@/pages/MyPage/MyPage'
import MyInfoPage from '@/pages/MyPage/MyInfoPage'
import MyInfo_EditPage from '@/pages/MyPage/MyInfo_EditPage'
import Group_Payment from '@/pages/MyPage/Group_Payment'
import LeavePage from '@/pages/MyPage/LeavePage'
import HomePage from '@/pages/HomePage'

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
            path: 'payment/success',
            element: <SuccessPage />,
          },
          {
            path: 'payment/fail',
            element: <FailPage />,
          },
        ],
      },
      {
        path: 'my-family',
        element: <MyFamily />,
      },
      {
        path: 'my-family/elder-info',
        element: <ElderInfoPage />,
      },
      {
        path: 'my-family/elder-info/edit',
        element: <ElderInfo_EditPage />,
      },
      {
        path: '/daumapitest',
        element: <DaumApiTest />
      },
      {
        path: "/pdftest", element: <PdfTestPage />
      },
      {
        path: "/pdfviewer", element: <RemotePdfPage />
      },
      {
        path: "/layouts", element: <LayoutsPage />
      },
      {
        path: "compose", element: <ComposePhotosPage />
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'mypage/info',
        element: <MyInfoPage />,
      },
      {
        path: 'mypage/info/edit',
        element: <MyInfo_EditPage />,
      },
      {
        path: 'mypage/group/payment',
        element: <Group_Payment />,
      },
      {
        path: 'mypage/leave',
        element: <LeavePage />,
      },
      {
        path: 'home',
        element: <HomePage />
      },
    ],
  },
  {
    path: '/test',
    element: <ComponentTestPage />,
  },
])


