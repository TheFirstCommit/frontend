import { useState, useEffect, useRef } from 'react'

interface DateValue {
  year: number
  month: number
  day: number
}

interface Dropdown_DateProps {
  value: DateValue
  onChange: (date: DateValue, formattedDate: string) => void
  className?: string
  disabled?: boolean
}

export const Dropdown_Date: React.FC<Dropdown_DateProps> = ({ value, onChange, className, disabled }) => {
  const [isYearOpen, setIsYearOpen] = useState(false)
  const [isMonthOpen, setIsMonthOpen] = useState(false)
  const [isDayOpen, setIsDayOpen] = useState(false)

  // 연도 범위 (1900년부터 현재 연도까지)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i)

  // 월 범위
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  // 일 범위 (선택된 연도, 월에 따라 계산)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
  }
  const days = Array.from({ length: getDaysInMonth(value.year, value.month) }, (_, i) => i + 1)

  const handleYearChange = (year: number) => {
    const newDate = { ...value, year }
    // 연도가 변경되면 일이 유효하지 않을 수 있으므로 조정
    const maxDays = getDaysInMonth(year, newDate.month)
    if (newDate.day > maxDays) {
      newDate.day = maxDays
    }

    // yyyy-mm-dd 형식으로 변환
    const formattedDate = formatDateToString(newDate)
    onChange(newDate, formattedDate)
    setIsYearOpen(false)
  }

  const handleMonthChange = (month: number) => {
    const newDate = { ...value, month }
    // 월이 변경되면 일이 유효하지 않을 수 있으므로 조정
    const maxDays = getDaysInMonth(newDate.year, month)
    if (newDate.day > maxDays) {
      newDate.day = maxDays
    }

    // yyyy-mm-dd 형식으로 변환
    const formattedDate = formatDateToString(newDate)
    onChange(newDate, formattedDate)
    setIsMonthOpen(false)
  }

  const handleDayChange = (day: number) => {
    const newDate = { ...value, day }

    // yyyy-mm-dd 형식으로 변환
    const formattedDate = formatDateToString(newDate)
    onChange(newDate, formattedDate)
    setIsDayOpen(false)
  }

  const closeAllDropdowns = () => {
    setIsYearOpen(false)
    setIsMonthOpen(false)
    setIsDayOpen(false)
  }

  const handleDropdownClick = (dropdownType: 'year' | 'month' | 'day') => {
    if (disabled) return

    // 다른 드롭다운들을 모두 닫기
    closeAllDropdowns()

    // 클릭한 드롭다운만 토글
    switch (dropdownType) {
      case 'year':
        setIsYearOpen(true)
        break
      case 'month':
        setIsMonthOpen(true)
        break
      case 'day':
        setIsDayOpen(true)
        break
    }
  }

  const DropdownSelect = ({
    isOpen,
    selectedValue,
    options,
    onSelect,
    placeholder,
    suffix,
    dropdownType
  }: {
    isOpen: boolean
    selectedValue: number
    options: number[]
    onSelect: (value: number) => void
    placeholder: string
    suffix: string
    dropdownType: 'year' | 'month' | 'day'
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const hasValue = selectedValue > 0
    const isActive = isOpen || hasValue

    useEffect(() => {
      if (isOpen && dropdownRef.current) {
        // 각 드롭다운 타입별로 선택된 값 또는 기본값으로 스크롤
        let targetValue: number
        switch (dropdownType) {
          case 'year':
            targetValue = selectedValue > 0 ? selectedValue : 1950
            break
          case 'month':
            targetValue = selectedValue > 0 ? selectedValue : 1
            break
          case 'day':
            targetValue = selectedValue > 0 ? selectedValue : 1
            break
          default:
            return
        }

        const targetIndex = options.indexOf(targetValue)
        if (targetIndex !== -1) {
          const itemHeight = dropdownRef.current.children[0]?.clientHeight || 0
          dropdownRef.current.scrollTop = targetIndex * itemHeight
        }
      }
    }, [isOpen, options, dropdownType, selectedValue])

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => handleDropdownClick(dropdownType)}
          className={`w-full h-11 bg-white border rounded-xl px-4 text-left font-medium transition-colors duration-200 ${
            disabled ? 'opacity-40 cursor-not-allowed border-gray-500' :
            isActive ? 'border-primary-500' : 'border-gray-500 hover:cursor-pointer'
          } ${className}`}
        >
          <span className={hasValue ? 'text-gray-900' : 'text-gray-500'}>
            {hasValue ? `${selectedValue}${suffix}` : placeholder}
          </span>
        </button>

        {isOpen && (
          <div ref={dropdownRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-hide">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`w-full px-4 py-3 text-left hover:bg-primary-100 transition-colors ${
                  selectedValue === option ? 'bg-primary-500 text-white' : 'text-gray-900'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
  const formatDateToString = (date: DateValue): string => {
    if (date.year === 0 || date.month === 0 || date.day === 0) {
      return '' // 완전하지 않은 날짜는 빈 문자열 반환
    }

    const year = date.year.toString()
    const month = date.month.toString().padStart(2, '0')
    const day = date.day.toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <DropdownSelect
          isOpen={isYearOpen}
          selectedValue={value.year}
          options={years}
          onSelect={handleYearChange}
          placeholder="연도"
          suffix="년"
          dropdownType="year"
        />
      </div>

      <div className="flex-1">
        <DropdownSelect
          isOpen={isMonthOpen}
          selectedValue={value.month}
          options={months}
          onSelect={handleMonthChange}
          placeholder="월"
          suffix="월"
          dropdownType="month"
        />
      </div>

      <div className="flex-1">
        <DropdownSelect
          isOpen={isDayOpen}
          selectedValue={value.day}
          options={days}
          onSelect={handleDayChange}
          placeholder="일"
          suffix="일"
          dropdownType="day"
        />
      </div>
    </div>
  )
}