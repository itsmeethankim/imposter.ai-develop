-- ============================================
-- SECURITY SCHEMA FOR SOCIAL DEDUCTION GAME
-- ============================================
-- This file contains all database security configurations
-- including Row Level Security (RLS) policies

-- Note: The kv_store_be273801 table is already created by the system
-- We're just adding security policies to it

-- ============================================
-- 1. ENABLE ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on the key-value store table
ALTER TABLE kv_store_be273801 ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Allow server (service role) to do everything
-- This is needed for the backend to manage data
CREATE POLICY "Service role can do everything on kv_store"
ON kv_store_be273801
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow authenticated users to read their own data
-- Keys that start with 'user:{user_id}:' belong to that user
CREATE POLICY "Users can read own data"
ON kv_store_be273801
FOR SELECT
TO authenticated
USING (
  key LIKE 'user:' || auth.uid()::text || ':%'
);

-- Allow authenticated users to write their own data
CREATE POLICY "Users can write own data"
ON kv_store_be273801
FOR INSERT
TO authenticated
WITH CHECK (
  key LIKE 'user:' || auth.uid()::text || ':%'
);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own data"
ON kv_store_be273801
FOR UPDATE
TO authenticated
USING (
  key LIKE 'user:' || auth.uid()::text || ':%'
)
WITH CHECK (
  key LIKE 'user:' || auth.uid()::text || ':%'
);

-- Allow authenticated users to delete their own data
CREATE POLICY "Users can delete own data"
ON kv_store_be273801
FOR DELETE
TO authenticated
USING (
  key LIKE 'user:' || auth.uid()::text || ':%'
);

-- Allow anyone to read published community categories
CREATE POLICY "Anyone can read approved categories"
ON kv_store_be273801
FOR SELECT
TO anon, authenticated
USING (
  key LIKE 'category:%' 
  AND (value->>'status')::text = 'approved'
);

-- ============================================
-- 3. HELPER FUNCTIONS
-- ============================================

-- Function to check if a user is premium
CREATE OR REPLACE FUNCTION is_premium_user(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  sub_status text;
BEGIN
  SELECT value->>'status'
  INTO sub_status
  FROM kv_store_be273801
  WHERE key = 'user:' || user_id::text || ':subscription';
  
  RETURN sub_status = 'premium';
END;
$$;

-- Function to get user's games played count
CREATE OR REPLACE FUNCTION get_games_played(user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  games_count integer;
BEGIN
  SELECT (value->>'gamesPlayed')::integer
  INTO games_count
  FROM kv_store_be273801
  WHERE key = 'user:' || user_id::text || ':subscription';
  
  RETURN COALESCE(games_count, 0);
END;
$$;

-- ============================================
-- 4. INDEXES FOR PERFORMANCE
-- ============================================

-- Index for user data lookups
CREATE INDEX IF NOT EXISTS idx_kv_user_keys 
ON kv_store_be273801(key) 
WHERE key LIKE 'user:%';

-- Index for category lookups
CREATE INDEX IF NOT EXISTS idx_kv_category_keys 
ON kv_store_be273801(key) 
WHERE key LIKE 'category:%';

-- Index for approved categories (most common query)
CREATE INDEX IF NOT EXISTS idx_kv_approved_categories 
ON kv_store_be273801(key, (value->>'status')) 
WHERE key LIKE 'category:%' AND (value->>'status')::text = 'approved';

-- ============================================
-- 5. GRANT PERMISSIONS
-- ============================================

-- Grant usage on helper functions to authenticated users
GRANT EXECUTE ON FUNCTION is_premium_user(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION get_games_played(uuid) TO authenticated;

-- ============================================
-- SETUP COMPLETE
-- ============================================

-- To apply these policies, run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new

-- After running this:
-- 1. All user data is protected by RLS
-- 2. Users can only access their own data
-- 3. Community categories are properly filtered
-- 4. The backend (service role) can manage everything
-- 5. Performance is optimized with indexes

COMMENT ON POLICY "Service role can do everything on kv_store" 
ON kv_store_be273801 
IS 'Allows backend to manage all data';

COMMENT ON POLICY "Users can read own data" 
ON kv_store_be273801 
IS 'Users can only read their own user: prefixed data';

COMMENT ON POLICY "Anyone can read approved categories" 
ON kv_store_be273801 
IS 'Public access to approved community categories';
