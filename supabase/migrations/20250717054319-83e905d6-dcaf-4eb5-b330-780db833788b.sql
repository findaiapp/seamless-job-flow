-- Create jobs table for real job listings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT,
  pay_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  is_verified BOOLEAN DEFAULT false,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create search_events table for analytics
CREATE TABLE public.search_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'search', 'filter', 'scroll', 'apply', 'save'
  location TEXT,
  job_type TEXT,
  filter_applied TEXT,
  job_id UUID,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for jobs (public read)
CREATE POLICY "Anyone can view jobs" 
ON public.jobs 
FOR SELECT 
USING (true);

-- RLS policies for search_events (public write for analytics)
CREATE POLICY "Anyone can insert search events" 
ON public.search_events 
FOR INSERT 
WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_posted_at ON public.jobs(posted_at);
CREATE INDEX idx_search_events_type ON public.search_events(event_type);
CREATE INDEX idx_search_events_created_at ON public.search_events(created_at);

-- Insert some sample jobs
INSERT INTO public.jobs (title, company, location, job_type, pay_range, description, requirements, benefits, is_verified) VALUES
('Delivery Driver', 'QuickEats', 'Brooklyn', 'delivery', '$18-25/hr', 'Join our team of delivery drivers! Flexible hours, immediate start available. Use your own vehicle to deliver food to hungry customers.', 'Valid driver license, own vehicle, smartphone', 'Flexible schedule, tips, gas bonus', true),
('Preschool Teacher', 'Little Learners Academy', 'Bronx', 'education', '$16-22/hr', 'Caring preschool teacher needed! Work with 3-5 year olds in a nurturing environment. No experience required - we provide training!', 'Love for children, patience, reliability', 'Paid training, health benefits, growth opportunities', true),
('Retail Associate', 'TrendyStyle', 'Manhattan', 'retail', '$15-18/hr', 'Part-time retail associate for trendy clothing store. Help customers, organize merchandise, process sales. Start immediately!', 'Customer service skills, flexible availability', 'Employee discount, flexible hours', false),
('Security Guard', 'SecureMax', 'Queens', 'security', '$17-20/hr', 'Overnight security guard for commercial building. Set your own schedule with our flexible shifts. Training provided.', 'Clean background, reliable', 'Health insurance, paid training, advancement opportunities', true);