"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Camera } from "lucide-react"
import { getImagesByCategory, getFeaturedImages, searchImages, type GalleryImage } from "@/lib/gallery-database"

interface GalleryPageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function GalleryPage({}: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const getFilteredImages = () => {
    let images = getImagesByCategory(selectedCategory)
    if (searchQuery) {
      images = searchImages(searchQuery)
    }
    return images
  }

  const categories = [
    { id: "all", label: "🖼️ All Photos", emoji: "🖼️" },
    { id: "food", label: "🍽️ Food", emoji: "🍽️" },
    { id: "restaurant", label: "🏛️ Restaurant", emoji: "🏛️" },
    { id: "chef", label: "👨‍🍳 Chef", emoji: "👨‍🍳" },
    { id: "events", label: "🎉 Events", emoji: "🎉" },
    { id: "ingredients", label: "🌿 Ingredients", emoji: "🌿" },
  ]

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
            Our Gallery <span className="text-primary">📸</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a visual journey through our authentic Greek restaurant - from our delicious dishes to our warm
            atmosphere 🇬🇷✨
          </p>
        </div>

        {/* Featured Images Hero */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Featured Highlights <span className="text-primary">⭐</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {getFeaturedImages()
              .slice(0, 3)
              .map((image, index) => (
                <Card
                  key={image.id}
                  className={`group overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer shadow-xl ${
                    index === 1 ? "md:scale-105" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      width={600}
                      height={400}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                        index === 1 ? "h-80 sm:h-96" : "h-64 sm:h-80"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-primary/90 text-primary-foreground mb-2 text-xs">Featured ⭐</Badge>
                      <h3 className="font-bold text-lg sm:text-xl mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search photos... 🔍"
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

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {getFilteredImages().map((image, index) => (
            <Card
              key={image.id}
              className={`group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer shadow-lg ${
                index % 7 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  width={400}
                  height={300}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    index % 7 === 0 ? "h-64 sm:h-80 lg:h-96" : "h-48 sm:h-64"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  {image.featured && (
                    <Badge className="bg-yellow-500 text-black font-bold text-xs mb-2">⭐ Featured</Badge>
                  )}
                  <Badge
                    className={`text-xs font-bold ${
                      image.category === "food"
                        ? "bg-orange-500 text-white"
                        : image.category === "restaurant"
                          ? "bg-blue-500 text-white"
                          : image.category === "chef"
                            ? "bg-purple-500 text-white"
                            : image.category === "events"
                              ? "bg-pink-500 text-white"
                              : "bg-green-500 text-white"
                    }`}
                  >
                    {categories.find((c) => c.id === image.category)?.emoji}{" "}
                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-sm sm:text-base mb-1">{image.title}</h3>
                  <p className="text-xs opacity-90 line-clamp-2">{image.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="w-8 h-8 rounded-full p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {getFilteredImages().length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg sm:text-xl text-muted-foreground">No photos found matching your search 😔</p>
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

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="max-w-4xl max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[60vh] object-cover"
                />
                <Button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  {selectedImage.featured && <Badge className="bg-yellow-500 text-black font-bold">⭐ Featured</Badge>}
                  <Badge className="bg-primary/10 text-primary">
                    {categories.find((c) => c.id === selectedImage.category)?.emoji}{" "}
                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
