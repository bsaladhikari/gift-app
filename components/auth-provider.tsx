"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, getProfile } from "@/lib/supabase"
import type { Profile } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (user) {
      const { data } = await getProfile(user.id)
      setProfile(data)
    }
  }

  const handleSignOut = async () => {
    console.log("Auth: Attempting to sign out...");
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Auth: Supabase sign out error:", error.message);
      console.error("Auth: Full error object:", error);
    } else {
      console.log("Auth: Supabase sign out successful. Updating local state...");
      setUser(null);
      setProfile(null);
      console.log("Auth: User state after sign out:", user);
      console.log("Auth: Profile state after sign out:", profile);
    }
    console.log("Auth: handleSignOut function completed.");
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        console.log("Auth: Starting to fetch profile for initial session...");
        const { data } = await getProfile(session.user.id)
        setProfile(data)
        console.log("Auth: Finished fetching profile for initial session.", data);
      }

      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        console.log("Auth: Starting to fetch profile on auth state change...");
        const { data } = await getProfile(session.user.id)
        setProfile(data)
        console.log("Auth: Finished fetching profile on auth state change.", data);
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut: handleSignOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
