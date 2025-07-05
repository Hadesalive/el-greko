"use client"

import React, { useState, useEffect } from 'react'

interface FloatingHeartsProps {
  isActive: boolean
  triggerElement?: React.RefObject<HTMLElement>
}

interface Heart {
  id: number
  x: number
  y: number
  size: number
  color: string
  animationDelay: number
}

const heartColors = ['#FF6B6B', '#FF8E8E', '#FFB6C1', '#FF69B4', '#FF1493']

export default function FloatingHearts({ isActive, triggerElement }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isActive && triggerElement?.current) {
      const rect = triggerElement.current.getBoundingClientRect()
      setContainerPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      })

      // Create hearts
      const newHearts: Heart[] = []
      for (let i = 0; i < 6; i++) {
        newHearts.push({
          id: i,
          x: (Math.random() - 0.5) * 100,
          y: 0,
          size: Math.random() * 15 + 10,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          animationDelay: i * 0.1
        })
      }
      setHearts(newHearts)
    } else {
      setHearts([])
    }
  }, [isActive, triggerElement])

  if (!isActive || hearts.length === 0) return null

  return (
    <div className="fixed pointer-events-none z-40" style={{ left: containerPosition.x, top: containerPosition.y }}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-ping"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: `${heart.size}px`,
            color: heart.color,
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: '1.5s',
            transform: 'translate(-50%, -50%)'
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}