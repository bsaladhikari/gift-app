"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, ArrowRight, Loader2 } from "lucide-react"

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

export default function PreferencesPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [preferences, setPreferences] = useState({
    occasion: "",
    relationship: "",
    recipient_age_group: "",
    recipient_gender: "",
    interests: [] as string[],
    personality_traits: [] as string[],
    price_range: "",
    special_notes: "",
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/signin")
        return
      }
      setUser(currentUser)
      await loadPreferences(currentUser.id)
    } catch (error) {
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }

  const loadPreferences = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_preferences").select("*").eq("user_id", userId).single()

      if (data) {
        setPreferences({
          occasion: data.occasion || "",
          relationship: data.relationship || "",
          recipient_age_group: data.recipient_age_group || "",
          recipient_gender: data.recipient_gender || "",
          interests: data.interests || [],
          personality_traits: data.personality_traits || [],
          price_range: data.price_range || "",
          special_notes: data.special_notes || "",
        })
      }
    } catch (error) {
      console.error("Error loading preferences:", error)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase.from("user_preferences").upsert({
        user_id: user.id,
        ...preferences,
      })

      if (error) throw error

      // Redirect to results page
      router.push("/results")
    } catch (error) {
      console.error("Error saving preferences:", error)
      alert("Error saving preferences")
    } finally {
      setSaving(false)
    }
  }

  const addToArray = (field: "interests" | "personality_traits", value: string) => {
    if (!preferences[field].includes(value)) {
      setPreferences((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }))
    }
  }

  const removeFromArray = (field: "interests" | "personality_traits", value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tell us about your gift recipient
            </CardTitle>
            <p className="text-gray-600 mt-2">Help us find the perfect gift by sharing some details</p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg font-semibold mb-3 block">Occasion</Label>
                <Select
                  value={preferences.occasion}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, occasion: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>
                        {occasion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 block">Relationship</Label>
                <Select
                  value={preferences.relationship}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, relationship: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIPS.map((rel) => (
                      <SelectItem key={rel} value={rel}>
                        {rel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg font-semibold mb-3 block">Age Group</Label>
                <Select
                  value={preferences.recipient_age_group}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, recipient_age_group: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_GROUPS.map((age) => (
                      <SelectItem key={age} value={age}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 block">Gender</Label>
                <Select
                  value={preferences.recipient_gender}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, recipient_gender: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDERS.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interests */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Interests</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {preferences.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {interest}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("interests", interest)} />
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addToArray("interests", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Add interests" />
                </SelectTrigger>
                <SelectContent>
                  {INTERESTS.filter((int) => !preferences.interests.includes(int)).map((int) => (
                    <SelectItem key={int} value={int}>
                      {int}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personality Traits */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Personality Traits</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {preferences.personality_traits.map((trait) => (
                  <Badge key={trait} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {trait}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFromArray("personality_traits", trait)}
                    />
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addToArray("personality_traits", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Add personality traits" />
                </SelectTrigger>
                <SelectContent>
                  {PERSONALITY_TRAITS.filter((trait) => !preferences.personality_traits.includes(trait)).map(
                    (trait) => (
                      <SelectItem key={trait} value={trait}>
                        {trait}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Budget</Label>
              <Select
                value={preferences.price_range}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, price_range: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Special Notes */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">Special Notes (Optional)</Label>
              <Textarea
                value={preferences.special_notes}
                onChange={(e) => setPreferences((prev) => ({ ...prev, special_notes: e.target.value }))}
                placeholder="Any specific preferences, dislikes, or additional information..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSave}
              disabled={saving || !preferences.occasion || !preferences.relationship}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Finding Perfect Gifts...
                </>
              ) : (
                <>
                  Find Perfect Gifts
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
