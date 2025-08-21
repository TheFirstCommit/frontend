import { CTA } from "@/components/Buttons"
import { TextField_WithButton } from "@/components/TextField_WithButton"
import { Dropdown_Relation } from "@/components/Dropdown_Relation"
import { useState } from "react"
import { apiClient } from "@/shared/api/client"
import { useNavigate } from "react-router-dom"

const JoinPage:React.FC = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState<string>('')
    const [relation, setRelation] = useState<string>('')
    const [isCodeValidated, setIsCodeValidated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [relationError, setRelationError] = useState<string>('')

    const handleCodeValidation = async () => {
        if (code.length !== 8) return

        setIsLoading(true)
        setErrorMessage('')

        apiClient.put('/social/family/invite', {
            familyCode: code
        }).then(res => {
            console.log(res)
            setIsCodeValidated(true)
            setErrorMessage('')
        }).catch(err => {
            console.log(err)
            setErrorMessage('초대코드를 다시 확인해 주세요.')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleRelationChange = (value: string) => {
        setRelation(value)
        if (value && value.trim() !== '') {
            setRelationError('')
        }
    }

    const handleStart = () => {
        // 초대코드 검증이 되지 않은 경우
        if (!isCodeValidated) {
            setErrorMessage('초대코드를 확인해 주세요.')
            return
        }

        // 관계를 설정하지 않은 경우
        if (!relation || relation.trim() === '') {
            setRelationError('받는 분과의 관계를 선택해주세요.')
            return
        }

        // 여기서 그룹 가입 처리
        apiClient.post('/social/family/invite',{
            familyCode: code,
            relation: relation
        }).then(() => {
            navigate('/home')
        }).catch(err => {
            console.log(err)
            setErrorMessage('그룹 가입 실패')
        })
    }

    return (
        <div className='min-h-[calc(100vh-56px)] flex flex-col px-6'>
            <div className='flex flex-col gap-3 items-center mt-auto'>
                <div>로고</div>
                <p className='text-[20px] font-semibold'>그룹 리더로부터 초대받으셨나요?</p>
                <p className='text-base font-normal'>초대코드를 입력해주시면 가족 그룹의 멤버가 돼요!</p>

                <TextField_WithButton
                    value={code}
                    onChange={setCode}
                    maxLength={8}
                    hasError={!!errorMessage}
                    errorMessage={errorMessage}
                    onButtonClick={handleCodeValidation}
                    autoUpperCase={true}
                    allowSpecialChars={false}
                />

                {isCodeValidated && (
                    <div className='w-full flex flex-col gap-3'>
                        <p className='text-base font-normal'>소식을 전달받을 분과는 어떤 관계인가요?</p>
                        <Dropdown_Relation
                            value={relation}
                            onChange={handleRelationChange}
                            hasError={!!relationError}
                            errorMessage={relationError}
                        />
                    </div>
                )}
            </div>

            <CTA
                className='mt-auto mb-9'
                text='시작하기'
                variant='main'
                onClick={handleStart}
            />
        </div>
    )
}

export default JoinPage