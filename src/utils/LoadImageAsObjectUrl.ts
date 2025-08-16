export async function loadImageAsObjectUrl(url: string) {
  const res = await fetch(url, { mode: 'cors' }); // CORS 허용 서버여야 함
  const blob = await res.blob();
  return URL.createObjectURL(blob); // 이 URL은 same-origin처럼 동작
}