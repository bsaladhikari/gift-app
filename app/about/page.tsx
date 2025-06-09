"use client"

import { Sparkles, Star, Heart, Target, Zap, Shield } from "lucide-react"
import NavHeader from "@/components/nav-header"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Amazon product manager with 8+ years in e-commerce and AI. Passionate about making gift-giving effortless.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI researcher and engineer with expertise in natural language processing and recommendation systems.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      bio: "UX designer focused on creating delightful and intuitive experiences that bring joy to everyday interactions.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "David Kim",
      role: "Head of AI",
      bio: "Machine learning expert specializing in personalization algorithms and behavioral analysis.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Thoughtfulness First",
      description: "Every gift recommendation is crafted with genuine care and consideration for the recipient.",
      gradient: "from-pink-500/10 to-rose-500/10",
      border: "border-pink-200/50",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Precision Matching",
      description: "Our AI analyzes countless data points to find gifts that truly resonate with each individual.",
      gradient: "from-purple-500/10 to-indigo-500/10",
      border: "border-purple-200/50",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Effortless Experience",
      description: "Gift-giving should be joyful, not stressful. We make the process simple and delightful.",
      gradient: "from-yellow-500/10 to-orange-500/10",
      border: "border-yellow-200/50",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Privacy & Trust",
      description: "Your personal information and gift preferences are protected with enterprise-grade security.",
      gradient: "from-green-500/10 to-emerald-500/10",
      border: "border-green-200/50",
    },
  ]

  const milestones = [
    {
      year: "2023",
      title: "The Idea",
      description: "Founded by two friends frustrated with generic gift recommendations during the holiday season.",
    },
    {
      year: "2024",
      title: "AI Development",
      description: "Launched our proprietary AI engine trained on millions of successful gift-giving scenarios.",
    },
    {
      year: "2024",
      title: "Public Launch",
      description: "Officially launched GiftGenie to help people find perfect gifts with AI assistance.",
    },
    {
      year: "2024",
      title: "Growing Community",
      description: "Reached 10,000+ happy users who have found their perfect gifts through our platform.",
    },
  ]

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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-bounce" />
              <Star className="absolute -top-2 -right-4 h-6 w-6 text-pink-400 animate-bounce delay-300" />
              <div className="text-8xl">🎁</div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About GiftGenie
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to make gift-giving{" "}
              <span className="font-semibold text-purple-600">effortless, thoughtful, and magical</span> for everyone.
            </p>
          </div>

          {/* Our Story */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-3xl border border-white/50 mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  GiftGenie was born from a simple frustration: spending hours searching for the perfect gift, only to
                  settle for something generic. We believed there had to be a better way.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our founders, Sarah and Michael, combined their expertise in e-commerce and AI to create an
                  intelligent system that understands the nuances of human relationships and preferences.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, GiftGenie helps thousands of people find meaningful gifts that strengthen relationships and
                  create lasting memories. Every recommendation is powered by advanced AI that considers personality,
                  interests, and the unique bond between giver and recipient.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="GiftGenie team working"
                  className="relative w-full h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/50"
                />
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at GiftGenie
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${value.gradient} backdrop-blur-xl rounded-3xl p-8 shadow-xl border ${value.border} hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                >
                  <div className="absolute inset-0 bg-white/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{value.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Journey */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-3xl border border-white/50 mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-[2rem] blur-xl -z-10"></div>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600">From idea to impact</p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">The passionate people behind GiftGenie's magic</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="relative w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-white/50 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-3xl border border-white/50 mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-[2rem] blur-xl -z-10"></div>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600">Making gift-giving better, one recommendation at a time</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Happy Users", icon: "👥" },
                { number: "50K+", label: "Perfect Matches", icon: "🎯" },
                { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
                { number: "24/7", label: "AI Assistance", icon: "🤖" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to find the perfect gift?</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Join thousands of users who have discovered the joy of effortless gift-giving.
              </p>

              <a
                href="/personalize"
                className="group relative inline-flex px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Start Finding Gifts</span>
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
          <p className="text-gray-600 font-medium">
            &copy; 2024 GiftGenie. Making gift-giving magical <span className="inline-block animate-bounce">✨</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
