import { CTA } from "@/components/Buttons"
import { Checkbox } from "@/components/Checkbox"
import { TextField } from "@/components/TextField"
import { PhoneField } from "@/components/PhoneField"
import { useState } from 'react'
import SignUpProfileImage from '@/assets/images/profile.png'
import { Dropdown_Date } from '@/components/Dropdown_Date'
import { ProgressBar } from '@/components/ProgressBar'
import { useSignUpCheckStore, useSignUpInfoStore } from '@/stores/signup.store'
import { useNavigate } from 'react-router-dom'

const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const { info, setErrorMessage } = useSignUpInfoStore()
  const { checked } = useSignUpCheckStore()

  const handleNext = () => {
    if (step === 1) {
      // 필수 약관 체크 검증
      if (!checked.terms || !checked.privacy || !checked.thirdParty || !checked.profile) {
        setErrorMessage('name', '필수 약관에 동의해주세요.')
        return
      }
      setErrorMessage('name', '') // 에러 메시지 초기화
      setStep(2)
    } else if (step === 2) {
      if (info.name === null || info.name === '') {
        setErrorMessage('name', '이름을 입력해주세요.')
      } else {
        setErrorMessage('name', '') // 에러 메시지 초기화
        setStep(3)
      }
    } else if (step === 3) {
      // 생년월일 검증 (빈 문자열인지 확인)
      if (!info.birth || info.birth === '') {
        setErrorMessage('birth', '생년월일을 입력해주세요.')
        return
      }

      // 전화번호 검증 (숫자만 추출해서 11자리인지 확인)
      const phoneNumbers = info.phone.replace(/[^0-9]/g, '')
      if (phoneNumbers.length !== 11) {
        setErrorMessage('phone', '전화번호 형식이 올바르지 않습니다.')
        return
      }

      // 모든 검증 통과
      setErrorMessage('birth', '')
      setErrorMessage('phone', '')

      navigate('/signup/complete')
    }
  }

  const handleSkip = () => {
    if(step === 1) {
      navigate('/')
    }
  }

  return (
    <div className="bg-background min-h-dvh flex flex-col px-6">
      <ProgressBar step={step} />
      <div className="w-full mb-20">
        <SignUpContent step={step} />
      </div>

      <div className="flex gap-4 mt-auto mb-9">
        <CTA className="h-16" text={step === 1 ? '나가기' : '건너뛰기'} variant="sub" onClick={handleSkip} />
        <CTA className="h-16" text="다음" variant="main" disabled={false} onClick={handleNext} />
      </div>
    </div>
  )
}

export default SignUpPage

const SignUpContent: React.FC<{ step: number }> = ({ step }) => {
  return (
    <>
      <div className="flex flex-col w-full gap-6 mt-16 mb-10">
        <p className="font-extrabold text-3xl">
          {step === 1 && '회원가입'}
          {step === 2 && '프로필 설정'}
          {step === 3 && '기본정보 입력'}
        </p>
        <p className="font-normal text-sml text-gray-500">
          {step === 1 && '정책 및 약관을 클릭해 모든 내용을 확인해주세요.'}
          {step === 2 && '가족들이 알아볼 수 있는 프로필 사진을 등록해주세요.'}
          {step === 3 && '프로필을 등록하는 기본정보에요.'}
        </p>
      </div>

      {step === 1 && <SignUpCheck />}
      {step === 2 && <SignUpProfile />}
      {step === 3 && <SignUpInfo />}
    </>
  )
}

const SignUpCheck: React.FC = () => {
  const { checked, setChecked, setCheckedAll } = useSignUpCheckStore()
  const { errorMessage, setErrorMessage } = useSignUpInfoStore()

  const handleCheckboxChange = (
    key: 'terms' | 'privacy' | 'thirdParty' | 'profile' | 'marketing',
    checked: boolean,
  ) => {
    setChecked(key, checked)

    // 필수 체크박스 중 하나라도 체크되면 에러 메시지 제거
    if (checked && (key === 'terms' || key === 'privacy' || key === 'thirdParty' || key === 'profile')) {
      setErrorMessage('name', '')
    }
  }

  const handleCheckAll = (checked: boolean) => {
    setCheckedAll(checked)

    // 전체 동의 시 에러 메시지 제거
    if (checked) {
      setErrorMessage('name', '')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background2 border border-primary rounded-xl py-2.5 px-3">
        <Checkbox
          className="text-lg font-semibold"
          checked={checked.all}
          text="전체 약관에 동의합니다."
          onChange={handleCheckAll}
        />
      </div>
      <Checkbox
        className="underline"
        checked={checked.terms}
        text="(필수) 이용약관 동의"
        onChange={checked => handleCheckboxChange('terms', checked)}
      />
      <Checkbox
        className="underline"
        checked={checked.privacy}
        text="(필수) 개인정보 수집 및 이용 동의"
        onChange={checked => handleCheckboxChange('privacy', checked)}
      />
      <Checkbox
        className="underline"
        checked={checked.thirdParty}
        text="(필수) 개인정보 제3자 제공 동의"
        onChange={checked => handleCheckboxChange('thirdParty', checked)}
      />
      <Checkbox
        className="underline"
        checked={checked.profile}
        text="(필수) 프로필 정보 공개 동의"
        onChange={checked => handleCheckboxChange('profile', checked)}
      />
      <Checkbox
        className="underline"
        checked={checked.marketing}
        text="(선택) 마케팅 수신 동의"
        onChange={checked => handleCheckboxChange('marketing', checked)}
      />

      {/* 약관 에러 메시지 */}
      {errorMessage.name && <p className="text-error text-sm mt-1 ml-1">{errorMessage.name}</p>}
    </div>
  )
}

const SignUpProfile: React.FC = () => {
  const { info, setInfo, errorMessage, setErrorMessage } = useSignUpInfoStore()

  const handleNameChange = (value: string) => {
    setInfo('name', value)
    // 이름이 입력되면 에러 메시지 제거
    if (value && value.trim() !== '') {
      setErrorMessage('name', '')
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setInfo('profile', file)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {info.profile ? (
            <img
              className="size-[84px] mx-auto rounded-full object-cover"
              src={URL.createObjectURL(info.profile)}
              alt="profile"
            />
          ) : (
            <img src={SignUpProfileImage} className="size-[84px] mx-auto rounded-full" alt="default profile" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <p className="font-semibold text-[16px]">이름</p>
        <TextField
          value={info.name || ''}
          onChange={handleNameChange}
          hasError={!!errorMessage.name}
          errorMessage={errorMessage.name || ''}
        />
      </div>
    </div>
  )
}

const SignUpInfo: React.FC = () => {
  const { info, setInfo, errorMessage, setErrorMessage } = useSignUpInfoStore()

  const handleBirthChange = (formattedDate: string) => {
    setInfo('birth', formattedDate)
    // 생년월일이 입력되면 에러 메시지 제거
    if (formattedDate && formattedDate !== '') {
      setErrorMessage('birth', '')
    }
  }

  const handlePhoneChange = (value: string) => {
    setInfo('phone', value)
    // 전화번호가 11자리이면 에러 메시지 제거
    const phoneNumbers = value.replace(/[^0-9]/g, '')
    if (phoneNumbers.length === 11) {
      setErrorMessage('phone', '')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-3">
        <label className="text-[16px] font-regular">생년월일</label>
        <Dropdown_Date
          value={info.birth || ''}
          onChange={handleBirthChange}
          hasError={!!errorMessage.birth}
          errorMessage={errorMessage.birth || ''}
          defaultYear={1970}
        />
      </div>
      <div className="flex flex-col w-full gap-3">
        <label className="text-[16px] font-regular">전화번호</label>
        <PhoneField
          value={info.phone}
          onChange={handlePhoneChange}
          hasError={!!errorMessage.phone}
          errorMessage={errorMessage.phone || ''}
        />
      </div>
    </div>
  )
}