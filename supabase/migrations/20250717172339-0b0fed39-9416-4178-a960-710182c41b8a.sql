-- Create sms_attributions table for tracking conversions
CREATE TABLE public.sms_attributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  message_id UUID REFERENCES public.sms_blast_logs(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('signup', 'apply', 'paid')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  converted_url TEXT,
  value FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sms_attributions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert sms attributions" 
ON public.sms_attributions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view sms attributions" 
ON public.sms_attributions 
FOR SELECT 
USING (true);

-- Add indexes for performance
CREATE INDEX idx_sms_attributions_phone_number ON public.sms_attributions(phone_number);
CREATE INDEX idx_sms_attributions_message_id ON public.sms_attributions(message_id);
CREATE INDEX idx_sms_attributions_event_type ON public.sms_attributions(event_type);
CREATE INDEX idx_sms_attributions_timestamp ON public.sms_attributions(timestamp DESC);

-- Add A/B testing fields to sms_blast_logs
ALTER TABLE public.sms_blast_logs 
ADD COLUMN variant_label TEXT,
ADD COLUMN ab_test_id UUID,
ADD COLUMN is_ab_test BOOLEAN DEFAULT false;

-- Create indexes for A/B testing
CREATE INDEX idx_sms_blast_logs_ab_test_id ON public.sms_blast_logs(ab_test_id);
CREATE INDEX idx_sms_blast_logs_variant_label ON public.sms_blast_logs(variant_label);