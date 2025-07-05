import * as React from "react"

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]

export function useKonamiCode(callback: () => void) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isActivated, setIsActivated] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      
      if (key === KONAMI_CODE[currentIndex].toLowerCase()) {
        const nextIndex = currentIndex + 1
        
        if (nextIndex === KONAMI_CODE.length) {
          // Code completed!
          setCurrentIndex(0)
          setIsActivated(true)
          callback()
          
          // Reset after 5 seconds
          setTimeout(() => setIsActivated(false), 5000)
        } else {
          setCurrentIndex(nextIndex)
        }
      } else {
        // Reset if wrong key
        setCurrentIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, callback])

  return { isActivated, progress: currentIndex / KONAMI_CODE.length }
}