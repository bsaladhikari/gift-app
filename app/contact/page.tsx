"use client"

import type React from "react"

import { useState } from "react"
import { Gift, Mail, Phone, MapPin, Send, Clock, MessageCircle, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
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
              GiftGenie
            </h1>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 hover:bg-white/50 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Have questions about GiftGenie? Need help finding the perfect gift? We're here to help make your
              gift-giving experience magical ✨
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

              <div className="flex items-center space-x-3 mb-8">
                <MessageCircle className="h-8 w-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-lg font-bold text-gray-700 mb-3">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-lg font-bold text-gray-700 mb-3">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What can we help you with?"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us more about your question or how we can help..."
                    rows={6}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300 resize-none"
                    required
                  />
                </div>

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
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Success Message */}
              {success && (
                <div className="mt-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl">
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <p className="text-green-600 text-center font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl">
                  <p className="text-red-600 text-center font-medium">{error}</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Email Us</h4>
                      <p className="text-gray-600">support@giftgenie.com</p>
                      <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Call Us</h4>
                      <p className="text-gray-600">+1 (555) 123-GIFT</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Visit Us</h4>
                      <p className="text-gray-600">123 Gift Street, Suite 456</p>
                      <p className="text-gray-600">San Francisco, CA 94102</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">How does GiftGenie work?</h4>
                    <p className="text-gray-600 text-sm">
                      Simply tell us about the recipient and occasion, and our AI will suggest personalized gift ideas
                      with custom messages.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Is GiftGenie free to use?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes! You can get gift suggestions for free. Creating an account unlocks unlimited suggestions and
                      saves your history.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Can I purchase gifts directly?</h4>
                    <p className="text-gray-600 text-sm">
                      We provide direct links to Amazon and other retailers where you can purchase the suggested gifts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 text-center mt-16">
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
