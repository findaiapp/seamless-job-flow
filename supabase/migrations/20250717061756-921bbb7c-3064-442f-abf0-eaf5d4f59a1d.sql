-- Fix applications table structure to match existing schema
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS job_id UUID;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS step_status INTEGER DEFAULT 1;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Create job_listings table (if not exists)
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

-- Enable RLS on new tables
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_apply_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Update RLS policies for applications table
DROP POLICY IF EXISTS "Applications read policy" ON public.applications;
DROP POLICY IF EXISTS "Applications insert policy" ON public.applications;
DROP POLICY IF EXISTS "Applications update policy" ON public.applications;

CREATE POLICY "Anyone can view applications" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Anyone can create applications" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update applications" ON public.applications FOR UPDATE USING (true);

-- RLS policies for new tables
CREATE POLICY "Anyone can view active job listings" ON public.job_listings FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view job applications" ON public.job_applications FOR SELECT USING (true);
CREATE POLICY "Anyone can create job applications" ON public.job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can log job clicks" ON public.job_apply_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view job clicks" ON public.job_apply_clicks FOR SELECT USING (true);
CREATE POLICY "Anyone can create application logs" ON public.application_log FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view application logs" ON public.application_log FOR SELECT USING (true);
CREATE POLICY "Anyone can create applicants" ON public.applicants FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view applicants" ON public.applicants FOR SELECT USING (true);
CREATE POLICY "Anyone can create job shares" ON public.job_shares FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view job shares" ON public.job_shares FOR SELECT USING (true);
CREATE POLICY "Anyone can create user profiles" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view user profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can update user profiles" ON public.user_profiles FOR UPDATE USING (true);

-- Add triggers for updated_at columns
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