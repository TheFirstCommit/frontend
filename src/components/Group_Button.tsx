import { useState } from 'react'

interface Group_ButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
    isSelected?: boolean;
}

export const Group_Button:React.FC<Group_ButtonProps> = ({text, className, onClick, isSelected}) => {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        setIsClicked(!isClicked)
        onClick?.()
    }

    return (
            <button
                className={`${className} border-2 border-gray-500
                text-primary-500 font-semibold text-xl w-[180px] h-[180px] rounded-full
                hover:cursor-pointer transition-all duration-100
                ${isClicked || isSelected ? 'bg-primary-100 text-primary-900 border-primary-500' : 'bg-white'}`}
                onClick={handleClick}
            >
                {text}
            </button>
    )
}