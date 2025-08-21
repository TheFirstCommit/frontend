import { SocialButton } from '@/components/Buttons'
import Icon_Kakao from '@/assets/icons/icon_Kakao.svg'
import Icon_Google from '@/assets/icons/icon_Google.svg'
import Icon_Naver from '@/assets/icons/icon_Naver.svg'
import logo from '@/assets/images/logo.png'

const FRONT_URL         = import.meta.env.VITE_FRONT_URL ?? window.location.origin
const NAVER_CLIENT_ID   = import.meta.env.VITE_NAVER_CLIENT_ID  ?? ''
const KAKAO_CLIENT_ID   = import.meta.env.VITE_KAKAO_CLIENT_ID  ?? ''
const GOOGLE_CLIENT_ID  = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''

function randomState() {
  const r = new Uint8Array(16)
  crypto.getRandomValues(r)
  return btoa(String.fromCharCode(...r))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const LoginPage: React.FC = () => {
  const handleSocialLogin = (provider: 'naver'|'kakao'|'google') => {
    const redirectUri = `${FRONT_URL}/social/${provider}`
    const state = randomState()

    let url = ''
    if (provider === 'naver') {
      url = `https://nid.naver.com/oauth2.0/authorize?response_type=code`
        + `&client_id=${encodeURIComponent(NAVER_CLIENT_ID)}`
        + `&redirect_uri=${encodeURIComponent(redirectUri)}`
        + `&scope=${encodeURIComponent('nickname profile_image birthday mobile')}`
        + `&state=${encodeURIComponent(state)}`
    } else if (provider === 'kakao') {
      url = `https://kauth.kakao.com/oauth/authorize?response_type=code`
        + `&client_id=${encodeURIComponent(KAKAO_CLIENT_ID)}`
        + `&redirect_uri=${encodeURIComponent(redirectUri)}`
        + `&scope=${encodeURIComponent('profile_image name birthday birthyear phone_number')}`
        + `&state=${encodeURIComponent(state)}`
    } else {
      url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code`
        + `&client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}`
        + `&redirect_uri=${encodeURIComponent(redirectUri)}`
        + `&scope=${encodeURIComponent('openid profile')}`
        + `&access_type=offline&prompt=consent`
        + `&state=${encodeURIComponent(state)}`
    }
    window.location.assign(url)
  }

  return (
    <div className="flex gap-10 bg-background min-h-dvh">
      <div className="flex flex-col justify-center w-full px-5">
        <div className="flex justify-center mt-auto">
          <img src={logo} alt="logo" className="w-[180px]" />
        </div>

        <div className="flex flex-col gap-4 mt-auto mb-20">
          <div className="flex items-center justify-center mb-2">
            <div className="flex-1 h-0.5 bg-gray-400" />
            <span className="mx-4 text-sm font-semibold">소셜 계정 간편 로그인 / 회원가입</span>
            <div className="flex-1 h-0.5 bg-gray-400" />
          </div>

          <SocialButton className="bg-[#03C75A] text-white" text="네이버로 시작하기" icon={Icon_Naver}
            onClick={() => handleSocialLogin('naver')} />
          <SocialButton className="bg-[#FEE500] text-gray-900" text="카카오로 시작하기" icon={Icon_Kakao}
            onClick={() => handleSocialLogin('kakao')} />
          <SocialButton className="bg-white drop-shadow-sm text-gray-700" text="구글로 시작하기" icon={Icon_Google}
            onClick={() => handleSocialLogin('google')} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage