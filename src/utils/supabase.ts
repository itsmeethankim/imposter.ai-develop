import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

const supabaseUrl = projectId ? `https://${projectId}.supabase.co` : '';
const supabaseAnonKey = publicAnonKey || '';

// Singleton instance - use this everywhere to avoid multiple client warnings
let supabaseInstance: SupabaseClient | null = null;

// Function to get the singleton Supabase client
export const createClient = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// Export singleton instance for backward compatibility
export const supabase = createClient();

// Generate a unique user ID for anonymous users
export const getUserId = (): string => {
  let userId = localStorage.getItem('anonymousUserId');
  if (!userId) {
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('anonymousUserId', userId);
  }
  return userId;
};

// Get or create username
export const getUsername = (): string => {
  let username = localStorage.getItem('username');
  if (!username) {
    // Generate a fun random username
    const adjectives = ['Cool', 'Epic', 'Sneaky', 'Swift', 'Clever', 'Bold', 'Wild', 'Cosmic', 'Mystery', 'Shadow'];
    const nouns = ['Fox', 'Wolf', 'Dragon', 'Eagle', 'Tiger', 'Phoenix', 'Ninja', 'Wizard', 'Hunter', 'Knight'];
    username = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 999)}`;
    localStorage.setItem('username', username);
  }
  return username;
};

export const setUsername = (name: string) => {
  localStorage.setItem('username', name);
};

// Set user context for RLS policies
export const setUserContext = async () => {
  const userId = getUserId();
  await supabase.rpc('set_config', {
    name: 'app.user_id',
    value: userId
  });
};

export interface CommunityCategory {
  id: string;
  name: string;
  words: string[];
  creator_id: string;
  creator_name: string | null;
  is_public: boolean;
  likes_count: number;
  created_at: string;
  updated_at: string;
  user_has_liked?: boolean;
}

// Fetch public community categories
export const fetchCommunityCategories = async (limit = 50): Promise<CommunityCategory[]> => {
  try {
    const userId = getUserId();
    
    const { data, error } = await supabase
      .from('community_categories')
      .select('*')
      .eq('is_public', true)
      .order('likes_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      // If tables don't exist yet, return empty array silently
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        console.log('ℹ️ Community categories tables not yet set up. Please run the SQL schema.');
        return [];
      }
      console.error('Error fetching community categories:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Check which categories the user has liked
    const categoryIds = data.map(cat => cat.id);
    const { data: likes } = await supabase
      .from('category_likes')
      .select('category_id')
      .eq('user_id', userId)
      .in('category_id', categoryIds);

    const likedIds = new Set(likes?.map(like => like.category_id) || []);

    return data.map(cat => ({
      ...cat,
      user_has_liked: likedIds.has(cat.id)
    }));
  } catch (error) {
    console.error('Unexpected error fetching community categories:', error);
    return [];
  }
};

// Fetch user's own categories
export const fetchMyCategories = async (): Promise<CommunityCategory[]> => {
  try {
    const userId = getUserId();
    
    const { data, error } = await supabase
      .from('community_categories')
      .select('*')
      .eq('creator_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      // If tables don't exist yet, return empty array silently
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        console.log('ℹ️ Community categories tables not yet set up. Please run the SQL schema.');
        return [];
      }
      console.error('Error fetching my categories:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map(cat => ({
      ...cat,
      user_has_liked: false // User can't like their own categories
    }));
  } catch (error) {
    console.error('Unexpected error fetching my categories:', error);
    return [];
  }
};

// Create a new community category
export const createCommunityCategory = async (
  name: string,
  words: string[],
  isPublic: boolean
): Promise<{ success: boolean; category?: CommunityCategory; error?: string }> => {
  try {
    const userId = getUserId();
    const username = getUsername();

    await setUserContext();

    const { data, error } = await supabase
      .from('community_categories')
      .insert([
        {
          name,
          words,
          creator_id: userId,
          creator_name: username,
          is_public: isPublic,
          likes_count: 0
        }
      ])
      .select()
      .single();

    if (error) {
      // If tables don't exist, show helpful message
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        return { 
          success: false, 
          error: 'Database not set up. Please run the SQL schema in your Supabase project.' 
        };
      }
      console.error('Error creating category:', error);
      return { success: false, error: error.message };
    }

    return { success: true, category: data };
  } catch (error) {
    console.error('Unexpected error creating category:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Update a community category
export const updateCommunityCategory = async (
  categoryId: string,
  name: string,
  words: string[],
  isPublic: boolean
): Promise<{ success: boolean; error?: string }> => {
  try {
    await setUserContext();

    const { error } = await supabase
      .from('community_categories')
      .update({
        name,
        words,
        is_public: isPublic,
        updated_at: new Date().toISOString()
      })
      .eq('id', categoryId);

    if (error) {
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        return { 
          success: false, 
          error: 'Database not set up. Please run the SQL schema in your Supabase project.' 
        };
      }
      console.error('Error updating category:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating category:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Delete a community category
export const deleteCommunityCategory = async (categoryId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await setUserContext();

    const { error } = await supabase
      .from('community_categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        return { 
          success: false, 
          error: 'Database not set up. Please run the SQL schema in your Supabase project.' 
        };
      }
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error deleting category:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Like a category
export const likeCategory = async (categoryId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const userId = getUserId();
    await setUserContext();

    const { error } = await supabase
      .from('category_likes')
      .insert([
        {
          category_id: categoryId,
          user_id: userId
        }
      ]);

    if (error) {
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        return { 
          success: false, 
          error: 'Database not set up. Please run the SQL schema in your Supabase project.' 
        };
      }
      console.error('Error liking category:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error liking category:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Unlike a category
export const unlikeCategory = async (categoryId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const userId = getUserId();
    await setUserContext();

    const { error } = await supabase
      .from('category_likes')
      .delete()
      .eq('category_id', categoryId)
      .eq('user_id', userId);

    if (error) {
      if (error.code === 'PGRST205' || error.code === 'PGRST116') {
        return { 
          success: false, 
          error: 'Database not set up. Please run the SQL schema in your Supabase project.' 
        };
      }
      console.error('Error unliking category:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error unliking category:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Toggle like on a category
export const toggleLike = async (categoryId: string, currentlyLiked: boolean): Promise<{ success: boolean; error?: string }> => {
  if (currentlyLiked) {
    return unlikeCategory(categoryId);
  } else {
    return likeCategory(categoryId);
  }
};