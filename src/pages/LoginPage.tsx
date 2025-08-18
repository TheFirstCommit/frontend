import { SocialButton } from '@/components/Buttons'
import { useNavigate } from 'react-router-dom'
import Icon_Kakao from '@/assets/icons/icon_Kakao.svg'
import Icon_Google from '@/assets/icons/icon_Google.svg'
import Icon_Naver from '@/assets/icons/icon_Naver.svg'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const handleSocialLogin = async (provider: string) => {
    navigate(`/public/social/${provider}`)
  }

  return (
    <div className="flex items-center gap-10 bg-background">
      <div className='flex flex-col justify-center w-full px-5'>

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-4">
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
