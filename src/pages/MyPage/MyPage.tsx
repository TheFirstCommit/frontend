import { Badge_Leader } from "@/components/Badge_leader"
import { Badge_Provider } from "@/components/Badge_Provider"
import { CTA } from "@/components/Buttons"
import Modal from "@/components/Modal"
import { MyPage_List } from "@/components/MyPage_List"
import { Subscription_Info } from "@/components/Subscription_Info"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MyPage: React.FC = () => {
    const navigate = useNavigate()
    const [socialProvider, setSocialProvider] = useState('google')
    const [username, setUsername] = useState('테스트')
    const [isLeader, setIsLeader] = useState(true)
    const [hasCard, setHasCard] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)

    const handleEdit = () => {
        navigate('/mypage/info')
    }

    const handleGroupPayment = () => {
        navigate('/mypage/group/payment')
    }

    const openLogoutModal = () => {
        setLogoutModal(true)
    }

    const handleLeave = () => {
        navigate('/mypage/leave')
    }

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col'>

            <div className='flex flex-col gap-4 px-4 mt-6'>
                <Badge_Provider provider={socialProvider} />
                <div className='flex gap-2 items-center'>
                    <p className='font-extrabold text-2xl'>{username} 님</p>
                    {isLeader && <Badge_Leader />}
                </div>
                <div>
                    <Subscription_Info subscription={hasCard} price={6900} paymentDay='매월 넷째 주 일요일' nextPaymentDay='2025-09-21' sincePaymentDay='2025-08-21' leaderName='테스트' />
                </div>
            </div>

            <div className='flex flex-col gap-3 mt-3'>
                <div>
                    <MyPage_List contents='내 정보 변경' onClick={handleEdit}/>
                    {isLeader && <MyPage_List contents='결제 수단 관리' onClick={handleGroupPayment}/>}
                </div>
                <div>
                    <MyPage_List contents='로그아웃' onClick={openLogoutModal}/>
                    <MyPage_List contents='탈퇴하기' onClick={handleLeave}/>
                </div>
            </div>


        <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
            <div className='flex flex-col items-center justify-center gap-4 px-6 pt-8'>
                <p className='text-[16px] font-semibold text-gray-900'>로그아웃 하시겠어요?</p>
                <div className='flex gap-1 mb-4 w-[80%]'>
                    <button className='w-full text-[16px] font-bold text-gray-700' onClick={() => setLogoutModal(false)}>취소</button>
                    <CTA text='로그아웃' variant='main' onClick={()=>{}}/>
                </div>
            </div>
        </Modal>

        </div>
    )
}

export default MyPage