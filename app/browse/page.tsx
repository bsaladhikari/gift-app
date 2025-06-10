"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Sparkles, Star, Tag, ChevronDown, ChevronUp } from "lucide-react"
import NavHeader from "@/components/nav-header"
import GiftProductCard from "@/components/gift-product-card"
import { giftProducts, searchProducts } from "@/lib/gift-products"
import type { GiftProduct } from "@/lib/gift-products"
import { useAuth } from "@/components/auth-provider"
import { saveProduct, getSavedProducts, toggleProductFavorite, removeSavedProduct } from "@/lib/supabase"

export default function BrowseIdeasPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedOccasion, setSelectedOccasion] = useState("all")
  const [selectedRecipient, setSelectedRecipient] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<GiftProduct[]>(giftProducts)
  const [isLoading, setIsLoading] = useState(true)

  // Extract unique categories from gift products
  const categories = ["all", ...Array.from(new Set(giftProducts.map((product) => product.category)))]

  // Mock occasions and recipient types for filtering
  const occasions = [
    "all",
    "Birthday",
    "Anniversary",
    "Christmas",
    "Valentine's Day",
    "Mother's Day",
    "Father's Day",
    "Graduation",
    "Just Because",
  ]
  const recipientTypes = ["all", "Partner/Spouse", "Friend", "Parent", "Sibling", "Colleague", "Family Member"]

  useEffect(() => {
    // Check authentication
    if (loading) return

    if (!user) {
      router.push("/signin")
      return
    }

    // Load saved products
    const loadSavedProducts = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await getSavedProducts(user.id)
        if (error) {
          console.error("Error loading saved products:", error)
        } else if (data) {
          const savedProductIds = data.map((item) => item.product_id)
          const favoriteProductIds = data.filter((item) => item.is_favorite).map((item) => item.product_id)

          setSavedIds(savedProductIds)
          setFavoriteIds(favoriteProductIds)
        }
      } catch (err) {
        console.error("Failed to load saved products:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedProducts()
  }, [user, loading, router])

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = giftProducts

    // Search filter
    if (searchTerm) {
      filtered = searchProducts(searchTerm)
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Occasion filter
    if (selectedOccasion !== "all") {
      filtered = filtered.filter((product) => product.occasion === selectedOccasion)
    }

    // Recipient filter
    if (selectedRecipient !== "all") {
      filtered = filtered.filter((product) => product.recipient === selectedRecipient)
    }

    // Price range filter
    filtered = filtered.filter((product) => product.priceValue >= priceRange[0] && product.priceValue <= priceRange[1])

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedOccasion, selectedRecipient, priceRange])

  const toggleSaved = async (id: string) => {
    if (!user) return

    try {
      const isSaved = savedIds.includes(id)
      const product = giftProducts.find((p) => p.id === id)

      if (!product) return

      if (isSaved) {
        // Remove from saved
        const { error } = await removeSavedProduct(user.id, id)
        if (error) {
          console.error("Error removing saved product:", error)
          return
        }

        setSavedIds(savedIds.filter((savedId) => savedId !== id))
        setFavoriteIds(favoriteIds.filter((favoriteId) => favoriteId !== id))
      } else {
        // Add to saved
        const { error } = await saveProduct(user.id, id, product)
        if (error) {
          console.error("Error saving product:", error)
          return
        }

        setSavedIds([...savedIds, id])
      }
    } catch (err) {
      console.error("Failed to toggle saved status:", err)
    }
  }

  const toggleFavorite = async (id: string) => {
    if (!user) return

    try {
      const isFavorite = favoriteIds.includes(id)

      // If not saved yet, save it first
      if (!savedIds.includes(id)) {
        const product = giftProducts.find((p) => p.id === id)
        if (!product) return

        const { error } = await saveProduct(user.id, id, product)
        if (error) {
          console.error("Error saving product:", error)
          return
        }

        setSavedIds([...savedIds, id])
      }

      // Toggle favorite status
      const { error } = await toggleProductFavorite(user.id, id, !isFavorite)
      if (error) {
        console.error("Error toggling favorite status:", error)
        return
      }

      if (isFavorite) {
        setFavoriteIds(favoriteIds.filter((favoriteId) => favoriteId !== id))
      } else {
        setFavoriteIds([...favoriteIds, id])
      }
    } catch (err) {
      console.error("Failed to toggle favorite status:", err)
    }
  }

  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number]
    newRange[index] = value
    setPriceRange(newRange)
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Router will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <NavHeader />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-bounce" />
              <Star className="absolute -top-2 -right-4 h-6 w-6 text-pink-400 animate-bounce delay-300" />
              <div className="text-6xl">🛍️</div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Browse Gift Ideas
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover <span className="font-semibold text-purple-600">curated gift ideas</span> for every occasion and
              person
            </p>
          </div>

          {/* Search and Filters */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-3xl border border-white/50 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for gifts, categories, or occasions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-all duration-300 font-medium"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <div className="text-gray-600">
                <span className="font-semibold text-purple-600">{filteredProducts.length}</span> gifts found
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 appearance-none"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occasion Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 appearance-none"
                  >
                    {occasions.map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {occasion === "all" ? "All Occasions" : occasion}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recipient Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                  <select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 appearance-none"
                  >
                    {recipientTypes.map((recipient) => (
                      <option key={recipient} value={recipient}>
                        {recipient === "all" ? "All Recipients" : recipient}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, Number.parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No gifts found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedOccasion("all")
                  setSelectedRecipient("all")
                  setPriceRange([0, 500])
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <GiftProductCard
                  key={product.id}
                  product={product}
                  isSaved={savedIds.includes(product.id)}
                  isFavorited={favoriteIds.includes(product.id)}
                  onToggleSaved={() => toggleSaved(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">Need something more personalized?</h3>
              <p className="text-gray-600 mb-6">
                Let our AI create a custom gift recommendation just for your special someone.
              </p>

              <a
                href="/personalize"
                className="group relative inline-flex px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Get Personalized Recommendations</span>
                  <Sparkles className="h-5 w-5 animate-spin" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 text-center">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 inline-block">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
            <a href="/about" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300">
              About Us
            </a>
            <a href="/terms" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300">
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:support@luxegiftai.com"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300"
            >
              Contact
            </a>
          </div>
          <p className="text-gray-600 font-medium">
            &copy; 2024 LuxegiftAI. Making gift-giving magical <span className="inline-block animate-bounce">✨</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
