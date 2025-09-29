import { Coins } from 'lucide-react'

interface CreditBalanceDisplayProps {
  credits: number
}

export function CreditBalanceDisplay({ credits }: CreditBalanceDisplayProps) {
  return (
    <div className="bg-surface rounded-lg p-md border border-primary/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-sm">
          <Coins className="w-4 h-4 text-accent" />
          <span className="text-caption font-medium text-text-primary">
            Fact Credits
          </span>
        </div>
        <span className="text-heading font-bold text-text-primary">
          {credits}
        </span>
      </div>
    </div>
  )
}

