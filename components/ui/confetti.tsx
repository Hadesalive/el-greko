"use client"

import React, { useEffect, useState } from 'react'

interface ConfettiProps {
  isActive: boolean
  onComplete?: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  life: number
  shape: string
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9']
const shapes = ['●', '■', '▲', '★', '♦', '♠', '♣', '♥', '◆', '◇']

export default function Confetti({ isActive, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [animationId, setAnimationId] = useState<number | null>(null)

  useEffect(() => {
    if (isActive) {
      // Create initial burst of particles
      const newParticles: Particle[] = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20 - 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          life: 1,
          shape: shapes[Math.floor(Math.random() * shapes.length)]
        })
      }
      setParticles(newParticles)
      startAnimation()
    } else {
      stopAnimation()
    }
  }, [isActive])

  const startAnimation = () => {
    const animate = () => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.5, // gravity
          rotation: particle.rotation + particle.rotationSpeed,
          life: particle.life - 0.015
        })).filter(particle => particle.life > 0)

        if (updatedParticles.length === 0) {
          stopAnimation()
          onComplete?.()
        }

        return updatedParticles
      })

      const id = requestAnimationFrame(animate)
      setAnimationId(id)
    }
    animate()
  }

  const stopAnimation = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      setAnimationId(null)
    }
    setParticles([])
  }

  if (!isActive && particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-2xl font-bold select-none"
          style={{
            left: particle.x,
            top: particle.y,
            color: particle.color,
            fontSize: `${particle.size}px`,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.life,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {particle.shape}
        </div>
      ))}
    </div>
  )
}