-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gift_history_user_id ON public.gift_history(user_id);
CREATE INDEX IF NOT EXISTS idx_gift_history_created_at ON public.gift_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gift_history_occasion ON public.gift_history(occasion);
CREATE INDEX IF NOT EXISTS idx_gift_history_is_favorite ON public.gift_history(is_favorite);

CREATE INDEX IF NOT EXISTS idx_saved_products_user_id ON public.saved_products(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_products_created_at ON public.saved_products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_products_is_favorite ON public.saved_products(is_favorite);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
