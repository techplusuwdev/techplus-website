-- Add form columns to mentor_applications (so submitted data is stored)
ALTER TABLE mentor_applications
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS pronouns JSONB,
  ADD COLUMN IF NOT EXISTS study_term TEXT,
  ADD COLUMN IF NOT EXISTS academic_program TEXT,
  ADD COLUMN IF NOT EXISTS how_did_you_hear TEXT,
  ADD COLUMN IF NOT EXISTS commitment TEXT,
  ADD COLUMN IF NOT EXISTS interested_in_events TEXT,
  ADD COLUMN IF NOT EXISTS timezone TEXT,
  ADD COLUMN IF NOT EXISTS in_waterloo TEXT,
  ADD COLUMN IF NOT EXISTS is_international TEXT,
  ADD COLUMN IF NOT EXISTS mentees_count TEXT,
  ADD COLUMN IF NOT EXISTS was_mentee TEXT,
  ADD COLUMN IF NOT EXISTS is_returning TEXT;

-- Add form columns to mentee_applications (so submitted data is stored)
ALTER TABLE mentee_applications
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS pronouns JSONB,
  ADD COLUMN IF NOT EXISTS study_term TEXT,
  ADD COLUMN IF NOT EXISTS academic_program TEXT,
  ADD COLUMN IF NOT EXISTS how_did_you_hear TEXT,
  ADD COLUMN IF NOT EXISTS commitment TEXT,
  ADD COLUMN IF NOT EXISTS interested_in_events TEXT,
  ADD COLUMN IF NOT EXISTS timezone TEXT,
  ADD COLUMN IF NOT EXISTS in_waterloo TEXT,
  ADD COLUMN IF NOT EXISTS is_international TEXT,
  ADD COLUMN IF NOT EXISTS mentees_count TEXT,
  ADD COLUMN IF NOT EXISTS was_mentee TEXT,
  ADD COLUMN IF NOT EXISTS is_returning TEXT;
