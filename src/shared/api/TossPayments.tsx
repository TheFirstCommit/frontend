import { loadTossPayments, type TossPaymentsPayment } from '@tosspayments/tosspayments-sdk'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRef } from 'react'
import { apiClient } from './client'

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = 'test_ck_kYG57Eba3GR0DPKMQ7X98pWDOxmA'
const customerKey = 'uV6RuDO4Q02TEnGoWw_ct'
export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null)
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
  const didConfirm = useRef(false)

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.

    async function confirm() {
      // 개발 환경에서 요청 한번만 보내도록 설정
      if (didConfirm.current) return
      didConfirm.current = true

      apiClient
        .post(`/api/payment/card`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            customerKey: searchParams.get('customerKey'),
            authKey: searchParams.get('authKey'),
          },
        })
        .then(res => {
          console.log(res)
        })

      // 결제 성공 비즈니스 로직을 구현하세요.
      const timeout = setTimeout(() => {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage('payment-success', window.location.origin)
          window.close()
        }
      }, 500)

      return () => clearTimeout(timeout)
    }
    confirm()
  }, [])

  return (
    <div className="result wrapper">
      <div className="box_section">
        <p>카드 등록 성공</p>
        <div>customerKey: {searchParams.get('customerKey')}</div>
        <div>authKey: {searchParams.get('authKey')}</div>
      </div>
    </div>
  )
}

export function FailPage() {
  const [searchParams] = useSearchParams()

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${searchParams.get('code')}`}</p>
        <p>{`실패 사유: ${searchParams.get('message')}`}</p>
      </div>
    </div>
  )
}
