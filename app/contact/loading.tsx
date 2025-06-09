import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Loading Contact Page...</h2>
        <p className="text-gray-600">Just a moment while we prepare the form for you.</p>
      </div>
    </div>
  )
}
