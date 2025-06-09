"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Gift, Home, History, Search, User, LogOut, Menu, X, Sparkles, BookOpen } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { isUserAdmin } from "@/lib/supabase"

export default function NavHeader() {
  const { user, profile, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await isUserAdmin(user.id)
        setIsAdmin(adminStatus)
      }
    }
    checkAdmin()
  }, [user])

  const handleSignOut = async () => {
    console.log("NavHeader: Sign out button clicked. Calling signOut()...");
    await signOut()
    setIsMobileMenuOpen(false)
    router.push("/")
  }

  const navItems = isAdmin
    ? [
        { name: "Dashboard", path: "/admin", icon: <Home className="h-4 w-4" /> },
        { name: "Products", path: "/admin/products", icon: <Search className="h-4 w-4" /> },
        { name: "Users", path: "/admin/users", icon: <User className="h-4 w-4" /> },
        { name: "Analytics", path: "/admin/analytics", icon: <History className="h-4 w-4" /> },
      ]
    : [
        { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
        { name: "Find Gifts", path: "/personalize", icon: <Sparkles className="h-4 w-4" /> },
        { name: "Gift History", path: "/history", icon: <History className="h-4 w-4" /> },
      ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User"
  const adminBadge = isAdmin ? " (Admin)" : ""

  return (
    <header className="relative z-20 container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
          <div className="relative">
            <Gift className="h-10 w-10 text-purple-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GiftGenie
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {user ? (
            <>
              {isAdmin ? (
                <nav className="flex items-center mr-4">
                  <Link
                    key="products"
                    href="/admin/products"
                    className={`px-3 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                      isActive("/admin/products")
                        ? "bg-white/70 text-purple-700 font-medium shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    <span>Products</span>
                  </Link>
                </nav>
              ) : (
                <nav className="flex items-center mr-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`px-3 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-white/70 text-purple-700 font-medium shadow-sm"
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              )}

              <div className="flex items-center space-x-3">
                <Link href="/profile/edit" className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/70 transition-all duration-300 cursor-pointer">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">{displayName}</span>
                  {isAdmin && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Admin</span>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 hover:bg-white/50 rounded-full backdrop-blur-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/signin"
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 hover:bg-white/50 rounded-full backdrop-blur-sm"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-xl shadow-lg rounded-b-3xl border-t border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-1 mb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {user ? (
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <Link href="/profile/edit" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {displayName[0]?.toUpperCase()}
                </div>
                <span className="font-medium text-gray-800">{displayName}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:text-red-700 font-medium transition-all duration-300 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <Link
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:bg-gray-50 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
