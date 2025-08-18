import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-[#444444]">
      {/* 데스크탑에서는 중앙 정렬된 모바일 크기, 모바일에서는 전체 너비 */}
      <div className="mx-auto max-w-sm min-h-dvh bg-background">
        <Outlet />
      </div>
    </div>
  )
}
