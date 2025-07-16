-- Create user_alerts table for job alert preferences
CREATE TABLE IF NOT EXISTS public.user_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  pay_min INTEGER NOT NULL DEFAULT 15,
  pay_max INTEGER NOT NULL DEFAULT 50,
  frequency TEXT NOT NULL DEFAULT 'daily',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_activity table for tracking user behavior
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  job_title TEXT,
  job_category TEXT,
  job_type TEXT,
  pay_range TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_preferences table for notification settings
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  job_alerts_enabled BOOLEAN NOT NULL DEFAULT true,
  preferred_channel TEXT NOT NULL DEFAULT 'email',
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;