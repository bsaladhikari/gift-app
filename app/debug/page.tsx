"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { isUserAdmin } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export default function DebugPage() {
  const { user, profile } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCheckLoading, setAdminCheckLoading] = useState(true)
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if (user) {
      checkAdminStatus()
      loadProfile()
    }
  }, [user])

  const checkAdminStatus = async () => {
    if (!user) return

    try {
      const adminStatus = await isUserAdmin(user.id)
      setIsAdmin(adminStatus)
      console.log("Admin status:", adminStatus)
    } catch (error) {
      console.error("Error checking admin:", error)
    } finally {
      setAdminCheckLoading(false)
    }
  }

  const loadProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (error) throw error
      setProfileData(data)
      console.log("Profile data:", data)
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const makeAdmin = async () => {
    if (!user) return

    try {
      const { error } = await supabase.from("profiles").update({ is_admin: true }).eq("id", user.id)

      if (error) throw error
      alert("Made admin successfully!")
      checkAdminStatus()
      loadProfile()
    } catch (error) {
      console.error("Error making admin:", error)
      alert("Error making admin: " + error.message)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to view debug information.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Email Confirmed:</strong> {user.email_confirmed_at ? "Yes" : "No"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            {profileData ? (
              <div className="space-y-2">
                <p>
                  <strong>Full Name:</strong> {profileData.full_name || "Not set"}
                </p>
                <p>
                  <strong>Is Admin:</strong> {profileData.is_admin ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Created:</strong> {new Date(profileData.created_at).toLocaleString()}
                </p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Status Check</CardTitle>
          </CardHeader>
          <CardContent>
            {adminCheckLoading ? (
              <p>Checking admin status...</p>
            ) : (
              <div className="space-y-4">
                <p>
                  <strong>Admin Status:</strong> {isAdmin ? "Yes" : "No"}
                </p>
                {!isAdmin && (
                  <Button onClick={makeAdmin} variant="outline">
                    Make Me Admin (Debug)
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
