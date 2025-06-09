"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

interface Product {
  id?: string
  title: string
  description: string
  price: number
  price_display: string
  category: string
  subcategory: string
  retailer: string
  product_url: string
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
}

const OCCASIONS = [
  "Birthday",
  "Christmas",
  "Anniversary",
  "Valentine's Day",
  "Mother's Day",
  "Father's Day",
  "Graduation",
  "Housewarming",
  "Just Because",
]
const RELATIONSHIPS = [
  "Partner/Spouse",
  "Friend",
  "Parent",
  "Mother",
  "Father",
  "Sibling",
  "Colleague",
  "Family Member",
]
const AGE_GROUPS = ["18-25", "26-35", "36-50", "50+"]
const GENDERS = ["Male", "Female", "Any"]
const INTERESTS = [
  "Technology",
  "Fitness",
  "Cooking",
  "Reading",
  "Gaming",
  "Music",
  "Art",
  "Travel",
  "Fashion",
  "Sports",
  "Gardening",
  "Photography",
]
const PRICE_RANGES = ["Under $25", "$25-50", "$50-100", "$100-200", "$200+"]
const PERSONALITY_TRAITS = [
  "Practical",
  "Creative",
  "Adventurous",
  "Minimalist",
  "Tech-Savvy",
  "Homebody",
  "Social",
  "Professional",
]
const CATEGORIES = [
  "Electronics",
  "Kitchen",
  "Home",
  "Fitness",
  "Beauty",
  "Books",
  "Games",
  "Fashion",
  "Tools",
  "Outdoor",
]

export default function AdminPage() {
  useEffect(() => {
    redirect("/admin/dashboard")
  }, [])

  return null
}
