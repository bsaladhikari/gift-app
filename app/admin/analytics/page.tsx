"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Package, Activity, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    popularOccasions: [],
    popularRelationships: [],
    popularInterests: [],
    productCategories: [],
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      // Get user preferences data for analytics
      const { data: preferences } = await supabase.from("user_preferences").select("*")

      // Get products data
      const { data: products } = await supabase.from("products").select("*")

      // Process data for analytics
      const occasionCounts = {}
      const relationshipCounts = {}
      const interestCounts = {}

      preferences?.forEach((pref) => {
        // Count occasions
        if (pref.occasion) {
          occasionCounts[pref.occasion] = (occasionCounts[pref.occasion] || 0) + 1
        }

        // Count relationships
        if (pref.relationship) {
          relationshipCounts[pref.relationship] = (relationshipCounts[pref.relationship] || 0) + 1
        }

        // Count interests
        pref.interests?.forEach((interest) => {
          interestCounts[interest] = (interestCounts[interest] || 0) + 1
        })
      })

      // Convert to arrays and sort
      const popularOccasions = Object.entries(occasionCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      const popularRelationships = Object.entries(relationshipCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      const popularInterests = Object.entries(interestCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)

      // Product categories
      const categoryCounts = {}
      products?.forEach((product) => {
        if (product.category) {
          categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1
        }
      })

      const productCategories = Object.entries(categoryCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)

      setAnalytics({
        userGrowth: [],
        popularOccasions,
        popularRelationships,
        popularInterests,
        productCategories,
        recentActivity: [],
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <BarChart3 className="h-8 w-8" />
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Insights into user behavior and product performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Popular Occasions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Popular Occasions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.popularOccasions.map((occasion, index) => (
                <div key={occasion.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{occasion.name}</span>
                  <Badge variant="outline">{occasion.count}</Badge>
                </div>
              ))}
              {analytics.popularOccasions.length === 0 && <p className="text-gray-500 text-sm">No data available</p>}
            </div>
          </CardContent>
        </Card>

        {/* Popular Relationships */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Popular Relationships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.popularRelationships.map((relationship, index) => (
                <div key={relationship.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{relationship.name}</span>
                  <Badge variant="outline">{relationship.count}</Badge>
                </div>
              ))}
              {analytics.popularRelationships.length === 0 && (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.productCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="outline">{category.count}</Badge>
                </div>
              ))}
              {analytics.productCategories.length === 0 && (
                <p className="text-gray-500 text-sm">No products added yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Popular Interests */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Popular Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analytics.popularInterests.map((interest, index) => (
                <div key={interest.name} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{interest.name}</p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">{interest.count}</p>
                </div>
              ))}
            </div>
            {analytics.popularInterests.length === 0 && (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No user preferences data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
