import { CTA } from "@/components/Buttons"
import { TextField_WithButton } from "@/components/TextField_WithButton"
import { Dropdown_Relation } from "@/components/Dropdown_Relation"
import { useState } from "react"

const JoinPage:React.FC = () => {
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

        try {
            // API 호출 (실제 구현 시 실제 API 엔드포인트로 변경)
            const response = await fetch('/api/validate-invite-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })

            if (response.ok) {
                setIsCodeValidated(true)
                setErrorMessage('')
            } else {
                const errorData = await response.json()
                setErrorMessage(errorData.message || '초대코드를 다시 확인해 주세요.')
            }
        } catch (error) {
            // API 호출 실패 시 임시로 성공 처리 (개발용)
            console.log('API 호출 실패, 임시로 성공 처리:', error)
            setIsCodeValidated(true)
            setErrorMessage('')
        } finally {
            setIsLoading(false)
        }
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
        console.log('그룹 가입 완료:', { code, relation })
        // navigate('/family-group/join/complete')
    }

    return (
        <div className='min-h-dvh flex flex-col px-6'>
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