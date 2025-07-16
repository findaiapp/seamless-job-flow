-- Update job_alerts table for Smart Alerts system
ALTER TABLE public.job_alerts 
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS job_id,
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS min_pay INTEGER DEFAULT 15,
ADD COLUMN IF NOT EXISTS schedule TEXT DEFAULT 'any';

-- Update existing records to have default values (using existing columns)
UPDATE public.job_alerts 
SET 
    title = COALESCE(job_type, 'Any Job'),
    min_pay = 15,
    schedule = 'any'
WHERE title IS NULL;