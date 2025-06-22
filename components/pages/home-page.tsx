"use client"
import React from 'react'
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, ShoppingCart, Clock, Star, Plus, Minus, Users, Utensils, Leaf, Truck, ChefHat, Award, BookOpen } from "lucide-react"
import { getPopularFoods, type FoodItem, getSpecialOffers } from "@/lib/food-database"
import { addToCart, type CartItem } from "@/lib/cart-storage"

interface HomePageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
}

export default function HomePage({ setCurrentPage, cart, setCart }: HomePageProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [cartFeedback, setCartFeedback] = useState<{ [key: number]: boolean }>({})

  const updateQuantity = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }))
  }

  const getQuantity = (id: number) => quantities[id] || 1

  const handleAddToCart = (item: FoodItem) => {
    const quantity = getQuantity(item.id)
    const updatedCart = addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
      quantity,
    )
    setCart(updatedCart)

    // Show feedback
    setCartFeedback((prev) => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setCartFeedback((prev) => ({ ...prev, [item.id]: false }))
    }, 2000)
  }

  const formatPrice = (price: number) => {
    return `Le ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Hero Image with Theme Support */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=85"
            alt="Modern Greek restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pb-20 sm:pb-32">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
              The Authentic Taste of Greece
              <span className="block text-primary mt-2">Delivered to Your Door</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Experience traditional Greek cuisine made with the freshest ingredients. Perfect for any occasion.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300"
                onClick={() => setCurrentPage("menu")}
              >
                <Utensils className="w-5 h-5 mr-3" />
                Order Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300"
                onClick={() => setCurrentPage("menu")}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                View Menu
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="max-w-4xl mx-auto pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">15min</h3>
                  <p className="text-sm text-white/80">Avg. Delivery</p>
                </div>
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">4.9★</h3>
                  <p className="text-sm text-white/80">Customer Rating</p>
                </div>
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">50+</h3>
                  <p className="text-sm text-white/80">Menu Items</p>
                </div>
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">1K+</h3>
                  <p className="text-sm text-white/80">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section (now first, using food card design) */}
      <section className="py-16 sm:py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-primary flex items-center justify-center gap-2">
              <span>🔥</span> Limited Time Only <span>🔥</span>
            </h2>
            <h3 className="text-4xl sm:text-5xl font-black mt-2 mb-4">Special Offers</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {getSpecialOffers().map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-2 hover:border-primary/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-background to-primary/10 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-primary text-primary-foreground font-bold text-xs">Special Offer</Badge>
                    {item.vegetarian && (
                      <Badge className="bg-green-500 text-white font-bold text-xs">🌱 Vegetarian</Badge>
                    )}
                    {item.spicy && <Badge className="bg-yellow-500 text-black font-bold text-xs">🌶️ Spicy</Badge>}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                      {item.rating}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-3xl">{item.emoji}</div>
                  {item.originalPrice && (
                    <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE 🔥
                    </div>
                  )}
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.cookingTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {item.reviews}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl sm:text-2xl font-bold text-primary">
                            {formatPrice(item.price * getQuantity(item.id))}
                          </span>
                          {getQuantity(item.id) > 1 && (
                            <span className="text-sm text-muted-foreground">({formatPrice(item.price)} each)</span>
                          )}
                          {item.originalPrice && (
                            <span className="text-sm sm:text-lg text-muted-foreground line-through">
                              {formatPrice(item.originalPrice * getQuantity(item.id))}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.calories} cal</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-8 text-center">{getQuantity(item.id)}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      className={`w-full font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                        cartFeedback[item.id]
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }`}
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {cartFeedback[item.id] ? "Added! ✅" : "Add to Cart 🛒"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Favorites Section (now after special offers) */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 to-blue-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold mb-4">🍽️ Popular Dishes</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Customer <span className="text-primary">Favorites 🌟</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              These are the dishes our customers can't stop talking about 💬✨
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {getPopularFoods().map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-background to-primary/5 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-black font-bold">⭐ Popular</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                      {item.rating}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-3xl">{item.emoji}</div>
                  {item.originalPrice && (
                    <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE 🔥
                    </div>
                  )}
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.cookingTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {item.reviews}
                      </div>
                      {item.vegetarian && (
                        <div className="flex items-center text-green-600">
                          <Leaf className="w-4 h-4 mr-1" />
                          Veg
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl sm:text-2xl font-bold text-primary">
                            {formatPrice(item.price * getQuantity(item.id))}
                          </span>
                          {getQuantity(item.id) > 1 && (
                            <span className="text-sm text-muted-foreground">({formatPrice(item.price)} each)</span>
                          )}
                          {item.originalPrice && (
                            <span className="text-sm sm:text-lg text-muted-foreground line-through">
                              {formatPrice(item.originalPrice * getQuantity(item.id))}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.calories} cal</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-8 text-center">{getQuantity(item.id)}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      className={`w-full font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                        cartFeedback[item.id]
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }`}
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {cartFeedback[item.id] ? "Added! ✅" : "Add to Cart 🛒"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => setCurrentPage("menu")}
            >
              View Full Menu 📖
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="text-primary">El Greko 🇬🇷</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to bringing you the authentic taste of Greece with modern convenience ✨
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center p-6 sm:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Fast Delivery 🚚</h3>
                <p className="text-muted-foreground">30-45 minutes average delivery time throughout Freetown area</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 sm:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ChefHat className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Authentic Recipes 👨‍🍳</h3>
                <p className="text-muted-foreground">Traditional Greek recipes passed down through generations</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 sm:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality Ingredients 🌟</h3>
                <p className="text-muted-foreground">Fresh, high-quality ingredients sourced daily for the best taste</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Visit Us <span className="text-primary">Today 📍</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Come experience authentic Greek hospitality at our restaurant or order for delivery
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-bold text-center mb-6">📞 Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-primary text-lg">077 254220</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Hours</p>
                      <p className="text-muted-foreground">Mon-Sun: 11:00 AM - 10:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Delivery</p>
                      <p className="text-muted-foreground">All areas in Freetown • 15-30 min</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="w-full py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('tel:077254220')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now 📞
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
                    onClick={() => setCurrentPage("menu")}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Online 🛒
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-bold text-center mb-6">🏪 Restaurant Location</h3>
                
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h4 className="text-xl font-bold mb-2">El Greko Restaurant</h4>
                  <p className="text-blue-100 mb-4">Authentic Greek Cuisine</p>
                  <p className="text-lg">📍 123 Main Street, Freetown, Sierra Leone</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-primary">🅿️</div>
                    <p className="text-sm text-muted-foreground mt-2">Free Parking</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-primary">🍽️</div>
                    <p className="text-sm text-muted-foreground mt-2">Dine In</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-primary">📦</div>
                    <p className="text-sm text-muted-foreground mt-2">Takeaway</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-primary">🚚</div>
                    <p className="text-sm text-muted-foreground mt-2">Delivery</p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-sm">
                    Can't find us? Call us at <span className="font-bold text-primary">077 254220</span> for directions! 🗺️
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
