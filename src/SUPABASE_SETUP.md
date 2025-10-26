# Supabase Community Categories Setup

This guide will help you set up Supabase for the community-created categories feature.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project name**: imposter-game (or any name)
   - **Database password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project" and wait for setup to complete

## 2. Set Up Database Tables

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the entire contents of `/supabase-schema.sql` into the editor
4. Click "Run" to execute the SQL
5. You should see success messages for all tables and functions

## 3. Get Your API Keys

1. In your Supabase dashboard, click on "Settings" (gear icon)
2. Click "API" in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://abcdefghijk.supabase.co`
   - **anon public key**: A long JWT token starting with `eyJ...`

## 4. Add Environment Variables

### For Local Development (when you download the project):

1. Create a `.env` file in your project root
2. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Important Notes:

- **Never commit your `.env` file to version control**
- The `anon` key is safe to use in client-side code (it's public)
- Make sure your `.gitignore` includes `.env`

## 5. Enable Anonymous Users (Optional)

The app uses anonymous user IDs stored in localStorage, so you don't need to set up authentication. However, you can enable email auth if you want users to have persistent accounts:

1. Go to "Authentication" > "Providers"
2. Enable "Email" provider
3. Configure email templates as needed

## 6. Verify Setup

Once you have the environment variables set:

1. Start your development server
2. Go to the Category Selector
3. Create a new category and toggle "Share with community"
4. Click "Explore Community Library"
5. You should see your category appear!

## 7. Database Tables Overview

### `community_categories`
Stores all community-created categories:
- `id`: Unique identifier (UUID)
- `name`: Category name
- `words`: Array of words in the category
- `creator_id`: Anonymous user ID
- `creator_name`: Display name (auto-generated or custom)
- `is_public`: Whether the category is visible to others
- `likes_count`: Number of likes (auto-updated)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### `category_likes`
Tracks which users liked which categories:
- `id`: Unique identifier
- `category_id`: Reference to category
- `user_id`: Anonymous user ID
- `created_at`: Timestamp

## 8. Security (Row Level Security)

The database uses RLS policies to ensure:
- ✅ Anyone can view public categories
- ✅ Users can only edit/delete their own categories
- ✅ Users can like/unlike any public category
- ✅ Likes are counted automatically via triggers
- ❌ Users cannot like the same category twice
- ❌ Users cannot modify other users' categories

## 9. Monitoring

### View Your Data:
1. Go to "Table Editor" in Supabase dashboard
2. Select `community_categories` or `category_likes`
3. You can view, search, and manually edit data here

### Check Logs:
1. Go to "Logs" in the sidebar
2. Select "Postgres Logs" to see database queries
3. Useful for debugging issues

## 10. Backup & Export

To backup your database:
1. Go to "Database" > "Backups"
2. Supabase creates automatic daily backups
3. You can also download backups manually

## Troubleshooting

### "Failed to fetch categories"
- Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
- Make sure the SQL schema was executed successfully
- Check browser console for specific errors

### "Permission denied"
- Verify RLS policies are set up correctly
- Check that `set_config` function exists (it's needed for anonymous user context)

### Categories not appearing
- Make sure `is_public` is set to `true`
- Check the category wasn't accidentally filtered out
- Verify the category was created successfully in Table Editor

## Next Steps

Once set up, users can:
- ✨ Create custom categories
- 🌐 Publish them to the community
- ❤️ Like their favorite categories
- 📊 Browse categories sorted by popularity or recency
- 👤 Set custom usernames for attribution

Enjoy building your community category library! 🎮
