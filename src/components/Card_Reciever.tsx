import arrowRightSmall from '@/assets/Icons/arrow_right_small.svg'
import profileImage from '@/assets/images/profile.png'

interface CardRecieverProps {
  name?: string
  date?: string
  imgUrl?: string | null
  onClick?: () => void
}

export const Card_Reciever: React.FC<CardRecieverProps> = ({
  name = '사용자',
  date = '1900.00.00',
  imgUrl = null,
  onClick
}) => {
  // date 값을 yyyy-mm-dd에서 yyyy.mm.dd 형식으로 변환
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '1900.00.00') return dateString
    return dateString.replace(/-/g, '.')
  }

  const formattedDate = formatDate(date)

  return (
    <div
      className="flex items-center justify-between p-4 bg-background2 rounded-xl cursor-pointer"
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}
      onClick={onClick}
    >
      {/* 왼쪽 영역: 프로필 아이콘 */}
      <div className="flex items-center gap-3">
        <div className="w-[84px] h-[84px] bg-gray-400 rounded-full flex items-center justify-center">
            <img src={imgUrl ? `https://api.deardream.r-e.kr/ipfs/${imgUrl}` : profileImage} alt="profile" className="w-[84px] h-[84px] rounded-full" />
        </div>

        {/* 중앙 텍스트 영역 */}
        <div className="flex flex-col">
          <span className="font-extrabold text-gray-900 text-xl">{name}</span>
          <span className="text-gray-900 text-[16px] font-normal">{formattedDate}</span>
        </div>
      </div>

      {/* 오른쪽 영역: 화살표 아이콘 */}
      <img
        src={arrowRightSmall}
        alt="arrow right"
        className="w-9 h-9"
      />
    </div>
  )
}