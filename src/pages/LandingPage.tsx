import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login')
        }, 2000) // 2초 후 로그인 페이지로 이동

        return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 정리
    }, [navigate])

    return (
        <div className='flex items-center justify-center my-auto min-h-dvh'>
            <div className='w-[180px] h-[90px] mb-24 bg-gray-500'>로고</div>
        </div>
    )
}

export default LandingPage