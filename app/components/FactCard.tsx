import { ExternalLink, CheckCircle } from 'lucide-react'

interface VerifiedFact {
  factId: string
  objectId: string
  factText: string
  sourceUrl: string
  verificationDate: string
}

interface FactCardProps {
  fact: VerifiedFact
  isLoading?: boolean
}

export function FactCard({ fact, isLoading = false }: FactCardProps) {
  if (isLoading) {
    return (
      <div className="bg-surface rounded-xl p-lg shadow-card animate-pulse">
        <div className="space-y-md">
          <div className="h-4 bg-primary/10 rounded w-3/4"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-lg shadow-card">
      <div className="space-y-md">
        <div className="flex items-center space-x-sm">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span className="text-caption font-medium text-accent">
            Verified Fact
          </span>
        </div>

        <p className="text-body text-text-primary leading-relaxed">
          {fact.factText}
        </p>

        <div className="flex items-center justify-between pt-sm border-t border-primary/10">
          <span className="text-caption text-text-secondary">
            Verified on {new Date(fact.verificationDate).toLocaleDateString()}
          </span>

          <a
            href={fact.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-sm text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-caption font-medium">Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

