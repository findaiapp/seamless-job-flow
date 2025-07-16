-- Create a helper function to insert craigslist posts
CREATE OR REPLACE FUNCTION insert_craigslist_post(
  p_variant text,
  p_title text,
  p_body text,
  p_borough text,
  p_job_type text,
  p_used boolean,
  p_utm_link text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  post_id uuid;
BEGIN
  INSERT INTO public.craigslist_posts (
    variant,
    title,
    body,
    borough,
    job_type,
    used,
    utm_link
  ) VALUES (
    p_variant,
    p_title,
    p_body,
    p_borough,
    p_job_type,
    p_used,
    p_utm_link
  ) RETURNING id INTO post_id;
  
  RETURN post_id;
END;
$$;