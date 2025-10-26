# 🌐 Community Categories Feature

## Overview

The community categories feature allows players to:
- ✨ Create custom categories and share them with the world
- ❤️ Like/unlike categories created by others
- 📊 Browse categories sorted by popularity or recency
- 👤 Set a custom username for attribution
- 🔒 Choose to keep categories private or make them public

## How It Works

### For Players Creating Categories

1. **Create a Category**
   - Tap "Create" in the Custom Categories section
   - Choose Manual Input or AI Generate
   - Enter a category name and words
   - Toggle "Share with community" ON to make it public
   - Tap "Save Category"

2. **Your Category is Published**
   - If you enabled "Share with community", your category is instantly published
   - Other players worldwide can now discover and use it
   - Your username is attached (auto-generated or custom)

3. **Edit Your Categories**
   - Tap the pencil icon on any of your categories
   - Make changes to the name or word list
   - Note: Editing only affects your local version, not the published community version

### For Players Browsing Categories

1. **Access Community Library**
   - Tap "Explore Community Library" button on the category selector

2. **Browse & Filter**
   - **Most Liked**: See the highest-rated categories first
   - **Recent**: See the newest categories

3. **Like Categories**
   - Tap the heart button to like a category
   - Your likes help promote quality categories
   - Tap again to unlike

4. **Use a Category**
   - Tap anywhere on the category card (except the heart)
   - The category is selected for your game
   - Play with community-created content!

5. **Set Your Username**
   - In the Community Library, tap "Change" next to your username
   - Enter a new name and press Enter
   - This name will appear on any categories you publish

## Technical Details

### Anonymous User System

- **No account required**: Players don't need to sign up
- **Persistent ID**: Each device gets a unique anonymous ID stored in localStorage
- **Username**: Auto-generated fun names (e.g., "SwiftDragon42") that can be customized
- **Privacy**: Only username and category data is shared, no personal info

### Database Structure

**community_categories table:**
```
id              UUID (unique identifier)
name            TEXT (category name)
words           TEXT[] (array of words)
creator_id      TEXT (anonymous user ID)
creator_name    TEXT (display name)
is_public       BOOLEAN (visibility)
likes_count     INTEGER (auto-counted)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**category_likes table:**
```
id              UUID
category_id     UUID (references category)
user_id         TEXT (anonymous user ID)
created_at      TIMESTAMP
```

### Security (Row Level Security)

The database is secured with RLS policies:

✅ **Anyone can:**
- View public categories
- View like counts
- Like/unlike categories

✅ **Users can only:**
- Edit their own categories
- Delete their own categories
- View their own private categories

❌ **Users cannot:**
- Like the same category twice
- Edit other users' categories
- View other users' private categories
- Manipulate like counts manually

### Auto-Updates

- **Like counts** are automatically incremented/decremented via database triggers
- **Updated timestamps** refresh whenever a category is modified
- **Sorting** happens server-side for performance

## UI Components

### CategorySelector.tsx Updates
- Added "Explore Community Library" button
- Added "Share with community" toggle in creation form
- Integrated publishing logic

### CommunityCategories.tsx (New)
- Full-screen community browser
- Sort by likes or recency
- Username display and editing
- Like/unlike functionality
- Category selection

### supabase.ts Utility
- All Supabase database operations
- Anonymous user management
- Category CRUD operations
- Like/unlike operations

## Setup Required

To enable this feature after downloading the project:

1. **Create Supabase Project** (see SUPABASE_SETUP.md)
2. **Run SQL Schema** (supabase-schema.sql)
3. **Add Environment Variables**:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. **Install Dependencies**: `npm install`
5. **Start Dev Server**: `npm run dev`

## Data Flow

### Creating & Publishing a Category

```
User Input (Category Selector)
    ↓
Local Storage (save locally)
    ↓
[If "Share with community" enabled]
    ↓
Supabase Database (publish)
    ↓
Community Library (visible to all)
```

### Liking a Category

```
User Clicks Heart
    ↓
Optimistic UI Update (instant feedback)
    ↓
Insert into category_likes table
    ↓
Trigger automatically increments likes_count
    ↓
[If error] Revert UI change
```

### Browsing Categories

```
Open Community Library
    ↓
Fetch from Supabase (with user's like status)
    ↓
Sort by likes_count or created_at
    ↓
Display with heart button states
```

## Offline Behavior

- **Creating categories**: Works offline, stored locally
- **Publishing**: Requires internet, queued for when online
- **Browsing community**: Requires internet
- **Liking**: Requires internet

## Future Enhancements

Potential features to add:

- 📱 **Push notifications** when your category gets liked
- 🏆 **Leaderboards** for top category creators
- 🔍 **Search & filtering** by category name or words
- 🏷️ **Tags & categories** (e.g., "Anime", "Sports", "Gaming")
- 💬 **Comments** on categories
- 🚩 **Report system** for inappropriate content
- 👥 **User profiles** with all their published categories
- ⭐ **Featured categories** curated by admins
- 📊 **Usage stats** (how many times a category was played)
- 🔄 **Sync across devices** with optional accounts

## Moderation

Currently, the system relies on community voting (likes). Consider adding:

- **Profanity filter** for category names and words
- **Report button** for inappropriate content
- **Admin dashboard** to review flagged categories
- **Auto-hide** categories with negative feedback

## Performance Considerations

- **Pagination**: Currently fetches 50 categories, can add "Load More"
- **Caching**: Could cache community categories locally with refresh
- **Indexes**: Database has indexes on `is_public`, `likes_count`, and `creator_id`
- **Real-time**: Could add Supabase Realtime for live like updates

## Testing Checklist

- [ ] Create a category without "Share with community"
- [ ] Create a category with "Share with community"
- [ ] Browse community library
- [ ] Sort by "Most Liked"
- [ ] Sort by "Recent"
- [ ] Like a category
- [ ] Unlike a category
- [ ] Select a community category for a game
- [ ] Change username
- [ ] Edit a local category
- [ ] Delete a local category
- [ ] Verify RLS policies (try accessing other users' private categories)
- [ ] Test offline behavior
- [ ] Check database triggers (like counts update automatically)

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify Supabase environment variables
3. Check Supabase dashboard logs
4. Ensure SQL schema ran successfully
5. Verify RLS policies are enabled

Happy gaming! 🎮✨
