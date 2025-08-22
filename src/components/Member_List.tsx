import profileImage from '@/assets/images/profile.png'
import { Badge_Leader } from './Badge_leader'

interface Member_ListProps {
    name: string
    relation: string
    imgUrl: string | null
}

export const Member_List_Leader:React.FC<Member_ListProps> = ({ name, relation, imgUrl }) => {
    return (
        <div className='flex flex-row pb-3 border-b border-background2 items-center gap-4'>
            <img src={imgUrl ? `https://api.deardream.r-e.kr/ipfs/${imgUrl}` : profileImage} alt="profile" className="w-[44px] h-[44px] rounded-full" />
            <div className='flex flex-row gap-2 items-center'>
                <p className='text-[16px] font-semibold'>{name} / {relation}</p>
                <Badge_Leader />
            </div>
        </div>
    )
}

export const Member_List:React.FC<Member_ListProps> = ({ name, relation, imgUrl }) => {
    return (
        <div className='flex flex-row pb-3 border-b border-background2 items-center gap-4'>
            <img src={imgUrl ? imgUrl : profileImage} alt="profile" className="w-[44px] h-[44px] rounded-full" />
            <div className='flex flex-row gap-2'>
                <p className='text-[16px] font-semibold'>{name} / {relation}</p>
            </div>
        </div>
    )
}