-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  event_type TEXT CHECK (event_type IN ('workshop', 'social', 'mentorship', 'coffee_chat', 'other')),
  registration_required BOOLEAN DEFAULT false,
  registration_link TEXT,
  max_attendees INTEGER,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Everyone can view events
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'events' 
    AND policyname = 'Anyone can view events'
  ) THEN
    CREATE POLICY "Anyone can view events"
      ON events FOR SELECT
      USING (true);
  END IF;
END $$;

-- Only authenticated users can create events (admins in future)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'events' 
    AND policyname = 'Authenticated users can create events'
  ) THEN
    CREATE POLICY "Authenticated users can create events"
      ON events FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- Only event creators or admins can update events
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'events' 
    AND policyname = 'Event creators can update events'
  ) THEN
    CREATE POLICY "Event creators can update events"
      ON events FOR UPDATE
      USING (auth.uid() = created_by);
  END IF;
END $$;

-- Only event creators or admins can delete events
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'events' 
    AND policyname = 'Event creators can delete events'
  ) THEN
    CREATE POLICY "Event creators can delete events"
      ON events FOR DELETE
      USING (auth.uid() = created_by);
  END IF;
END $$;

-- Create updated_at trigger
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index on start_time for faster queries
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
