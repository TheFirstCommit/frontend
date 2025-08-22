import { useEffect, useState } from "react"

interface Subscription_InfoProps {
    subscription: boolean
    price?: number
    paymentDay?: string
    nextPaymentDay?: string
    sincePaymentDay?: string
    leaderName?: string
}

export const Subscription_Info:React.FC<Subscription_InfoProps> = ({ subscription, price, paymentDay, nextPaymentDay, sincePaymentDay, leaderName }) => {

    const [paymentDayString, setPaymentDayString] = useState('')

    useEffect(() => {
        if(paymentDay == 'SECOND_SUNDAY') {
            setPaymentDayString('매월 둘째 주 일요일')
        } else if(paymentDay == 'FOURTH_SUNDAY') {
            setPaymentDayString('매월 넷째 주 일요일')
        }
    }, [paymentDay])

    return (
        <div className='bg-background2 border border-primary-700 rounded-xl py-3 px-4'>
            <div className='flex justify-between'>
                <p className='font-extrabold text-lg'>소식지 발행 정기 구독</p>
                {subscription ? '' : <p>₩{price}/월</p>}
            </div>

            {subscription ? (
                <div className='font-normal text-sm text-gray-700 gap-1'>
                    <div className='flex gap-3'>
                        <p className='w-20'>구독 시작일</p>
                    <p>{sincePaymentDay}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='w-20'>소식 마감일</p>
                    <p>{paymentDayString}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='w-20'>다음 결제일</p>
                    <p>{nextPaymentDay}</p>
                </div>
                <div className='flex gap-3'>
                    <p className='w-20'>결제자</p>
                    <p>{leaderName}</p>
                    </div>
                </div>
            ) : (
                <div className='font-normal text-sm text-gray-700 gap-1'>
                    <p>현재 구독 상태가 아니에요.</p>
                    <p>구독 결제는 <span className='font-semibold'>가족그룹의 리더</span>만 가능해요,</p>
                    <p>정기 구독을 시작하고 가족에게 소식을 전해보세요!</p>
                </div>
            )}

        </div>
    )
}