-- Add ref_code column to applications table for referral tracking
ALTER TABLE public.applications 
ADD COLUMN ref_code TEXT,
ADD COLUMN utm_ref TEXT;