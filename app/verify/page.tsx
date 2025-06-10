"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Mail, CheckCircle2, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resendVerificationEmail } from "@/lib/supabase"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const { user, loading: authLoading } = useAuth()

  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "error">("pending")
  const [message, setMessage] = useState("Please check your email to verify your account.")
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  useEffect(() => {
    if (user && !authLoading) {
      // User is authenticated, likely via email verification link
      setVerificationStatus("verified")
      setMessage("Email verified! Signing you in...")
      setTimeout(() => {
        router.push("/personalize")
      }, 2000)
    } else if (!email) {
      // If no email param, redirect to signup or home
      // This means user landed here without going through signup flow or direct link
      router.push("/signup") // Or wherever appropriate
    }
  }, [user, authLoading, email, router])

  const handleResendVerification = async () => {
    if (!email) {
      setResendMessage("Email not found. Please sign up again.")
      return
    }

    setIsResending(true)
    setResendMessage(null)
    try {
      const { error } = await resendVerificationEmail(email)
      if (error) {
        setResendMessage("Failed to resend verification email: " + error.message)
      } else {
        setResendMessage("Verification email resent! Please check your inbox.")
      }
    } catch (err) {
      setResendMessage("An unexpected error occurred while resending the email.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-3xl border border-white/50 text-center max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-xl -z-10"></div>

        {
          verificationStatus === "pending" && (
            <Mail className="h-16 w-16 text-purple-600 mx-auto mb-6 animate-bounce" />
          )
        }
        {
          verificationStatus === "verified" && (
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-6 animate-in zoom-in-50 duration-500" />
          )
        }
        {
          verificationStatus === "error" && (
            <Loader2 className="h-16 w-16 text-red-600 mx-auto mb-6 animate-spin" /> // Using Loader2 for error state for now, can change icon
          )
        }

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {verificationStatus === "pending" && "Verify Your Email"}
          {verificationStatus === "verified" && "Verification Successful!"}
          {verificationStatus === "error" && "Verification Failed"}
        </h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {message}
        </p>

        {verificationStatus === "pending" && email && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">A verification link has been sent to {email}.</p>
            <Button onClick={handleResendVerification} disabled={isResending} className="w-full">
              {isResending ? (
                <span className="flex items-center justify-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resending...</span>
              ) : (
                <span className="flex items-center justify-center"><RefreshCw className="mr-2 h-4 w-4" /> Resend Verification Email</span>
              )}
            </Button>
            {resendMessage && <p className="text-sm text-center mt-2" style={{ color: resendMessage.includes("Failed") ? 'red' : 'green' }}>{resendMessage}</p>}
          </div>
        )}

        {verificationStatus === "error" && (
          <Button onClick={() => router.push("/signup")} className="w-full mt-6">
            Try Signing Up Again
          </Button>
        )}
      </div>
    </div>
  )
}
