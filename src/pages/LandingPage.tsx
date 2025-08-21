import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

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
            <img src={logo} alt='logo' className='w-[180px] mb-24' />
        </div>
    )
}

export default LandingPage