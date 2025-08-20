import { useNavigate } from "react-router-dom"

const LoginPage:React.FC = () => {
    const navigate = useNavigate()
    const handleSocialLogin = async (provider:string) => {
        navigate(`/public/social/${provider}`)
    }

    return(
        <div className="flex mt-20 items-center gap-10">
            <button className="hover:cursor-pointer border-2 border-gray-300 rounded-md p-2" onClick={() => handleSocialLogin('kakao')}>Kakao</button>
            <button className="hover:cursor-pointer border-2 border-gray-300 rounded-md p-2" onClick={() => handleSocialLogin('google')}>Google</button>
            <button className="hover:cursor-pointer border-2 border-gray-300 rounded-md p-2" onClick={() => handleSocialLogin('naver')}>Naver</button>
        </div>
    )
}

export default LoginPage