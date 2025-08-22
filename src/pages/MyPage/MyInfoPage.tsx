import { TextField_Elder } from "@/components/TextField_Elder"
import profileImage from '@/assets/images/profile.png'
import edit_active from '@/assets/Icons/edit_Property 1=text.svg'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiClient } from "@/shared/api/client"

const MyInfoPage: React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [relation, setRelation] = useState('')
    const [imgUrl, setImgUrl] = useState<string | null>(null)

    useEffect(() => {
        apiClient.get('/api/user').then(res => {
            setName(res.data.data.userInfoDto.name)
            const birthDate = res.data.data.userInfoDto.birth
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
            setBirthday(formattedBirth)
            setPhone(res.data.data.userInfoDto.number)
            setRelation(res.data.data.userInfoDto.relation)
            setImgUrl(res.data.data.userInfoDto.img?.cid || null)
        })
    }, [])

    const handleEdit = () => {
        navigate('/mypage/info/edit')
    }
    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4'>

            <div className='flex flex-col mt-4'>
                <div className='flex flex-row justify-end'>
                    <img src={edit_active} alt="edit" onClick={handleEdit} />
                </div>
                <img src={imgUrl ? `https://api.deardream.r-e.kr/ipfs/${imgUrl}` : profileImage} alt="profile" className='w-[84px] h-[84px] mx-auto bg-gray-400 rounded-full' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>이름</p>
                <TextField_Elder value={name} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>생년월일</p>
                <TextField_Elder value={birthday} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>전화번호</p>
                <TextField_Elder value={phone} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>소식을 전달받을 분과는 어떤 관계인가요?</p>
                <TextField_Elder value={relation} />
            </div>

        </div>
    )
}

export default MyInfoPage