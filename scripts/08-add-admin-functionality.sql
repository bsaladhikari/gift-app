-- Add admin functionality to existing profiles table
-- This script adds the is_admin column if it doesn't exist

-- Add is_admin column to profiles table (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'is_admin'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies for products table to allow admin access
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Create new policies for products
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

-- Create policy for user preferences
DROP POLICY IF EXISTS "Users can manage their own preferences" ON public.user_preferences;

CREATE POLICY "Users can manage their own preferences" 
  ON public.user_preferences FOR ALL 
  USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.is_admin IS 'Flag to indicate if user has admin privileges';
COMMENT ON FUNCTION public.is_admin(UUID) IS 'Function to check if a user has admin privileges';
