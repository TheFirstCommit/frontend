import { Card_Reciever } from "@/components/Card_Reciever"
import { Member_List, Member_List_Leader } from "@/components/Member_List"
import button_plus from '@/assets/icons/button_plus.svg'
import { useNavigate } from "react-router-dom"

const MyFamily:React.FC = () => {
    const navigate = useNavigate()

    const handleElderInfo = () => {
        navigate('/my-family/elder-info')
    }

    const handleInvite = () => {
        navigate('/family/invite')
    }

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6'>

            <div className='mt-6 mb-5'>
                <p className='text-xl font-semibold mb-4'>받는 분 정보</p>
                <Card_Reciever onClick={handleElderInfo} />
            </div>

            <div className='flex flex-col gap-4 bg-white rounded-xl p-2 border-gray-200 border'>
                <div className='flex flex-row items-center gap-4'>
                    <p className='font-semibold text-xl'>가족 그룹 멤버 목록</p>
                    <div className='flex flex-row items-center gap-1'>
                        <p>멤버 12명</p>
                        <img src={button_plus} alt="button_plus" className='w-8 h-8'  onClick={handleInvite}/>
                    </div>
                </div>
                <Member_List_Leader name="홍길동" relation="아들" />
                <Member_List name="홍길동" relation="아들" />
            </div>
        </div>
    )
}

export default MyFamily