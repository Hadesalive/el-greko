import * as React from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  delay: number
  duration: number
}

const CONFETTI_COLORS = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7",
  "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
  "#009688", "#4caf50", "#8bc34a", "#cddc39",
  "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"
]

export function Confetti({ isActive }: { isActive: boolean }) {
  const [pieces, setPieces] = React.useState<ConfettiPiece[]>([])

  React.useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = []
      for (let i = 0; i < 150; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 100,
          rotation: Math.random() * 360,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 2
        })
      }
      setPieces(newPieces)
    } else {
      setPieces([])
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-[fall_linear_forwards]"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`
          }}
        />
      ))}
    </div>
  )
}