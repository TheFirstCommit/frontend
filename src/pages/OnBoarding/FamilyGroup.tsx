import { Group_Button } from "@/components/Group_Button"
import { useNavigate } from "react-router-dom"

const FamilyGroup:React.FC = () => {
    const navigate = useNavigate()

    const handleCreate = () => {
        navigate('/family-group/create')
    }

    const handleJoin = () => {
        navigate('/family-group/join')
    }

    return (
        <div className='bg-background min-h-dvh flex flex-col px-6 items-center justify-center gap-14'>
            <div className='flex flex-col gap-3 items-center'>
                <p className='text-lg font-regular'>가족 리더가 되어 그룹을 만들어요!</p>
                <Group_Button text='가족 그룹 만들기' onClick={handleCreate} />
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <p className='text-lg font-regular'>가족 리더가 되어 그룹을 만들어요!</p>
                <Group_Button text='가족 그룹 참여하기' onClick={handleJoin} />
            </div>
        </div>
    )
}

export default FamilyGroup