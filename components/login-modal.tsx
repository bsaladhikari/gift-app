"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, Sparkles, Gift, Heart } from "lucide-react"
import Image from "next/image"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth integration
    console.log("Google login clicked")
    onClose()
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for email login
    console.log("Email login:", email)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 max-w-lg w-full shadow-3xl border border-white/50 animate-in fade-in zoom-in duration-300">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-[2rem] blur-2xl -z-10"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-white/50 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4 shadow-xl">
              <div className="flex items-center justify-center space-x-2">
                <Gift className="h-8 w-8 text-purple-600" />
                <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
                <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Want unlimited
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent">
              gift ideas?
            </span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Create a free account to save your gift history and unlock{" "}
            <span className="font-semibold text-purple-600">unlimited messages</span>.
          </p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="group relative w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-purple-300 flex items-center justify-center space-x-4 transition-all duration-300 hover:shadow-xl mb-6 backdrop-blur-sm"
        >
          <Image
            src="/google-logo.svg"
            alt="Google"
            width={24}
            height={24}
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-lg">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t-2 border-gray-200"></div>
          <span className="px-6 text-gray-500 font-medium bg-white/50 rounded-full py-1">or</span>
          <div className="flex-1 border-t-2 border-gray-200"></div>
        </div>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
              required
            />
          </div>

          <button
            type="submit"
            className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <span>Create Free Account</span>
              <Sparkles className="h-5 w-5 animate-spin" />
            </div>
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-8 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="text-purple-600 hover:underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-purple-600 hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}
