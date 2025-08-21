import warning from '@/assets/Icons/warning_icon_red.svg'
import { CTA } from '@/components/Buttons'
import { Checkbox } from '@/components/Checkbox'
import { Dropdown_Dynamic } from '@/components/Dropdown_Dynamic'
import Modal from '@/components/Modal'
import { useState } from 'react'

const LeavePage: React.FC = () => {
    const [reason, setReason] = useState('')
    const [isAgree, setIsAgree] = useState(false)
    const [isLeader, setIsLeader] = useState(true)
    const [isLeaderChangeModal, setIsLeaderChangeModal] = useState(false)
    const [isLeaveConfirmModal, setIsLeaveConfirmModal] = useState(false)
    const [nextLeader, setNextLeader] = useState('')
    const [memberList, setMemberList] = useState([])

    const reasonOptions = [
        { id: 1, name: '가족 소식이 더 이상 필요하지 않아요.' },
        { id: 2, name: '다른 가족 그룹과 함께하려고 해요.' },
        { id: 3, name: '앱 사용이 불편해요.' },
        { id: 4, name: '구독 요금이 부담돼요.' },
        { id: 5, name: '다른 방법으로 가족과 소식을 공유해요.' }
    ]

    const handleLeave = () => {
        if (isLeader) {
            // 리더
            setIsLeaderChangeModal(true)
        } else {
            // 멤버
            setIsLeaveConfirmModal(true)
        }
    }

    const handleLeaderChange = () => {
        setIsLeaderChangeModal(false)
        setIsLeaveConfirmModal(true)
    }

    const handleLeaveConfirm = () => {
        setIsLeaveConfirmModal(false)
    }

    return (
        <div className='min-h-[calc(100vh-56px)] flex flex-col px-4 gap-6'>

            <div className='flex flex-col gap-3 mt-6'>
                <p className='text-xl font-extrabold text-gray-900'>정말 떠나시려는 건가요?</p>
                <div className='font-semibold text-[14px] text-gray-700'>
                    <p>탈퇴하면 그동안 가족과 나눈 소중한 순간들이 모두 삭제돼요.</p>
                    <p>다시 복구할 수 없으니 신중히 결정해 주세요.</p>
                </div>
            </div>

            <div className='flex flex-col gap-3 border border-error rounded-xl py-3 px-4'>
                <div className='flex gap-2 items-center'>
                    <img src={warning} alt="warning" className='size-6' />
                    <p className='font-semibold text-[14px] text-gray-900'>탈퇴 시 아래 정보는 영구적으로 삭제돼요.</p>
                </div>
                <div className='font-normal text-[12px] text-gray-700 pl-8'>
                    <p>내 계정 및 로그인 정보</p>
                    <p>내가 작성한 피드</p>
                    <p>발행한 가족 소식지 목록</p>
                    <p>결제 수단 정보 (정기 구독 포함)</p>
                </div>
            </div>

            <div>
                <p className='font-extrabold text-lg text-gray-900'>탈퇴하려는 이유가 궁금해요.</p>
                <Dropdown_Dynamic options={reasonOptions} value={reason} onChange={setReason} allowCustomInput={true} />
            </div>

            <div className='flex flex-col gap-2 mt-auto mb-7'>
                <Checkbox checked={isAgree} text='위 내용을 숙지하였으며 탈퇴에 동의합니다.' onChange={setIsAgree} className='pl-2' />
                <CTA className='' text='탈퇴하기' variant='sub' onClick={handleLeave} />
            </div>

            <Modal isOpen={isLeaderChangeModal} onClose={() => setIsLeaderChangeModal(false)}>
                <div className='flex flex-col items-center justify-center gap-4 px-6 pt-8'>
                    <p className='text-[16px] font-semibold text-gray-900'>해지 전 리더를 변경해야해요.</p>
                    <Dropdown_Dynamic className='' value={nextLeader} onChange={setNextLeader} placeholder='멤버 이름' options={memberList} />
                    <div className='flex gap-1 mt-auto mb-4 w-[80%]'>
                        <button className='w-full text-[16px] font-bold text-gray-700' onClick={() => setIsLeaderChangeModal(false)}>취소</button>
                        <CTA text='변경' variant='main' onClick={handleLeaderChange}/>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isLeaveConfirmModal} onClose={() => setIsLeaveConfirmModal(false)}>
                <div className='flex flex-col items-center justify-center gap-5 px-6 pt-8'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-[16px] font-semibold text-gray-900'>정말 <span className='text-[#DB3448]'>해지하실건가요?</span></p>
                        <p className='text-[14px] font-normal text-gray-800'>해지하면 다음 소식지는 발행되지 않아요.</p>
                    </div>
                    <div className='flex gap-1 mb-4 w-[80%]'>
                        <button className='w-full text-[16px] font-bold text-gray-700' onClick={() => setIsLeaveConfirmModal(false)}>취소</button>
                        <CTA text='탈퇴' variant='main' onClick={handleLeaveConfirm}/>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default LeavePage