import { Button_Sub, CTA } from "@/components/Buttons"
import { Dropdown_Dynamic } from "@/components/Dropdown_Dynamic"
import Modal from "@/components/Modal"
import { apiClient } from "@/shared/api/client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Group_Payment: React.FC = () => {
    const navigate = useNavigate()
    const [leaderChange, setLeaderChange] = useState(false)
    const [nextLeader, setNextLeader] = useState('')
    const [unSubCheck, setUnSubCheck] = useState(false)
    const [cardData, setCardData] = useState({
        cardCampany: '',
        cardNumber: '',
    })
    const [memberList, setMemberList] = useState([])

    useEffect(() => {
        apiClient.get('/api/user/delete').then(res => {
            if(res.data.data.familyMember.members) {
                const members = res.data.data.familyMember.members.map((member: { id: number; name: string; relation:string }) => ({
                    id: member.id,
                    name: member.name,
                }))
                setMemberList(members)
            }
        })
    },[])

    const handleUnsubscribe = () => {
        setLeaderChange(true)
    }

    const handleUnsubCheck = () => {
        setLeaderChange(false)
        setUnSubCheck(true)
        apiClient.delete('/api/user/delete', {
            data: {
                nextLeaderId: nextLeader
            }
        }).then(() => {
            navigate('/mypage')
        })
    }

    useEffect(() => {
        apiClient.get('/api/payment/card').then(res => {
            setCardData({
                cardCampany: res.data.data.cardCompany,
                cardNumber: res.data.data.cardNumber,
            })
        })
    }, [])

    return (
        <div className='min-h-[calc(100vh-56px)] flex flex-col gap-4'>
            <p className='font-semibold text-lg text-gray-900 mt-6 px-6'>카드를 등록하신 날을 기준으로 매월 같은 날짜에 자동 결제가 진행돼요.</p>

            <div className='border-b border-gray-300 p-4'>
                <p className='font-semibold text-xl text-gray-900'>등록 카드</p>
            </div>

            <div className='flex justify-between mt-6 px-6 items-center'>
                <div className='flex gap-4 items-center'>
                    <div className='w-[96px] h-[54px] bg-gray-200'>{/*카드 이미지*/}</div>
                    <div>
                        <p className='text-sm font-semibold text-gray-900'>{cardData.cardCampany}</p>
                        <p className='text-[12px] font-normal text-gray-900'>{cardData.cardNumber}</p>
                    </div>
                </div>
                <Button_Sub text='변경' onClick={() => navigate('/mypage/group/payment/register')} />
            </div>

            <div className='px-4 mt-auto mb-9'>
            <CTA text='구독 해지하기' variant='sub' onClick={handleUnsubscribe} />
            </div>

            {/* 리더 변경 모달 */}
            <Modal isOpen={leaderChange} onClose={() => setLeaderChange(false)}>
                <div className='flex flex-col items-center justify-center gap-4 px-6 pt-8'>
                    <p className='text-[16px] font-semibold text-gray-900'>해지 전 리더를 변경해야해요.</p>
                    <Dropdown_Dynamic className='' value={nextLeader} onChange={setNextLeader} placeholder='멤버 이름' options={memberList} />
                    <div className='flex gap-1 mt-auto mb-4 w-[80%]'>
                        <button className='w-full text-[16px] font-bold text-gray-700' onClick={() => setLeaderChange(false)}>취소</button>
                        <CTA text='변경' variant='main' onClick={handleUnsubCheck}/>
                    </div>
                </div>
            </Modal>

            {/* 구독 해지 모달 */}
            <Modal isOpen={unSubCheck} onClose={() => setUnSubCheck(false)}>
                <div className='flex flex-col items-center justify-center gap-5 px-6 pt-8'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-[16px] font-semibold text-gray-900'>정말 <span className='text-[#DB3448]'>해지하실건가요?</span></p>
                        <p className='text-[14px] font-normal text-gray-800'>해지하면 다음 소식지는 발행되지 않아요.</p>
                    </div>
                    <div className='flex gap-1 mb-4 w-[80%]'>
                        <button className='w-full text-[16px] font-bold text-gray-700' onClick={() => setUnSubCheck(false)}>취소</button>
                        <CTA text='해지' variant='main' onClick={handleUnsubCheck}/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Group_Payment