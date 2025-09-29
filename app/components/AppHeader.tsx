import { Zap } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="bg-surface border-b border-primary/10 px-4 py-md">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-sm">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-text-primary" />
          </div>
          <div>
            <h1 className="text-heading font-semibold text-text-primary">
              Pictura Facta
            </h1>
            <p className="text-caption text-text-secondary">
              Verified Facts Instantly
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

