# Complete Supabase Setup for LuxegiftAI

This document outlines the complete Supabase setup we've implemented for the LuxegiftAI application, including all database tables, authentication, and admin functionality.

## Database Schema Overview

We've created the following tables in Supabase:

### 1. profiles
Stores user profile information and is automatically populated when a new user signs up.

\`\`\`sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);
\`\`\`

**Key Features:**
- Automatically created when user signs up
- `is_admin` field to control admin access
- Links to Supabase auth.users table

### 2. gift_history
Stores the history of gifts that users have saved, purchased, or shared.

\`\`\`sql
CREATE TABLE public.gift_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  recipient_name TEXT NOT NULL,
  occasion TEXT NOT NULL,
  relationship TEXT,
  gift_title TEXT NOT NULL,
  gift_description TEXT,
  gift_price TEXT,
  gift_url TEXT,
  gift_category TEXT,
  personalized_message TEXT NOT NULL,
  form_data JSONB,
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'purchased', 'shared')),
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);
\`\`\`

**Key Features:**
- Tracks user's gift history
- Supports different statuses (saved, purchased, shared)
- Stores form data as JSONB for flexibility
- Favorite marking system

### 3. saved_products
Stores products that users have saved for future reference.

\`\`\`sql
CREATE TABLE public.saved_products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  product_id TEXT NOT NULL,
  product_data JSONB NOT NULL,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);
\`\`\`

**Key Features:**
- User's saved products
- Prevents duplicate saves with unique constraint
- Stores product data as JSONB

### 4. products ⭐ NEW
The main products table that stores all available gifts with matching criteria.

\`\`\`sql
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_display TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  retailer TEXT NOT NULL,
  product_url TEXT NOT NULL,
  image_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  
  -- User Matching Criteria
  occasions TEXT[] DEFAULT '{}',
  relationships TEXT[] DEFAULT '{}',
  age_groups TEXT[] DEFAULT '{}',
  genders TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  price_ranges TEXT[] DEFAULT '{}',
  personality_traits TEXT[] DEFAULT '{}',
  
  -- Admin fields
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);
\`\`\`

**Key Features:**
- Complete product information
- Array fields for matching user preferences
- Priority system for featured products
- Admin controls (is_active, created_by)

### 5. user_preferences ⭐ NEW
Stores user preferences for gift matching.

\`\`\`sql
CREATE TABLE public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  session_id TEXT NOT NULL,
  
  -- Gift Details
  occasion TEXT NOT NULL,
  relationship TEXT NOT NULL,
  recipient_age_group TEXT,
  recipient_gender TEXT,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  budget_range TEXT,
  
  -- Preferences
  interests TEXT[] DEFAULT '{}',
  personality_traits TEXT[] DEFAULT '{}',
  special_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  
  UNIQUE(user_id, session_id)
);
\`\`\`

**Key Features:**
- Stores user's gift search criteria
- Session-based for multiple searches
- Flexible budget options
- Array fields for multiple interests/traits

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

\`\`\`sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" 
  ON public.products FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage products" 
  ON public.products FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- User preferences policies
CREATE POLICY "Users can manage their own preferences" 
  ON public.user_preferences FOR ALL 
  USING (auth.uid() = user_id);
\`\`\`

## Functions and Triggers

### Auto-Profile Creation
\`\`\`sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
\`\`\`

### Admin Check Function
\`\`\`sql
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
\`\`\`

## Indexes for Performance

\`\`\`sql
-- Gift history indexes
CREATE INDEX idx_gift_history_user_id ON public.gift_history(user_id);
CREATE INDEX idx_gift_history_occasion ON public.gift_history(occasion);
CREATE INDEX idx_gift_history_status ON public.gift_history(status);

-- Products indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_products_priority ON public.products(priority);
CREATE INDEX idx_products_occasions ON public.products USING GIN(occasions);
CREATE INDEX idx_products_relationships ON public.products USING GIN(relationships);
CREATE INDEX idx_products_interests ON public.products USING GIN(interests);

-- User preferences indexes
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_user_preferences_session ON public.user_preferences(session_id);
\`\`\`

## Authentication Features

### Current Implementation
1. **Email/Password Authentication**
   - Sign up with email verification
   - Sign in with password
   - Password reset functionality

2. **Google OAuth** (configurable)
   - One-click sign in with Google
   - Automatic profile creation

3. **Session Management**
   - Persistent sessions across page reloads
   - Automatic token refresh
   - Secure logout

### Admin System ⭐ NEW
- Admin flag in profiles table
- Admin-only access to `/admin` page
- Product management capabilities
- RLS policies for admin operations

## Application Features

### For Regular Users
1. **Authentication Flow**
   - Sign up → Email verification → Profile creation
   - Sign in → Dashboard access
   - Profile management

2. **Gift Finding Process** ⭐ NEW
   - Fill preferences form (`/preferences`)
   - Get matched products (`/results`)
   - Save favorite products
   - Track gift history

3. **Product Interaction**
   - View product details
   - Save products for later
   - Mark favorites
   - Direct purchase links

### For Admins ⭐ NEW
1. **Product Management** (`/admin`)
   - Add new products
   - Edit existing products
   - Set matching criteria
   - Control product visibility

2. **Matching System**
   - Define which user preferences trigger each product
   - Set product priority for ranking
   - Manage categories and features

## Environment Variables

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

## Making Someone an Admin

### Method 1: Direct Database Update (Recommended)
1. Go to your Supabase Dashboard
2. Navigate to Table Editor → profiles
3. Find the user's row (by email)
4. Set `is_admin` to `true`

### Method 2: SQL Query
\`\`\`sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'admin@example.com';
\`\`\`

### Method 3: Supabase SQL Editor
1. Go to SQL Editor in Supabase Dashboard
2. Run this query:
\`\`\`sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'your-admin-email@example.com';
\`\`\`

## Current Status

✅ **Completed:**
- All database tables created
- Authentication system working
- Admin panel functional
- User preferences system
- Product matching algorithm
- RLS policies implemented

🔄 **In Progress:**
- Product image hosting
- Email notifications
- Advanced filtering

📋 **Next Steps:**
1. Set up admin users
2. Add initial product catalog
3. Test user flow end-to-end
4. Deploy to production
5. Set up product image storage

## File Structure

\`\`\`
lib/
  ├── supabase.ts          # Supabase client and helper functions
components/
  ├── auth-provider.tsx    # Authentication context
  └── nav-header.tsx       # Navigation with auth state
app/
  ├── admin/page.tsx       # Admin product management
  ├── preferences/page.tsx # User preferences form
  ├── results/page.tsx     # Product results page
  ├── auth/callback/       # Auth callback handler
  ├── signin/page.tsx      # Sign in page
  └── signup/page.tsx      # Sign up page
scripts/
  ├── 01-create-profiles-table.sql
  ├── 02-create-gift-history-table.sql
  ├── 03-create-saved-products-table.sql
  ├── 04-create-functions-and-triggers.sql
  ├── 05-create-indexes.sql
  ├── 06-create-products-table.sql
  └── 07-create-user-preferences-table.sql
\`\`\`

This setup provides a complete foundation for the LuxegiftAI application with user authentication, admin management, and intelligent product matching.
