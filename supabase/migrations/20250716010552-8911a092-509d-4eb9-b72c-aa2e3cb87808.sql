-- Create storage policies for resume uploads (in case they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can upload their own resumes') THEN
    CREATE POLICY "Users can upload their own resumes" 
    ON storage.objects 
    FOR INSERT 
    WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can view their own resumes') THEN
    CREATE POLICY "Users can view their own resumes" 
    ON storage.objects 
    FOR SELECT 
    USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
END $$;

-- Update applications table to match our needs
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS why_you TEXT,
ADD COLUMN IF NOT EXISTS role TEXT,
ADD COLUMN IF NOT EXISTS user_input TEXT,
ADD COLUMN IF NOT EXISTS resume_url TEXT,
ADD COLUMN IF NOT EXISTS referral_code TEXT;