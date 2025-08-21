import arrow_right_small from '../assets/Icons/arrow_right_small.svg'

interface MyPage_ListProps {
    className?: string
    contents: string
    onClick?: () => void
}

export const MyPage_List:React.FC<MyPage_ListProps> = ({ contents, className, onClick }) => {
    return (
        <div className={`flex h-12 justify-between items-center py-[2px] px-8 bg-white border-b border-background2 cursor-pointer ${className}`} onClick={onClick}>
            <p className='text-[16px] font-normal'>{contents}</p>
            <img className='size-9' src={arrow_right_small} alt="arrow_right_small" />
        </div>
    )
}