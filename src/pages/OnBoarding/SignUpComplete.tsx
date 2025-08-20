import { CTA } from "@/components/Buttons"
import { useNavigate } from "react-router-dom"

const SignUpComplete:React.FC = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/family-group')
    }

    return (
        <div className='bg-background min-h-dvh flex flex-col px-6 items-center'>
            <div className='flex flex-col gap-6 justify-center items-center text-[28px] font-extrabold mt-28 mb-9'>
                <p>축하합니다!</p>
                <p>회원가입이 완료되었습니다.</p>
            </div>

            <div className='w-[90%] h-60 bg-gray-500'>
                로고
            </div>

            <CTA className='h-16 mt-auto mb-9' text='가족 만나러 가기' variant='main' onClick={handleClick} />
        </div>
    )
}

export default SignUpComplete