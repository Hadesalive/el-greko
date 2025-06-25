"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Shield, Zap, Heart } from "lucide-react"
import { getCartTotal, type CartItem } from "@/lib/cart-storage"

interface CheckoutPageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
}

export default function CheckoutPage({ cart }: CheckoutPageProps) {
  const [orderType, setOrderType] = useState("delivery") // 'delivery' or 'dine-in'
    const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
        address: "",
    tableNumber: "",
    notes: "",
  })

  const formatPrice = (price: number) => {
    return `Le ${price.toLocaleString()}`
  }

    const handleWhatsAppOrder = () => {
    const orderDetails = cart
      .map((item) => `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
      .join("\n")

    const total = getCartTotal(cart) + (getCartTotal(cart) >= 100000 ? 0 : 10000)
    const deliveryFee = getCartTotal(cart) >= 100000 ? "FREE" : formatPrice(10000)

        const message = `🍽️ *El Greko Order* 🇬🇷

*Order Type: ${orderType === "delivery" ? "Delivery" : "Dine-In"}*

📝 *Customer Details:*
Name: ${customerInfo.name}
${orderType === "delivery" ? `Phone: ${customerInfo.phone}\nAddress: ${customerInfo.address}` : `Table Number: ${customerInfo.tableNumber}`}
${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ""}

🛒 *Order Details:*
${orderDetails}

💰 *Payment Summary:*
Subtotal: ${formatPrice(getCartTotal(cart))}
${orderType === "delivery" ? `Delivery: ${deliveryFee}` : ''}
*Total: ${formatPrice(total)}*

Thank you for choosing El Greko! 🙏`

    const whatsappUrl = `https://wa.me/23274762243?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Checkout 💳</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Complete your order details</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Customer Information */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg">
            <CardContent className="p-4 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Customer Information 👤</h2>
              <div className="flex space-x-4 mb-4">
                <Button onClick={() => setOrderType("delivery")} variant={orderType === "delivery" ? "default" : "outline"}>Delivery</Button>
                <Button onClick={() => setOrderType("dine-in")} variant={orderType === "dine-in" ? "default" : "outline"}>Dine In</Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="border-2 border-primary/20 focus:border-primary text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    placeholder="e.g., 077 123 456"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="border-2 border-primary/20 focus:border-primary text-base"
                  />
                </div>
                                {orderType === "delivery" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input
                        placeholder="e.g., 077 123 456"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="border-2 border-primary/20 focus:border-primary text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                      <Input
                        placeholder="Enter your full address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="border-2 border-primary/20 focus:border-primary text-base"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">Table Number *</label>
                    <Input
                      placeholder="Enter your table number"
                      value={customerInfo.tableNumber}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                      className="border-2 border-primary/20 focus:border-primary text-base"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Special Notes (Optional)</label>
                  <Input
                    placeholder="Any special instructions..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="border-2 border-primary/20 focus:border-primary text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary 📋</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-primary/10">
                    <div>
                      <p className="font-medium text-sm sm:text-base">{item.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-sm sm:text-base">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mt-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal:</span>
                  <span className="font-bold">{formatPrice(getCartTotal(cart))}</span>
                </div>
                                {orderType === "delivery" && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Delivery Fee:</span>
                    <span className="font-bold">{getCartTotal(cart) >= 100000 ? "FREE 🎉" : formatPrice(10000)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base sm:text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">
                    {formatPrice(getCartTotal(cart) + (getCartTotal(cart) >= 100000 ? 0 : 10000))}
                  </span>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-6">
                <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-bold text-sm sm:text-base">WhatsApp Ordering 📱</span>
                </div>
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-300 mt-2">
                  Your order will be sent via WhatsApp for confirmation and payment arrangements.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 mt-6"
                                onClick={handleWhatsAppOrder}
                disabled={!customerInfo.name || (orderType === 'delivery' && (!customerInfo.phone || !customerInfo.address)) || (orderType === 'dine-in' && !customerInfo.tableNumber)}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Order via WhatsApp 📱
              </Button>

              <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  Fast
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  Trusted
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
