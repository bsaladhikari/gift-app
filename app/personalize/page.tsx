"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Sparkles, Star, ChevronRight, ChevronLeft } from "lucide-react"
import NavHeader from "@/components/nav-header"

export default function PersonalizePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // Add name to the formData state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    recipientName: "",
    occasion: "",
    relationship: "",
    recipientGender: "",
    ageRange: "",

    // Step 2: Personality & Interests
    personality: "",
    hobbies: [] as string[],
    lifestyle: "",
    techSavviness: "",
    giftPreference: "",

    // Step 3: Preferences & Details
    budget: "",
    tone: "",
    favoriteColors: "",
    dislikes: "",
    recentEvents: "",
    specialNotes: "",
  })

  const occasions = [
    "Birthday",
    "Anniversary",
    "Christmas",
    "Valentine's Day",
    "Mother's Day",
    "Father's Day",
    "Graduation",
    "Wedding",
    "Housewarming",
    "Promotion",
    "Retirement",
    "Baby Shower",
    "Just Because",
    "Thank You",
    "Apology",
  ]

  const relationships = [
    "Husband",
    "Wife",
    "Boyfriend",
    "Girlfriend",
    "Best Friend",
    "Close Friend",
    "Family Member",
    "Mother",
    "Father",
    "Sister",
    "Brother",
    "Daughter",
    "Son",
    "Colleague",
    "Boss",
    "Acquaintance",
    "Teacher",
    "Neighbor",
  ]

  const genders = ["Male", "Female", "Non-binary", "Prefer not to say"]

  const ageRanges = ["Under 18", "18-25", "26-35", "36-45", "46-55", "56-65", "Over 65"]

  const hobbyOptions = [
    "Reading",
    "Cooking",
    "Gardening",
    "Photography",
    "Music",
    "Art & Crafts",
    "Sports",
    "Fitness",
    "Gaming",
    "Technology",
    "Travel",
    "Movies & TV",
    "Fashion",
    "Beauty",
    "DIY Projects",
    "Collecting",
    "Writing",
    "Dancing",
    "Outdoor Activities",
    "Board Games",
    "Wine & Spirits",
    "Coffee & Tea",
    "Pets",
    "Volunteering",
  ]

  const lifestyles = [
    "Very Active & Outdoorsy",
    "Fitness Enthusiast",
    "Homebody & Cozy",
    "Social Butterfly",
    "Frequent Traveler",
    "Workaholic",
    "Creative & Artistic",
    "Tech-Savvy",
    "Minimalist",
    "Luxury Lover",
    "Eco-Conscious",
    "Family-Oriented",
  ]

  const techLevels = [
    "Not tech-savvy at all",
    "Basic tech user",
    "Moderately tech-savvy",
    "Very tech-savvy",
    "Tech enthusiast/Early adopter",
  ]

  const giftPreferences = [
    "Practical & Useful",
    "Sentimental & Personal",
    "Experiential (events, classes)",
    "Luxury & Indulgent",
    "Creative & Artistic",
    "Tech & Gadgets",
    "Health & Wellness",
    "Home & Lifestyle",
    "Fashion & Accessories",
    "Food & Drink",
  ]

  const tones = ["Funny", "Romantic", "Sincere", "Casual", "Formal", "Playful", "Heartfelt", "Witty"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Store form data in sessionStorage for the suggestion page
    sessionStorage.setItem("giftFormData", JSON.stringify(formData))

    router.push("/suggestion")
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleHobbyToggle = (hobby: string) => {
    const currentHobbies = formData.hobbies
    const newHobbies = currentHobbies.includes(hobby)
      ? currentHobbies.filter((h) => h !== hobby)
      : [...currentHobbies, hobby]

    handleInputChange("hobbies", newHobbies)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Update the isStepValid function for step 1 to include recipientName
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.recipientName &&
          formData.occasion &&
          formData.relationship &&
          formData.recipientGender &&
          formData.ageRange
        )
      case 2:
        return (
          formData.personality &&
          formData.hobbies.length > 0 &&
          formData.lifestyle &&
          formData.techSavviness &&
          formData.giftPreference
        )
      case 3:
        return formData.tone
      default:
        return false
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2rem] p-16 shadow-3xl border border-white/50 text-center max-w-lg mx-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <Loader2 className="relative h-16 w-16 text-purple-600 animate-spin mx-auto" />
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Analyzing the perfect gift...
          </h2>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-2xl animate-bounce">🎁</span>
            <span className="text-2xl animate-bounce delay-200">✨</span>
            <span className="text-2xl animate-bounce delay-400">💝</span>
          </div>

          <p className="text-gray-600 text-lg">Our AI is processing all the details you provided!</p>

          <div className="mt-8 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
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
      </div>

      {/* Header */}
      <NavHeader />

      {/* Form */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-bounce" />
              <Star className="absolute -top-2 -right-4 h-6 w-6 text-pink-400 animate-bounce delay-300" />
              <div className="text-6xl">💝</div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tell us about your
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent">
                gift recipient
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The more details you share, the better our AI can find the{" "}
              <span className="font-semibold text-purple-600">perfect match</span>!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500"
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic Information</h3>
                  <p className="text-gray-600">Let's start with the basics about your gift recipient</p>
                </div>

                {/* Recipient Name - Add this new field */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What's their name?</span>
                    <span className="text-2xl">👤</span>
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    placeholder="e.g., John, Sarah, Mom, Dad..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  />
                </div>

                {/* Occasion */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What's the occasion?</span>
                    <span className="text-2xl">🎉</span>
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => handleInputChange("occasion", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select an occasion</option>
                    {occasions.map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {occasion}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Relationship */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What's your relationship to them?</span>
                    <span className="text-2xl">👥</span>
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleInputChange("relationship", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select relationship</option>
                    {relationships.map((relationship) => (
                      <option key={relationship} value={relationship}>
                        {relationship}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What's their gender?</span>
                    <span className="text-2xl">👤</span>
                  </label>
                  <select
                    value={formData.recipientGender}
                    onChange={(e) => handleInputChange("recipientGender", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select gender</option>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age Range */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What's their age range?</span>
                    <span className="text-2xl">🎂</span>
                  </label>
                  <select
                    value={formData.ageRange}
                    onChange={(e) => handleInputChange("ageRange", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select age range</option>
                    {ageRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Personality & Interests */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Personality & Interests</h3>
                  <p className="text-gray-600">Help us understand what makes them unique</p>
                </div>

                {/* Personality Description */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>Describe their personality</span>
                    <span className="text-2xl">🌟</span>
                  </label>
                  <textarea
                    value={formData.personality}
                    onChange={(e) => handleInputChange("personality", e.target.value)}
                    placeholder="e.g., outgoing and adventurous, loves trying new things, has a great sense of humor, very thoughtful and caring..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm h-32 resize-none text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  />
                </div>

                {/* Hobbies & Interests */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What are their hobbies & interests? (Select all that apply)</span>
                    <span className="text-2xl">🎨</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {hobbyOptions.map((hobby) => (
                      <button
                        key={hobby}
                        type="button"
                        onClick={() => handleHobbyToggle(hobby)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                          formData.hobbies.includes(hobby)
                            ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                            : "bg-white/80 text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                      >
                        {hobby}
                      </button>
                    ))}
                  </div>
                  {formData.hobbies.length > 0 && (
                    <p className="text-sm text-purple-600 mt-2">
                      Selected: {formData.hobbies.length} {formData.hobbies.length === 1 ? "hobby" : "hobbies"}
                    </p>
                  )}
                </div>

                {/* Lifestyle */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What's their lifestyle like?</span>
                    <span className="text-2xl">🏃‍♀️</span>
                  </label>
                  <select
                    value={formData.lifestyle}
                    onChange={(e) => handleInputChange("lifestyle", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select lifestyle</option>
                    {lifestyles.map((lifestyle) => (
                      <option key={lifestyle} value={lifestyle}>
                        {lifestyle}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tech Savviness */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>How tech-savvy are they?</span>
                    <span className="text-2xl">📱</span>
                  </label>
                  <select
                    value={formData.techSavviness}
                    onChange={(e) => handleInputChange("techSavviness", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select tech level</option>
                    {techLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gift Preference */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What type of gifts do they usually prefer?</span>
                    <span className="text-2xl">🎁</span>
                  </label>
                  <select
                    value={formData.giftPreference}
                    onChange={(e) => handleInputChange("giftPreference", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select gift preference</option>
                    {giftPreferences.map((preference) => (
                      <option key={preference} value={preference}>
                        {preference}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Preferences & Details */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Final Details</h3>
                  <p className="text-gray-600">Just a few more details to perfect your gift</p>
                </div>

                {/* Budget */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>Budget (optional)</span>
                    <span className="text-2xl">💰</span>
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    min="1"
                  />
                </div>

                {/* Message Tone */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>What tone should the message have?</span>
                    <span className="text-2xl">💬</span>
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => handleInputChange("tone", e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    required
                  >
                    <option value="">Select tone</option>
                    {tones.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Favorite Colors */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>Favorite colors or style preferences (optional)</span>
                    <span className="text-2xl">🎨</span>
                  </label>
                  <input
                    type="text"
                    value={formData.favoriteColors}
                    onChange={(e) => handleInputChange("favoriteColors", e.target.value)}
                    placeholder="e.g., loves blue and silver, prefers minimalist design, likes vintage style..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                  />
                </div>

                {/* Dislikes */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>Any dislikes or things to avoid? (optional)</span>
                    <span className="text-2xl">🚫</span>
                  </label>
                  <textarea
                    value={formData.dislikes}
                    onChange={(e) => handleInputChange("dislikes", e.target.value)}
                    placeholder="e.g., allergic to nuts, doesn't like loud colors, prefers not to receive clothing..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm h-24 resize-none text-lg transition-all duration-300 hover:border-purple-300"
                  />
                </div>

                {/* Recent Events */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>Any recent major life events? (optional)</span>
                    <span className="text-2xl">📅</span>
                  </label>
                  <input
                    type="text"
                    value={formData.recentEvents}
                    onChange={(e) => handleInputChange("recentEvents", e.target.value)}
                    placeholder="e.g., just moved to a new house, started a new job, became a parent..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                  />
                </div>

                {/* Special Notes */}
                <div className="group">
                  <label className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>Any other special notes? (optional)</span>
                    <span className="text-2xl">📝</span>
                  </label>
                  <textarea
                    value={formData.specialNotes}
                    onChange={(e) => handleInputChange("specialNotes", e.target.value)}
                    placeholder="e.g., they've been stressed lately and could use some relaxation, they mentioned wanting to learn a new skill..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm h-24 resize-none text-lg transition-all duration-300 hover:border-purple-300"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-2xl transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <span>Find My Perfect Gift</span>
                    <Sparkles className="h-6 w-6 animate-spin" />
                    <div className="text-2xl">💝</div>
                  </div>
                </button>
              )}
            </div>
          </form>
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
