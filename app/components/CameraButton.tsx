interface CameraButtonProps {
  onClick: () => void
  disabled?: boolean
}

export default function CameraButton({ onClick, disabled = false }: CameraButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-24 h-24 rounded-full bg-accent hover:bg-accent/90 text-white
        flex items-center justify-center text-2xl font-bold
        transition-all duration-200 shadow-card
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      `}
    >
      📷
    </button>
  )
}

