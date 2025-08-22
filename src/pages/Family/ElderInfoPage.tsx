import edit_active from '@/assets/Icons/edit_Property 1=text.svg'
import profileImage from '@/assets/images/profile.png'
import { useNavigate } from 'react-router-dom'
import { TextField_Elder } from '@/components/TextField_Elder'
import { useLeaderStore } from '@/stores/Leader.store'
import { useEffect, useState } from 'react'
import { apiClient } from '@/shared/api/client'

const ElderInfoPage: React.FC = () => {
    const navigate = useNavigate()
    const { isLeader } = useLeaderStore()
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [number, setNumber] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [address, setAddress] = useState('')
    const [addressDetail, setAddressDetail] = useState('')
    const [imgUrl, setImgUrl] = useState<string | null>(null)

    const handleEdit = () => {
        navigate('/my-family/elder-info/edit')
    }

    useEffect(() => {
        apiClient.get('/api/family').then(res => {
            console.log(res)
            setName(res.data.data.elder.name)
            // birth 값을 yyyy-mm-dd에서 yyyy년mm월dd일 형식으로 변환
            const birthDate = res.data.data.elder.birth
            const formatBirthToKorean = (dateString: string) => {
                if (!dateString) return ''
                const parts = dateString.split('-')
                if (parts.length === 3) {
                    const year = parts[0]
                    const month = parts[1]
                    const day = parts[2]
                    return `${year}년 ${month}월 ${day}일`
                }
                return dateString
            }
            const formattedBirth = formatBirthToKorean(birthDate)
            setBirth(formattedBirth)
            setNumber(res.data.data.elder.number)
            setAddressNumber(res.data.data.elder.addressNumber)
            setAddress(res.data.data.elder.address)
            setAddressDetail(res.data.data.elder.addressDetail)
            setImgUrl(res.data.data.elder.img?.cid || null)
        })
    }, [])

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4'>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-row justify-between mt-6'>
                    <p className='text-[16px]'><span className='font-semibold'>소식지를 전달받을 분</span>이에요.</p>
                    {isLeader ? <img src={edit_active} alt="edit" className='cursor-pointer' onClick={handleEdit} /> : <div className='' />}
                </div>
                <img src={imgUrl ? `https://api.deardream.r-e.kr/ipfs/${imgUrl}` : profileImage} alt="profile" className='w-[84px] h-[84px] mx-auto bg-gray-400 rounded-full' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>이름</p>
                <TextField_Elder value={name} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>생년월일</p>
                <TextField_Elder value={birth} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>전화번호</p>
                <TextField_Elder value={number} />
            </div>

            <div className='flex flex-col gap-3'>
                    <p>배송지 주소</p>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-2'>
                            <TextField_Elder
                                value={addressNumber}
                            />
                            <div className='w-[50%]'/>
                        </div>
                        <TextField_Elder
                            value={address}
                        />
                        <TextField_Elder
                            value={addressDetail}
                        />
                    </div>
                </div>

        </div>
    )
}

export default ElderInfoPage