import { SocialButton } from '@/components/Buttons'
import Icon_Kakao from '@/assets/icons/icon_Kakao.svg'
import Icon_Google from '@/assets/icons/icon_Google.svg'
import Icon_Naver from '@/assets/icons/icon_Naver.svg'

const LoginPage: React.FC = () => {
  const handleSocialLogin = async (provider: string) => {
    window.location.href = `http://localhost:8080/public/social/${provider}`
  }

  return (
    <div className="flex gap-10 bg-background min-h-dvh">
      <div className="flex flex-col justify-center w-full px-5">
        <div className="flex justify-center mt-auto mb-auto">
          <div className="w-[180px] h-[90px] bg-gray-200">로고자리</div>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-4 mt-auto mb-20">
          <div className="flex items-center justify-center mb-2">
            <div className="flex-1 h-0.5 bg-gray-400"></div>
            <span className="mx-4 text-sm font-semibold">소셜 계정 간편 로그인 / 회원가입</span>
            <div className="flex-1 h-0.5 bg-gray-400"></div>
          </div>

          <SocialButton
            className="bg-[#03C75A] text-white"
            text="네이버로 시작하기"
            icon={Icon_Naver}
            onClick={() => handleSocialLogin('naver')}
          />
          <SocialButton
            className="bg-[#FEE500] text-gray-900"
            text="카카오로 시작하기"
            icon={Icon_Kakao}
            onClick={() => handleSocialLogin('kakao')}
          />
          <SocialButton
            className="bg-white drop-shadow-sm text-gray-700"
            text="구글로 시작하기"
            icon={Icon_Google}
            onClick={() => handleSocialLogin('google')}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
