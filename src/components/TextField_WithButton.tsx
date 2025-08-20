import { useState } from 'react'
import { Button } from './Buttons';

interface TextFieldProps {
  value: string
  className?: string
  onChange: (value: string) => void
  name?: string
  hasError?: boolean
  errorMessage?: string
  isValid?: boolean
  onBlur?: () => void
  onButtonClick?: () => void
  maxLength?: number
  placeholder?: string
  autoUpperCase?: boolean
  allowSpecialChars?: boolean
}

export const TextField_WithButton: React.FC<TextFieldProps> = ({
  value,
  className,
  onChange,
  name,
  hasError,
  errorMessage,
  isValid,
  onBlur,
  onButtonClick,
  maxLength,
  placeholder = '여기에 입력하세요.',
  autoUpperCase = false,
  allowSpecialChars = true,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const getBorderColor = () => {
    if (isFocused) {
      return 'border-primary-500' // focus 시 대표색
    } else if (hasError) {
      return 'border-error' // blur 후 조건 불만족 시 에러색
    } else if (isValid) {
      return 'border-primary-500' // blur 후 조건 만족 시 대표색 유지
    } else {
      return 'border-gray-500' // 기본 상태
    }
  }

  const isButtonEnabled = maxLength ? value.length === maxLength : true

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    // 공백 제거
    if (!allowSpecialChars) {
      inputValue = inputValue.replace(/\s/g, '')
    }

    // 특수문자 제거 (영문자와 숫자만 허용)
    if (!allowSpecialChars) {
      inputValue = inputValue.replace(/[^A-Za-z0-9]/g, '')
    }

    // 자동 대문자 변환
    if (autoUpperCase) {
      inputValue = inputValue.toUpperCase()
    }

    onChange(inputValue)
  }

  return (
    <div className="w-full">
      <div className={`flex w-full h-14 bg-white border rounded-md transition-colors duration-200 ${getBorderColor()}`}>
        <input
          className={`w-max h-14 outline-none p-5 bg-transparent ${className}`}
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
        />
        <Button
          className="ml-auto my-2 mx-5"
          text="확인"
          variant="primary"
          disabled={!isButtonEnabled}
          onClick={onButtonClick}
        />
      </div>
      <div>
        {!isFocused && hasError && errorMessage && <p className="text-error text-sm mt-1 ml-1">{errorMessage}</p>}
      </div>
    </div>
  )
}