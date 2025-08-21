import { apiClientPublic } from "@/shared/api/client";
import { useSignUpInfoStore } from "@/stores/signup.store";
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const SocialLogin: React.FC = () => {
  const { provider } = useParams()
  const code = new URL(document.location.toString()).searchParams.get('code')
  const calledRef = useRef(false) // 인증 중복 방지
  const { setInfo } = useSignUpInfoStore()

  useEffect(() => {
    if (!provider) {
      console.error('Provider not found in URL')
      return
    }
    if (calledRef.current) return
    calledRef.current = true
    apiClientPublic
      .post(`/public/social/${provider}`, {
        code: code,
      })
      .then(res => {
        console.log('Social login response:', res)
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)
        if (res.data.data.user) {
          setInfo('profile', res.data.data.user.profile)
          setInfo('name', res.data.data.user.name)
          setInfo('birth', res.data.data.user.birth)
          setInfo('phone', res.data.data.user.number)
          window.location.href = '/signup'
        } else {
            window.location.href = '/home'
        }
      })
      .catch(error => {
        console.error('Social login error:', error)
      })
  }, [code])

  return null
}

export default SocialLogin