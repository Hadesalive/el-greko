"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Utensils, CreditCard } from "lucide-react"
import { getCartTotal, updateCartQuantity, removeFromCart, type CartItem } from "@/lib/cart-storage"

interface CartPageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
}

export default function CartPage({ setCurrentPage, cart, setCart }: CartPageProps) {
  const formatPrice = (price: number) => {
    return `Le ${price.toLocaleString()}`
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    const updatedCart = updateCartQuantity(id, quantity)
    setCart(updatedCart)
  }

  const handleRemoveItem = (id: number) => {
    const updatedCart = removeFromCart(id)
    setCart(updatedCart)
  }

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Your Cart 🛒</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Review your order before checkout</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4">🛒</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some delicious Greek dishes to get started!</p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-full"
              onClick={() => setCurrentPage("menu")}
            >
              <Utensils className="w-5 h-5 mr-2" />
              Browse Menu 🍽️
            </Button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {cart.map((item) => (
                <Card
                  key={item.id}
                  className="border-2 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto sm:mx-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-bold">{item.name}</h3>
                        <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="mt-2 text-xs"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-blue-600/5 border-2 border-primary/20 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span>Subtotal:</span>
                    <span className="font-bold">{formatPrice(getCartTotal(cart))}</span>
                  </div>
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span>Delivery Fee:</span>
                    <span className="font-bold">{getCartTotal(cart) >= 100000 ? "FREE 🎉" : formatPrice(10000)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-primary">
                        {formatPrice(getCartTotal(cart) + (getCartTotal(cart) >= 100000 ? 0 : 10000))}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-full"
                onClick={() => setCurrentPage("menu")}
              >
                <Utensils className="w-5 h-5 mr-2" />
                Continue Shopping 🛍️
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-full"
                onClick={() => setCurrentPage("checkout")}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout 💳
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
