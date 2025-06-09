-- Create gift_history table
CREATE TABLE IF NOT EXISTS public.gift_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_name TEXT NOT NULL,
  occasion TEXT NOT NULL,
  relationship TEXT NOT NULL,
  gift_title TEXT NOT NULL,
  gift_description TEXT,
  gift_price TEXT,
  gift_url TEXT,
  gift_category TEXT,
  personalized_message TEXT NOT NULL,
  form_data JSONB, -- Store the complete form data
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'purchased', 'shared')),
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.gift_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own gift history" ON public.gift_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gift history" ON public.gift_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gift history" ON public.gift_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gift history" ON public.gift_history
  FOR DELETE USING (auth.uid() = user_id);
