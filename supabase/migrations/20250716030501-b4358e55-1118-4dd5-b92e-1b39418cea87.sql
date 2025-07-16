-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the daily post generation for 4:30 AM ET (9:30 AM UTC)
SELECT cron.schedule(
  'daily-craigslist-post-generation',
  '30 9 * * *', -- 4:30 AM ET = 9:30 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://elzzyqamcuqheykafauc.supabase.co/functions/v1/generate-daily-craigslist-post',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsenp5cWFtY3VxaGV5a2FmYXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzczNTQsImV4cCI6MjA2NjkxMzM1NH0.WGTjhApsD31jFNE41o4FlBw6KOT1gre-rx_0IrxXVuc"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);