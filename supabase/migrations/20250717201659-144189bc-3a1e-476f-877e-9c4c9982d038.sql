-- Create job_applications table to link applications to specific jobs
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  job_title TEXT,
  job_type TEXT,
  location TEXT,
  first_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  resume_text TEXT,
  application_status TEXT NOT NULL DEFAULT 'submitted',
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraint to jobs table
ALTER TABLE public.job_applications 
ADD CONSTRAINT fk_job_applications_job_id 
FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for job_applications
CREATE POLICY "Anyone can submit job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view job applications" 
ON public.job_applications 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update job applications" 
ON public.job_applications 
FOR UPDATE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_applied_at ON public.job_applications(applied_at);
CREATE INDEX idx_job_applications_status ON public.job_applications(application_status);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();