import { Camera } from 'lucide-react'
import { cn } from '../lib/utils'

interface CameraButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export function CameraButton({
  onClick,
  disabled = false,
  className,
  children
}: CameraButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center px-lg py-md bg-primary text-text-primary rounded-xl font-semibold transition-all duration-base',
        'hover:opacity-90 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        'shadow-card',
        className
      )}
    >
      <Camera className="w-5 h-5 mr-2" />
      {children}
    </button>
  )
}

