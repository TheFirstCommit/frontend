import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2 text-gray-600">페이지를 찾을 수 없습니다.</p>
        <Link to="/" className="mt-6 inline-block rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
          홈으로
        </Link>
      </div>
    </main>
  )
}


