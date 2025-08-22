import { Button, CTA } from "@/components/Buttons"
import { Radio_Button } from "@/components/RadioButton"
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { generateCustomerKey } from '@/shared/utils/generateCustomerKey'
import { useFamilyGroupStore } from '@/stores/familyGroup.store'
import { apiClient } from "@/shared/api/client"

const MyPage_PaymentRegister: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const { setPaymentDay, paymentDay, familyName, elder, relation, elderImg } = useFamilyGroupStore()
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

    // Toss 결제창 직접 호출 (동적 리다이렉트 지원)
    const handlePayment = async () => {
      try {
        const clientKey = 'test_ck_kYG57Eba3GR0DPKMQ7X98pWDOxmA'
        const tossPayments = await loadTossPayments(clientKey)

        const payment = tossPayments.payment({
          customerKey,
        })

        // 카드 등록 완료 후 /mypage/group/payment 페이지로 리다이렉트
        const returnUrl = encodeURIComponent('/mypage/group/payment')

        await payment.requestBillingAuth({
          method: 'CARD',
          successUrl: `${window.location.origin}/billing/payment/success?returnUrl=${returnUrl}`,
          failUrl: `${window.location.origin}/billing/payment/fail?returnUrl=${returnUrl}`,
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
        setPaymentDay('SECOND_SUNDAY')
        apiClient.patch('/api/family', {
          paymentDay: 'SECOND_SUNDAY',
        })
      } else {
        setPaymentDay('FOURTH_SUNDAY')
        apiClient.patch('/api/family', {
          paymentDay: 'FOURTH_SUNDAY',
        })
      }
    }, [])

    const handleDateChange = (value: string | number) => {
      setPaymentDay(value as string)
      apiClient.patch('/api/family', {
        paymentDay: value,
      })
    }

    const handleStart = () => {
      navigate('/home')
    }

    return (
      <div className="bg-background min-h-[calc(100vh-56px)] flex flex-col px-6">
        <div className="flex flex-col gap w-full font-semibold text-[18px] my-7">
          <p>바쁜 당신을 대신해 이어드림이 </p>
          <p>한 달에 한번, 가족 소식을 발송해 드려요.</p>
        </div>

        <div className="flex flex-col gap-3 pb-8 border-b border-gray-300">
          <p className="text-base">오늘을 기준으로 가족 소식 발행일을 추천해드렸어요!</p>
          <Radio_Button
            className="text-sm"
            value="SECOND_SUNDAY"
            text="매월 둘째 주 일요일"
            onChange={handleDateChange}
            checked={paymentDay === 'SECOND_SUNDAY'}
          />
          <Radio_Button
            className="text-sm"
            value="FOURTH_SUNDAY"
            text="매월 넷째 주 일요일"
            onChange={handleDateChange}
            checked={paymentDay === 'FOURTH_SUNDAY'}
          />
        </div>

        <div className="mt-7">
          <p className="mb-7">구독 결제일은 회원님의 소식 발행일에 맞춰 진행돼요.</p>
          <div className="flex flex-col gap-3">
            <p>결제 수단 등록</p>
            {cardAvailable ? (
              <Button className="mx-4 text-primary-900" text="카드 등록완료" variant="primary" onClick={() => {}} />
            ) : (
              <Button className="mx-4" text="카드 등록하기" variant="secondary" onClick={handlePayment} />
            )}
            {paymentError && <p className="text-error text-sm ml-4">{paymentError}</p>}
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-3 px-6 pt-7 items-center mb-6">
            <p className="font-semibold text-[16px]">발행일 전까지 카드를 등록해주세요.</p>
            <p className="font-semibold text-sm">카드를 등록해야 소식지를 받는 분께 전할 수 있어요.</p>
            <CTA className="mt-auto" text="확인" variant="main" onClick={handleStart} />
          </div>
        </Modal>
      </div>
    )
}

export default MyPage_PaymentRegister