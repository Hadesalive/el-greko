"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Clock, MessageCircle, Utensils } from "lucide-react"

interface ContactPageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function ContactPage({ setCurrentPage }: ContactPageProps) {
  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact Us 📞</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Get in touch for orders, reservations, or inquiries
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Visit Us 🏠</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    15 Siaka Stevens Street, Central Freetown, Sierra Leone 🇸🇱
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">077 254220 / 074 762243</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">Mon-Sun: 11:00 AM - 10:00 PM ⏰</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">WhatsApp: 074 762243 📱</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Delivery Info 🚚</h2>
              <div className="space-y-3 text-muted-foreground text-sm sm:text-base">
                <p>• Fast delivery within Freetown area 🏃‍♂️</p>
                <p>• 30-45 minutes average delivery time ⏱️</p>
                <p>• Free delivery on orders over Le 100,000 🎉</p>
                <p>• Delivery fee: Le 10,000 for smaller orders 💰</p>
                <p>• We accept cash and mobile money 💳</p>
                <p>• WhatsApp ordering available 24/7 📱</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full inline-block mb-6 sm:mb-8 font-bold text-base sm:text-xl animate-pulse">
            🚚 WE DO DELIVERY!
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 077 254220 📞
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://wa.me/23274762243", "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us 📱
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => setCurrentPage("menu")}
            >
              <Utensils className="w-5 h-5 mr-2" />
              Order Online 🍽️
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
