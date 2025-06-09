// Amazon product data with affiliate links
// This approach works WITHOUT the Product Advertising API

export interface AmazonProduct {
  id: string
  title: string
  price: string
  priceValue: number
  description: string
  imageUrl: string
  amazonUrl: string
  category: string
  rating: number
  reviewCount: number
  isPrime: boolean
  features: string[]
  tags: string[]
}

// Replace with YOUR actual Amazon Associates ID
const AMAZON_ASSOCIATE_ID = "giftgenie-20" // ⚠️ CHANGE THIS TO YOUR ACTUAL ID

// Helper function to create Amazon affiliate links
export function createAmazonAffiliateLink(asin: string, tag: string = AMAZON_ASSOCIATE_ID): string {
  return `https://www.amazon.com/dp/${asin}?tag=${tag}&linkCode=ogi&th=1&psc=1`
}

// Curated Amazon products with real ASINs (no API needed!)
// To add more products:
// 1. Go to Amazon.com
// 2. Find a product you want to include
// 3. Copy the ASIN from the URL (e.g., amazon.com/dp/B08N5WRWNW)
// 4. Add it to this array with the product details

export const amazonProducts: AmazonProduct[] = [
  {
    id: "echo-dot",
    title: "Amazon Echo Dot (5th Gen) Smart Speaker",
    price: "$49.99",
    priceValue: 49.99,
    description:
      "Smart speaker with Alexa voice control, perfect for any room. Control smart home devices, play music, and get information hands-free.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B09B8V1LZ3"), // Real Echo Dot ASIN
    category: "Electronics",
    rating: 4.7,
    reviewCount: 89234,
    isPrime: true,
    features: [
      "Improved audio quality",
      "Voice control with Alexa",
      "Smart home hub built-in",
      "Compact design fits anywhere",
    ],
    tags: ["smart home", "voice assistant", "music", "tech gifts"],
  },
  {
    id: "kindle-paperwhite",
    title: "Kindle Paperwhite (11th Generation)",
    price: "$139.99",
    priceValue: 139.99,
    description:
      'Waterproof e-reader with 6.8" display and adjustable warm light. Perfect for book lovers who read anywhere.',
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B08KTZ8249"), // Real Kindle ASIN
    category: "Electronics",
    rating: 4.6,
    reviewCount: 45678,
    isPrime: true,
    features: [
      "Waterproof design (IPX8)",
      '6.8" glare-free display',
      "Adjustable warm light",
      "Up to 10 weeks battery life",
    ],
    tags: ["reading", "books", "travel", "waterproof"],
  },
  {
    id: "air-fryer",
    title: "COSORI Air Fryer Max XL 5.8-Quart",
    price: "$119.99",
    priceValue: 119.99,
    description: "Large capacity air fryer with 11 presets and recipe book. Cook healthier meals with 85% less oil.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B07GJBBGHG"), // Real Air Fryer ASIN
    category: "Kitchen",
    rating: 4.8,
    reviewCount: 67890,
    isPrime: true,
    features: ["5.8-quart family size", "11 one-touch presets", "85% less oil cooking", "Dishwasher safe basket"],
    tags: ["cooking", "healthy", "kitchen", "family"],
  },
  {
    id: "coffee-maker",
    title: "Keurig K-Classic Coffee Maker",
    price: "$89.99",
    priceValue: 89.99,
    description:
      "Single serve K-Cup pod coffee maker with multiple brew sizes. Perfect for coffee lovers who want convenience.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B018UQ5AMS"), // Real Keurig ASIN
    category: "Kitchen",
    rating: 4.5,
    reviewCount: 123456,
    isPrime: true,
    features: [
      "3 cup sizes: 6, 8, 10 oz",
      "Large 48 oz water reservoir",
      "Auto-off feature",
      "Compatible with My K-Cup",
    ],
    tags: ["coffee", "morning", "convenience", "kitchen"],
  },
  {
    id: "bluetooth-headphones",
    title: "Sony WH-CH720N Noise Canceling Headphones",
    price: "$149.99",
    priceValue: 149.99,
    description:
      "Wireless noise canceling headphones with 35-hour battery life. Perfect for music lovers and remote workers.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B0BS1XQZPX"), // Real Sony headphones ASIN
    category: "Electronics",
    rating: 4.4,
    reviewCount: 8765,
    isPrime: true,
    features: [
      "Active noise canceling",
      "35-hour battery life",
      "Quick charge: 3 min = 1 hour",
      "Multipoint Bluetooth connection",
    ],
    tags: ["music", "work", "travel", "wireless"],
  },
  {
    id: "yoga-mat",
    title: "Manduka PRO Yoga Mat - Premium 6mm",
    price: "$88.00",
    priceValue: 88.0,
    description:
      "Professional-grade yoga mat with superior cushioning and grip. Lifetime guarantee for serious practitioners.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B000BNFHX8"), // Real Manduka ASIN
    category: "Fitness",
    rating: 4.7,
    reviewCount: 12345,
    isPrime: true,
    features: [
      "6mm thick for joint protection",
      "Superior grip and stability",
      "Lifetime guarantee",
      "Eco-friendly materials",
    ],
    tags: ["yoga", "fitness", "wellness", "exercise"],
  },
  {
    id: "instant-pot",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: "$79.95",
    priceValue: 79.95,
    description:
      "7-in-1 multi-cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B00FLYWNYQ"), // Real Instant Pot ASIN
    category: "Kitchen",
    rating: 4.6,
    reviewCount: 234567,
    isPrime: true,
    features: ["7 appliances in 1", "6-quart capacity", "10+ safety features", "Free app with 1900+ recipes"],
    tags: ["cooking", "meal prep", "family", "convenience"],
  },
  {
    id: "skincare-set",
    title: "CeraVe Daily Face and Body Moisturizing Lotion Set",
    price: "$24.99",
    priceValue: 24.99,
    description:
      "Dermatologist-recommended skincare set with ceramides and hyaluronic acid. Perfect for daily hydration.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B07RNRQMH1"), // Real CeraVe ASIN
    category: "Beauty",
    rating: 4.5,
    reviewCount: 45678,
    isPrime: true,
    features: ["Contains ceramides", "Hyaluronic acid for hydration", "Fragrance-free", "Dermatologist recommended"],
    tags: ["skincare", "beauty", "daily routine", "sensitive skin"],
  },
  {
    id: "wireless-charger",
    title: "Anker Wireless Charger, PowerWave 10 Stand",
    price: "$25.99",
    priceValue: 25.99,
    description:
      "Fast wireless charging stand compatible with iPhone and Android. Charge in portrait or landscape mode.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B078WDQZPX"), // Real Anker ASIN
    category: "Electronics",
    rating: 4.6,
    reviewCount: 87654,
    isPrime: true,
    features: ["10W fast charging", "Portrait and landscape modes", "LED indicator", "Case-friendly design"],
    tags: ["charging", "wireless", "phone", "desk"],
  },
  {
    id: "essential-oils",
    title: "URPOWER Essential Oil Diffuser with Oils Set",
    price: "$39.99",
    priceValue: 39.99,
    description: "Ultrasonic aromatherapy diffuser with 6 essential oils. Create a relaxing atmosphere in any room.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B013A2UZ64"), // Real diffuser ASIN
    category: "Home",
    rating: 4.4,
    reviewCount: 23456,
    isPrime: true,
    features: ["Ultrasonic technology", "7 LED light colors", "Auto shut-off safety", "6 essential oils included"],
    tags: ["aromatherapy", "relaxation", "home", "wellness"],
  },
  {
    id: "wireless-earbuds",
    title: "Sony WF-1000XM4 Wireless Noise Canceling Earbuds",
    price: "$248.00",
    priceValue: 248.0,
    description:
      "Industry-leading noise cancellation with exceptional sound quality. Perfect for music lovers and frequent travelers.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B094C4VDJZ"),
    category: "Electronics",
    rating: 4.4,
    reviewCount: 15876,
    isPrime: true,
    features: [
      "Industry-leading noise cancellation",
      "8 hours battery + 16 hours with case",
      "Crystal clear call quality",
      "Water resistant for workouts",
    ],
    tags: ["music", "travel", "tech gifts", "premium", "Birthday", "Anniversary"],
  },
  {
    id: "indoor-herb-garden",
    title: "AeroGarden Harvest Indoor Hydroponic Garden",
    price: "$99.95",
    priceValue: 99.95,
    description:
      "Grow fresh herbs and vegetables year-round with this countertop hydroponic garden. Perfect for home cooks and plant enthusiasts.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B07CKK8Z78"),
    category: "Home",
    rating: 4.6,
    reviewCount: 12453,
    isPrime: true,
    features: [
      "Grows up to 6 plants at once",
      "Automatic LED grow lights",
      "Includes 6 herb seed pods",
      "No soil, no mess gardening",
    ],
    tags: ["cooking", "home", "gardening", "kitchen", "Housewarming", "Mother's Day"],
  },
  {
    id: "weighted-blanket",
    title: "YnM Weighted Blanket, 15 lbs Queen Size",
    price: "$49.80",
    priceValue: 49.8,
    description:
      "Premium weighted blanket for better sleep and stress relief. The perfect gift for anyone who needs relaxation and comfort.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B073429DV2"),
    category: "Home",
    rating: 4.6,
    reviewCount: 45678,
    isPrime: true,
    features: [
      "7-layer design for comfort and durability",
      "100% Oeko-Tex certified cotton",
      "Even weight distribution",
      "Helps reduce anxiety and improve sleep",
    ],
    tags: ["sleep", "wellness", "relaxation", "comfort", "Birthday", "Christmas"],
  },
  {
    id: "board-game",
    title: "Catan Board Game",
    price: "$43.97",
    priceValue: 43.97,
    description:
      "Award-winning strategy board game that's perfect for family game nights and get-togethers with friends.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B00U26V4VQ"),
    category: "Games",
    rating: 4.8,
    reviewCount: 32456,
    isPrime: true,
    features: [
      "60-minute playing time",
      "3-4 players (expansions available)",
      "Different each time you play",
      "Develops strategic thinking",
    ],
    tags: ["games", "family", "entertainment", "strategy", "Birthday", "Christmas"],
  },
  {
    id: "smart-watch",
    title: "Fitbit Versa 3 Health & Fitness Smartwatch",
    price: "$179.95",
    priceValue: 179.95,
    description:
      "Track your fitness goals, heart rate, sleep quality and more with this versatile smartwatch. Perfect for health-conscious individuals.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B08DFCWVZ4"),
    category: "Electronics",
    rating: 4.5,
    reviewCount: 28976,
    isPrime: true,
    features: ["Built-in GPS", "24/7 heart rate tracking", "6+ day battery life", "Voice assistant capabilities"],
    tags: ["fitness", "health", "tech gifts", "wearable", "Birthday", "Anniversary", "Christmas"],
  },
  {
    id: "mini-chainsaw",
    title: "Saker Mini Chainsaw, Portable Electric Cordless Handheld Chain Saw",
    price: "$39.95",
    priceValue: 39.95,
    description:
      "Lightweight cordless mini chainsaw perfect for pruning branches, yard work, and small cutting tasks. Great gift for DIY enthusiasts and gardeners.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    amazonUrl: createAmazonAffiliateLink("B0947XLWFW"), // ASIN from the URL
    category: "Tools",
    rating: 4.5,
    reviewCount: 14985,
    isPrime: true,
    features: [
      "Cordless and portable design",
      "Perfect for pruning and small cuts",
      "Lightweight and easy to handle",
      "Rechargeable battery included",
    ],
    tags: ["tools", "gardening", "outdoor", "diy", "Father's Day", "practical", "yard work"],
  },
]

// Function to get products by category
export function getProductsByCategory(category: string): AmazonProduct[] {
  return amazonProducts.filter((product) => product.category === category)
}

// Function to search products
export function searchProducts(query: string): AmazonProduct[] {
  const lowercaseQuery = query.toLowerCase()
  return amazonProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

// Function to get product recommendations based on occasion
export function getProductsByOccasion(occasion: string): AmazonProduct[] {
  // First, try direct matching with tags
  const directMatches = amazonProducts.filter((product) => product.tags.some((tag) => tag === occasion))

  // If we have direct matches, return those
  if (directMatches.length >= 3) {
    return directMatches
  }

  // Otherwise, use our occasion mapping as a fallback
  const occasionMap: Record<string, string[]> = {
    Birthday: ["tech gifts", "premium", "entertainment", "fitness", "wellness"],
    Anniversary: ["premium", "romantic", "couple", "wellness", "tech gifts"],
    Christmas: ["family", "entertainment", "home", "tech gifts", "premium"],
    "Valentine's Day": ["romantic", "wellness", "premium", "couple"],
    "Mother's Day": ["wellness", "home", "beauty", "relaxation", "gardening"],
    "Father's Day": ["tech gifts", "fitness", "entertainment", "premium"],
    Graduation: ["tech gifts", "books", "premium", "fitness"],
    Housewarming: ["home", "kitchen", "gardening", "practical"],
    "Just Because": ["wellness", "entertainment", "practical", "budget"],
  }

  const relevantTags = occasionMap[occasion] || []
  const fallbackMatches = amazonProducts.filter((product) => product.tags.some((tag) => relevantTags.includes(tag)))

  // If we still don't have enough matches, return random products
  if (fallbackMatches.length >= 3) {
    return fallbackMatches
  }

  // Last resort: return random products
  return getRandomProducts(3)
}

// Function to get product by ID
export function getProductById(id: string): AmazonProduct | undefined {
  return amazonProducts.find((product) => product.id === id)
}

// Function to get random products
export function getRandomProducts(count = 3): AmazonProduct[] {
  const shuffled = [...amazonProducts].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Function to get trending/popular products
export function getTrendingProducts(count = 6): AmazonProduct[] {
  return amazonProducts
    .filter((product) => product.reviewCount > 10000)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
}

// Function to get products by recipient type
export function getProductsByRecipient(recipient: string): AmazonProduct[] {
  const recipientMap: Record<string, string[]> = {
    "Partner/Spouse": ["romantic", "premium", "wellness", "tech gifts"],
    Friend: ["entertainment", "practical", "budget", "wellness"],
    Parent: ["home", "wellness", "practical", "premium"],
    Mother: ["beauty", "wellness", "home", "gardening"],
    Father: ["tech gifts", "entertainment", "fitness", "practical"],
    Sibling: ["entertainment", "tech gifts", "budget", "fitness"],
    Colleague: ["practical", "budget", "office", "wellness"],
    "Family Member": ["home", "entertainment", "practical", "wellness"],
  }

  const relevantTags = recipientMap[recipient] || []
  return amazonProducts.filter((product) => product.tags.some((tag) => relevantTags.includes(tag)))
}
