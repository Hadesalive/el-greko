"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { Phone, ShoppingCart, Sun, Moon, Menu, X } from "lucide-react"
import { getCartItemCount, type CartItem } from "@/lib/cart-storage"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  cart: CartItem[]
}

export default function Navigation({ currentPage, setCurrentPage, cart }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { id: "home", label: "🏠 Home", emoji: "🏠" },
    { id: "menu", label: "🍽️ Menu", emoji: "🍽️" },
    { id: "gallery", label: "📸 Gallery", emoji: "📸" },
    { id: "about", label: "❤️ About", emoji: "❤️" },
    { id: "contact", label: "📞 Contact", emoji: "📞" },
  ]

  const handleNavClick = (page: string) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 dark:bg-background/60 backdrop-blur-lg border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="El Greko" width={50} height={50} className="h-12 w-12 rounded-full" />
              <div>
                <h1 className="font-bold text-xl text-primary">El Greko 🇬🇷</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">"Authentic Greek Flavors"</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`hover:text-primary transition-colors font-medium ${
                    currentPage === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>077 254220</span>
              </div>

              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-3 sm:px-4 py-2 rounded-full"
                onClick={() => handleNavClick("cart")}
              >
                <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {getCartItemCount(cart) > 0 && (
                  <Badge className="ml-1 sm:ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                    {getCartItemCount(cart)}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden w-9 h-9 rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/98 backdrop-blur-xl">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="flex items-center space-x-3">
                <Image src="/logo.png" alt="El Greko" width={40} height={40} className="h-10 w-10 rounded-full" />
                <h1 className="font-bold text-lg text-primary">El Greko 🇬🇷</h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 flex flex-col justify-center px-6 space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-2xl font-bold py-4 px-6 rounded-2xl transition-all duration-300 ${
                    currentPage === item.id
                      ? "text-primary bg-primary/10 border-2 border-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <span className="text-3xl mr-4">{item.emoji}</span>
                  {item.label.replace(item.emoji + " ", "")}
                </button>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-primary/10 space-y-4">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>077 254220</span>
              </div>
              <div className="text-center text-sm text-muted-foreground">"Authentic Greek Flavors in Freetown" 🇬🇷</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
