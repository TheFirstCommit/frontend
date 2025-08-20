export const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
  const getProgressWidth = () => {
    switch (step) {
      case 1:
        return '30%'
      case 2:
        return '60%'
      case 3:
        return '90%'
      default:
        return '0%'
    }
  }

  return (
    <div className="mt-2 w-full bg-background2 h-2 rounded-sm">
      <div
        className="bg-primary-800 h-2 rounded-sm transition-all duration-300 ease-in-out"
        style={{ width: getProgressWidth() }}
      ></div>
    </div>
  )
}