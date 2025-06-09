-- Create products table for admin-managed products
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    price_display VARCHAR(50), -- e.g., "$49.99", "Under $50"
    category VARCHAR(100),
    subcategory VARCHAR(100),
    retailer VARCHAR(100),
    product_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    features TEXT[], -- Array of feature strings
    
    -- User preference matching fields
    occasions TEXT[], -- e.g., ['Birthday', 'Christmas', 'Anniversary']
    relationships TEXT[], -- e.g., ['Partner', 'Friend', 'Parent']
    age_groups TEXT[], -- e.g., ['18-25', '26-35', '36-50', '50+']
    genders TEXT[], -- e.g., ['Male', 'Female', 'Any']
    interests TEXT[], -- e.g., ['Technology', 'Fitness', 'Cooking', 'Reading']
    price_ranges TEXT[], -- e.g., ['Under $25', '$25-50', '$50-100', '$100+']
    personality_traits TEXT[], -- e.g., ['Practical', 'Creative', 'Adventurous']
    
    -- Admin fields
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0, -- Higher priority products shown first
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_priority ON products(priority DESC);
CREATE INDEX IF NOT EXISTS idx_products_occasions ON products USING GIN(occasions);
CREATE INDEX IF NOT EXISTS idx_products_relationships ON products USING GIN(relationships);
CREATE INDEX IF NOT EXISTS idx_products_interests ON products USING GIN(interests);
CREATE INDEX IF NOT EXISTS idx_products_price_ranges ON products USING GIN(price_ranges);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active products
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (is_active = true);

-- Policy: Only authenticated users can manage products (for admin)
CREATE POLICY "Authenticated users can manage products" ON products
    FOR ALL USING (auth.role() = 'authenticated');

-- Update trigger
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_products_updated_at();
