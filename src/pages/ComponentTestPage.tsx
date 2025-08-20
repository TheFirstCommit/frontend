import { CTA, Button } from "@/components/Buttons"
import { Group_Button } from "@/components/Group_Button"
import { Radio_Button } from "@/components/RadioButton"
import { TextField } from "@/components/TextField"
import { TextField_WithButton } from "@/components/TextField_WithButton"
import { Dropdown_Date } from "@/components/Dropdown_Date"
import { useState } from "react"

export const ComponentTestPage: React.FC = () => {
    const [text, setText] = useState('')
    const [hasError, setHasError] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [selectedDate, setSelectedDate] = useState({
        year: 0,
        month: 0,
        day: 0
    })

    const testError = (value: string) => {
      if (value.length > 3) {
        setIsValid(true)
        setHasError(false)
      } else {
        setIsValid(false)
        setHasError(true)
      }
    }

    const handleDateChange = (date: { year: number; month: number; day: number }, formattedDate: string) => {
      setSelectedDate(date)
      console.log('Selected date object:', date)
      console.log('Formatted date string for backend:', formattedDate)
    }

  return (
    <div className="bg-white text-gray-900 items-center justify-center p-6 gap-10 grid grid-cols-3">
      <div className="flex flex-row gap-4 w-full">
        <CTA text="기본" variant="main" />
        <CTA text="비활성화" variant="main" disabled />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <CTA text="기본" variant="sub" />
        <CTA text="비활성화" variant="sub" disabled />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <Button text="Button1" variant="primary" />
        <Button text="Button1" variant="primary" disabled />
        <Button text="Button2" variant="secondary" />
        <Button text="Button2" variant="secondary" disabled />
      </div>
      <div className='flex flex-row w-full'>
        <fieldset className="flex flex-col gap-4">
            <Radio_Button value={1} text="Radio1" name="radio" />
            <Radio_Button value={2} text="Radio2" name="radio" />
        </fieldset>
      </div>
      <div className='flex flex-row w-full'>
        <Group_Button text='가족 그룹 만들기' />
      </div>
      <div className='flex flex-col w-full'>
        <TextField value={text} onChange={setText} name='text' hasError={hasError} isValid={isValid} errorMessage='에러 메시지' onBlur={() => testError(text)} />
        <TextField_WithButton value={text} onChange={setText} name='text' hasError={hasError} isValid={isValid} errorMessage='에러 메시지' onBlur={() => testError(text)} />
      </div>
      <div className='flex flex-col w-full'>
        <Dropdown_Date value={selectedDate} onChange={handleDateChange} />
      </div>
    </div>
  )
}


