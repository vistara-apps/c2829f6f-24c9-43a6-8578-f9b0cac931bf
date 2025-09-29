interface FactCardProps {
  fact?: string
  loading?: boolean
}

export default function FactCard({ fact, loading = false }: FactCardProps) {
  if (loading) {
    return (
      <div className="bg-card rounded-lg shadow-card p-lg animate-pulse">
        <div className="h-4 bg-muted rounded mb-md"></div>
        <div className="h-4 bg-muted rounded mb-md w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
    )
  }

  if (!fact) return null

  return (
    <div className="bg-card rounded-lg shadow-card p-lg">
      <div className="flex items-start gap-md">
        <div className="text-2xl">💡</div>
        <div>
          <h3 className="text-xl font-semibold mb-md">Interesting Fact</h3>
          <p className="text-base leading-6 font-normal">{fact}</p>
        </div>
      </div>
    </div>
  )
}

