import { type ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* 배경 오버레이 (40% 어둡게) */}
      <div className="absolute inset-0 bg-black opacity-40" onClick={handleBackdropClick} />

      {/* 모달 컨텐츠 */}
      <div className={`relative bg-white rounded-xl shadow-lg max-w-md w-1/3 min-w-80 ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal