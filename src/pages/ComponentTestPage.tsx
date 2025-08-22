import { Dropdown_Date } from "@/components/Dropdown_Date"
import { Dropdown_Dynamic } from '@/components/Dropdown_Dynamic'
import { useState } from 'react'

export const ComponentTestPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  const handleDateChange = (formattedDate: string) => {
    setSelectedDate(formattedDate)
    console.log('Formatted date string for backend:', formattedDate)
  }

  // 정적 옵션 예시 (페이지에서 API 통신 후 정리된 데이터)
  const categoryOptions = [
    { id: 1, name: '음식점' },
    { id: 2, name: '카페' },
    { id: 3, name: '영화관' },
    { id: 4, name: '쇼핑몰' },
    { id: 5, name: '병원' },
  ]

  const regionOptions = [
    { id: 1, name: '서울' },
    { id: 2, name: '부산' },
    { id: 3, name: '대구' },
    { id: 4, name: '인천' },
    { id: 5, name: '광주' },
    { id: 6, name: '대전' },
    { id: 7, name: '울산' },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">컴포넌트 테스트 페이지</h1>

      {/* 날짜 선택 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">날짜 선택</label>
        <Dropdown_Date
          value={selectedDate}
          onChange={handleDateChange}
          defaultYear={1990}
          defaultMonth={1}
          defaultDay={1}
        />
        <p className="text-sm text-gray-500">선택된 날짜: {selectedDate}</p>
      </div>

      {/* 카테고리 선택 (직접 입력 가능) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">카테고리 선택</label>
        <Dropdown_Dynamic
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categoryOptions}
          placeholder="카테고리를 선택하세요"
          allowCustomInput={true}
          customInputPlaceholder="카테고리를 직접 입력하세요"
        />
        <p className="text-sm text-gray-500">선택된 카테고리: {selectedCategory}</p>
      </div>

      {/* 지역 선택 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">지역 선택</label>
        <Dropdown_Dynamic
          value={selectedRegion}
          onChange={setSelectedRegion}
          options={regionOptions}
          placeholder="지역을 선택하세요"
        />
        <p className="text-sm text-gray-500">선택된 지역: {selectedRegion}</p>
      </div>
    </div>
  )
}


