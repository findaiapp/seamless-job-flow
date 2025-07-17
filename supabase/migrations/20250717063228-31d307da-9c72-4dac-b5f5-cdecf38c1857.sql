-- Ensure applications table has all required fields
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS job_id UUID;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS availability TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS skills TEXT;

-- Update applications table to ensure compatibility
UPDATE public.applications SET submitted_at = NOW() WHERE submitted_at IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON public.applications(submitted_at);

-- Update RLS policies to be more permissive for the application flow
DROP POLICY IF EXISTS "Anyone can update applications" ON public.applications;
CREATE POLICY "Anyone can update applications" ON public.applications FOR UPDATE USING (true);