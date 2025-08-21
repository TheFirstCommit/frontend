import { TextField_Elder } from "@/components/TextField_Elder"
import profileImage from '@/assets/images/profile.png'
import edit_active from '@/assets/Icons/edit_Property 1=text.svg'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MyInfoPage: React.FC = () => {
    const navigate = useNavigate()
    const [isLeader, setIsLeader] = useState(true)
    const [name, setName] = useState('테스트')
    const [birthday, setBirthday] = useState('2002년 03월 30일')
    const [phone, setPhone] = useState('010-1234-5678')
    const [relation, setRelation] = useState('손자')

    const handleEdit = () => {
        navigate('/mypage/info/edit')
    }
    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4'>

            <div className='flex flex-col mt-4'>
                <div className='flex flex-row justify-end'>
                    <img src={edit_active} alt="edit" onClick={handleEdit} />
                </div>
                <img src={profileImage} alt="profile" className='w-[84px] h-[84px] mx-auto' />
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