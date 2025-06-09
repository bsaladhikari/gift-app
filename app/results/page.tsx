"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Heart, Star, Loader2 } from "lucide-react"

interface Product {
  id: string
  title: string
  description: string
  price: number
  price_display: string
  category: string
  retailer: string
  product_url: string
  rating: number
  review_count: number
  features: string[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [preferences, setPreferences] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/signin")
        return
      }
      setUser(currentUser)
      await loadUserPreferences(currentUser.id)
    } catch (error) {
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }

  const loadUserPreferences = async (userId: string) => {
    try {
      // Load user preferences
      const { data: prefs, error: prefsError } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", userId)
        .single()

      if (prefsError || !prefs) {
        router.push("/preferences")
        return
      }

      setPreferences(prefs)
      await loadMatchingProducts(prefs)
    } catch (error) {
      console.error("Error loading preferences:", error)
      router.push("/preferences")
    }
  }

  const loadMatchingProducts = async (prefs: any) => {
    try {
      // Build query to match products based on user preferences
      const query = supabase.from("products").select("*").eq("is_active", true)

      // Match products that have overlapping criteria with user preferences
      const { data, error } = await query

      if (error) throw error

      // Filter products based on user preferences
      const matchingProducts =
        data?.filter((product) => {
          let score = 0

          // Check occasion match
          if (product.occasions?.includes(prefs.occasion)) score += 3

          // Check relationship match
          if (product.relationships?.includes(prefs.relationship)) score += 3

          // Check interest matches
          const interestMatches =
            product.interests?.filter((interest) => prefs.interests?.includes(interest)).length || 0
          score += interestMatches

          // Check personality trait matches
          const traitMatches =
            product.personality_traits?.filter((trait) => prefs.personality_traits?.includes(trait)).length || 0
          score += traitMatches

          // Check price range match
          if (product.price_ranges?.includes(prefs.price_range)) score += 2

          // Check age group and gender (if specified in product)
          if (product.age_groups?.includes(prefs.recipient_age_group)) score += 1
          if (product.genders?.includes(prefs.recipient_gender) || product.genders?.includes("Any")) score += 1

          return score > 0
        }) || []

      // Sort by relevance (you could implement a more sophisticated scoring system)
      matchingProducts.sort((a, b) => {
        // Simple scoring - you can make this more sophisticated
        let scoreA = 0,
          scoreB = 0

        if (a.occasions?.includes(prefs.occasion)) scoreA += 3
        if (b.occasions?.includes(prefs.occasion)) scoreB += 3

        if (a.relationships?.includes(prefs.relationship)) scoreA += 3
        if (b.relationships?.includes(prefs.relationship)) scoreB += 3

        return scoreB - scoreA
      })

      setProducts(matchingProducts.slice(0, 12)) // Limit to 12 results
    } catch (error) {
      console.error("Error loading products:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-lg text-gray-600">Finding perfect gifts for you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Perfect Gifts Found! 🎁
          </h1>
          <p className="text-xl text-gray-600">Based on your preferences, here are our top recommendations</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">No matching products found. Let's update your preferences!</p>
            <Button onClick={() => router.push("/preferences")}>Update Preferences</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-purple-600">{product.price_display}</span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{product.retailer}</p>
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.review_count.toLocaleString()} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">{product.description}</p>

                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 mt-6">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      onClick={() => window.open(product.product_url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-red-50 hover:border-red-300">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => router.push("/preferences")} className="mr-4">
            Update Preferences
          </Button>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
