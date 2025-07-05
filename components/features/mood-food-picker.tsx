"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FoodItem } from "@/lib/food-database"
import { Heart, Zap, Coffee, Sun, Moon, Sparkles, ShoppingCart, Star } from "lucide-react"

interface MoodFoodPickerProps {
  onViewDetails: (food: FoodItem) => void
  onAddToCart: (food: FoodItem) => void
}

type Mood = 'happy' | 'comfort' | 'energetic' | 'romantic' | 'adventurous' | 'peaceful'

const moodData = {
  happy: {
    icon: <Sun className="w-8 h-8" />,
    color: 'bg-yellow-500',
    title: 'Feeling Happy! ☀️',
    description: 'Celebrate with our most joyful dishes!',
    recommendations: [
      {
        id: 999,
        name: 'Sunshine Souvlaki',
        description: 'Grilled chicken skewers with lemon herbs - bright and cheerful like your mood!',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1544510747-4bec6b8b3b3e?w=400&q=80',
        rating: 4.9,
        cookingTime: '15 min',
        calories: 450,
        emoji: '🌞',
        category: 'Main Course',
        vegetarian: false,
        spicy: false,
        reviews: '2.1k'
      },
      {
        id: 998,
        name: 'Festive Greek Salad',
        description: 'Fresh tomatoes, olives, and feta - a celebration of Mediterranean flavors!',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
        rating: 4.8,
        cookingTime: '5 min',
        calories: 280,
        emoji: '🥗',
        category: 'Salad',
        vegetarian: true,
        spicy: false,
        reviews: '1.8k'
      }
    ]
  },
  comfort: {
    icon: <Heart className="w-8 h-8" />,
    color: 'bg-pink-500',
    title: 'Need Comfort? 🤗',
    description: 'Warm, hearty dishes to wrap you in Greek love!',
    recommendations: [
      {
        id: 997,
        name: 'Mama\'s Moussaka',
        description: 'Layers of eggplant, meat, and creamy béchamel - like a warm hug from yiayia!',
        price: 95000,
        image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=400&q=80',
        rating: 4.9,
        cookingTime: '25 min',
        calories: 650,
        emoji: '🍲',
        category: 'Main Course',
        vegetarian: false,
        spicy: false,
        reviews: '2.5k'
      },
      {
        id: 996,
        name: 'Cozy Lemon Rice',
        description: 'Fluffy rice with lemon and herbs - simple comfort food at its finest!',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
        rating: 4.7,
        cookingTime: '12 min',
        calories: 320,
        emoji: '🍚',
        category: 'Side',
        vegetarian: true,
        spicy: false,
        reviews: '1.2k'
      }
    ]
  },
  energetic: {
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-orange-500',
    title: 'Feeling Energetic! ⚡',
    description: 'Power up with our most invigorating dishes!',
    recommendations: [
      {
        id: 995,
        name: 'Power Gyros',
        description: 'Protein-packed pork gyros with tzatziki - fuel for your adventures!',
        price: 75000,
        image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=400&q=80',
        rating: 4.8,
        cookingTime: '18 min',
        calories: 550,
        emoji: '⚡',
        category: 'Main Course',
        vegetarian: false,
        spicy: false,
        reviews: '1.9k'
      },
      {
        id: 994,
        name: 'Energy Greek Smoothie',
        description: 'Greek yogurt with honey and nuts - natural energy boost!',
        price: 30000,
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80',
        rating: 4.6,
        cookingTime: '3 min',
        calories: 220,
        emoji: '🥤',
        category: 'Drink',
        vegetarian: true,
        spicy: false,
        reviews: '850'
      }
    ]
  },
  romantic: {
    icon: <Heart className="w-8 h-8" />,
    color: 'bg-red-500',
    title: 'Feeling Romantic? 💕',
    description: 'Perfect dishes for a romantic evening!',
    recommendations: [
      {
        id: 993,
        name: 'Lovers\' Seafood Platter',
        description: 'Fresh seafood with lemon and herbs - perfect for sharing with your special someone!',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1559847844-d05ce0e1ce8f?w=400&q=80',
        rating: 4.9,
        cookingTime: '22 min',
        calories: 480,
        emoji: '🦐',
        category: 'Main Course',
        vegetarian: false,
        spicy: false,
        reviews: '1.1k'
      },
      {
        id: 992,
        name: 'Romantic Red Wine',
        description: 'Greek red wine - the perfect complement to your romantic meal!',
        price: 80000,
        image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80',
        rating: 4.7,
        cookingTime: '1 min',
        calories: 125,
        emoji: '🍷',
        category: 'Drink',
        vegetarian: true,
        spicy: false,
        reviews: '920'
      }
    ]
  },
  adventurous: {
    icon: <Sparkles className="w-8 h-8" />,
    color: 'bg-purple-500',
    title: 'Feeling Adventurous? 🌟',
    description: 'Try something new and exciting!',
    recommendations: [
      {
        id: 991,
        name: 'Spicy Lamb Adventures',
        description: 'Bold lamb with exotic spices - for those who dare to explore!',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80',
        rating: 4.8,
        cookingTime: '28 min',
        calories: 620,
        emoji: '🌶️',
        category: 'Main Course',
        vegetarian: false,
        spicy: true,
        reviews: '1.3k'
      },
      {
        id: 990,
        name: 'Mystery Greek Dessert',
        description: 'Chef\'s special dessert - a sweet adventure awaits!',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
        rating: 4.9,
        cookingTime: '8 min',
        calories: 380,
        emoji: '🎲',
        category: 'Dessert',
        vegetarian: true,
        spicy: false,
        reviews: '750'
      }
    ]
  },
  peaceful: {
    icon: <Moon className="w-8 h-8" />,
    color: 'bg-blue-500',
    title: 'Feeling Peaceful? 🌙',
    description: 'Calm and soothing dishes for your soul!',
    recommendations: [
      {
        id: 989,
        name: 'Zen Greek Soup',
        description: 'Light, nourishing soup with herbs and vegetables - food for the soul!',
        price: 40000,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
        rating: 4.7,
        cookingTime: '15 min',
        calories: 210,
        emoji: '🍲',
        category: 'Soup',
        vegetarian: true,
        spicy: false,
        reviews: '1.0k'
      },
      {
        id: 988,
        name: 'Peaceful Herbal Tea',
        description: 'Calming Greek mountain herbs - perfect for relaxation!',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
        rating: 4.8,
        cookingTime: '4 min',
        calories: 5,
        emoji: '🍵',
        category: 'Drink',
        vegetarian: true,
        spicy: false,
        reviews: '680'
      }
    ]
  }
}

export default function MoodFoodPicker({ onViewDetails, onAddToCart }: MoodFoodPickerProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 1000)
  }

  const formatPrice = (price: number) => {
    return `Le ${price.toLocaleString()}`
  }

  const greekPhrases = [
    "Yamas! (Cheers!)",
    "Kalimera! (Good morning!)",
    "Opa! (Expression of joy!)",
    "Philoxenia! (Love of strangers!)",
    "Yia sou! (Hello!)",
    "Zorba approved! 💃"
  ]

  const getRandomGreekPhrase = () => {
    return greekPhrases[Math.floor(Math.random() * greekPhrases.length)]
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            How Are You Feeling Today? 🇬🇷
          </h2>
          <p className="text-xl text-muted-foreground">
            Let us recommend the perfect Greek dish for your mood! 
          </p>
          <div className="mt-2 text-primary font-semibold">
            {getRandomGreekPhrase()}
          </div>
        </div>

        {/* Mood Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {Object.entries(moodData).map(([mood, data]) => (
            <Button
              key={mood}
              onClick={() => handleMoodSelect(mood as Mood)}
              variant={selectedMood === mood ? "default" : "outline"}
              className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 ${
                selectedMood === mood 
                  ? `${data.color} text-white hover:opacity-90` 
                  : 'hover:border-primary'
              }`}
            >
              {data.icon}
              <span className="text-sm font-medium capitalize">{mood}</span>
            </Button>
          ))}
        </div>

        {/* Mood Result */}
        {selectedMood && (
          <div className={`transition-all duration-500 ${showAnimation ? 'animate-bounce' : ''}`}>
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 ${moodData[selectedMood].color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {moodData[selectedMood].icon}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {moodData[selectedMood].title}
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  {moodData[selectedMood].description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {moodData[selectedMood].recommendations.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                          {item.rating}
                        </div>
                        <div className="absolute bottom-2 left-2 text-2xl">
                          {item.emoji}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>⏱️ {item.cookingTime}</span>
                            <span>🔥 {item.calories} cal</span>
                            <span>⭐ {item.reviews}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary">{item.category}</Badge>
                            {item.vegetarian && <Badge className="bg-green-500">🌱 Veg</Badge>}
                            {item.spicy && <Badge className="bg-red-500">🌶️ Spicy</Badge>}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">
                              {formatPrice(item.price)}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onViewDetails(item)}
                              >
                                View Details
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => onAddToCart(item)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}