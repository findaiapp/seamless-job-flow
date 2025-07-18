-- Create a test job for the Test Application Flow button with proper UUID
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
  gen_random_uuid(),
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
)
RETURNING id;