import * as React from "react"

export function SecretMessage({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform">
        <h2 className="text-3xl font-bold mb-2 text-center">🎉 KONAMI CODE ACTIVATED! 🎉</h2>
        <p className="text-lg text-center opacity-90">You found the secret! Enjoy 10% off your next order with code: KONAMI</p>
        <div className="mt-4 text-center">
          <span className="inline-block animate-bounce">🍕</span>
          <span className="inline-block animate-bounce delay-100 mx-2">🍔</span>
          <span className="inline-block animate-bounce delay-200">🌮</span>
        </div>
      </div>
    </div>
  )
}