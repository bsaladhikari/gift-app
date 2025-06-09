"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Handle OAuth callback
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href)
      const code = searchParams.get("code")
      const type = searchParams.get("type")

      if (code) {
        try {
          await supabase.auth.exchangeCodeForSession(code)

          // If this is an email verification callback, redirect to signin
          if (type === "signup") {
            router.push("/signin?verified=true")
          } else {
            router.push("/")
          }
        } catch (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Completing authentication...</p>
      </div>
    </div>
  )
}
