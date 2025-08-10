import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useEffect, useState } from 'react'
import { useThemeStore } from '@/stores/theme.store'

type Props = { children: ReactNode }

export default function AppProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}


