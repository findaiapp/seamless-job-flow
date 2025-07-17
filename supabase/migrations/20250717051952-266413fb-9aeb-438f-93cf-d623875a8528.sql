-- Create craigslist_applications table for tracking Craigslist-based applicants
CREATE TABLE public.craigslist_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL,
  city TEXT,
  variant TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.craigslist_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for public write access (insert only)
CREATE POLICY "Allow public insert for craigslist applications" 
ON public.craigslist_applications 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy for authenticated users to view their own data
CREATE POLICY "Users can view all craigslist applications" 
ON public.craigslist_applications 
FOR SELECT 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_craigslist_applications_updated_at
BEFORE UPDATE ON public.craigslist_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on job_id queries
CREATE INDEX idx_craigslist_applications_job_id ON public.craigslist_applications(job_id);

-- Create index for better performance on submitted_at queries
CREATE INDEX idx_craigslist_applications_submitted_at ON public.craigslist_applications(submitted_at DESC);