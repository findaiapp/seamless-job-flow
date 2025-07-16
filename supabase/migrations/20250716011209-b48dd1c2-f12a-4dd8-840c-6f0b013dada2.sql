-- Create job_alerts table (if not exists)
CREATE TABLE IF NOT EXISTS public.job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  job_id TEXT NOT NULL,
  job_title TEXT,
  job_type TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table (if not exists)
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL,
  page TEXT NOT NULL,
  user_ip TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.job_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_alerts
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'job_alerts' AND policyname = 'Anyone can create job alerts') THEN
    CREATE POLICY "Anyone can create job alerts" 
    ON public.job_alerts FOR INSERT 
    WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'job_alerts' AND policyname = 'System can view job alerts') THEN
    CREATE POLICY "System can view job alerts" 
    ON public.job_alerts FOR SELECT 
    USING (true);
  END IF;
END $$;

-- RLS Policies for referrals
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'referrals' AND policyname = 'Anyone can create referrals') THEN
    CREATE POLICY "Anyone can create referrals" 
    ON public.referrals FOR INSERT 
    WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'referrals' AND policyname = 'System can view referrals') THEN
    CREATE POLICY "System can view referrals" 
    ON public.referrals FOR SELECT 
    USING (true);
  END IF;
END $$;