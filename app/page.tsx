"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HomePage from "@/components/pages/home-page"
import MenuPage from "@/components/pages/menu-page"
import CartPage from "@/components/pages/cart-page"
import CheckoutPage from "@/components/pages/checkout-page"
import AboutPage from "@/components/pages/about-page"
import ContactPage from "@/components/pages/contact-page"
import GalleryPage from "@/components/pages/gallery-page"
import { getCartFromStorage, type CartItem } from "@/lib/cart-storage"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    setCart(getCartFromStorage())
  }, [])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  const pageProps = {
    currentPage,
    setCurrentPage,
    cart,
    setCart,
  }

  return (
    <div className="min-h-screen">
      <Navigation {...pageProps} />
      {currentPage === "home" && <HomePage {...pageProps} />}
      {currentPage === "menu" && <MenuPage {...pageProps} />}
      {currentPage === "cart" && <CartPage {...pageProps} />}
      {currentPage === "checkout" && <CheckoutPage {...pageProps} />}
      {currentPage === "about" && <AboutPage {...pageProps} />}
      {currentPage === "contact" && <ContactPage {...pageProps} />}
      {currentPage === "gallery" && <GalleryPage {...pageProps} />}
      <Footer {...pageProps} />
    </div>
  )
}
