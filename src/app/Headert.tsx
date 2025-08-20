import Icon_Back from '@/assets/icons/icon_Back.svg'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1) // 이전 페이지로 돌아가기
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
