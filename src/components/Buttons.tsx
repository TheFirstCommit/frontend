interface CTAProps {
    text: string;
    className?: string;
    disabled?: boolean;
    variant?: 'main' | 'sub';
    onClick?: () => void;
}

export const CTA:React.FC<CTAProps> = ({text, className, disabled, variant, onClick}) => {
    return (
            <button className={`py-4 w-full  rounded-4xl font-bold ${className} ${disabled ? 'opacity-40' : 'hover:cursor-pointer'} ${variant === 'main' ? 'bg-primary text-gray-100' : 'bg-background border border-primary text-primary-900'}`} onClick={onClick}>{text}</button>
    )
}

interface ButtonProps {
    text: string;
    className?: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    preseed?: boolean
    onClick?: () => void;
}

export const Button:React.FC<ButtonProps> = ({text, className, disabled, variant = 'primary', preseed, onClick}) => {
    return (
            <button className={`py-[8.5px] px-[6.5px] min-w-16 rounded-xl font-bold ${className} ${disabled ? 'opacity-40' : 'hover:cursor-pointer'} ${variant === 'primary' ? ` text-gray-100 ${preseed ? 'bg-primary-800' : 'bg-primary'} ` : `text-primary-900 border border-primary ${preseed ? 'bg-primary' : 'bg-primary-100'}`}`} onClick={onClick}>{text}</button>
    )
}