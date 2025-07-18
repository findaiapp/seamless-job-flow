-- Create a test job for the Test Application Flow button
INSERT INTO public.jobs (
  id,
  title,
  company,
  location,
  pay_range,
  description,
  job_type,
  employer_name,
  is_approved,
  is_verified,
  status,
  created_at,
  posted_at
) VALUES (
  'test-apply-job',
  'Test Delivery Driver',
  'Test Company Inc',
  'Brooklyn, NY',
  '$17-22/hr',
  'This is a sample job for testing the 5-step application flow. Perfect for testing our application system.',
  'delivery',
  'Test Company Inc',
  true,
  true,
  'active',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  company = EXCLUDED.company,
  location = EXCLUDED.location,
  pay_range = EXCLUDED.pay_range,
  description = EXCLUDED.description,
  updated_at = now();