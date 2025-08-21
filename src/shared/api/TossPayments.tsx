import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { apiClient } from './client'
import { useFamilyGroupStore } from '@/stores/familyGroup.store'

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const didConfirm = useRef(false)
  const { paymentDay } = useFamilyGroupStore()

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.

    async function confirm() {
      // 개발 환경에서 요청 한번만 보내도록 설정
      if (didConfirm.current) return
      didConfirm.current = true

      try {
        await apiClient.post(`/public/payment/card`, {
          customerKey: searchParams.get('customerKey'),
          authKey: searchParams.get('authKey'),
          paymentDay: paymentDay,
        })

        // 원래 페이지로 돌아가기 (returnUrl이 있으면 해당 URL로, 없으면 기본값)
        const returnUrl = searchParams.get('returnUrl') || '/family-group/create/payment'
        navigate(`${returnUrl}?status=success`)
      } catch (error) {
        console.error('Payment confirmation error:', error)
        // API 통신 실패 시에도 원래 페이지로 리다이렉트 (실패 상태로)
        const returnUrl = searchParams.get('returnUrl') || '/family-group/create/payment'
        navigate(`${returnUrl}?status=fail&message=결제 확인 중 오류가 발생했습니다.`)
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
        <p>원래 페이지로 이동 중...</p>
      </div>
    </div>
  )
}

export function FailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    // 실패 시 원래 페이지로 리다이렉트
    const errorMessage = searchParams.get('message') || '카드 등록에 실패했습니다.'
    const returnUrl = searchParams.get('returnUrl') || '/family-group/create/payment'
    navigate(`${returnUrl}?status=fail&message=${encodeURIComponent(errorMessage)}`)
  }, [searchParams, navigate])

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${searchParams.get('code')}`}</p>
        <p>{`실패 사유: ${searchParams.get('message')}`}</p>
        <p>원래 페이지로 이동 중...</p>
      </div>
    </div>
  )
}
