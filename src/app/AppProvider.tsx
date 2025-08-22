import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useEffect, useState } from 'react'
import { useThemeStore } from '@/stores/theme.store'
//import { apiClient } from '@/shared/api/client'
//import { useLocation, useNavigate } from 'react-router-dom'

type Props = { children: ReactNode }

export default function AppProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  /*
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    apiClient.get('/public/test').then(res => {
      const currentPath = location.pathname

      if(res.data === 'no') {
        // 'no' 상태일 때 허용된 페이지들
        const allowedPaths = ['/login', '/signup', '/signup/complete', '/social/google', '/social/naver', '/social/kakao']

        if (!allowedPaths.includes(currentPath)) {
          navigate('/signup')
        }
      } else if (res.data === 'SOCIAL') {
        // 'SOCIAL' 상태일 때 허용된 페이지들
        const allowedPaths = ['/family-group', '/family-group/create', '/family-group/create/payment', '/family-group/join']

        if (!allowedPaths.includes(currentPath)) {
          navigate('/family-group')
        }
      }
    }).catch(error => {
      console.error('인증 상태 확인 중 오류:', error)
    })
  }, [location.pathname, navigate])
  */

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}


