"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, isUserAdmin } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { useToast } from "@/components/ui/use-toast"

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
  created_by?: string
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

const productsPerPage = 10;

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterActive, setFilterActive] = useState("all");

  const { toast } = useToast();

  const [formData, setFormData] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    price_display: "",
    category: "",
    subcategory: "",
    retailer: "",
    product_url: "",
    rating: 0,
    review_count: 0,
    features: [],
    occasions: [],
    relationships: [],
    age_groups: [],
    genders: [],
    interests: [],
    price_ranges: [],
    personality_traits: [],
    is_active: true,
    priority: 0,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAdmin) {
      loadProducts()
    }
  }, [currentPage, isAdmin, searchTerm, filterCategory, filterActive])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/signin")
        return
      }

      // Check if user is admin
      const adminStatus = await isUserAdmin(currentUser.id)
      if (!adminStatus) {
        setError("Access denied. Admin privileges required.")
        setLoading(false)
        return
      }

      setUser(currentUser)
      setIsAdmin(true)
    } catch (error) {
      console.error("Auth error:", error)
      setError("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async () => {
    setLoading(true); // Set loading true at the start of loadProducts
    try {
      let query = supabase.from("products").select("*", { count: 'exact' }).order("priority", { ascending: false })

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,retailer.ilike.%${searchTerm}%`)
      }

      if (filterCategory !== "all") {
        query = query.eq("category", filterCategory);
      }

      if (filterActive !== "all") {
        query = query.eq("is_active", filterActive === "true");
      }

      const { data, error, count } = await query
        .range(currentPage * productsPerPage, (currentPage + 1) * productsPerPage - 1);

      if (error) throw error
      setProducts(data || [])
      setTotalProducts(count || 0);
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false); // Set loading false at the end
    }
  }

  const handleSave = async () => {
    setSaving(true);
    setError(""); // Clear previous errors

    try {
      const productData: Product = {
        ...formData,
        created_by: user?.id,
      };

      let result: any; // Initialize result to avoid 'possibly undefined' error
      const isNewProduct = !editingProduct?.id; // Determine if it's a new product or an edit

      if (isNewProduct) {
        result = await supabase.from("products").insert([productData]).select();
      } else {
        // If not a new product, editingProduct.id should exist
        result = await supabase.from("products").update(productData).eq("id", editingProduct!.id).select();
      }

      if (result.error) {
        throw result.error;
      }

      const savedProduct = result.data ? result.data[0] : null;

      if (savedProduct) {
        // Optimistic UI update: update state directly instead of re-fetching all products
        setProducts((prevProducts) => {
          if (isNewProduct) {
            return [savedProduct, ...prevProducts];
          } else {
            return prevProducts.map((p) => (p.id === savedProduct.id ? savedProduct : p));
          }
        });

        toast({
          title: isNewProduct ? "Product created!" : "Product updated!",
          description: `Product "${savedProduct.title}" has been successfully ${isNewProduct ? "created" : "updated"}.`,
        });

        resetForm();
        setShowForm(false);
      } else {
        throw new Error("No product data returned after save.");
      }
    } catch (error: any) {
      console.error("Error saving product:", error);
      setError(error.message || "An unexpected error occurred.");
      toast({
        title: "Error saving product",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)
      if (error) throw error
      await loadProducts()
      setShowForm(false)
      alert("Product deleted!")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Error deleting product")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      price_display: "",
      category: "",
      subcategory: "",
      retailer: "",
      product_url: "",
      rating: 0,
      review_count: 0,
      features: [],
      occasions: [],
      relationships: [],
      age_groups: [],
      genders: [],
      interests: [],
      price_ranges: [],
      personality_traits: [],
      is_active: true,
      priority: 0,
    })
    setEditingProduct(null)
  }

  const addToArray = (field: keyof Product, value: string) => {
    const currentArray = formData[field] as string[]
    if (!currentArray.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentArray, value],
      }))
    }
  }

  const removeFromArray = (field: keyof Product, value: string) => {
    const currentArray = formData[field] as string[]
    setFormData((prev) => ({
      ...prev,
      [field]: currentArray.filter((item) => item !== value),
    }))
  }

  const addFeature = () => {
    const feature = prompt("Enter feature:")
    if (feature && !formData.features.includes(feature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }))
    }
  }

  const handleAddProduct = () => {
    // console.log("Add product button clicked in app/admin/products/page.tsx") // Removed Debug log
    setShowForm(true)
    setEditingProduct(null)
    resetForm()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Admin</h1>
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex space-x-4">
        <Input
          placeholder="Search products by title, description, or retailer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterActive} onValueChange={setFilterActive}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List as Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Display</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviews</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occasions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationships</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age Groups</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Ranges</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personality Traits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={21} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price_display}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.subcategory}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.retailer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><a href={product.product_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.review_count}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.features.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.occasions.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.relationships.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.age_groups.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.genders.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.interests.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price_ranges.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.personality_traits.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.priority}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="mr-2">Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id || '')}>Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {totalProducts > productsPerPage && (
        <div className="flex justify-between mt-4 col-span-full">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={(currentPage + 1) * productsPerPage >= totalProducts}
          >
            Next
          </Button>
        </div>
      )}

      {/* Product Form */}
      {showForm && (
        <>
          <Card className="mb-8 mt-8">
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter product title"
                  />
                </div>
                <div>
                  <Label htmlFor="retailer">Retailer</Label>
                  <Input
                    id="retailer"
                    value={formData.retailer}
                    onChange={(e) => setFormData((prev) => ({ ...prev, retailer: e.target.value }))}
                    placeholder="e.g., Amazon, Target, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="price_display">Price Display</Label>
                  <Input
                    id="price_display"
                    value={formData.price_display}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price_display: e.target.value }))}
                    placeholder="e.g., $49.99, Under $50"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="product_url">Product URL</Label>
                <Input
                  id="product_url"
                  value={formData.product_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, product_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              {/* Features */}
              <div>
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("features", feature)} />
                    </Badge>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>

              {/* User Matching Criteria */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">User Matching Criteria</h3>

                {/* Occasions */}
                <div>
                  <Label>Occasions</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.occasions.map((occasion) => (
                      <Badge key={occasion} variant="secondary" className="flex items-center gap-1">
                        {occasion}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("occasions", occasion)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("occasions", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {OCCASIONS.filter((occ) => !formData.occasions.includes(occ)).map((occ) => (
                        <SelectItem key={occ} value={occ}>
                          {occ}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Relationships */}
                <div>
                  <Label>Relationships</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.relationships.map((rel) => (
                      <Badge key={rel} variant="secondary" className="flex items-center gap-1">
                        {rel}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("relationships", rel)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("relationships", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELATIONSHIPS.filter((rel) => !formData.relationships.includes(rel)).map((rel) => (
                        <SelectItem key={rel} value={rel}>
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("interests", interest)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("interests", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {INTERESTS.filter((int) => !formData.interests.includes(int)).map((int) => (
                        <SelectItem key={int} value={int}>
                          {int}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Ranges */}
                <div>
                  <Label>Price Ranges</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.price_ranges.map((range) => (
                      <Badge key={range} variant="secondary" className="flex items-center gap-1">
                        {range}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("price_ranges", range)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("price_ranges", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGES.filter((pr) => !formData.price_ranges.includes(pr)).map((pr) => (
                        <SelectItem key={pr} value={pr}>
                          {pr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Groups */}
                <div>
                  <Label>Age Groups</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.age_groups.map((group) => (
                      <Badge key={group} variant="secondary" className="flex items-center gap-1">
                        {group}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("age_groups", group)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("age_groups", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_GROUPS.filter((ag) => !formData.age_groups.includes(ag)).map((ag) => (
                        <SelectItem key={ag} value={ag}>
                          {ag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Genders */}
                <div>
                  <Label>Genders</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.genders.map((gender) => (
                      <Badge key={gender} variant="secondary" className="flex items-center gap-1">
                        {gender}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("genders", gender)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("genders", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDERS.filter((g) => !formData.genders.includes(g)).map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personality Traits */}
                <div>
                  <Label>Personality Traits</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.personality_traits.map((trait) => (
                      <Badge key={trait} variant="secondary" className="flex items-center gap-1">
                        {trait}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("personality_traits", trait)} />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray("personality_traits", value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Add trait" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERSONALITY_TRAITS.filter((pt) => !formData.personality_traits.includes(pt)).map((pt) => (
                        <SelectItem key={pt} value={pt}>
                          {pt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number.parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="review_count">Review Count</Label>
                  <Input
                    id="review_count"
                    type="number"
                    min="0"
                    value={formData.review_count}
                    onChange={(e) => setFormData((prev) => ({ ...prev, review_count: Number.parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="0"
                    value={formData.priority}
                    onChange={(e) => setFormData((prev) => ({ ...prev, priority: Number.parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="is_active">Is Active</Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Product
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
