import { useState } from 'react'
import { TextField } from './TextField'
import triangle from '@/assets/Icons/triangle_reverse.svg'

interface Dropdown_RelationProps {
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  hasError?: boolean
  errorMessage?: string
}

export const Dropdown_Relation: React.FC<Dropdown_RelationProps> = ({
  value,
  onChange,
  className,
  disabled = false,
  hasError = false,
  errorMessage
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')

  const relations = [
    '아들',
    '딸',
    '며느리',
    '사위',
    '손자',
    '손녀',
    '기타(입력)'
  ]

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === '기타(입력)') {
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

  // 기타(입력)이 선택된 경우 "기타(입력)"으로 표시, 그 외에는 value 그대로 표시
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
    <div className="relative">
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
            {displayValue || '관계를 선택하세요'}
          </span>
          <img
            className={`w-9 h-9 text-primary-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            src={triangle}
          />
        </div>
      </button>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-hide">
          {relations.map((relation) => (
            <button
              key={relation}
              type="button"
              onClick={() => handleSelect(relation)}
              className={`w-full px-4 py-3 text-left hover:bg-primary-100 transition-colors ${
                displayValue === relation ? 'bg-primary-500 text-white' : 'text-gray-900'
              }`}
            >
              {relation}
            </button>
          ))}
        </div>
      )}

      {/* 기타 입력 필드 */}
      {showCustomInput && (
        <div className="mt-3">
          <TextField
            value={customValue}
            onChange={handleCustomInputChange}
            placeholder="관계를 입력하세요"
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