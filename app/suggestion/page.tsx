"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Gift, ArrowLeft, Copy, RefreshCw, Check, Sparkles, Star } from "lucide-react"
import LoginModal from "@/components/login-modal"
import GiftProductCard from "@/components/gift-product-card"
import { getProductsByOccasion, getRandomProducts, getFilteredProducts } from "@/lib/gift-products"
import type { GiftProduct } from "@/lib/gift-products"
import { supabase } from "@/lib/supabase"

interface GiftSuggestion {
  product: GiftProduct
  message: string
}

export default function SuggestionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [suggestion, setSuggestion] = useState<GiftSuggestion | null>(null)
  const [copied, setCopied] = useState(false)
  const [attempts, setAttempts] = useState(1)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const storedData = sessionStorage.getItem("giftFormData")
    if (!storedData) {
      router.push("/personalize")
      return
    }

    const data = JSON.parse(storedData)
    setFormData(data)
    generateSuggestion(data)
  }, [router])

  const generateSuggestion = async (data: any) => {
    let relevantProducts: GiftProduct[] = [];
    try {
        const { data: rpcData, error } = await supabase.rpc('get_personalized_gift_suggestions', { form_data: data });

        if (error) {
            console.error("Error calling Supabase RPC:", error);
        } else if (rpcData) {
            relevantProducts = rpcData as GiftProduct[];
        }
    } catch (err) {
        console.error("Exception calling Supabase RPC:", err);
    }

    // If no relevant products found from RPC, get random ones as a final fallback
    if (relevantProducts.length === 0) {
      relevantProducts = getRandomProducts(5);
    }

    // Select the top product from the relevant products (RPC already sorts by score)
    const selectedProduct = relevantProducts.length > 0 ? relevantProducts[0] : null;

    if (!selectedProduct) {
        setSuggestion(null); // No product found
        return;
    }

    // Generate personalized message based on form data
    const message = generatePersonalizedMessage(data, selectedProduct)

    setSuggestion({
      product: selectedProduct,
      message: message,
    })
  }

  const generatePersonalizedMessage = (data: any, product: GiftProduct): string => {
    const { recipientName, occasion, relationship, tone } = data

    const messages = {
      Funny: [
        `Hey ${recipientName}! Found this ${product.title.toLowerCase()} and thought of you. Hope it brings as much joy as your terrible jokes! 😄 Happy ${occasion}!`,
        `${recipientName}, this ${product.title.toLowerCase()} screamed your name (literally, it was weird). Hope you love it! Happy ${occasion}! 🎉`,
        `For my favorite ${relationship.toLowerCase()}, ${recipientName} - may this ${product.title.toLowerCase()} be more reliable than your WiFi! Happy ${occasion}! 😂`,
      ],
      Romantic: [
        `My dearest ${recipientName}, just like this beautiful ${product.title.toLowerCase()}, you make every day brighter. Happy ${occasion}, my love! 💕`,
        `To my wonderful ${recipientName}, this ${product.title.toLowerCase()} reminded me of all the special moments we share. Happy ${occasion}, sweetheart! ❤️`,
        `${recipientName}, you deserve all the beautiful things in life, starting with this ${product.title.toLowerCase()}. Happy ${occasion}, my darling! 🌹`,
      ],
      Sincere: [
        `Dear ${recipientName}, I hope this ${product.title.toLowerCase()} brings you joy and reminds you how much you mean to me. Happy ${occasion}!`,
        `${recipientName}, thinking of you on this special day. I hope this ${product.title.toLowerCase()} adds happiness to your life. Happy ${occasion}!`,
        `To my dear ${relationship.toLowerCase()}, ${recipientName} - wishing you all the best on your ${occasion}. Hope you enjoy this ${product.title.toLowerCase()}!`,
      ],
      Casual: [
        `Hey ${recipientName}! Saw this ${product.title.toLowerCase()} and thought you'd dig it. Happy ${occasion}! 🎁`,
        `${recipientName} - hope this ${product.title.toLowerCase()} is exactly what you need! Happy ${occasion}!`,
        `For ${recipientName} - found this cool ${product.title.toLowerCase()} with your name on it. Enjoy! Happy ${occasion}! ✨`,
      ],
    }

    const toneMessages = messages[tone as keyof typeof messages] || messages["Sincere"]
    return toneMessages[Math.floor(Math.random() * toneMessages.length)]
  }

  const copyMessage = async () => {
    if (!suggestion) return

    try {
      await navigator.clipboard.writeText(suggestion.message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy message:", err)
    }
  }

  const tryAnother = () => {
    if (attempts >= 3) {
      setShowLoginModal(true)
      return
    }

    setAttempts((prev) => prev + 1)
    generateSuggestion(formData)
  }

  if (!suggestion || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Finding your perfect gift...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link
            href="/personalize"
            className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-300"
          >
            <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm group-hover:bg-white/70 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LuxegiftAI
              </h1>
            </div>
          </Link>
        </div>
      </header>

      {/* Suggestion */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-bounce" />
              <Star className="absolute -top-2 -right-4 h-6 w-6 text-pink-400 animate-bounce delay-300" />
              <div className="text-6xl">🎉</div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Perfect gift found!
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Here's what we recommend for{" "}
              <span className="font-semibold text-purple-600">{formData.recipientName}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gift Card */}
            <div className="relative">
              <GiftProductCard product={suggestion.product} showFullDescription={true} />
            </div>

            {/* Message Card */}
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500 group">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">💌</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Your personalized message
                </h3>
              </div>

              <div className="relative bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-purple-100/50 shadow-inner">
                <div className="absolute top-4 left-4 text-purple-400/30 text-6xl font-serif">"</div>
                <div className="absolute bottom-4 right-4 text-purple-400/30 text-6xl font-serif">"</div>
                <p className="text-gray-700 text-lg leading-relaxed italic relative z-10 pt-4 pb-4">
                  {suggestion.message}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={copyMessage}
                  className="group/btn relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  {copied ? (
                    <>
                      <Check className="relative h-5 w-5 animate-bounce" />
                      <span className="relative">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="relative h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      <span className="relative">Copy Message</span>
                    </>
                  )}
                </button>

                <button
                  onClick={tryAnother}
                  className="group/btn relative w-full bg-white/80 hover:bg-white text-gray-700 font-bold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-purple-300 flex items-center justify-center space-x-3 transition-all duration-300 hover:shadow-xl backdrop-blur-sm"
                >
                  <RefreshCw className="h-5 w-5 group-hover/btn:rotate-180 transition-transform duration-500" />
                  <span>Try Another Suggestion</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{attempts}/3 free</span>
                </button>
              </div>

              <div className="mt-8 relative bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50 shadow-inner">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <p className="text-blue-700 font-semibold mb-1">Pro tip:</p>
                    <p className="text-blue-600 text-sm leading-relaxed">
                      When you purchase online, many retailers allow you to add a gift message during checkout. Just
                      paste your personalized message there!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}
