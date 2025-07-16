-- Create applied_jobs table
CREATE TABLE public.applied_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved_jobs table  
CREATE TABLE public.saved_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.applied_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS policies for applied_jobs
CREATE POLICY "Users can view their own applied jobs" 
ON public.applied_jobs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applied jobs" 
ON public.applied_jobs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS policies for saved_jobs
CREATE POLICY "Users can view their own saved jobs" 
ON public.saved_jobs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved jobs" 
ON public.saved_jobs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved jobs" 
ON public.saved_jobs FOR DELETE 
USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_applied_jobs_user_id ON public.applied_jobs(user_id);
CREATE INDEX idx_applied_jobs_job_id ON public.applied_jobs(job_id);
CREATE INDEX idx_saved_jobs_user_id ON public.saved_jobs(user_id);
CREATE INDEX idx_saved_jobs_job_id ON public.saved_jobs(job_id);