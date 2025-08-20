import { loadTossPayments, type TossPaymentsPayment } from '@tosspayments/tosspayments-sdk'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { apiClient } from './client'
import { generateCustomerKey } from '@/shared/utils/generateCustomerKey'

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = 'test_ck_kYG57Eba3GR0DPKMQ7X98pWDOxmA'

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null)
  const [customerKey] = useState(() => generateCustomerKey())

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey)
        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        })
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });
        setPayment(payment)
      } catch (error) {
        console.error('Error fetching payment:', error)
      }
    }
    fetchPayment()
  }, [clientKey, customerKey])
  // ------ '카드 등록하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestBillingAuth() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    await payment?.requestBillingAuth({
      method: 'CARD', // 자동결제(빌링)는 카드만 지원합니다
      successUrl: window.location.origin + '/billing/payment/success', // 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + '/billing/payment/fail', // 요청이 실패하면 리다이렉트되는 URL
      customerEmail: 'customer123@gmail.com',
      customerName: '김토스',
    })
  }
  return (
    // 카드 등록하기 버튼
    <button className="button" onClick={() => requestBillingAuth()}>
      카드 등록하기
    </button>
  )
}

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const didConfirm = useRef(false)

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.

    async function confirm() {
      // 개발 환경에서 요청 한번만 보내도록 설정
      if (didConfirm.current) return
      didConfirm.current = true

      try {
        await apiClient.post(`/public/payment/card`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            customerKey: searchParams.get('customerKey'),
            authKey: searchParams.get('authKey'),
          },
        })

        // API 통신 성공 후 PaymentRegister 페이지로 리다이렉트
        navigate('/family-group/create/payment?status=success')
      } catch (error) {
        console.error('Payment confirmation error:', error)
        // API 통신 실패 시에도 PaymentRegister 페이지로 리다이렉트 (실패 상태로)
        navigate('/family-group/create/payment?status=fail&message=결제 확인 중 오류가 발생했습니다.')
      }
    }
    confirm()
  }, [searchParams, navigate])

  return (
    <div className="result wrapper">
      <div className="box_section">
        <p>카드 등록 성공</p>
        <div>customerKey: {searchParams.get('customerKey')}</div>
        <div>authKey: {searchParams.get('authKey')}</div>
        <p>PaymentRegister 페이지로 이동 중...</p>
      </div>
    </div>
  )
}

export function FailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    // 실패 시 PaymentRegister 페이지로 리다이렉트
    const errorMessage = searchParams.get('message') || '카드 등록에 실패했습니다.'
    navigate(`/family-group/create/payment?status=fail&message=${encodeURIComponent(errorMessage)}`)
  }, [searchParams, navigate])

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${searchParams.get('code')}`}</p>
        <p>{`실패 사유: ${searchParams.get('message')}`}</p>
        <p>PaymentRegister 페이지로 이동 중...</p>
      </div>
    </div>
  )
}
