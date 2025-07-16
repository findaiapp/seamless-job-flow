-- Make user_id nullable in applications table to allow anonymous submissions
ALTER TABLE public.applications 
ALTER COLUMN user_id DROP NOT NULL;

-- Also make seeker_id nullable for consistency
ALTER TABLE public.applications 
ALTER COLUMN seeker_id DROP NOT NULL;