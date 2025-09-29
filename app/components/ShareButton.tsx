interface ShareButtonProps {
  onClick: () => void
}

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-sm"
    >
      <span>📤</span>
      <span>Share Fact</span>
    </button>
  )
}

