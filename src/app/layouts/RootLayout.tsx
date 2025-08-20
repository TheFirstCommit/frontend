import { Header } from '@/app/Headert'
import { NavBar } from '@/app/NavBar'
import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const location = useLocation()

  // Header와 Footer를 숨길 경로들
  const hideHeaderPaths = ['/landing', '/login', '/signup', '/onboarding', '/billing']

  const hideFooterPaths = ['/landing', '/login', '/signup', '/onboarding', '/billing', '/posting']

  // 현재 경로가 Header를 숨겨야 하는지 확인
  const shouldHideHeader = hideHeaderPaths.some(path => location.pathname.startsWith(path))

  // 현재 경로가 Footer를 숨겨야 하는지 확인
  const shouldHideFooter = hideFooterPaths.some(path => location.pathname.startsWith(path))

  // Header 텍스트를 경로에 따라 설정
  const getHeaderText = () => {
    const path = location.pathname

    if (path.startsWith('/home')) return '홈'
    if (path.startsWith('/family-group')) return '가족그룹'
    if (path.startsWith('/postbox')) return '우편함'
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
