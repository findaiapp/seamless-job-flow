-- Create applied_jobs table only (saved_jobs already exists)
CREATE TABLE IF NOT EXISTS public.applied_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.applied_jobs ENABLE ROW LEVEL SECURITY;

-- RLS policies for applied_jobs
CREATE POLICY IF NOT EXISTS "Users can view their own applied jobs" 
ON public.applied_jobs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own applied jobs" 
ON public.applied_jobs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_applied_jobs_user_id ON public.applied_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_applied_jobs_job_id ON public.applied_jobs(job_id);