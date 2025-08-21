// Toss Payments URL 생성 유틸리티 함수
export const generateTossPaymentsUrl = (returnUrl: string) => {
  const baseUrl = 'https://pay.toss.im'
  const params = new URLSearchParams({
    returnUrl: returnUrl
  })
  return `${baseUrl}?${params.toString()}`
}

// 결제 요청 시 현재 페이지 URL을 returnUrl로 전달하는 함수
export const requestPayment = (currentPath: string) => {
  const returnUrl = encodeURIComponent(currentPath)
  const tossUrl = generateTossPaymentsUrl(returnUrl)
  window.location.href = tossUrl
}
