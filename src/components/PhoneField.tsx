import { useState } from 'react'

interface PhoneFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  hasError?: boolean
  errorMessage?: string
  disabled?: boolean
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  value,
  onChange,
  className,
  placeholder = '010-0000-0000',
  hasError,
  errorMessage,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const getBorderColor = () => {
    if (isFocused) {
      return 'border-primary-500'
    } else if (hasError) {
      return 'border-error'
    } else {
      return 'border-gray-500'
    }
  }

  const formatPhoneNumber = (input: string): string => {
    // 숫자만 추출
    const numbers = input.replace(/[^0-9]/g, '')

    // 11자리 제한
    const limitedNumbers = numbers.slice(0, 11)

    // 하이픈 추가
    if (limitedNumbers.length <= 3) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const formatted = formatPhoneNumber(input)
    onChange(formatted)
  }

  return (
    <div className="w-full">
      <div className={`w-full h-[52px] bg-white border rounded-xl transition-colors duration-200 ${getBorderColor()}`}>
        <input
          className={`w-full h-[52px] outline-none p-5 bg-transparent ${className}`}
          type="tel"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          maxLength={13} // 010-0000-0000 형식으로 13자리
        />
      </div>
      {!isFocused && hasError && errorMessage && (
        <p className="text-error text-sm mt-1 ml-1">{errorMessage}</p>
      )}
    </div>
  )
}
