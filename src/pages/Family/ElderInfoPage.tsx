import edit_active from '@/assets/Icons/edit_Property 1=text.svg'
import profileImage from '@/assets/images/profile.png'
import { useNavigate } from 'react-router-dom'
import { TextField_Elder } from '@/components/TextField_Elder'
import { useLeaderStore } from '@/stores/Leader.store'
import { useFamilyStore } from '@/stores/family.store'

const ElderInfoPage: React.FC = () => {
    const navigate = useNavigate()
    const { isLeader } = useLeaderStore()
    const { elder } = useFamilyStore()

    const handleEdit = () => {
        navigate('/my-family/elder-info/edit')
    }

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4'>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-row justify-between mt-6'>
                    <p className='text-[16px]'><span className='font-semibold'>소식지를 전달받을 분</span>이에요.</p>
                    {isLeader ? <img src={edit_active} alt="edit" onClick={handleEdit} /> : <div className='' />}
                </div>
                <img src={elder.imgUrl ? `https://api.deardream.r-e.kr/ipfs/${elder.imgUrl}` : profileImage} alt="profile" className='w-[84px] h-[84px] mx-auto bg-gray-400 rounded-full' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>이름</p>
                <TextField_Elder value={elder.name} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>생년월일</p>
                <TextField_Elder value={elder.birth} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>전화번호</p>
                <TextField_Elder value={elder.number} />
            </div>

            <div className='flex flex-col gap-3'>
                    <p>배송지 주소</p>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-2'>
                            <TextField_Elder
                                value={elder.addressNumber}
                            />
                            <div className='w-[50%]'/>
                        </div>
                        <TextField_Elder
                            value={elder.address}
                        />
                        <TextField_Elder
                            value={elder.addressDetail}
                        />
                    </div>
                </div>

        </div>
    )
}

export default ElderInfoPage