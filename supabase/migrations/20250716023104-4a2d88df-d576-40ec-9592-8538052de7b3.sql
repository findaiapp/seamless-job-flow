-- Create craigslist_posts table for storing generated posts
CREATE TABLE public.craigslist_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  borough TEXT NOT NULL,
  job_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used BOOLEAN NOT NULL DEFAULT false,
  utm_link TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.craigslist_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (anyone can view/create for now, can be restricted later)
CREATE POLICY "Anyone can view craigslist posts" 
ON public.craigslist_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create craigslist posts" 
ON public.craigslist_posts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update craigslist posts" 
ON public.craigslist_posts 
FOR UPDATE 
USING (true);