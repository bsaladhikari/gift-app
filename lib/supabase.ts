import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface GiftHistory {
  id: string
  user_id: string
  recipient_name: string
  occasion: string
  relationship: string
  gift_title: string
  gift_description: string | null
  gift_price: string | null
  gift_url: string | null
  gift_category: string | null
  personalized_message: string
  form_data: any // JSONB
  status: "saved" | "purchased" | "shared"
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface SavedProduct {
  id: string
  user_id: string
  product_id: string
  product_data: any // JSONB
  is_favorite: boolean
  created_at: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  price_display: string
  category: string
  subcategory: string | null
  retailer: string
  product_url: string
  image_url: string | null
  rating: number
  review_count: number
  features: string[]
  occasions: string[]
  relationships: string[]
  age_groups: string[]
  genders: string[]
  interests: string[]
  price_ranges: string[]
  personality_traits: string[]
  is_active: boolean
  priority: number
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  session_id: string
  occasion: string
  relationship: string
  recipient_age_group: string | null
  recipient_gender: string | null
  budget_min: number | null
  budget_max: number | null
  budget_range: string | null
  interests: string[]
  personality_traits: string[]
  price_range: string | null
  special_notes: string | null
  created_at: string
}

// Auth helper functions
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback?type=signup`,
    },
  })
  return { data, error }
}

export const resendVerificationEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  return { data, error }
}

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  return { data, error }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  return { data, error }
}

// Admin functions
export const isUserAdmin = async (userId: string) => {
  try {
    const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", userId).single()

    if (error) {
      console.error("Error checking admin status:", error)
      return false
    }

    return data?.is_admin || false
  } catch (error) {
    console.error("Error in isUserAdmin:", error)
    return false
  }
}

export const checkAdminAccess = async () => {
  const user = await getCurrentUser()
  if (!user) return false

  return await isUserAdmin(user.id)
}

export const makeUserAdmin = async (userId: string) => {
  const { data, error } = await supabase.from("profiles").update({ is_admin: true }).eq("id", userId).select().single()

  return { data, error }
}

// Gift History functions
export const saveGiftHistory = async (giftData: Omit<GiftHistory, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("gift_history").insert(giftData).select().single()

  return { data, error }
}

export const getGiftHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from("gift_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { data, error }
}

export const updateGiftHistory = async (id: string, updates: Partial<GiftHistory>) => {
  const { data, error } = await supabase.from("gift_history").update(updates).eq("id", id).select().single()

  return { data, error }
}

export const deleteGiftHistory = async (id: string) => {
  const { error } = await supabase.from("gift_history").delete().eq("id", id)

  return { error }
}

// Saved Products functions
export const saveProduct = async (userId: string, productId: string, productData: any) => {
  const { data, error } = await supabase
    .from("saved_products")
    .upsert({
      user_id: userId,
      product_id: productId,
      product_data: productData,
    })
    .select()
    .single()

  return { data, error }
}

export const getSavedProducts = async (userId: string) => {
  const { data, error } = await supabase
    .from("saved_products")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return { data, error }
}

export const toggleProductFavorite = async (userId: string, productId: string, isFavorite: boolean) => {
  const { data, error } = await supabase
    .from("saved_products")
    .update({ is_favorite: isFavorite })
    .eq("user_id", userId)
    .eq("product_id", productId)
    .select()
    .single()

  return { data, error }
}

export const removeSavedProduct = async (userId: string, productId: string) => {
  const { error } = await supabase.from("saved_products").delete().eq("user_id", userId).eq("product_id", productId)

  return { error }
}

// Product functions
export const getProducts = async (filters?: {
  occasions?: string[]
  relationships?: string[]
  interests?: string[]
  priceRange?: string
  category?: string
}) => {
  let query = supabase.from("products").select("*").eq("is_active", true).order("priority", { ascending: false })

  if (filters?.occasions?.length) {
    query = query.overlaps("occasions", filters.occasions)
  }
  if (filters?.relationships?.length) {
    query = query.overlaps("relationships", filters.relationships)
  }
  if (filters?.interests?.length) {
    query = query.overlaps("interests", filters.interests)
  }
  if (filters?.priceRange) {
    query = query.contains("price_ranges", [filters.priceRange])
  }
  if (filters?.category) {
    query = query.eq("category", filters.category)
  }

  const { data, error } = await query

  return { data, error }
}

export const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })
  return { data, error }
}

export const createProduct = async (productData: Omit<Product, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("products").insert(productData).select().single()
  return { data, error }
}

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single()
  return { data, error }
}

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from("products").delete().eq("id", id)
  return { error }
}

// User Preferences functions
export const saveUserPreferences = async (preferences: Omit<UserPreferences, "id" | "created_at">) => {
  const { data, error } = await supabase.from("user_preferences").upsert(preferences).select().single()

  return { data, error }
}

export const getUserPreferences = async (userId: string, sessionId: string) => {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .eq("session_id", sessionId)
    .single()

  return { data, error }
}

// Analytics functions for admin
export const getAnalyticsData = async () => {
  const [usersResult, productsResult, preferencesResult] = await Promise.all([
    supabase.from("profiles").select("id, created_at"),
    supabase.from("products").select("id, category, created_at"),
    supabase.from("user_preferences").select("occasion, relationship, interests"),
  ])

  return {
    users: usersResult.data || [],
    products: productsResult.data || [],
    preferences: preferencesResult.data || [],
  }
}

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin, created_at")
    .order("created_at", { ascending: false })

  return { data, error }
}

export const toggleUserAdmin = async (userId: string, isAdmin: boolean) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ is_admin: isAdmin })
    .eq("id", userId)
    .select()
    .single()

  return { data, error }
}
