-- Create craigslist_posts table with correct schema
CREATE TABLE IF NOT EXISTS public.craigslist_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant TEXT NOT NULL DEFAULT 'generator',
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  borough TEXT NOT NULL,
  job_type TEXT NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  utm_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.craigslist_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for managing craigslist posts
CREATE POLICY "Anyone can create craigslist posts" 
ON public.craigslist_posts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view craigslist posts" 
ON public.craigslist_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update craigslist posts" 
ON public.craigslist_posts 
FOR UPDATE 
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_craigslist_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_craigslist_posts_updated_at
  BEFORE UPDATE ON public.craigslist_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_craigslist_posts_updated_at();