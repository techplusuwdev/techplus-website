-- Add missing Page 2 & 3 columns to mentor_applications
ALTER TABLE mentor_applications
  ADD COLUMN IF NOT EXISTS race_ethnic_origin TEXT,
  ADD COLUMN IF NOT EXISTS gender TEXT,
  ADD COLUMN IF NOT EXISTS sexual_orientation TEXT,
  ADD COLUMN IF NOT EXISTS is_indigenous TEXT,
  ADD COLUMN IF NOT EXISTS contact_methods JSONB,
  ADD COLUMN IF NOT EXISTS ask_me_about TEXT,
  ADD COLUMN IF NOT EXISTS freetime_interests TEXT,
  ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Add missing Page 2 & 3 columns to mentee_applications
ALTER TABLE mentee_applications
  ADD COLUMN IF NOT EXISTS mentorship_goals TEXT,
  ADD COLUMN IF NOT EXISTS dei_agreement TEXT,
  ADD COLUMN IF NOT EXISTS portfolio_link TEXT,
  ADD COLUMN IF NOT EXISTS contact_methods JSONB,
  ADD COLUMN IF NOT EXISTS ask_me_about TEXT,
  ADD COLUMN IF NOT EXISTS freetime_interests TEXT,
  ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Create profile-pictures storage bucket (public so images are viewable)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to their own folder
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
    AND schemaname = 'storage'
    AND policyname = 'Authenticated users can upload profile pictures'
  ) THEN
    CREATE POLICY "Authenticated users can upload profile pictures"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'profile-pictures'
        AND (storage.foldername(name))[1] = auth.uid()::text
      );
  END IF;
END $$;

-- Allow authenticated users to update their own picture
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
    AND schemaname = 'storage'
    AND policyname = 'Users can update own profile picture'
  ) THEN
    CREATE POLICY "Users can update own profile picture"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (
        bucket_id = 'profile-pictures'
        AND (storage.foldername(name))[1] = auth.uid()::text
      );
  END IF;
END $$;

-- Allow public read access to profile pictures
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
    AND schemaname = 'storage'
    AND policyname = 'Anyone can view profile pictures'
  ) THEN
    CREATE POLICY "Anyone can view profile pictures"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'profile-pictures');
  END IF;
END $$;
