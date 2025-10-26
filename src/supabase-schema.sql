-- Community Categories Table
CREATE TABLE IF NOT EXISTS community_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  words TEXT[] NOT NULL,
  creator_id TEXT NOT NULL,
  creator_name TEXT,
  is_public BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Category Likes Table (to track who liked what)
CREATE TABLE IF NOT EXISTS category_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES community_categories(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(category_id, user_id)
);

-- Helper function for setting user context (used by RLS policies)
CREATE OR REPLACE FUNCTION set_config(name text, value text)
RETURNS text AS $$
BEGIN
  PERFORM set_config(name, value, false);
  RETURN value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_community_categories_public ON community_categories(is_public);
CREATE INDEX IF NOT EXISTS idx_community_categories_likes ON community_categories(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_community_categories_creator ON community_categories(creator_id);
CREATE INDEX IF NOT EXISTS idx_category_likes_user ON category_likes(user_id);

-- Enable Row Level Security
ALTER TABLE community_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_likes ENABLE ROW LEVEL SECURITY;

-- Policies for community_categories
-- Anyone can read public categories
CREATE POLICY "Public categories are viewable by everyone" 
  ON community_categories FOR SELECT 
  USING (is_public = true);

-- Users can read their own categories (public or private)
CREATE POLICY "Users can view own categories" 
  ON community_categories FOR SELECT 
  USING (creator_id = current_setting('app.user_id', true));

-- Users can insert their own categories
CREATE POLICY "Users can create categories" 
  ON community_categories FOR INSERT 
  WITH CHECK (creator_id = current_setting('app.user_id', true));

-- Users can update their own categories
CREATE POLICY "Users can update own categories" 
  ON community_categories FOR UPDATE 
  USING (creator_id = current_setting('app.user_id', true));

-- Users can delete their own categories
CREATE POLICY "Users can delete own categories" 
  ON community_categories FOR DELETE 
  USING (creator_id = current_setting('app.user_id', true));

-- Policies for category_likes
-- Anyone can view likes
CREATE POLICY "Anyone can view likes" 
  ON category_likes FOR SELECT 
  USING (true);

-- Users can like categories
CREATE POLICY "Users can like categories" 
  ON category_likes FOR INSERT 
  WITH CHECK (user_id = current_setting('app.user_id', true));

-- Users can unlike categories
CREATE POLICY "Users can unlike categories" 
  ON category_likes FOR DELETE 
  USING (user_id = current_setting('app.user_id', true));

-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_category_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE community_categories 
  SET likes_count = likes_count + 1,
      updated_at = timezone('utc'::text, now())
  WHERE id = NEW.category_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_category_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE community_categories 
  SET likes_count = GREATEST(0, likes_count - 1),
      updated_at = timezone('utc'::text, now())
  WHERE id = OLD.category_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic likes count updates
DROP TRIGGER IF EXISTS trigger_increment_likes ON category_likes;
CREATE TRIGGER trigger_increment_likes
  AFTER INSERT ON category_likes
  FOR EACH ROW
  EXECUTE FUNCTION increment_category_likes();

DROP TRIGGER IF EXISTS trigger_decrement_likes ON category_likes;
CREATE TRIGGER trigger_decrement_likes
  AFTER DELETE ON category_likes
  FOR EACH ROW
  EXECUTE FUNCTION decrement_category_likes();