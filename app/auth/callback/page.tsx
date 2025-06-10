"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [authComplete, setAuthComplete] = useState(false)
  const [isSignUpVerification, setIsSignUpVerification] = useState(false)

  useEffect(() => {
    // Handle OAuth callback
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href)
      const code = searchParams.get("code")
      const type = searchParams.get("type")

      if (type === "signup") {
        setIsSignUpVerification(true)
      }

      if (code) {
        try {
          await supabase.auth.exchangeCodeForSession(code)
          setAuthComplete(true)

          // For non-signup flows (e.g., OAuth), still redirect to main app
          if (type !== "signup") {
            router.push("/")
          }
          // For signup, we just set authComplete and let the component render the message

        } catch (error: any) {
          console.error("Error exchanging code for session:", error)
          router.push("/signin?error=auth-callback-failed")
        }
      } else {
        router.push("/signin?error=no-code-provided")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-3xl border border-white/50 text-center max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-xl -z-10"></div>

        {authComplete && isSignUpVerification ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-16 w-16 text-green-600 mx-auto mb-6 animate-in zoom-in-50 duration-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Email Verified!</h1>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">You can now close this page and return to the main application.</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Completing authentication...</p>
          </>
        )}
      </div>
    </div>
  )
}
