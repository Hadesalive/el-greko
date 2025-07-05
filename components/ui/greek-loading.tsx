"use client"

import React, { useState, useEffect } from 'react'

interface GreekLoadingProps {
  isLoading: boolean
}

const loadingMessages = [
  "🇬🇷 Preparing your feast...",
  "🫒 Picking the finest olives...",
  "🧄 Chopping fresh garlic...",
  "🍋 Squeezing lemons...",
  "🧑‍🍳 Chef is cooking with love...",
  "🏛️ Bringing Greece to you...",
  "🌿 Adding Mediterranean herbs...",
  "🔥 Grilling to perfection...",
  "💙 Infusing with Greek spirit...",
  "🎭 Making it theatrical...",
  "🌊 Fresh from the Aegean...",
  "⚡ Zeus is powering our ovens...",
  "🏺 Ancient recipes loading...",
  "🌟 Sprinkling some magic...",
  "🎪 Creating culinary art..."
]

export default function GreekLoading({ isLoading }: GreekLoadingProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (!isLoading) return

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotsInterval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-4 border-primary/20">
        <div className="mb-6">
          <div className="text-6xl animate-bounce mb-4">🇬🇷</div>
          <div className="text-2xl font-bold text-primary mb-2">El Greko</div>
          <div className="text-sm text-muted-foreground">Authentic Greek Experience</div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 min-h-[2rem]">
            {loadingMessages[currentMessage]}{dots}
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <div className="mb-2">🍽️ Crafting your perfect meal</div>
          <div className="flex justify-center space-x-4 text-xs">
            <span>⚡ Fast</span>
            <span>🌟 Fresh</span>
            <span>❤️ Authentic</span>
          </div>
        </div>
      </div>
    </div>
  )
}