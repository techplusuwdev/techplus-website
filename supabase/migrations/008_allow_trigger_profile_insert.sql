-- Fix "Database error saving new user": the handle_new_user trigger runs when Auth
-- inserts into auth.users, but RLS on profiles only allows INSERT when auth.uid() = id.
-- During signup, auth.uid() is not yet set, so the trigger's insert is denied.
-- This policy allows the trigger (running as postgres or supabase_auth_admin) to insert.

CREATE POLICY "Allow trigger to create profile on signup"
  ON profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
    OR current_user = 'postgres'
    OR current_user = 'supabase_auth_admin'
  );
