-- Create saved_jobs table
CREATE TABLE public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Create job_alerts table  
CREATE TABLE public.job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  job_id TEXT NOT NULL,
  job_title TEXT,
  job_type TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL,
  page TEXT NOT NULL,
  user_ip TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_jobs
CREATE POLICY "Users can view their own saved jobs" 
ON public.saved_jobs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save their own jobs" 
ON public.saved_jobs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved jobs" 
ON public.saved_jobs FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for job_alerts
CREATE POLICY "Anyone can create job alerts" 
ON public.job_alerts FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can view job alerts" 
ON public.job_alerts FOR SELECT 
USING (true);

-- RLS Policies for referrals
CREATE POLICY "Anyone can create referrals" 
ON public.referrals FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can view referrals" 
ON public.referrals FOR SELECT 
USING (true);