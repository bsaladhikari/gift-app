"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  Calendar,
  User,
  ExternalLink,
  Copy,
  Check,
  Heart,
  Star,
  Sparkles,
  MoreHorizontal,
} from "lucide-react"
import NavHeader from "@/components/nav-header"
import { useAuth } from "@/components/auth-provider"
import { getGiftHistory, updateGiftHistory, type GiftHistory } from "@/lib/supabase"

export default function GiftHistoryPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOccasion, setFilterOccasion] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [giftHistory, setGiftHistory] = useState<GiftHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    if (loading) return

    if (!user) {
      router.push("/signin")
      return
    }

    // Load gift history
    const loadGiftHistory = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await getGiftHistory(user.id)
        if (error) {
          console.error("Error loading gift history:", error)
        } else {
          setGiftHistory(data || [])
        }
      } catch (err) {
        console.error("Failed to load gift history:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadGiftHistory()
  }, [user, loading, router])

  const occasions = ["all", "Birthday", "Anniversary", "Mother's Day", "Father's Day", "Graduation", "Just Because"]
  const statuses = ["all", "purchased", "saved", "shared"]

  const filteredHistory = giftHistory.filter((item) => {
    const matchesSearch =
      item.recipient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gift_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.occasion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOccasion = filterOccasion === "all" || item.occasion === filterOccasion
    const matchesStatus = filterStatus === "all" || item.status === filterStatus

    return matchesSearch && matchesOccasion && matchesStatus
  })

  const copyMessage = async (message: string, id: string) => {
    try {
      await navigator.clipboard.writeText(message)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy message:", err)
    }
  }

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const { error } = await updateGiftHistory(id, { is_favorite: !isFavorite })
      if (error) {
        console.error("Error updating favorite status:", error)
        return
      }

      setGiftHistory((prev) => prev.map((item) => (item.id === id ? { ...item, is_favorite: !isFavorite } : item)))
    } catch (err) {
      console.error("Failed to toggle favorite:", err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "purchased":
        return "bg-green-100 text-green-800 border-green-200"
      case "saved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shared":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "purchased":
        return "✅"
      case "saved":
        return "💾"
      case "shared":
        return "📤"
      default:
        return "📝"
    }
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
              <div className="text-6xl">📚</div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Gift History
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              All your <span className="font-semibold text-purple-600">perfect gift ideas</span> in one place
            </p>
          </div>

          {/* Filters and Search */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-3xl border border-white/50 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gifts, recipients, or occasions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300"
                />
              </div>

              {/* Occasion Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterOccasion}
                  onChange={(e) => setFilterOccasion(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 appearance-none"
                >
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion === "all" ? "All Occasions" : occasion}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 appearance-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              Showing <span className="font-semibold text-purple-600">{filteredHistory.length}</span> of{" "}
              <span className="font-semibold text-purple-600">{giftHistory.length}</span> gift ideas
            </p>
          </div>

          {/* Gift History Grid */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No gifts found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filters</p>
              <a
                href="/personalize"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                Find New Gifts
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500 hover:scale-105"
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>

                  {/* Header with favorite and menu */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)} flex items-center space-x-1`}
                    >
                      <span>{getStatusIcon(item.status)}</span>
                      <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(item.id, item.is_favorite)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          item.is_favorite
                            ? "text-pink-500 bg-pink-50 hover:bg-pink-100"
                            : "text-gray-400 hover:text-pink-500 hover:bg-pink-50"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${item.is_favorite ? "fill-current" : ""}`} />
                      </button>
                      <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-300">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Gift Image */}
                  <div className="relative mb-4 group/image">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={item.gift_url || "/placeholder.svg?height=200&width=200"}
                      alt={item.gift_title}
                      className="relative w-full h-48 object-cover rounded-2xl shadow-lg border-2 border-white/50 group-hover/image:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gift Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{item.gift_title}</h3>
                      <span className="text-lg font-bold text-purple-600">{item.gift_price}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{item.recipient_name}</span>
                      <span>•</span>
                      <span>{item.occasion}</span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2">{item.gift_description}</p>

                    {/* Message Preview */}
                    <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-xl p-3 border border-purple-100/50">
                      <p className="text-gray-700 text-sm italic line-clamp-2">{item.personalized_message}</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={() => copyMessage(item.personalized_message, item.id)}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-all duration-300 text-sm font-medium"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {item.gift_url && (
                        <a
                          href={item.gift_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition-all duration-300 text-sm font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Buy</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to find another perfect gift?</h3>
              <p className="text-gray-600 mb-6">
                Let our AI help you discover the ideal present for your next special occasion.
              </p>

              <a
                href="/personalize"
                className="group relative inline-flex px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Find New Gift</span>
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
              href="mailto:support@giftgenie.com"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300"
            >
              Contact
            </a>
          </div>
          <p className="text-gray-600 font-medium">
            &copy; 2024 GiftGenie. Making gift-giving magical <span className="inline-block animate-bounce">✨</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
