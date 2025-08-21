import { useState, useEffect, useRef } from 'react'

interface Dropdown_DateProps {
  value: string // "yyyy-mm-dd" 형식의 문자열
  onChange: (formattedDate: string) => void // "yyyy-mm-dd" 형식의 문자열 반환
  className?: string
  disabled?: boolean
  hasError?: boolean
  errorMessage?: string
  defaultYear?: number
  defaultMonth?: number
  defaultDay?: number
}

export const Dropdown_Date: React.FC<Dropdown_DateProps> = ({
  value = '',
  onChange,
  className,
  disabled,
  hasError = false,
  errorMessage,
  defaultYear = 1950,
  defaultMonth = 1,
  defaultDay = 1,
}) => {
  const [isYearOpen, setIsYearOpen] = useState(false)
  const [isMonthOpen, setIsMonthOpen] = useState(false)
  const [isDayOpen, setIsDayOpen] = useState(false)

  // 문자열을 파싱하여 year, month, day 추출
  const parseDateString = (dateString: string): { year: number; month: number; day: number } => {
    if (!dateString || typeof dateString !== 'string' || dateString === '') {
      return { year: 0, month: 0, day: 0 }
    }

    const parts = dateString.split('-')
    if (parts.length === 3) {
      const year = parts[0] ? parseInt(parts[0], 10) : 0
      const month = parts[1] ? parseInt(parts[1], 10) : 0
      const day = parts[2] ? parseInt(parts[2], 10) : 0

      return { year, month, day }
    }

    return { year: 0, month: 0, day: 0 }
  }

  // 현재 선택된 날짜 객체
  const currentDate = parseDateString(value)

  console.log('Dropdown_Date Debug:', {
    value,
    currentDate,
    year: currentDate.year,
    month: currentDate.month,
    day: currentDate.day,
  })

  // 연도 범위 (1900년부터 현재 연도까지)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i)

  // 월 범위
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  // 일 범위 (선택된 연도, 월에 따라 계산)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
  }

  // 현재 선택된 연도와 월이 유효하지 않으면 기본값 사용
  const effectiveYear = currentDate.year > 0 ? currentDate.year : defaultYear
  const effectiveMonth = currentDate.month > 0 ? currentDate.month : defaultMonth

  const days = Array.from({ length: getDaysInMonth(effectiveYear, effectiveMonth) }, (_, i) => i + 1)

  const handleYearChange = (year: number) => {
    console.log('handleYearChange called with:', year)
    const newDate = { ...currentDate, year }
    // 연도가 변경되면 일이 유효하지 않을 수 있으므로 조정
    const maxDays = getDaysInMonth(year, newDate.month)
    if (newDate.day > maxDays) {
      newDate.day = maxDays
    }

    // yyyy-mm-dd 형식으로 변환
    const formattedDate = formatDateToString(newDate)
    console.log('formattedDate:', formattedDate)
    onChange(formattedDate)
    setIsYearOpen(false)
  }

  const handleMonthChange = (month: number) => {
    console.log('handleMonthChange called with:', month)
    const newDate = { ...currentDate, month }
    // 월이 변경되면 일이 유효하지 않을 수 있으므로 조정
    const maxDays = getDaysInMonth(newDate.year, month)
    if (newDate.day > maxDays) {
      newDate.day = maxDays
    }

    // yyyy-mm-dd 형식으로 변환
    const formattedDate = formatDateToString(newDate)
    console.log('formattedDate:', formattedDate)
    onChange(formattedDate)
    setIsMonthOpen(false)
  }

  const handleDayChange = (day: number) => {
    console.log('handleDayChange called with:', day)
    const newDate = { ...currentDate, day }

    // yyyy-mm-dd 형식으로 변환
    const formattedDate = formatDateToString(newDate)
    console.log('formattedDate:', formattedDate)
    onChange(formattedDate)
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
    dropdownType,
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
    const hasValue = selectedValue !== 0
    const isActive = isOpen || hasValue

    useEffect(() => {
      if (isOpen && dropdownRef.current) {
        // 각 드롭다운 타입별로 선택된 값 또는 기본값으로 스크롤
        let targetValue: number
        switch (dropdownType) {
          case 'year':
            targetValue = selectedValue > 0 ? selectedValue : defaultYear
            break
          case 'month':
            targetValue = selectedValue > 0 ? selectedValue : defaultMonth
            break
          case 'day':
            targetValue = selectedValue > 0 ? selectedValue : defaultDay
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
    }, [isOpen, options, dropdownType, selectedValue, defaultYear, defaultMonth, defaultDay])

    const getBorderColor = () => {
      if (hasError) {
        return 'border-error'
      } else if (isActive) {
        return 'border-primary-500'
      } else {
        return 'border-gray-500'
      }
    }

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => handleDropdownClick(dropdownType)}
          className={`w-full h-11 bg-white border rounded-xl px-4 text-left font-medium transition-colors duration-200 ${
            disabled ? 'opacity-40 cursor-not-allowed border-gray-500' : `${getBorderColor()} hover:cursor-pointer`
          } ${className}`}>
          <span className={hasValue ? 'text-gray-900' : 'text-gray-500'}>
            {hasValue ? `${selectedValue}${suffix}` : placeholder}
          </span>
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-hide">
            {options.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`w-full px-4 py-3 text-left hover:bg-primary-100 transition-colors ${
                  selectedValue === option ? 'bg-primary-500 text-white' : 'text-gray-900'
                }`}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
  const formatDateToString = (date: { year: number; month: number; day: number }): string => {
    // 모든 값이 있을 때만 완전한 형식 반환
    if (date.year > 0 && date.month > 0 && date.day > 0) {
      const year = date.year.toString()
      const month = date.month.toString().padStart(2, '0')
      const day = date.day.toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // 부분적으로 선택된 경우에도 임시 문자열 반환 (부모 컴포넌트에서 처리)
    // 예: "1990--" (연도만 선택), "1990-01-" (연도, 월만 선택)
    let result = ''
    if (date.year > 0) {
      result += date.year.toString()
    }
    result += '-'
    if (date.month > 0) {
      result += date.month.toString().padStart(2, '0')
    }
    result += '-'
    if (date.day > 0) {
      result += date.day.toString().padStart(2, '0')
    }

    return result
  }

  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className="flex-1">
          <DropdownSelect
            isOpen={isYearOpen}
            selectedValue={currentDate.year}
            options={years}
            onSelect={handleYearChange}
            placeholder="년"
            suffix="년"
            dropdownType="year"
          />
        </div>

        <div className="flex-1">
          <DropdownSelect
            isOpen={isMonthOpen}
            selectedValue={currentDate.month}
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
            selectedValue={currentDate.day}
            options={days}
            onSelect={handleDayChange}
            placeholder="일"
            suffix="일"
            dropdownType="day"
          />
        </div>
      </div>
      {hasError && errorMessage && <p className="text-error text-sm mt-1 ml-1">{errorMessage}</p>}
    </div>
  )
}