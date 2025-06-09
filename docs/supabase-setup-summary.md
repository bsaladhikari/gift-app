# Supabase Integration for LuxegiftAI

This document outlines the Supabase setup we've implemented for the LuxegiftAI application.

## Database Schema

We've created the following tables in Supabase:

### 1. profiles

This table stores user profile information and is automatically populated when a new user signs up.

\`\`\`sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);
\`\`\`

### 2. gift_history

This table stores the history of gifts that users have saved, purchased, or shared.

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

### 3. saved_products

This table stores products that users have saved for future reference.

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

## Row Level Security (RLS)

We've implemented Row Level Security policies to ensure that users can only access their own data:

\`\`\`sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for gift_history
CREATE POLICY "Users can view their own gift history" 
  ON public.gift_history FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own gift history" 
  ON public.gift_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gift history" 
  ON public.gift_history FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own gift history" 
  ON public.gift_history FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for saved_products
CREATE POLICY "Users can view their own saved products" 
  ON public.saved_products FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved products" 
  ON public.saved_products FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved products" 
  ON public.saved_products FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved products" 
  ON public.saved_products FOR DELETE 
  USING (auth.uid() = user_id);
\`\`\`

## Functions and Triggers

We've created a function and trigger to automatically create a profile when a new user signs up:

\`\`\`sql
-- Function to handle new user creation
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

-- Trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
\`\`\`

## Indexes

We've created indexes to improve query performance:

\`\`\`sql
-- Create indexes for gift_history
CREATE INDEX idx_gift_history_user_id ON public.gift_history(user_id);
CREATE INDEX idx_gift_history_occasion ON public.gift_history(occasion);
CREATE INDEX idx_gift_history_status ON public.gift_history(status);
CREATE INDEX idx_gift_history_is_favorite ON public.gift_history(is_favorite);

-- Create indexes for saved_products
CREATE INDEX idx_saved_products_user_id ON public.saved_products(user_id);
CREATE INDEX idx_saved_products_product_id ON public.saved_products(product_id);
CREATE INDEX idx_saved_products_is_favorite ON public.saved_products(is_favorite);
\`\`\`

## Authentication

We've integrated Supabase Authentication to handle user sign-up, sign-in, and session management. This includes:

1. Email/password authentication
2. Google OAuth (if configured in the Supabase dashboard)
3. Session persistence across page reloads
4. Automatic profile creation on sign-up

## Client Integration

We've created a Supabase client and helper functions in `lib/supabase.ts` to interact with the Supabase API. This includes functions for:

1. Authentication (sign-up, sign-in, sign-out)
2. Profile management
3. Gift history management
4. Saved products management

We've also created an AuthProvider component in `components/auth-provider.tsx` to manage authentication state across the application.

## Environment Variables

The Supabase URL and Anon Key are stored in environment variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

## Next Steps

1. Configure Google OAuth in the Supabase dashboard (if desired)
2. Update the remaining components to use the Supabase client
3. Test the authentication flow
4. Implement storage for user avatars (if desired)
\`\`\`
