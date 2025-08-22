import Icon_Back from '@/assets/icons/icon_Back.svg'
import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate()
  const location = useLocation()

    const handleBackClick = () => {
    // /mypage/group/payment 경로일 때는 /mypage로 이동
    if (location.pathname === '/mypage/group/payment') {
      navigate('/mypage')
    } else {
      // 현재 경로에서 한 단계씩 내려가기
      const pathSegments = location.pathname.split('/').filter(Boolean)

      if (pathSegments.length === 0) {
        // 루트 경로(/)인 경우 /home으로 이동
        navigate('/home')
             } else {
         // 마지막 세그먼트를 제거하고 새로운 경로 생성
         const remainingSegments = pathSegments.slice(0, -1)
         if (remainingSegments.length === 0) {
           // 더 이상 상위 경로가 없으면 /home으로 이동
           navigate('/home')
         } else {
           // 남은 세그먼트들로 경로 생성
           const newPath = '/' + remainingSegments.join('/')
           navigate(newPath)
         }
       }
    }
  }

  return (
    <div className="sticky top-0 left-0 right-0 z-50 drop-shadow-lg">
      <div className="flex justify-between items-center h-14 bg-white px-4 max-w-sm mx-auto">
        <img src={Icon_Back} alt="back" className="w-9 h-9 cursor-pointer" onClick={handleBackClick} />
        <p className="font-bold text-[16px]">{title}</p>
        <div className="w-9 h-9" />
      </div>
    </div>
  )
}
