"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, User, Lock, ArrowRight, Check, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { updateProfile, supabase } from "@/lib/supabase"
import Link from "next/link"

export default function EditProfilePage() {
  const { user, profile, refreshProfile, loading } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin") // Redirect if not logged in
    }
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        fullName: profile.full_name || "",
        email: user?.email || "",
      }))
    }
  }, [user, profile, loading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingUpdate(true)
    setMessage({ type: "", text: "" })

    if (!user) {
      setMessage({ type: "error", text: "You must be logged in to update your profile." })
      setLoadingUpdate(false)
      return
    }

    let hasChanges = false
    let updatedProfile: { full_name?: string } = {}
    let authUpdates: { email?: string; password?: string } = {}

    // Check for full name change
    if (formData.fullName !== (profile?.full_name || "")) {
      updatedProfile.full_name = formData.fullName
      hasChanges = true
    }

    // Check for email change
    if (formData.email !== (user?.email || "")) {
      authUpdates.email = formData.email
      hasChanges = true
    }

    // Check for password change
    if (showPasswordFields) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ type: "error", text: "New password and confirm password do not match." })
        setLoadingUpdate(false)
        return
      }
      if (formData.newPassword) {
        authUpdates.password = formData.newPassword
        hasChanges = true
      }
    }

    if (!hasChanges) {
      setMessage({ type: "info", text: "No changes to save." })
      setLoadingUpdate(false)
      return
    }

    try {
      // Update profile table (full_name)
      if (Object.keys(updatedProfile).length > 0) {
        const { error: profileError } = await updateProfile(user.id, updatedProfile)
        if (profileError) {
          throw new Error(profileError.message)
        }
      }

      // Update auth (email, password)
      if (Object.keys(authUpdates).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(authUpdates)
        if (authError) {
          throw new Error(authError.message)
        }
      }

      await refreshProfile() // Refresh the context with new profile data
      setMessage({ type: "success", text: "Profile updated successfully!" })
      setShowPasswordFields(false) // Hide password fields after successful update
      setFormData((prev) => ({ ...prev, newPassword: "", confirmPassword: "" })) // Clear password fields
    } catch (err: any) {
      setMessage({ type: "error", text: `Error updating profile: ${err.message}` })
    } finally {
      setLoadingUpdate(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden flex flex-col items-center justify-center py-12 px-4">
      {/* Navigation Links */}
      <nav className="relative z-10 w-full max-w-2xl mb-8">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/profile/edit" className="text-lg font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-300 border-b-2 border-purple-600 pb-1">
              Edit Profile
            </Link>
          </li>
          {/* Add more profile navigation links here if needed */}
        </ul>
      </nav>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 shadow-3xl border border-white/50 hover:shadow-4xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-[2rem] blur-xl -z-10"></div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="group">
            <label htmlFor="fullName" className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-600" />
              <span>Full Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label htmlFor="email" className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
              <Mail className="h-5 w-5 text-purple-600" />
              <span>Email Address</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
              />
            </div>
          </div>

          {/* Toggle Password Fields */}
          <button
            type="button"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="w-full text-left text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300 flex items-center space-x-2"
          >
            <Lock className="h-5 w-5" />
            <span>{showPasswordFields ? "Hide Password Fields" : "Change Password"}</span>
            {showPasswordFields ? <X className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>

          {showPasswordFields && (
            <>
              {/* New Password */}
              <div className="group">
                <label htmlFor="newPassword" className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span>New Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label htmlFor="confirmPassword" className="block text-lg font-bold text-gray-700 mb-3 flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span>Confirm New Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                  />
                </div>
              </div>
            </>
          )}

          {message.text && (
            <div
              className={`p-4 rounded-xl text-center font-medium ${
                message.type === "success"
                  ? "bg-green-50/80 text-green-600 border border-green-200"
                  : "bg-red-50/80 text-red-600 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loadingUpdate}
            className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-3">
              {loadingUpdate ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Save Changes</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </div>
          </button>
        </form>
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}