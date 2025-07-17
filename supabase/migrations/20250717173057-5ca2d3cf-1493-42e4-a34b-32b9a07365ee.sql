-- Create job status enum
CREATE TYPE public.job_status AS ENUM ('active', 'closed', 'expired');

-- Create jobs table for universal job system
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_type TEXT NOT NULL,
  location TEXT NOT NULL,
  pay_range TEXT,
  description TEXT NOT NULL,
  contact_method TEXT,
  application_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_approved BOOLEAN NOT NULL DEFAULT false,
  status job_status NOT NULL DEFAULT 'active',
  utm_source TEXT,
  posted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs table
CREATE POLICY "Anyone can view approved active jobs" 
ON public.jobs 
FOR SELECT 
USING (is_approved = true AND status = 'active');

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Admins can view all jobs" 
ON public.jobs 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update jobs" 
ON public.jobs 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete jobs" 
ON public.jobs 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Users can view their own jobs" 
ON public.jobs 
FOR SELECT 
TO authenticated
USING (posted_by = auth.uid());

CREATE POLICY "Users can update their own jobs" 
ON public.jobs 
FOR UPDATE 
TO authenticated
USING (posted_by = auth.uid());

-- Add indexes for performance
CREATE INDEX idx_jobs_approved_status ON public.jobs(is_approved, status);
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_created_at ON public.jobs(created_at DESC);
CREATE INDEX idx_jobs_posted_by ON public.jobs(posted_by);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create user_roles table if it doesn't exist (for admin functionality)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());