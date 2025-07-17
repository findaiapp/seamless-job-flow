-- Create sms_clicks table for tracking SMS link clicks
CREATE TABLE public.sms_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  message_id UUID REFERENCES public.sms_blast_logs(id),
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  utm_source TEXT DEFAULT 'sms-blast',
  utm_campaign TEXT,
  redirect_url TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- Add campaign and redirect URL fields to sms_blast_logs
ALTER TABLE public.sms_blast_logs 
ADD COLUMN utm_campaign TEXT,
ADD COLUMN redirect_url TEXT,
ADD COLUMN click_id TEXT UNIQUE;

-- Enable Row Level Security
ALTER TABLE public.sms_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for sms_clicks
CREATE POLICY "Anyone can insert sms clicks" 
ON public.sms_clicks 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view sms clicks" 
ON public.sms_clicks 
FOR SELECT 
USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_sms_clicks_phone_number ON public.sms_clicks(phone_number);
CREATE INDEX idx_sms_clicks_message_id ON public.sms_clicks(message_id);
CREATE INDEX idx_sms_clicks_clicked_at ON public.sms_clicks(clicked_at);
CREATE INDEX idx_sms_blast_logs_click_id ON public.sms_blast_logs(click_id);