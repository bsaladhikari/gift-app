"use client"
import Link from "next/link"
import { Gift, Sparkles, Heart, Star, Zap, ArrowRight, Clock, TrendingUp, BookOpen } from "lucide-react"
import NavHeader from "@/components/nav-header"
import { useAuth } from "@/components/auth-provider"
import { isUserAdmin } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { getGiftHistory, GiftHistory } from "@/lib/supabase"

export default function LandingPage() {
  const { user, profile } = useAuth()
  const router = useRouter()

  // State for real data
  const [recentGifts, setRecentGifts] = useState<GiftHistory[]>([]);
  const [giftsFound, setGiftsFound] = useState(0);
  const [happyRecipients, setHappyRecipients] = useState(0);
  const [giftSuccessRate, setGiftSuccessRate] = useState(0);

  useEffect(() => {
    const checkAdminAndRedirect = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.id)
        if (adminStatus) {
          router.push("/admin") // Redirect to admin dashboard
        } else {
          // Only fetch gift history if not an admin (as admin goes to a different dashboard)
          fetchGiftData();
        }
      }
    }
    checkAdminAndRedirect()
  }, [user, router])

  const fetchGiftData = async () => {
    if (!user) return;

    const { data, error } = await getGiftHistory(user.id);
    if (error) {
      console.error("Error fetching gift history:", error);
      return;
    }

    // Process fetched data
    if (data) {
      // Set recent gifts (e.g., last 3)
      setRecentGifts(data.slice(0, 3));

      // Calculate Gifts Found
      setGiftsFound(data.length);

      // Calculate Happy Recipients (unique recipients)
      const uniqueRecipients = new Set(data.map(item => item.recipient_name));
      setHappyRecipients(uniqueRecipients.size);

      // Calculate Gift Success Rate (based on is_favorite)
      const successfulGifts = data.filter(item => item.is_favorite).length;
      const successRate = data.length > 0 ? (successfulGifts / data.length) * 100 : 0;
      setGiftSuccessRate(Math.round(successRate));
    }
  };

  // Mock data for personalized dashboard
  // const recentGifts = [
  //   { recipient: "Sarah", occasion: "Birthday", gift: "Coffee Subscription", date: "2 days ago" },
  //   { recipient: "Mom", occasion: "Mother\'s Day", gift: "Spa Gift Set", date: "1 week ago" },
  //   { recipient: "Alex", occasion: "Anniversary", gift: "Wireless Headphones", date: "2 weeks ago" },
  // ]

  const quickSuggestions = [
    { occasion: "Valentine's Day", emoji: "💕", color: "from-pink-500 to-rose-500" },
    { occasion: "Birthday", emoji: "🎂", color: "from-purple-500 to-indigo-500" },
    { occasion: "Just Because", emoji: "✨", color: "from-cyan-500 to-blue-500" },
  ]

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Header */}
        <NavHeader />

        {/* Personalized Dashboard */}
        <main className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <div className="relative inline-block mb-6">
                <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-bounce" />
                <Star className="absolute -top-2 -right-4 h-6 w-6 text-pink-400 animate-bounce delay-300" />
                <div className="text-6xl">👋</div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome back, {profile?.full_name || user.email?.split("@")[0] || "User"}!
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Ready to find another <span className="font-semibold text-purple-600">perfect gift</span>? Let's make
                someone's day special! ✨
              </p>

              <Link href="/personalize">
                <button className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <span>Find a New Gift</span>
                    <Sparkles className="h-6 w-6 animate-spin" />
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
            </div>

            {/* Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Recent Gifts */}
              <div className="lg:col-span-2 relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Recent Gift Ideas</h3>
                </div>

                <div className="space-y-4">
                  {recentGifts.map((gift, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {gift.recipient_name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{gift.gift_title}</p>
                          <p className="text-sm text-gray-600">
                            for {gift.recipient_name} • {gift.occasion}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{new Date(gift.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>

                <Link href="/history">
                  <button className="w-full mt-6 py-3 text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300 border-2 border-purple-200 hover:border-purple-300 rounded-2xl hover:bg-purple-50/50">
                    View All Gift History
                  </button>
                </Link>
              </div>

              {/* Happy Recipients Box (Moved from Stats & Features) */}
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-[2rem] blur-xl -z-10"></div>
                <div className="relative">
                  <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    {happyRecipients}
                  </div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">Happy Recipients</h4>
                  <p className="text-gray-600 text-sm">People you've made smile</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 container mx-auto px-4 py-12 text-center">
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 inline-block">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
              <a
                href="/about"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="/terms"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/contact"
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

  // Original landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <NavHeader />

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating decorative elements */}
          <div className="relative mb-12">
            <Sparkles className="absolute -top-8 left-1/4 h-8 w-8 text-yellow-400 animate-bounce" />
            <Sparkles className="absolute -top-4 right-1/3 h-6 w-6 text-pink-400 animate-bounce delay-300" />
            <Star className="absolute top-8 right-1/4 h-7 w-7 text-blue-400 animate-bounce delay-700" />
            <Zap className="absolute -top-6 left-1/3 h-6 w-6 text-purple-400 animate-bounce delay-1000" />

            {/* Main hero card */}
            <div className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-12 md:p-16 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-[2rem] blur-xl -z-10"></div>

              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-full p-6 shadow-xl">
                    <Gift className="h-20 w-20 text-purple-600" />
                    <Heart className="absolute -top-2 -right-2 h-8 w-8 text-pink-500 animate-pulse" />
                  </div>
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                  Struggling with
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                  gift ideas?
                </span>
                <span className="text-4xl md:text-6xl ml-4">🎁</span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                Let AI find the <span className="font-semibold text-purple-600">perfect gift</span> and{" "}
                <span className="font-semibold text-pink-600">personalized message</span> for your loved one.
              </p>

              <Link href="/personalize">
                <button className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <span>Find a Gift</span>
                    <Sparkles className="h-6 w-6 animate-spin" />
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                emoji: "🎯",
                title: "AI-Powered Matching",
                description: "Advanced algorithms analyze personality traits to find the perfect gift match",
                gradient: "from-purple-500/10 to-pink-500/10",
                border: "border-purple-200/50",
              },
              {
                emoji: "💝",
                title: "Custom Messages",
                description: "Heartfelt, personalized messages that capture your exact sentiment and tone",
                gradient: "from-pink-500/10 to-rose-500/10",
                border: "border-pink-200/50",
              },
              {
                emoji: "🛒",
                title: "Instant Shopping",
                description: "Direct shopping integration with one-click purchasing and gift message inclusion",
                gradient: "from-cyan-500/10 to-blue-500/10",
                border: "border-cyan-200/50",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-xl rounded-3xl p-8 shadow-xl border ${feature.border} hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
              >
                <div className="absolute inset-0 bg-white/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.emoji}
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "10K+", label: "Happy Gift Givers", icon: "🎉" },
                { number: "50K+", label: "Perfect Matches", icon: "💖" },
                { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
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
              href="/contact"
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
