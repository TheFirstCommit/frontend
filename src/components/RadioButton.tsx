interface Radio_ButtonProps {
    value: number|string;
    text: string;
    className?: string;
    disabled?: boolean;
    name?: string;
    onChange?: (value: number|string) => void;
}

export const Radio_Button:React.FC<Radio_ButtonProps> = ({value, text, className, disabled, name, onChange}) => {
    return (
            <label className={`flex flex-row gap-2 items-center text-gray-900 ${className} ${disabled ? 'opacity-40' : 'hover:cursor-pointer'}`} onClick={() => onChange?.(value)}>
                <input className='appearance-none w-6 h-6 rounded-full shadow-[0_0_0_1px_#004F3D] checked:bg-primary-300 checked:border-6 checked:border-white checked:shadow-primary-800 ' type="radio" name={name} value={value} />
                <span>{text}</span>
            </label>
    )
}
