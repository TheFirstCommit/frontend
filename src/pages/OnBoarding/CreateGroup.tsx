import { Button, CTA } from "@/components/Buttons"
import { TextField } from "@/components/TextField"
import { PhoneField } from "@/components/PhoneField"
import profileImage from '@/assets/images/profile.png'
import { Dropdown_Date } from "@/components/Dropdown_Date"
import { useNavigate } from "react-router-dom"
import { Dropdown_Relation } from "@/components/Dropdown_Relation"
import { useFamilyGroupStore } from "@/stores/familyGroup.store"

const CreateGroup:React.FC = () => {
    const {
        familyName,
        elder,
        relation,
        setFamilyName,
        setElder,
        setRelation,
        errorMessage,
        setErrorMessage
    } = useFamilyGroupStore()
    const navigate = useNavigate()

    const handleNext = () => {
        // 모든 필수 필드 검증
        let hasError = false

        // 가족 그룹 이름 검증
        if (!familyName || familyName.trim() === '') {
            setErrorMessage('familyName', '가족 그룹 이름을 입력해주세요.')
            hasError = true
        } else {
            setErrorMessage('familyName', null)
        }

        // 어르신 이름 검증
        if (!elder.name || elder.name.trim() === '') {
            setErrorMessage('elderName', '받는 분의 이름을 입력해주세요.')
            hasError = true
        } else {
            setErrorMessage('elderName', null)
        }

        // 생년월일 검증
        if (elder.birth.year === 0 || elder.birth.month === 0 || elder.birth.day === 0) {
            setErrorMessage('elderBirth', '받는 분의 생년월일을 입력해주세요.')
            hasError = true
        } else {
            setErrorMessage('elderBirth', null)
        }

        // 전화번호 검증
        const phoneNumbers = elder.number.replace(/[^0-9]/g, '')
        if (phoneNumbers.length !== 11) {
            setErrorMessage('elderNumber', '받는 분의 전화번호를 정확히 입력해주세요.')
            hasError = true
        } else {
            setErrorMessage('elderNumber', null)
        }

        // 상세주소 검증
        if (!elder.addressDetail || elder.addressDetail.trim() === '') {
            setErrorMessage('elderAddressDetail', '배송지 주소를 입력해주세요.')
            hasError = true
        } else {
            setErrorMessage('elderAddressDetail', null)
        }

        // 관계 검증
        if (!relation || relation.trim() === '') {
            setErrorMessage('relation', '관계를 선택해주세요.')
            hasError = true
        } else {
            setErrorMessage('relation', null)
        }

        if (!hasError) {
            navigate('/family-group/create/payment')
        }
    }

    const handleFamilyNameChange = (value: string) => {
        setFamilyName(value)
        if (value && value.trim() !== '') {
            setErrorMessage('familyName', null)
        }
    }

    const handleElderNameChange = (value: string) => {
        setElder({ ...elder, name: value })
        if (value && value.trim() !== '') {
            setErrorMessage('elderName', null)
        }
    }

    const handleElderBirthChange = (date: { year: number; month: number; day: number }, formattedDate: string) => {
        setElder({ ...elder, birth: date })
        if (date.year !== 0 && date.month !== 0 && date.day !== 0) {
            setErrorMessage('elderBirth', null)
        }
    }

    const handleElderNumberChange = (value: string) => {
        setElder({ ...elder, number: value })
        const phoneNumbers = value.replace(/[^0-9]/g, '')
        if (phoneNumbers.length === 11) {
            setErrorMessage('elderNumber', null)
        }
    }

    const handleAddressDetailChange = (value: string) => {
        setElder({ ...elder, addressDetail: value })
        if (value && value.trim() !== '') {
            setErrorMessage('elderAddressDetail', null)
        }
    }

    const handleRelationChange = (value: string) => {
        setRelation(value)
        if (value && value.trim() !== '') {
            setErrorMessage('relation', null)
        }
    }

    const openAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data: any) {
                setElder({ ...elder, addressNumber: data.zonecode, address: data.address })
            },
        }).open();
    };

    return (
        <div className='bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 items-center'>

            <div className='flex flex-col w-full gap-6 mt-10 mb-9'>

                <div className='flex flex-col gap-3'>
                    <p>가족 그룹 이름을 정해주세요.</p>
                    <TextField
                        value={familyName}
                        onChange={handleFamilyNameChange}
                        hasError={!!errorMessage.familyName}
                        errorMessage={errorMessage.familyName || ''}
                    />
                </div>

                <div className='flex flex-col gap-3'>
                    <p><span className='font-semibold'>소식지를 전달받을 분</span>의 정보를 입력해주세요.</p>
                    <img className="w-[76px] h-[76px] mx-auto" src={profileImage} alt='profile' />
                </div>

                <div className='flex flex-col gap-3'>
                    <p>이름</p>
                    <TextField
                        value={elder.name}
                        onChange={handleElderNameChange}
                        hasError={!!errorMessage.elderName}
                        errorMessage={errorMessage.elderName || ''}
                    />
                </div>

                <div className='flex flex-col gap-3'>
                    <p>생년월일</p>
                    <Dropdown_Date
                        value={elder.birth}
                        onChange={handleElderBirthChange}
                        hasError={!!errorMessage.elderBirth}
                        errorMessage={errorMessage.elderBirth || ''}
                        defaultYear={1970}
                    />
                </div>

                <div className='flex flex-col gap-3'>
                    <p>전화번호</p>
                    <PhoneField
                        value={elder.number}
                        onChange={handleElderNumberChange}
                        hasError={!!errorMessage.elderNumber}
                        errorMessage={errorMessage.elderNumber || ''}
                    />
                </div>

                <div className='flex flex-col gap-3'>
                    <p>배송지 주소</p>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-2'>
                            <TextField
                                value={elder.addressNumber}
                                onChange={() => {}}
                                disabled={true}
                                placeholder='우편번호'
                                hasError={!!errorMessage.elderAddressNumber}
                                errorMessage={errorMessage.elderAddressNumber || ''}
                            />
                            <Button className='w-[50%]' text='우편번호 찾기' variant='secondary' onClick={openAddress} />
                        </div>
                        <TextField
                            value={elder.address}
                            onChange={() => {}}
                            disabled={true}
                            placeholder='주소지'
                            hasError={!!errorMessage.elderAddressNumber}
                            errorMessage={errorMessage.elderAddressNumber || ''}
                        />
                        <TextField
                            value={elder.addressDetail}
                            onChange={handleAddressDetailChange}
                            placeholder='상세주소를 입력하세요.'
                            hasError={!!errorMessage.elderAddressDetail}
                            errorMessage={errorMessage.elderAddressDetail || ''}
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <p>소식을 전달받을 분과는 어떤 관계인가요?</p>
                    <Dropdown_Relation
                        value={relation}
                        onChange={handleRelationChange}
                        hasError={!!errorMessage.relation}
                        errorMessage={errorMessage.relation || ''}
                    />
                </div>

            </div>

            <CTA className='h-16 mt-auto mb-9' text='다음' variant='main' onClick={handleNext} />
        </div>
    )
}

export default CreateGroup