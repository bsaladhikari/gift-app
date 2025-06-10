"use client"

import { useState } from "react"
import { ExternalLink, Star, Heart, Bookmark, Check, ShoppingCart } from "lucide-react"
import type { GiftProduct } from "@/lib/gift-products"

interface GiftProductCardProps {
  product: GiftProduct
  showFullDescription?: boolean
  onToggleSaved?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
  isSaved?: boolean
  isFavorited?: boolean
}

export default function GiftProductCard({
  product,
  showFullDescription = false,
  onToggleSaved,
  onToggleFavorite,
  isSaved = false,
  isFavorited = false,
}: GiftProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleSave = () => {
    if (onToggleSaved) onToggleSaved(product.id)
  }

  const handleFavorite = () => {
    if (onToggleFavorite) onToggleFavorite(product.id)
  }

  return (
    <div className="group relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500 hover:scale-105">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>

      {/* Action buttons */}
      <div className="absolute top-6 right-6 flex space-x-2 z-10">
        {onToggleFavorite && (
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-all duration-300 ${
              isFavorited
                ? "text-pink-500 bg-pink-50 hover:bg-pink-100"
                : "text-gray-400 hover:text-pink-500 hover:bg-pink-50"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
          </button>
        )}
        {onToggleSaved && (
          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-all duration-300 ${
              isSaved
                ? "text-purple-500 bg-purple-50 hover:bg-purple-100"
                : "text-gray-400 hover:text-purple-500 hover:bg-purple-50"
            }`}
          >
            {isSaved ? <Check className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Product Image */}
      <div className="relative mb-6 group/image">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.title}
          className="relative w-full h-48 object-cover rounded-2xl shadow-lg border-2 border-white/50 group-hover/image:scale-105 transition-transform duration-500"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 rounded-2xl animate-pulse"></div>}
      </div>

      {/* Product Details */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 flex-1 mr-4">{product.title}</h3>
          <div className="text-right">
            <span className="text-xl font-bold text-purple-600">{product.price}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2">
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
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()} reviews)</span>
        </div>

        {/* Description */}
        <p className={`text-gray-600 text-sm leading-relaxed ${showFullDescription ? "" : "line-clamp-2"}`}>
          {product.description}
        </p>

        {/* Features */}
        {showFullDescription && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Key Features:</h4>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category and Retailer Tags */}
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            {product.category}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {product.retailer}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          {onToggleSaved && (
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 text-sm font-medium ${
                isSaved
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          )}

          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Shop Now</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
