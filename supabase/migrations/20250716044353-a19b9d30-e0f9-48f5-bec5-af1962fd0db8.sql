-- Add new columns for Smart Alerts system
ALTER TABLE public.job_alerts 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS min_pay INTEGER DEFAULT 15,
ADD COLUMN IF NOT EXISTS schedule TEXT DEFAULT 'any';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own job alerts" ON public.job_alerts;
DROP POLICY IF EXISTS "Users can create their own job alerts" ON public.job_alerts;
DROP POLICY IF EXISTS "Users can update their own job alerts" ON public.job_alerts;
DROP POLICY IF EXISTS "Users can delete their own job alerts" ON public.job_alerts;

-- Create RLS policies for job_alerts
CREATE POLICY "Users can view their own job alerts" 
ON public.job_alerts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own job alerts" 
ON public.job_alerts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job alerts" 
ON public.job_alerts FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job alerts" 
ON public.job_alerts FOR DELETE 
USING (auth.uid() = user_id);