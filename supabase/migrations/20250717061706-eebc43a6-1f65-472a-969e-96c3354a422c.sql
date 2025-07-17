-- Create applications table with all required fields
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  location TEXT,
  email TEXT,
  resume_url TEXT,
  ref_code TEXT,
  job_id UUID,
  step_status INTEGER DEFAULT 1,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_listings table
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  pay_range TEXT,
  job_type TEXT DEFAULT 'full-time',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_referrals table
CREATE TABLE IF NOT EXISTS public.job_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  referrer_code TEXT NOT NULL,
  referee_application_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  application_id UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Create job_apply_clicks table
CREATE TABLE IF NOT EXISTS public.job_apply_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create application_log table
CREATE TABLE IF NOT EXISTS public.application_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL,
  step_number INTEGER NOT NULL,
  step_data JSONB,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applicants table
CREATE TABLE IF NOT EXISTS public.applicants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  location TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_shares table
CREATE TABLE IF NOT EXISTS public.job_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  sharer_id UUID,
  share_code TEXT NOT NULL,
  platform TEXT,
  shared_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone_number TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_apply_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications" 
ON public.applications FOR SELECT 
USING (auth.uid()::text = user_id::text OR auth.uid() IS NULL);

CREATE POLICY "Users can create applications" 
ON public.applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own applications" 
ON public.applications FOR UPDATE 
USING (auth.uid()::text = user_id::text OR auth.uid() IS NULL);

-- RLS Policies for job_listings (public read)
CREATE POLICY "Anyone can view active job listings" 
ON public.job_listings FOR SELECT 
USING (is_active = true);

-- RLS Policies for other tables
CREATE POLICY "Users can view their own applicant data" 
ON public.applicants FOR SELECT 
USING (auth.uid()::text = user_id::text OR auth.uid() IS NULL);

CREATE POLICY "Users can create applicant profiles" 
ON public.applicants FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own profiles" 
ON public.user_profiles FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can create profiles" 
ON public.user_profiles FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view job clicks" 
ON public.job_apply_clicks FOR SELECT 
USING (true);

CREATE POLICY "Anyone can log job clicks" 
ON public.job_apply_clicks FOR INSERT 
WITH CHECK (true);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_listings_updated_at
  BEFORE UPDATE ON public.job_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applicants_updated_at
  BEFORE UPDATE ON public.applicants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();