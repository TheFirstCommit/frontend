import { Button, CTA } from "@/components/Buttons"
import { Radio_Button } from "@/components/RadioButton"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Modal from "@/components/Modal"
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { generateCustomerKey } from '@/shared/utils/generateCustomerKey'

const PaymentRegister:React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [selectedDate, setSelectedDate] = useState<number>(0)
    const [cardAvailable, setCardAvailable] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [customerKey] = useState(() => generateCustomerKey())
    const [paymentError, setPaymentError] = useState<string>('')

    // URL 파라미터로 카드 등록 결과 확인
    useEffect(() => {
        const status = searchParams.get('status')
        const errorMessage = searchParams.get('message')

        if (status === 'success') {
            setCardAvailable(true)
            setPaymentError('')
        } else if (status === 'fail') {
            setCardAvailable(false)
            setPaymentError(errorMessage || '카드 등록에 실패했습니다.')
        }
    }, [searchParams])

    // Toss 결제창 직접 호출
    const handlePayment = async () => {
        try {
            const clientKey = 'test_ck_kYG57Eba3GR0DPKMQ7X98pWDOxmA'
            const tossPayments = await loadTossPayments(clientKey)

            const payment = tossPayments.payment({
                customerKey,
            })

            await payment.requestBillingAuth({
                method: 'CARD',
                successUrl: `${window.location.origin}/billing/payment/success`,
                failUrl: `${window.location.origin}/billing/payment/fail`,
                customerEmail: 'customer123@gmail.com',
                customerName: '김토스',
            })
        } catch (error) {
            console.error('Error requesting billing auth:', error)
            setPaymentError('카드 등록 중 오류가 발생했습니다.')
        }
    }

    // 현재 날짜를 기준으로 자동 선택
    useEffect(() => {
        const today = new Date()
        const dayOfMonth = today.getDate()

        if (dayOfMonth >= 1 && dayOfMonth <= 15) {
            setSelectedDate(1)
        } else {
            setSelectedDate(0)
        }
    }, [])

    const handleDateChange = (value: number | string) => {
        setSelectedDate(Number(value))
    }

    const handleStart = () => {
        navigate('/home')
    }

    return (
        <div className='bg-background min-h-dvh flex flex-col px-6'>

            <div className='flex flex-col gap w-full font-semibold text-[18px] my-7'>
                <p>바쁜 당신을 대신해 이어드림이 </p>
                <p>한 달에 한번, 가족 소식을 발송해 드려요.</p>
            </div>

            <div className='flex flex-col gap-3 pb-8 border-b border-gray-300'>
                <p className='text-base'>오늘을 기준으로 가족 소식 발행일을 추천해드렸어요!</p>
                <Radio_Button
                    className='text-sm'
                    value={0}
                    text='매월 둘째 주 일요일'
                    onChange={handleDateChange}
                    checked={selectedDate === 0}
                />
                <Radio_Button
                    className='text-sm'
                    value={1}
                    text='매월 넷째 주 일요일'
                    onChange={handleDateChange}
                    checked={selectedDate === 1}
                />
            </div>

            <div className='mt-7'>
                <p className='mb-7'>구독 결제일은 회원님의 소식 발행일에 맞춰 진행돼요.</p>
                <div className='flex flex-col gap-3'>
                    <p>결제 수단 등록</p>
                    {cardAvailable ? (
                        <Button className='mx-4 text-primary-900' text='카드 등록완료' variant='primary' onClick={() => {}} />
                    ) : (
                        <Button className='mx-4' text='카드 등록하기' variant='secondary' onClick={handlePayment} />
                    )}
                    {paymentError && (
                        <p className='text-error text-sm ml-4'>{paymentError}</p>
                    )}
                </div>
            </div>
            {cardAvailable ? (
                <div className='mt-auto flex flex-col gap-3 items-center'>
                    <p className='text-sm'>매월 같은 주 일요일에 소식지를 발행드릴게요.</p>
                    <CTA className='mb-9' text='시작하기' variant='main' onClick={handleStart} />
                </div>
            ) : (
                <CTA className='mt-auto mb-9' text='나중에 등록' variant='sub' onClick={() => setIsModalOpen(true)} />
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='flex flex-col gap-3 px-6 pt-7 items-center'>
                    <p className='font-semibold text-[16px]'>발행일 전까지 카드를 등록해주세요.</p>
                    <p className='font-semibold text-sm'>카드를 등록해야 소식지를 받는 분께 전할 수 있어요.</p>
                    <CTA className='mt-auto' text='확인' variant='main' onClick={handleStart} />
                </div>
            </Modal>
        </div>
    )
}

export default PaymentRegister