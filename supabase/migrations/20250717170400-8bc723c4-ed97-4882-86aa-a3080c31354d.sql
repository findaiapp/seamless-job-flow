-- Create alert_optins table for job alert signups
CREATE TABLE public.alert_optins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  city TEXT NOT NULL,
  job_type TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  email TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  utm_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sms_blast_logs table for tracking SMS campaigns
CREATE TABLE public.sms_blast_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  message TEXT NOT NULL,
  city TEXT,
  job_type TEXT,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent',
  click_tracking_url TEXT,
  utm_source TEXT
);

-- Enable Row Level Security
ALTER TABLE public.alert_optins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_blast_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for alert_optins
CREATE POLICY "Anyone can insert alert optins" 
ON public.alert_optins 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view alert optins" 
ON public.alert_optins 
FOR SELECT 
USING (true);

-- Create policies for sms_blast_logs  
CREATE POLICY "Anyone can insert sms blast logs" 
ON public.sms_blast_logs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view sms blast logs" 
ON public.sms_blast_logs 
FOR SELECT 
USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_alert_optins_city ON public.alert_optins(city);
CREATE INDEX idx_alert_optins_job_type ON public.alert_optins(job_type);
CREATE INDEX idx_alert_optins_consent ON public.alert_optins(consent);
CREATE INDEX idx_alert_optins_created_at ON public.alert_optins(created_at);
CREATE INDEX idx_sms_blast_logs_sent_at ON public.sms_blast_logs(sent_at);