import checkbox from '@/assets/icons/checkbox.svg'
import checkbox_none from '@/assets/icons/checkbox-none.svg'

interface CheckboxProps {
  checked: boolean
  text: string
  onChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  text,
  onChange,
  className,
  disabled = false
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`w-8 h-8 flex items-center justify-center transition-opacity duration-200 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {checked ? (
            <img
              src={checkbox}
              alt="체크됨"
              className="w-8 h-8"
            />
          ) : (
            <img
              src={checkbox_none}
              alt="체크 안됨"
              className="w-8 h-8"
            />
          )}
        </div>
      </div>
      <span className={`text-sm ${checked ? 'text-gray-900' : 'text-gray-700'}`}>
        {text}
      </span>
    </label>
  )
}
