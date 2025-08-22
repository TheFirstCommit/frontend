import { Badge_Leader } from "@/components/Badge_leader"
import { Badge_Provider } from "@/components/Badge_Provider"
import { CTA } from "@/components/Buttons"
import Modal from "@/components/Modal"
import { MyPage_List } from "@/components/MyPage_List"
import { Subscription_Info } from "@/components/Subscription_Info"
import { apiClient } from "@/shared/api/client"
import { useLeaderStore } from "@/stores/Leader.store"
import { useMyInfoStore } from "@/stores/myInfo.store"
import { usePaymentDayStore } from "@/stores/paymentDay.store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const MyPage: React.FC = () => {
    const navigate = useNavigate()
    const [logoutModal, setLogoutModal] = useState(false)
    const {isLeader, setIsLeader} = useLeaderStore()
    const {InfoData, setInfoData, setImgUrl} = useMyInfoStore()
    const [paymentData, setPaymentData] = useState({
        hasCard: false,
        price: 6900,
        paymentDay: '',
        nextPaymentDay: '',
        sincePaymentDay: '',
        leaderName: '',
    })
    const {setPaymentDayStore, paymentDayStore} = usePaymentDayStore()

    useEffect(() => {
        apiClient.get('/api/user').then(res => {
            setIsLeader(res.data.data.userInfoDto.isLeader)
            setInfoData({
                name: res.data.data.userInfoDto.name,
                birthday: res.data.data.userInfoDto.birthday,
                phone: res.data.data.userInfoDto.phone,
                relation: res.data.data.userInfoDto.relation,
                provider: res.data.data.userInfoDto.socialProvider,
            })
            if(res.data.data.userInfoDto.img.cid) {
                setImgUrl(res.data.data.userInfoDto.img.cid)
            }
            setPaymentData({
                hasCard: res.data.data.hasPaid,
                price: res.data.data.paymentDto.price ?? '',
                paymentDay: '',
                nextPaymentDay: '',
                sincePaymentDay: '',
                leaderName: '',
            })
            if(res.data.data.hasPaid) {
                setPaymentData(prev => ({
                    ...prev,
                    paymentDay: res.data.data.paymentDto.feedEndDay,
                    nextPaymentDay: res.data.data.paymentDto.nextPaymentDay,
                    sincePaymentDay: res.data.data.paymentDto.sincePaymentDay,
                    leaderName: res.data.data.paymentDto.leader.name,
                }))
                setPaymentDayStore(res.data.data.paymentDto.feedEndDay)
            }
            console.log(res)
        })
    }, [])

    const handleEdit = () => {
        navigate('/mypage/info')
    }

    const handleGroupPayment = () => {
        if(paymentData.hasCard) {
            navigate('/mypage/group/payment')
        } else {
            navigate('/mypage/group/payment/register')
        }
    }

    const openLogoutModal = () => {
        setLogoutModal(true)
    }

    const handleLeave = () => {
        navigate('/mypage/leave')
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('family-store')
        localStorage.removeItem('signup-info-store')
        localStorage.removeItem('signup-store')
        navigate('/')
    }

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col'>

            <div className='flex flex-col gap-4 px-4 mt-6'>
                <Badge_Provider provider={InfoData.provider} />
                <div className='flex gap-2 items-center'>
                    <p className='font-extrabold text-2xl'>{InfoData.name} 님</p>
                    {isLeader && <Badge_Leader />}
                </div>
                <div>
                    <Subscription_Info subscription={paymentData.hasCard} price={paymentData.price} paymentDay={paymentData.paymentDay} nextPaymentDay={paymentData.nextPaymentDay} sincePaymentDay={paymentData.sincePaymentDay} leaderName={paymentData.leaderName} />
                </div>
            </div>

            <div className='flex flex-col gap-3 mt-3'>
                <div>
                    <MyPage_List contents='내 정보 관리' onClick={handleEdit}/>
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
                    <CTA text='로그아웃' variant='main' onClick={handleLogout}/>
                </div>
            </div>
        </Modal>

        </div>
    )
}

export default MyPage