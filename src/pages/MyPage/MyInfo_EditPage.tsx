import edit_active from '@/assets/Icons/edit_Property 1=text.svg'
import profileImage from '@/assets/images/profile.png'
import { TextField } from '@/components/TextField'
import { useState } from 'react'
import { Button, CTA } from '@/components/Buttons'
import { useNavigate } from 'react-router-dom'
import { Dropdown_Relation } from '@/components/Dropdown_Relation'
import { Dropdown_Date } from '@/components/Dropdown_Date'

const MyInfo_EditPage: React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [relation, setRelation] = useState('')

    const handleSave = () => {
        console.log('save')
        navigate('/mypage/info')
    }

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4'>

            <div className='flex flex-col gap-4 mt-4'>
                <img src={profileImage} alt="profile" className='w-[84px] h-[84px] mx-auto' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>이름</p>
                <TextField value={name} onChange={setName} placeholder='이름을 입력해주세요.' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>생년월일</p>
                <Dropdown_Date value={{ year: 1990, month: 1, day: 1 }} onChange={() => {}} />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>전화번호</p>
                <TextField value={phone} onChange={setPhone} placeholder='전화번호를 입력해주세요.' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>소식을 전해줄 분과는 어떤 관계인가요?</p>
                <Dropdown_Relation value={relation} onChange={setRelation   } />
            </div>

            <CTA className='mt-auto mb-9' text='수정하기' variant='main' onClick={handleSave} />
        </div>
    )
}

export default MyInfo_EditPage