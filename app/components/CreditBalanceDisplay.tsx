interface CreditBalanceDisplayProps {
  credits: number
}

export default function CreditBalanceDisplay({ credits }: CreditBalanceDisplayProps) {
  return (
    <div className="bg-card rounded-lg shadow-card p-md mb-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Fact Credits</span>
        <span className="text-xl font-bold text-accent">{credits}</span>
      </div>
      {credits === 0 && (
        <p className="text-sm text-muted-foreground mt-sm">
          You're out of credits! Buy more to continue discovering facts.
        </p>
      )}
    </div>
  )
}

