-- Create referral_clicks table
CREATE TABLE public.referral_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code TEXT NOT NULL,
  job_id TEXT NOT NULL,
  city TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Create referral_attributions table
CREATE TABLE public.referral_attributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code TEXT NOT NULL,
  application_id UUID REFERENCES public.applications(id),
  job_id TEXT NOT NULL,
  city TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.referral_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_attributions ENABLE ROW LEVEL SECURITY;

-- RLS policies for referral_clicks (public write-only)
CREATE POLICY "Anyone can insert referral clicks" 
ON public.referral_clicks 
FOR INSERT 
WITH CHECK (true);

-- RLS policies for referral_attributions (public write for attributions)
CREATE POLICY "Anyone can insert referral attributions" 
ON public.referral_attributions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view referral attributions" 
ON public.referral_attributions 
FOR SELECT 
USING (true);

-- RLS policies for referral_clicks (public read for admin dashboard)
CREATE POLICY "Anyone can view referral clicks" 
ON public.referral_clicks 
FOR SELECT 
USING (true);