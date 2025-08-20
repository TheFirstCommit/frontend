interface TextField_ElderProps {
    value: string
    className?: string
}

export const TextField_Elder: React.FC<TextField_ElderProps> = ({ value, className }) => {
    return (
        <div className={`flex items-center w-full h-[52px] border rounded-xl transition-colors duration-200 bg-background2 border-gray-100 ${className}}`}>
            <p className='text-[16px] font-normal text-gray-900 pl-5'>{value}</p>
        </div>
    )
}
