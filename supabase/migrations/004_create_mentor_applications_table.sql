-- Create mentor_applications table
CREATE TABLE IF NOT EXISTS mentor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program TEXT,
  year_of_study INTEGER,
  company TEXT,
  role TEXT,
  experience_years INTEGER,
  bio TEXT,
  availability TEXT,
  preferred_communication TEXT,
  additional_info TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE mentor_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own application
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mentor_applications' 
    AND policyname = 'Users can view own mentor application'
  ) THEN
    CREATE POLICY "Users can view own mentor application"
      ON mentor_applications FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Users can insert their own application
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mentor_applications' 
    AND policyname = 'Users can insert own mentor application'
  ) THEN
    CREATE POLICY "Users can insert own mentor application"
      ON mentor_applications FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Users can update their own application
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mentor_applications' 
    AND policyname = 'Users can update own mentor application'
  ) THEN
    CREATE POLICY "Users can update own mentor application"
      ON mentor_applications FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create updated_at trigger
CREATE TRIGGER update_mentor_applications_updated_at
  BEFORE UPDATE ON mentor_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
