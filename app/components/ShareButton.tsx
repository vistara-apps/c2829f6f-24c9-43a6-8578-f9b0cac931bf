import { Share2 } from 'lucide-react'
import { cn } from '../lib/utils'

interface ShareButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

export function ShareButton({
  onClick,
  className,
  children
}: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center px-lg py-md bg-accent text-text-primary rounded-xl font-semibold transition-all duration-base',
        'hover:opacity-90 active:scale-95',
        'shadow-card',
        className
      )}
    >
      {children}
    </button>
  )
}

