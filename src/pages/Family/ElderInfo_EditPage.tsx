import edit_active from '@/assets/Icons/edit_Property 1=text.svg'
import profileImage from '@/assets/images/profile.png'
import { TextField } from '@/components/TextField'
import { useState } from 'react'
import { Button, CTA } from '@/components/Buttons'
import { useNavigate } from 'react-router-dom'

const ElderInfo_EditPage: React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [addressNumber, setAddressNumber] = useState('')
    const [address, setAddress] = useState('')
    const [addressDetail, setAddressDetail] = useState('')

    const openAddress = () => {
        console.log('openAddress')
    }

    const handleSave = () => {
        console.log('save')
        navigate('/my-family/elder-info')
    }

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4'>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-row justify-between mt-6'>
                    <p className='text-[16px]'><span className='font-semibold'>소식지를 전달받을 분</span>이에요.</p>
                </div>
                <img src={profileImage} alt="profile" className='w-[84px] h-[84px] mx-auto' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>이름</p>
                <TextField value={name} onChange={setName} placeholder='이름을 입력해주세요.' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>생년월일</p>
                <TextField value={birthday} onChange={setBirthday} placeholder='생년월일을 입력해주세요.' />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[16px] font-normal'>전화번호</p>
                <TextField value={phone} onChange={setPhone} placeholder='전화번호를 입력해주세요.' />
            </div>

            <div className='flex flex-col gap-3'>
                    <p>배송지 주소</p>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-2'>
                            <TextField
                                value={addressNumber}
                                onChange={setAddressNumber}
                                disabled={true}
                                placeholder='우편번호'
                            />
                            <Button className='w-[50%]' text='우편번호 찾기' variant='secondary' onClick={openAddress} />
                        </div>
                        <TextField
                            value={address}
                            onChange={setAddress}
                            disabled={true}
                            placeholder='주소지'
                        />
                        <TextField
                            value={addressDetail}
                            onChange={setAddressDetail}
                            placeholder='상세주소를 입력하세요.'
                        />
                    </div>
                </div>

            <CTA className='mt-auto mb-9' text='저장하기' variant='main' onClick={handleSave} />
        </div>
    )
}

export default ElderInfo_EditPage