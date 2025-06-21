export interface GalleryImage {
  id: number
  title: string
  description: string
  image: string
  category: "food" | "restaurant" | "chef" | "events" | "ingredients"
  featured: boolean
  tags: string[]
}

export const galleryDatabase: GalleryImage[] = [
  // Food Images
  {
    id: 1,
    title: "Signature Moussaka",
    description: "Our famous layered moussaka with perfectly seasoned lamb and creamy béchamel sauce",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    category: "food",
    featured: true,
    tags: ["moussaka", "signature", "lamb", "traditional"],
  },
  {
    id: 2,
    title: "Fresh Greek Salad",
    description: "Crisp vegetables, creamy feta, and authentic Greek olives drizzled with olive oil",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
    category: "food",
    featured: true,
    tags: ["salad", "fresh", "vegetarian", "healthy"],
  },
  {
    id: 3,
    title: "Golden Baklava",
    description: "Layers of crispy phyllo pastry with honey and nuts - a sweet taste of Greece",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop",
    category: "food",
    featured: true,
    tags: ["baklava", "dessert", "honey", "phyllo"],
  },
  {
    id: 4,
    title: "Grilled Lamb Souvlaki",
    description: "Tender lamb skewers marinated in Mediterranean herbs and spices",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
    category: "food",
    featured: false,
    tags: ["souvlaki", "lamb", "grilled", "herbs"],
  },
  {
    id: 5,
    title: "Fresh Seafood Platter",
    description: "Daily catch grilled to perfection with lemon and Mediterranean herbs",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    category: "food",
    featured: false,
    tags: ["seafood", "fish", "fresh", "grilled"],
  },
  {
    id: 6,
    title: "Authentic Gyros",
    description: "Traditional Greek gyros with tender meat and fresh vegetables",
    image: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=800&h=600&fit=crop",
    category: "food",
    featured: false,
    tags: ["gyros", "traditional", "meat", "pita"],
  },

  // Restaurant Images
  {
    id: 7,
    title: "Cozy Dining Area",
    description: "Our warm and inviting dining space with authentic Greek décor",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    category: "restaurant",
    featured: true,
    tags: ["interior", "dining", "cozy", "atmosphere"],
  },
  {
    id: 8,
    title: "Outdoor Terrace",
    description: "Enjoy your meal al fresco on our beautiful Mediterranean-style terrace",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    category: "restaurant",
    featured: false,
    tags: ["outdoor", "terrace", "dining", "mediterranean"],
  },
  {
    id: 9,
    title: "Bar Area",
    description: "Our fully stocked bar featuring Greek wines and traditional spirits",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop",
    category: "restaurant",
    featured: false,
    tags: ["bar", "drinks", "wine", "spirits"],
  },
  {
    id: 10,
    title: "Private Dining Room",
    description: "Perfect for special occasions and intimate gatherings",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop",
    category: "restaurant",
    featured: false,
    tags: ["private", "dining", "events", "special"],
  },

  // Chef Images
  {
    id: 11,
    title: "Chef Dimitri at Work",
    description: "Our head chef preparing traditional Greek dishes with passion and expertise",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop",
    category: "chef",
    featured: true,
    tags: ["chef", "cooking", "kitchen", "expertise"],
  },
  {
    id: 12,
    title: "Kitchen Team",
    description: "Our dedicated culinary team working together to create authentic flavors",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    category: "chef",
    featured: false,
    tags: ["team", "kitchen", "cooking", "collaboration"],
  },
  {
    id: 13,
    title: "Fresh Preparation",
    description: "Daily preparation of fresh ingredients for our authentic Greek dishes",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    category: "chef",
    featured: false,
    tags: ["preparation", "fresh", "ingredients", "daily"],
  },

  // Events Images
  {
    id: 14,
    title: "Greek Night Celebration",
    description: "Monthly Greek cultural nights with traditional music and dancing",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    category: "events",
    featured: true,
    tags: ["events", "celebration", "culture", "music"],
  },
  {
    id: 15,
    title: "Wedding Reception",
    description: "Beautiful wedding celebration in our private dining area",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
    category: "events",
    featured: false,
    tags: ["wedding", "reception", "celebration", "private"],
  },
  {
    id: 16,
    title: "Birthday Party",
    description: "Special birthday celebration with traditional Greek hospitality",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    category: "events",
    featured: false,
    tags: ["birthday", "party", "celebration", "hospitality"],
  },

  // Ingredients Images
  {
    id: 17,
    title: "Fresh Olive Oil",
    description: "Premium Greek olive oil imported directly from the Mediterranean",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=600&fit=crop",
    category: "ingredients",
    featured: true,
    tags: ["olive oil", "premium", "imported", "mediterranean"],
  },
  {
    id: 18,
    title: "Authentic Feta Cheese",
    description: "Traditional Greek feta cheese made from sheep and goat milk",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=600&fit=crop",
    category: "ingredients",
    featured: false,
    tags: ["feta", "cheese", "traditional", "authentic"],
  },
  {
    id: 19,
    title: "Fresh Herbs",
    description: "Aromatic Mediterranean herbs grown locally for maximum freshness",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    category: "ingredients",
    featured: false,
    tags: ["herbs", "fresh", "aromatic", "local"],
  },
  {
    id: 20,
    title: "Kalamata Olives",
    description: "Authentic Kalamata olives imported from Greece for genuine flavor",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=600&fit=crop",
    category: "ingredients",
    featured: false,
    tags: ["olives", "kalamata", "imported", "authentic"],
  },
]

export const getImagesByCategory = (category: string) => {
  if (category === "all") return galleryDatabase
  return galleryDatabase.filter((image) => image.category === category)
}

export const getFeaturedImages = () => {
  return galleryDatabase.filter((image) => image.featured)
}

export const getImageById = (id: number) => {
  return galleryDatabase.find((image) => image.id === id)
}

export const searchImages = (query: string) => {
  return galleryDatabase.filter(
    (image) =>
      image.title.toLowerCase().includes(query.toLowerCase()) ||
      image.description.toLowerCase().includes(query.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )
}
