"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Heart } from "lucide-react"

interface AboutPageProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function AboutPage({}: AboutPageProps) {
  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">About El Greko 🇬🇷</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12">
          Bringing authentic Greek flavors to the heart of Freetown since 2020 ❤️
        </p>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <div className="text-left space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Our Story 📖</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Founded by Chef Dimitri in 2020, El Greko was born from a passion to share authentic Greek cuisine with
              the vibrant community of Freetown. Using traditional family recipes passed down through generations, we
              create dishes that transport you straight to the Greek islands. 🏝️
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Every dish is prepared with love, using the freshest ingredients and time-honored techniques. From our
              signature moussaka to our delicate baklava, each bite tells a story of Greek heritage and hospitality. 🍽️✨
            </p>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=400&fit=crop"
              alt="Our Kitchen"
              width={500}
              height={400}
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="p-4 sm:p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
            <CardContent className="space-y-4">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto" />
              <h3 className="text-lg sm:text-xl font-bold">Award Winning 🏆</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Best Mediterranean Restaurant 2023</p>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg">
            <CardContent className="space-y-4">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto" />
              <h3 className="text-lg sm:text-xl font-bold">Family Owned 👨‍👩‍👧‍👦</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Authentic recipes from our family to yours</p>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6 text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-background to-primary/5 shadow-lg sm:col-span-2 lg:col-span-1">
            <CardContent className="space-y-4">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto" />
              <h3 className="text-lg sm:text-xl font-bold">Made with Love ❤️</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Every dish crafted with passion and care</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
