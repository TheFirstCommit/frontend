import { CTA } from "@/components/Buttons"
import { apiClient } from "@/shared/api/client"
import { useSignUpInfoStore } from "@/stores/signup.store"
import { useNavigate } from "react-router-dom"
import illustration from '@/assets/images/illustration.png'

const SignUpComplete:React.FC = () => {
    const navigate = useNavigate()
    const { info } = useSignUpInfoStore()

    const handleClick = () => {
        navigate('/family-group')
        const formData = new FormData()

        formData.append('name', info.name ?? '')
        formData.append('birth', info.birth ?? '')
        formData.append('number', info.phone ?? '')
        if(info.profile) {
            formData.append('img', info.profile as File)
        }

        apiClient.patch('/public/user', formData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='bg-background min-h-dvh flex flex-col px-6 items-center'>
            <div className='flex flex-col gap-6 justify-center items-center text-[28px] font-extrabold mt-36 mb-9'>
                <p>축하합니다!</p>
                <p>회원가입이 완료되었습니다.</p>
            </div>


                <img src={illustration} alt="illustration" className='w-full h-full object-cover' />

            <CTA className='h-16 mt-auto mb-9' text='가족 만나러 가기' variant='main' onClick={handleClick} />
        </div>
    )
}

export default SignUpComplete