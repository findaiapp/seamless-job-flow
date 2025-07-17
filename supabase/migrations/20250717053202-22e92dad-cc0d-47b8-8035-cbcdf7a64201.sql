-- Create post_variants table
CREATE TABLE public.post_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  job_type TEXT NOT NULL,
  variant_title TEXT NOT NULL,
  variant_body TEXT NOT NULL,
  created_by UUID DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create status enum for craigslist_posts
CREATE TYPE post_status AS ENUM ('posted', 'scheduled', 'expired');

-- Create craigslist_posts table
CREATE TABLE public.craigslist_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES public.post_variants(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  job_type TEXT NOT NULL,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  repost_at TIMESTAMP WITH TIME ZONE,
  views INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  status post_status NOT NULL DEFAULT 'posted'
);

-- Enable RLS on both tables
ALTER TABLE public.post_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.craigslist_posts ENABLE ROW LEVEL SECURITY;

-- RLS policies for post_variants (admin write, public read)
CREATE POLICY "Anyone can view post variants" 
ON public.post_variants 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert post variants" 
ON public.post_variants 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update post variants" 
ON public.post_variants 
FOR UPDATE 
USING (true);

-- RLS policies for craigslist_posts (admin write, public read)
CREATE POLICY "Anyone can view craigslist posts" 
ON public.craigslist_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert craigslist posts" 
ON public.craigslist_posts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update craigslist posts" 
ON public.craigslist_posts 
FOR UPDATE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_post_variants_city_job_type ON public.post_variants(city, job_type);
CREATE INDEX idx_craigslist_posts_variant_id ON public.craigslist_posts(variant_id);
CREATE INDEX idx_craigslist_posts_city_job_type ON public.craigslist_posts(city, job_type);
CREATE INDEX idx_craigslist_posts_status ON public.craigslist_posts(status);
CREATE INDEX idx_craigslist_posts_repost_at ON public.craigslist_posts(repost_at);