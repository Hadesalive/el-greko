"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, Star, Plus, Minus, ShoppingCart, Users, Search } from "lucide-react"
import { getFoodsByCategory, searchFoods, type FoodItem } from "@/lib/food-database"
import { addToCart, type CartItem } from "@/lib/cart-storage"

interface MenuPageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
}

export default function MenuPage({ cart, setCart }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

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
  }

  const formatPrice = (price: number) => {
    return `Le ${price.toLocaleString()}`
  }

  const getFilteredFoods = () => {
    let foods = getFoodsByCategory(selectedCategory)
    if (searchQuery) {
      foods = searchFoods(searchQuery)
    }
    return foods
  }

  const categories = [
    { id: "all", label: "🍽️ All Items", emoji: "🍽️" },
    { id: "salads", label: "🥗 Salad", emoji: "🥗" },
    { id: "brunch", label: "🍖 Brunch", emoji: "🍖" },
    { id: "pizza", label: "🍕 Pizza", emoji: "🍕"},
    { id: "sandwich", label: "🥪 Sandwich", emoji: "🥪"},
    { id: "burger", label: "🍔 Burger", emoji: "🍔"},
    { id: "dessert", label: "🍯 Desserts", emoji: "🍯" },
    { id: "fried-chicken", label: "🍗 Fried Chicken", emoji: "🍗" },
    { id: "drinks", label: "🥤 Drinks", emoji: "🥤" },

  ]

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Our Menu 🍽️</h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Discover authentic Greek flavors 🇬🇷</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search dishes... 🔍"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-2 border-primary/20 focus:border-primary text-base"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === category.id
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-primary/10 hover:bg-primary/20 text-primary"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getFilteredFoods().map((item) => (
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
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.popular && <Badge className="bg-yellow-500 text-black font-bold text-xs">⭐ Popular</Badge>}
                  {item.vegetarian && (
                    <Badge className="bg-green-500 text-white font-bold text-xs">🌱 Vegetarian</Badge>
                  )}
                  {item.spicy && <Badge className="bg-red-500 text-white font-bold text-xs">🌶️ Spicy</Badge>}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                    {item.rating}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-2xl sm:text-3xl">{item.emoji}</div>
                {item.originalPrice && (
                  <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    SALE 🔥
                  </div>
                )}
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-muted-foreground">
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
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm sm:text-base text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{item.calories} cal</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 rounded-full p-0"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <span className="font-bold w-6 sm:w-8 text-center text-sm sm:text-base">
                        {getQuantity(item.id)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 rounded-full p-0"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart 🛒
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredFoods().length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg sm:text-xl text-muted-foreground">No dishes found matching your search 😔</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters 🔄
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
