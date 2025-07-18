-- Add media storage support for video/audio uploads
ALTER TABLE applications ADD COLUMN IF NOT EXISTS media_url TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS media_type TEXT CHECK (media_type IN ('video', 'audio'));