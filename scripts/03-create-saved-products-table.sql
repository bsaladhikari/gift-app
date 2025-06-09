-- Create saved_products table
CREATE TABLE IF NOT EXISTS public.saved_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  product_data JSONB NOT NULL, -- Store the complete product data
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique combination of user and product
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own saved products" ON public.saved_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved products" ON public.saved_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved products" ON public.saved_products
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved products" ON public.saved_products
  FOR DELETE USING (auth.uid() = user_id);
