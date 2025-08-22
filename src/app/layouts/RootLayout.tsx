import { Header } from '@/app/Headert'
import { NavBar } from '@/app/NavBar'
import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const location = useLocation()

  // Header와 Footer를 숨길 경로들
  const hideHeaderPaths = ['/', '/login', '/signup', '/signup/complete', '/billing', '/billing/payment/success', '/billing/payment/fail', '/family-group', '/layouts', '/social/kakao', '/social/google', '/social/naver' ]

  const hideFooterPaths = ['/', '/login', '/signup', '/signup/complete', '/social/kakao', '/social/google', '/social/naver', '/family-group', '/family-group/create', '/billing', '/billing/payment/success', '/billing/payment/fail', '/posting', '/family-group/create/payment', '/family-group/join', '/my-family/elder-info', '/my-family/elder-info/edit', '/layouts', '/compose', '/mypage/info', '/mypage/info/edit', '/mypage/group/payment', '/mypage/leave', '/mypage/group/payment/register']

  // 현재 경로가 Header를 숨겨야 하는지 확인
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname)

  // 현재 경로가 Footer를 숨겨야 하는지 확인
  const shouldHideFooter = hideFooterPaths.includes(location.pathname)

  // Header 텍스트를 경로에 따라 설정
  const getHeaderText = () => {
    const path = location.pathname

    if (path.includes('/family-group/create/payment')) return '결제 수단 등록하기'
    if (path.includes('/my-family/elder-info/edit')) return '받는 분 정보 수정하기'
    if (path.includes('/my-family/elder-info')) return '받는 분 정보'
    if (path.includes('/my-family')) return '나의 가족'
    if (path.startsWith('/home')) return '홈'
    if (path.includes('/family-group/join')) return ''
    if (path.includes('/family-group')) return '가족 그룹 생성하기'
    if (path.startsWith('/postbox')) return '우편함'
    if (path.includes('/mypage/group/payment')) return '결제 수단 관리'
    if (path.includes('/mypage/info/edit')) return '내 정보 수정하기'
    if (path.includes('/mypage/info')) return '내 정보 관리'
    if (path.includes('/mypage/leave')) return '탈퇴하기'
    if (path.startsWith('/mypage')) return '마이페이지'
    if (path.startsWith('/posting')) return '포스팅'


    return ''
  }

  return (
    <div className="min-h-dvh bg-[#444444]">
      {/* 데스크탑에서는 중앙 정렬된 모바일 크기, 모바일에서는 전체 너비 */}
      <div className="mx-auto max-w-sm min-h-dvh bg-background">
        {!shouldHideHeader && <Header title={getHeaderText()} />}
        <Outlet />
        {!shouldHideFooter && <NavBar />}
      </div>
    </div>
  )
}
