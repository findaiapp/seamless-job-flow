-- Add performance tracking fields to craigslist_posts table
ALTER TABLE public.craigslist_posts 
ADD COLUMN IF NOT EXISTS messages_received integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS views_estimated integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS clicks integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS variant_score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS conversion_score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS flag_risk_score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS auto_generated boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS manual_posted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS posted_date date,
ADD COLUMN IF NOT EXISTS daily_variant_id text;