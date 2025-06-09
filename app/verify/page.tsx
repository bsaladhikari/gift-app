"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { resendVerificationEmail } from "@/lib/supabase"

const VerifyPage = () => {
  const [type, setType] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [resendDisabled, setResendDisabled] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const type = searchParams.get("type")
    const email = searchParams.get("email")
    const accessToken = searchParams.get("access_token")

    setType(type)
    setEmail(email)
    setAccessToken(accessToken)
  }, [searchParams])

  useEffect(() => {
    if (accessToken && type === "email") {
      verifyEmail(accessToken)
    }
  }, [accessToken, type])

  const verifyEmail = async (accessToken: string) => {
    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({
      type: "email",
      token: accessToken,
      email: email!,
    })

    if (error) {
      console.error("Error verifying email:", error)
    } else {
      router.push("/")
    }
    setLoading(false)
  }

  const handleResendEmail = async () => {
    if (resendDisabled || !email) return

    setResendDisabled(true)
    try {
      const { error } = await resendVerificationEmail(email)
      if (error) {
        console.error("Error resending verification email:", error)
        // You could add error handling UI here
      }
    } catch (err) {
      console.error("Failed to resend verification email:", err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <p>Verifying email...</p>
      ) : (
        <>
          <p>Email verified successfully!</p>
          <button
            onClick={handleResendEmail}
            disabled={resendDisabled}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Resend Email
          </button>
        </>
      )}
    </div>
  )
}

export default VerifyPage
