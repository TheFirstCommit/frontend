/**
 * 고유한 customerKey를 생성합니다.
 * @returns 랜덤 문자열 (24자리)
 */
export function generateCustomerKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
