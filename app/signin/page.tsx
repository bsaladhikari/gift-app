"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Gift, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Heart, Star, Check } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { signIn, signInWithGoogle, isUserAdmin, getCurrentUser } from "@/lib/supabase"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verified = searchParams.get("verified") === "true"

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const { data, error: signInError } = await signIn(formData.email, formData.password)

      if (signInError) {
        setError(signInError.message)
      } else if (data.user) {
        setSuccess(true)
        // After successful login, check admin status and redirect
        const user = await getCurrentUser();
        if (user) {
          const adminStatus = await isUserAdmin(user.id);
          if (adminStatus) {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } else {
          router.push("/"); // Fallback if user data is somehow missing after sign-in
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
      // Google OAuth will redirect automatically
    } catch (err) {
      setError("Failed to sign in with Google")
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
            <div className="relative">
              <Gift className="h-10 w-10 text-purple-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LuxegiftAI
            </h1>
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 hover:bg-white/50 rounded-full backdrop-blur-sm"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-bounce" />
              <Star className="absolute -top-2 -right-4 h-6 w-6 text-pink-400 animate-bounce delay-300" />
              <Heart className="absolute bottom-0 -left-2 h-6 w-6 text-purple-400 animate-bounce delay-700" />

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-2xl border border-white/50">
                  <Gift className="h-16 w-16 text-purple-600" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome back!
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Sign in to continue finding the <span className="font-semibold text-purple-600">perfect gifts</span> ✨
            </p>
          </div>

          {/* Verification Success Message */}
          {verified && (
            <div className="mb-8 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl">
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <p className="text-green-600 text-center font-medium">
                  Email verified successfully! You can now sign in.
                </p>
              </div>
            </div>
          )}

          {/* Sign In Form */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-purple-300 flex items-center justify-center space-x-4 transition-all duration-300 hover:shadow-xl mb-8 backdrop-blur-sm"
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

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="group">
                <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl">
                <div className="flex items-center justify-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <p className="text-green-600 text-center font-medium">Sign in successful! Redirecting...</p>
                </div>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-purple-600 hover:text-purple-700 transition-colors duration-300 hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid grid-cols-1 gap-4">
            {[
              { icon: "🎯", text: "AI-powered gift matching" },
              { icon: "💝", text: "Personalized messages" },
              { icon: "🛒", text: "One-click shopping" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:bg-white/60 transition-all duration-300"
              >
                <div className="text-2xl">{feature.icon}</div>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center">
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
            &copy; 2024 LuxegiftAI. Making gift-giving magical <span className="inline-block animate-bounce">✨</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
