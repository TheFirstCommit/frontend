import { useState } from 'react'
import { TextField } from './TextField'
import triangle from '@/assets/Icons/triangle_reverse.svg'

interface Dropdown_DynamicProps {
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  hasError?: boolean
  errorMessage?: string
  placeholder?: string
  options: Array<{ id: string | number; name: string; [key: string]: unknown }>
  allowCustomInput?: boolean
  customInputPlaceholder?: string
}

export const Dropdown_Dynamic: React.FC<Dropdown_DynamicProps> = ({
  value,
  onChange,
  className,
  disabled = false,
  hasError = false,
  errorMessage,
  placeholder = '옵션을 선택하세요',
  options,
  allowCustomInput = false,
  customInputPlaceholder = '여기에 입력하세요'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === 'custom_input' && allowCustomInput) {
      setShowCustomInput(true)
      setIsOpen(false)
    } else {
      onChange(selectedValue)
      setShowCustomInput(false)
      setCustomValue('')
      setIsOpen(false)
    }
  }

  const handleCustomInputChange = (inputValue: string) => {
    setCustomValue(inputValue)
    onChange(inputValue)
  }

  const handleDropdownClick = () => {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  // 표시할 값 결정
  const displayValue = showCustomInput ? '기타(입력)' : value

  const getBorderColor = () => {
    if (hasError) {
      return 'border-error'
    } else if (isOpen) {
      return 'border-primary-500'
    } else {
      return 'border-gray-500'
    }
  }

  return (
    <div className="relative w-full">
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={handleDropdownClick}
        className={`w-full h-11 bg-white border rounded-xl px-4 text-left font-medium transition-colors duration-200 ${
          disabled ? 'opacity-40 cursor-not-allowed border-gray-500' :
          `${getBorderColor()} hover:cursor-pointer`
        } ${className}`}
      >
        <div className="flex items-center justify-between">
          <span className={displayValue ? 'text-gray-900' : 'text-gray-500'}>
            {displayValue || placeholder}
          </span>
          <img
            className={`w-9 h-9 text-primary-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            src={triangle}
            alt="dropdown arrow"
          />
        </div>
      </button>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-hide">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.name)}
              className={`w-full px-4 py-3 text-left hover:bg-primary-100 transition-colors ${
                displayValue === option.name ? 'bg-primary-500 text-white' : 'text-gray-900'
              }`}
            >
              {option.name}
            </button>
          ))}
          {allowCustomInput && (
            <button
              type="button"
              onClick={() => handleSelect('custom_input')}
              className="w-full px-4 py-3 text-left hover:bg-primary-100 transition-colors text-gray-900 border-t border-gray-200"
            >
              기타(입력)
            </button>
          )}
        </div>
      )}

      {/* 직접 입력 필드 */}
      {showCustomInput && (
        <div className="mt-3">
          <TextField
            value={customValue}
            onChange={handleCustomInputChange}
            placeholder={customInputPlaceholder}
          />
        </div>
      )}

      {/* 에러 메시지 */}
      {hasError && errorMessage && (
        <p className="text-error text-sm mt-1 ml-1">{errorMessage}</p>
      )}
    </div>
  )
}
