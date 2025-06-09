// Simple gift product data without Amazon integration
export interface GiftProduct {
  id: string
  title: string
  price: string
  priceValue: number
  description: string
  imageUrl: string
  productUrl: string
  category: string
  rating: number
  reviewCount: number
  features: string[]
  tags: string[]
  retailer: string
}

// Utility type for form data, matches the structure in app/personalize/page.tsx
interface GiftFormData {
  recipientName: string;
  occasion: string;
  relationship: string;
  recipientGender: string;
  ageRange: string;
  personality: string;
  hobbies: string[];
  lifestyle: string;
  techSavviness: string;
  giftPreference: string;
  budget: string;
  tone: string;
  favoriteColors: string;
  dislikes: string;
  recentEvents: string;
  specialNotes: string;
}

// Curated gift products from various retailers
export const giftProducts: GiftProduct[] = [
  {
    id: "smart-speaker",
    title: "Smart Speaker with Voice Assistant",
    price: "$49.99",
    priceValue: 49.99,
    description:
      "Smart speaker with voice control, perfect for any room. Control smart home devices, play music, and get information hands-free.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/smart-speaker", // Replace with actual product links
    category: "Electronics",
    rating: 4.7,
    reviewCount: 89234,
    features: [
      "Improved audio quality",
      "Voice control capabilities",
      "Smart home hub built-in",
      "Compact design fits anywhere",
    ],
    tags: ["smart home", "voice assistant", "music", "tech gifts"],
    retailer: "Various Retailers",
  },
  {
    id: "e-reader",
    title: "Waterproof E-Reader with Adjustable Light",
    price: "$139.99",
    priceValue: 139.99,
    description:
      'Waterproof e-reader with 6.8" display and adjustable warm light. Perfect for book lovers who read anywhere.',
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/e-reader",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 45678,
    features: ["Waterproof design", '6.8" glare-free display', "Adjustable warm light", "Long battery life"],
    tags: ["reading", "books", "travel", "waterproof"],
    retailer: "Various Retailers",
  },
  {
    id: "air-fryer",
    title: "Large Capacity Air Fryer with Presets",
    price: "$119.99",
    priceValue: 119.99,
    description: "Large capacity air fryer with multiple presets and recipe book. Cook healthier meals with less oil.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/air-fryer",
    category: "Kitchen",
    rating: 4.8,
    reviewCount: 67890,
    features: ["Large family size", "Multiple presets", "Healthier cooking", "Easy cleanup"],
    tags: ["cooking", "healthy", "kitchen", "family"],
    retailer: "Various Retailers",
  },
  {
    id: "coffee-maker",
    title: "Single Serve Coffee Maker",
    price: "$89.99",
    priceValue: 89.99,
    description: "Single serve coffee maker with multiple brew sizes. Perfect for coffee lovers who want convenience.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/coffee-maker",
    category: "Kitchen",
    rating: 4.5,
    reviewCount: 123456,
    features: ["Multiple cup sizes", "Large water reservoir", "Auto-off feature", "Compatible with various pods"],
    tags: ["coffee", "morning", "convenience", "kitchen"],
    retailer: "Various Retailers",
  },
  {
    id: "wireless-headphones",
    title: "Noise Canceling Wireless Headphones",
    price: "$149.99",
    priceValue: 149.99,
    description:
      "Wireless noise canceling headphones with long battery life. Perfect for music lovers and remote workers.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/headphones",
    category: "Electronics",
    rating: 4.4,
    reviewCount: 8765,
    features: ["Active noise canceling", "Long battery life", "Quick charge capability", "Wireless connectivity"],
    tags: ["music", "work", "travel", "wireless"],
    retailer: "Various Retailers",
  },
  {
    id: "yoga-mat",
    title: "Premium Yoga Mat with Superior Grip",
    price: "$88.00",
    priceValue: 88.0,
    description: "Professional-grade yoga mat with superior cushioning and grip. Perfect for serious practitioners.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/yoga-mat",
    category: "Fitness",
    rating: 4.7,
    reviewCount: 12345,
    features: [
      "Extra thick for comfort",
      "Superior grip and stability",
      "Durable construction",
      "Eco-friendly materials",
    ],
    tags: ["yoga", "fitness", "wellness", "exercise"],
    retailer: "Various Retailers",
  },
  {
    id: "multi-cooker",
    title: "7-in-1 Electric Multi-Cooker",
    price: "$79.95",
    priceValue: 79.95,
    description: "7-in-1 multi-cooker: pressure cooker, slow cooker, rice cooker, steamer, and more.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/multi-cooker",
    category: "Kitchen",
    rating: 4.6,
    reviewCount: 234567,
    features: ["7 appliances in 1", "Large capacity", "Safety features", "Recipe app included"],
    tags: ["cooking", "meal prep", "family", "convenience"],
    retailer: "Various Retailers",
  },
  {
    id: "skincare-set",
    title: "Daily Moisturizing Skincare Set",
    price: "$24.99",
    priceValue: 24.99,
    description: "Dermatologist-recommended skincare set with moisturizing ingredients. Perfect for daily hydration.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/skincare-set",
    category: "Beauty",
    rating: 4.5,
    reviewCount: 45678,
    features: ["Dermatologist recommended", "Hydrating formula", "Fragrance-free", "Daily use"],
    tags: ["skincare", "beauty", "daily routine", "sensitive skin"],
    retailer: "Various Retailers",
  },
  {
    id: "wireless-charger",
    title: "Fast Wireless Charging Stand",
    price: "$25.99",
    priceValue: 25.99,
    description: "Fast wireless charging stand compatible with most phones. Charge in portrait or landscape mode.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/wireless-charger",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 87654,
    features: ["Fast charging", "Multiple orientations", "LED indicator", "Universal compatibility"],
    tags: ["charging", "wireless", "phone", "desk"],
    retailer: "Various Retailers",
  },
  {
    id: "essential-oils-diffuser",
    title: "Aromatherapy Diffuser with Essential Oils",
    price: "$39.99",
    priceValue: 39.99,
    description: "Ultrasonic aromatherapy diffuser with essential oils set. Create a relaxing atmosphere.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/diffuser",
    category: "Home",
    rating: 4.4,
    reviewCount: 23456,
    features: ["Ultrasonic technology", "LED lighting", "Auto shut-off", "Essential oils included"],
    tags: ["aromatherapy", "relaxation", "home", "wellness"],
    retailer: "Various Retailers",
  },
  {
    id: "premium-earbuds",
    title: "Premium Wireless Noise Canceling Earbuds",
    price: "$248.00",
    priceValue: 248.0,
    description:
      "Premium noise cancellation with exceptional sound quality. Perfect for music lovers and frequent travelers.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/premium-earbuds",
    category: "Electronics",
    rating: 4.4,
    reviewCount: 15876,
    features: ["Advanced noise cancellation", "Long battery life", "Crystal clear calls", "Water resistant"],
    tags: ["music", "travel", "tech gifts", "premium", "Birthday", "Anniversary"],
    retailer: "Various Retailers",
  },
  {
    id: "indoor-garden",
    title: "Indoor Hydroponic Garden Kit",
    price: "$99.95",
    priceValue: 99.95,
    description:
      "Grow fresh herbs and vegetables year-round with this countertop hydroponic garden. Perfect for home cooks.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/indoor-garden",
    category: "Home",
    rating: 4.6,
    reviewCount: 12453,
    features: ["Grows multiple plants", "Automatic LED lights", "Includes seed pods", "Soil-free gardening"],
    tags: ["cooking", "home", "gardening", "kitchen", "Housewarming", "Mother's Day"],
    retailer: "Various Retailers",
  },
  {
    id: "weighted-blanket",
    title: "Premium Weighted Blanket for Better Sleep",
    price: "$49.80",
    priceValue: 49.8,
    description: "Premium weighted blanket for better sleep and stress relief. Perfect for relaxation and comfort.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/weighted-blanket",
    category: "Home",
    rating: 4.6,
    reviewCount: 45678,
    features: ["Multi-layer design", "Certified materials", "Even weight distribution", "Helps improve sleep"],
    tags: ["sleep", "wellness", "relaxation", "comfort", "Birthday", "Christmas"],
    retailer: "Various Retailers",
  },
  {
    id: "strategy-board-game",
    title: "Award-Winning Strategy Board Game",
    price: "$43.97",
    priceValue: 43.97,
    description:
      "Award-winning strategy board game that's perfect for family game nights and get-togethers with friends.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/board-game",
    category: "Games",
    rating: 4.8,
    reviewCount: 32456,
    features: ["60-minute playing time", "3-4 players", "Different each time", "Strategic thinking"],
    tags: ["games", "family", "entertainment", "strategy", "Birthday", "Christmas"],
    retailer: "Various Retailers",
  },
  {
    id: "fitness-smartwatch",
    title: "Health & Fitness Smartwatch",
    price: "$179.95",
    priceValue: 179.95,
    description: "Track your fitness goals, heart rate, sleep quality and more with this versatile smartwatch.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    productUrl: "https://example.com/smartwatch",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 28976,
    features: ["Built-in GPS", "Heart rate tracking", "Long battery life", "Voice assistant"],
    tags: ["fitness", "health", "tech gifts", "wearable", "Birthday", "Anniversary", "Christmas"],
    retailer: "Various Retailers",
  },
]

// Function to get products by category
export function getProductsByCategory(category: string): GiftProduct[] {
  if (category === "all") return giftProducts
  return giftProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

// Function to search products
export function searchProducts(query: string): GiftProduct[] {
  const lowerCaseQuery = query.toLowerCase()
  return giftProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
  )
}

// Function to get product recommendations based on occasion
export function getProductsByOccasion(occasion: string): GiftProduct[] {
  if (occasion === "all") return giftProducts
  return giftProducts.filter((product) => product.tags.includes(occasion))
}

// Function to get product by ID
export function getProductById(id: string): GiftProduct | undefined {
  return giftProducts.find((product) => product.id === id)
}

// Function to get random products
export function getRandomProducts(count = 3): GiftProduct[] {
  const shuffled = [...giftProducts].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Function to get trending/popular products
export function getTrendingProducts(count = 6): GiftProduct[] {
  // For now, just return a few random popular-looking products
  const popularProducts = giftProducts.filter((p) => p.rating > 4.5 && p.reviewCount > 10000)
  const shuffled = [...popularProducts].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Function to get products by recipient type
export function getProductsByRecipient(recipient: string): GiftProduct[] {
  if (recipient === "all") return giftProducts
  return giftProducts.filter((product) => product.tags.includes(recipient))
}

export function getFilteredProducts(formData: GiftFormData): GiftProduct[] {
  let filtered = [...giftProducts];

  // 1. Filter by Occasion (if specified)
  if (formData.occasion && formData.occasion !== "") {
    filtered = filtered.filter(product => product.tags.includes(formData.occasion));
  }

  // 2. Filter by Relationship (if specified)
  if (formData.relationship && formData.relationship !== "") {
    filtered = filtered.filter(product => product.tags.includes(formData.relationship));
  }

  // 3. Filter by Age Range (simple example - could be more complex)
  if (formData.ageRange && formData.ageRange !== "") {
    // Assuming age ranges in tags are like '18-25', '50+'
    filtered = filtered.filter(product => product.tags.includes(formData.ageRange));
  }

  // 4. Filter by Gender (if specified)
  if (formData.recipientGender && formData.recipientGender !== "") {
    filtered = filtered.filter(product => product.tags.includes(formData.recipientGender));
  }

  // 5. Filter by Budget (if specified)
  if (formData.budget && formData.budget !== "") {
    // Assuming budget is a string like "$25-50" or "Under $25"
    const parseBudget = (budgetStr: string): { min: number, max: number } => {
      if (budgetStr.toLowerCase().includes("under")) {
        return { min: 0, max: parseFloat(budgetStr.replace(/[^0-9.]/g, '')) || Infinity };
      } else if (budgetStr.includes("-")) {
        const [minStr, maxStr] = budgetStr.split("-");
        return { min: parseFloat(minStr.replace(/[^0-9.]/g, '')) || 0, max: parseFloat(maxStr.replace(/[^0-9.]/g, '')) || Infinity };
      } else if (budgetStr.includes("+")) {
        return { min: parseFloat(budgetStr.replace(/[^0-9.]/g, '')) || 0, max: Infinity };
      } else {
        const val = parseFloat(budgetStr.replace(/[^0-9.]/g, ''));
        return { min: val, max: val }; // For exact budget
      }
    };
    const { min, max } = parseBudget(formData.budget);
    filtered = filtered.filter(product => product.priceValue >= min && product.priceValue <= max);
  }

  // 6. Filter by Dislikes (exclude products with these keywords in tags or description)
  if (formData.dislikes) {
    const dislikeKeywords = formData.dislikes.toLowerCase().split(" ").filter(Boolean);
    filtered = filtered.filter(product => {
      const productText = (product.title + " " + product.description + " " + product.tags.join(" ")).toLowerCase();
      return !dislikeKeywords.some(keyword => productText.includes(keyword));
    });
  }

  // 7. Score-based matching for other general inputs (personality, hobbies, lifestyle, techSavviness, giftPreference, favoriteColors, recentEvents, specialNotes)
  // This is a simplified scoring. A real-world scenario might use more advanced NLP or a dedicated search service.
  const scoredProducts = filtered.map(product => {
    let score = 0;
    const productSearchableText = (product.title + " " + product.description + " " + product.tags.join(" ")).toLowerCase();

    const addScoreIfMatch = (input: string | string[], productProp: string | string[]) => {
      if (Array.isArray(input)) {
        input.forEach(item => {
          if (Array.isArray(productProp)) {
            if (productProp.some(pItem => pItem.toLowerCase().includes(item.toLowerCase()))) score += 1;
          } else {
            if (productProp.toLowerCase().includes(item.toLowerCase())) score += 1;
          }
        });
      } else if (input) {
        const inputKeywords = input.toLowerCase().split(" ").filter(Boolean);
        inputKeywords.forEach(keyword => {
          if (Array.isArray(productProp)) {
            if (productProp.some(pItem => pItem.toLowerCase().includes(keyword))) score += 1;
          } else {
            if (productProp.toLowerCase().includes(keyword)) score += 1;
          }
        });
      }
    };

    addScoreIfMatch(formData.hobbies, product.tags);
    addScoreIfMatch(formData.lifestyle, product.tags);
    addScoreIfMatch(formData.techSavviness, product.tags);
    addScoreIfMatch(formData.giftPreference, product.tags);
    addScoreIfMatch(formData.personality, productSearchableText);
    addScoreIfMatch(formData.favoriteColors, productSearchableText);
    addScoreIfMatch(formData.recentEvents, productSearchableText);
    addScoreIfMatch(formData.specialNotes, productSearchableText);

    return { product, score };
  });

  // Sort by score (highest first) and return only the product objects
  return scoredProducts.sort((a, b) => b.score - a.score).map(item => item.product);
}
