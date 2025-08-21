import badge_google from '@/assets/icons/badge_google.svg'
import badge_naver from '@/assets/icons/badge_naver.svg'
import badge_kakao from '@/assets/icons/badge_kakao.svg'

interface Badge_ProviderProps {
    provider: string
}

export const Badge_Provider:React.FC<Badge_ProviderProps> = ({ provider }) => {
    const badgeMap: Record<string, string> = {
        google: badge_google,
        naver: badge_naver,
        kakao: badge_kakao,
    };

    return (
        <div className='flex items-center gap-2'>
            <img src={badgeMap[provider]} alt={`badge_${provider}`} className='w-6 h-6' />
            <p className='font-semibold text-lg text-gray-900'>{provider === 'google' ? '구글' : provider === 'naver' ? '네이버' : '카카오'} 로그인 회원</p>
        </div>
    )
}