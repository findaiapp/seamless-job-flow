-- Add RLS policies for user_alerts
CREATE POLICY "Users can view their own alerts" 
ON public.user_alerts FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own alerts" 
ON public.user_alerts FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own alerts" 
ON public.user_alerts FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own alerts" 
ON public.user_alerts FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- Add RLS policies for user_activity
CREATE POLICY "Users can view their own activity" 
ON public.user_activity FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own activity" 
ON public.user_activity FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Add RLS policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
ON public.user_preferences FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own preferences" 
ON public.user_preferences FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own preferences" 
ON public.user_preferences FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_alerts_user_id ON public.user_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_job_id ON public.user_activity(job_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);