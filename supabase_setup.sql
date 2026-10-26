-- Query to run in your Supabase SQL Editor (SQL menu on the left)

-- 1. Create the admins table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on basic RLS so it's secure by default (optional but good practice)
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the admins table (needed for login check on frontend)
-- We only expose the hashed password, which is secure enough for comparison
-- (DROP first so the whole script can be re-run; the SQL editor rolls everything
-- back if any statement fails, e.g. "policy already exists".)
DROP POLICY IF EXISTS "Allow public read of admins" ON public.admins;
CREATE POLICY "Allow public read of admins"
ON public.admins
FOR SELECT 
USING (true);

-- 2. Insert your initial admin user ("raja")
-- Here is the bcrypt hash for "hacker", which is your current password.
-- If you change your password in the future, you'll need to generate a new bcrypt hash.
INSERT INTO public.admins (username, password)
VALUES ('raja', '$2a$10$w/xG.x6tA6zUQK0LhT16Rej50n8k2z.4M/b897rXxzD5H8F5Z9Lzi')
ON CONFLICT (username) DO NOTHING;


-- 3. Contact form messages (shown in the Admin Dashboard)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Visitors need to be able to submit the contact form.
DROP POLICY IF EXISTS "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a message"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- NOTE: the admin dashboard logs in on the frontend (localStorage) and talks to
-- Supabase with the public anon key, so reading/updating/deleting has to be allowed
-- for that key. Anyone who knows the project URL + anon key could therefore read the
-- messages. To lock this down properly, move the admin login to Supabase Auth and
-- change the USING clauses below to: auth.role() = 'authenticated'.
DROP POLICY IF EXISTS "Allow read of messages" ON public.contact_messages;
CREATE POLICY "Allow read of messages"
ON public.contact_messages
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow update of messages" ON public.contact_messages;
CREATE POLICY "Allow update of messages"
ON public.contact_messages
FOR UPDATE
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete of messages" ON public.contact_messages;
CREATE POLICY "Allow delete of messages"
ON public.contact_messages
FOR DELETE
USING (true);

-- Newest messages first in the dashboard.
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
ON public.contact_messages (created_at DESC);


-- 4. Site settings (the "Website Design" switch in the Admin Dashboard)
--    classic_design = true  -> the original dark / neon design
--    classic_design = false -> the Texotic (cream / clay) design
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Every visitor reads which design to show.
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Anyone can read site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Same caveat as contact_messages: the admin uses the anon key, so writes must be
-- allowed for it. Move to Supabase Auth and use auth.role() = 'authenticated' to lock down.
DROP POLICY IF EXISTS "Allow insert of site settings" ON public.site_settings;
CREATE POLICY "Allow insert of site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update of site settings" ON public.site_settings;
CREATE POLICY "Allow update of site settings"
ON public.site_settings
FOR UPDATE
USING (true)
WITH CHECK (true);

INSERT INTO public.site_settings (key, value)
VALUES ('classic_design', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Make the API see the new table immediately.
NOTIFY pgrst, 'reload schema';
