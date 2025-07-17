-- Add missing columns to existing jobs table
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS employer_name TEXT,
ADD COLUMN IF NOT EXISTS contact_method TEXT,
ADD COLUMN IF NOT EXISTS application_link TEXT,
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS posted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update existing jobs to have employer_name if company exists
UPDATE public.jobs 
SET employer_name = company 
WHERE employer_name IS NULL AND company IS NOT NULL;

-- Set default values for existing rows
UPDATE public.jobs 
SET 
  is_approved = true,
  status = 'active',
  employer_name = COALESCE(employer_name, company, 'Unknown Employer')
WHERE is_approved IS NULL;

-- Make employer_name NOT NULL after setting defaults
ALTER TABLE public.jobs 
ALTER COLUMN employer_name SET NOT NULL;

-- Create additional RLS policies for the job system
DROP POLICY IF EXISTS "Anyone can view approved active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Authenticated users can create jobs" ON public.jobs;

CREATE POLICY "Anyone can view approved active jobs" 
ON public.jobs 
FOR SELECT 
USING (is_approved = true AND status = 'active');

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_jobs_approved_status ON public.jobs(is_approved, status);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON public.jobs(posted_by);

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles if they don't exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());