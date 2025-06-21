"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"
import type { CartItem } from "@/lib/cart-storage"

interface FooterProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  cart: CartItem[]
}

export default function Footer({ currentPage, setCurrentPage }: FooterProps) {
  const { theme } = useTheme()

  return (
    <footer
      className={`py-12 mt-20 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="El Greko" width={40} height={40} className="h-10 w-10 rounded-full" />
              <h3 className="text-xl font-bold">El Greko 🇬🇷</h3>
            </div>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Authentic Greek flavors delivered to your door in Freetown. Experience Greece without leaving home! 🏠
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Quick Links 🔗</h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage("home")}
                className={`block transition-colors ${theme === "dark" ? "hover:text-primary" : "hover:text-primary"}`}
              >
                🏠 Home
              </button>
              <button
                onClick={() => setCurrentPage("menu")}
                className={`block transition-colors ${theme === "dark" ? "hover:text-primary" : "hover:text-primary"}`}
              >
                🍽️ Menu
              </button>
              <button
                onClick={() => setCurrentPage("gallery")}
                className={`block transition-colors ${theme === "dark" ? "hover:text-primary" : "hover:text-primary"}`}
              >
                📸 Gallery
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className={`block transition-colors ${theme === "dark" ? "hover:text-primary" : "hover:text-primary"}`}
              >
                ❤️ About
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className={`block transition-colors ${theme === "dark" ? "hover:text-primary" : "hover:text-primary"}`}
              >
                📞 Contact
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contact Info 📞</h4>
            <div className={`space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              <p>📍 15 Siaka Stevens Street, Freetown</p>
              <p>📞 077 254220</p>
              <p>📱 074 762243 (WhatsApp)</p>
              <p>⏰ Mon-Sun: 11AM-10PM</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Follow Us 📱</h4>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant={theme === "dark" ? "secondary" : "outline"}
                className="w-10 h-10 rounded-full p-0"
                onClick={() => window.open("https://facebook.com/elgreko", "_blank")}
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "secondary" : "outline"}
                className="w-10 h-10 rounded-full p-0"
                onClick={() => window.open("https://instagram.com/elgreko", "_blank")}
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "secondary" : "outline"}
                className="w-10 h-10 rounded-full p-0"
                onClick={() => window.open("https://twitter.com/elgreko", "_blank")}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "secondary" : "outline"}
                className="w-10 h-10 rounded-full p-0"
                onClick={() => window.open("mailto:hello@elgreko.sl", "_blank")}
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Tag us @elgrekosl for a chance to be featured! 📸
            </p>
          </div>
        </div>

        <div className={`border-t mt-8 pt-8 text-center ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            © 2024 El Greko Restaurant. Made with ❤️ in Freetown, Sierra Leone 🇸🇱
          </p>
        </div>
      </div>
    </footer>
  )
}
