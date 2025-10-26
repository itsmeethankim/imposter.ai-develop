# 🌐 Community Categories System - Complete Guide

Welcome to the community categories feature! This system allows players worldwide to create, share, and discover custom game categories.

## 📚 Documentation Index

### Quick Start
- **[COMMUNITY_QUICKSTART.md](./COMMUNITY_QUICKSTART.md)** - Get up and running in 5 minutes

### Setup Guides
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Detailed Supabase configuration
- **[DOWNLOAD_INSTRUCTIONS.md](./DOWNLOAD_INSTRUCTIONS.md)** - How to download the project

### Technical Documentation
- **[COMMUNITY_FEATURE.md](./COMMUNITY_FEATURE.md)** - Complete technical overview
- **[supabase-schema.sql](./supabase-schema.sql)** - Database schema
- **[.env.example](./.env.example)** - Environment variables template

## 🎯 What This Feature Does

### For Players
- ✨ **Create** custom categories with AI or manual input
- 🌍 **Publish** categories to share with the world
- 📖 **Browse** community-created content
- ❤️ **Like** favorite categories
- 🎮 **Use** community categories in games

### For Developers
- 🔐 **Secure** - Row Level Security (RLS) policies
- 🚀 **Fast** - Indexed queries and optimistic updates
- 📊 **Scalable** - Cloud-hosted with Supabase
- 🎨 **Beautiful** - Fully themed UI components

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Imposter Game App                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌─────────────────────────┐  │
│  │ CategorySelector │────────▶│ CommunityCategories     │  │
│  │                  │         │ - Browse library         │  │
│  │ - Create         │         │ - Sort & filter          │  │
│  │ - Edit           │         │ - Like/unlike            │  │
│  │ - Delete         │         │ - Select category        │  │
│  │ - Toggle public  │         └─────────────────────────┘  │
│  └──────────────────┘                    │                  │
│           │                               │                  │
│           ▼                               ▼                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │           utils/supabase.ts                         │    │
│  │  - User management (anonymous)                      │    │
│  │  - CRUD operations                                  │    │
│  │  - Like/unlike logic                                │    │
│  │  - Fetch & sort categories                          │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Supabase Cloud      │
              ├───────────────────────┤
              │                       │
              │  community_categories │
              │  - id, name, words    │
              │  - creator info       │
              │  - likes_count        │
              │  - timestamps         │
              │                       │
              │  category_likes       │
              │  - category_id        │
              │  - user_id            │
              │                       │
              │  RLS Policies         │
              │  Database Triggers    │
              │  Auto-indexing        │
              │                       │
              └───────────────────────┘
```

## 📂 File Structure

```
imposter-game/
├── components/
│   ├── CategorySelector.tsx        # Main category UI (updated)
│   ├── CommunityCategories.tsx     # Community browser (new)
│   └── ...
├── utils/
│   ├── supabase.ts                 # Supabase client & operations (new)
│   └── ...
├── supabase-schema.sql             # Database schema (new)
├── .env.example                    # Environment template (new)
├── SUPABASE_SETUP.md              # Setup guide (new)
├── COMMUNITY_FEATURE.md           # Technical docs (new)
├── COMMUNITY_QUICKSTART.md        # Quick start (new)
└── README_COMMUNITY.md            # This file (new)
```

## 🔑 Key Features

### 1. Anonymous User System
- No signup required
- Unique ID per device
- Customizable username
- Privacy-first approach

### 2. Public/Private Categories
- Toggle when creating
- Private = local device only
- Public = shared worldwide
- Edit anytime

### 3. Like System
- Heart button on each category
- Auto-counted in database
- Sort by popularity
- One like per user per category

### 4. Smart Sorting
- Most Liked (default)
- Recent additions
- Server-side sorting
- Fast queries with indexes

### 5. Real-time UI
- Optimistic updates
- Instant feedback
- Error recovery
- Smooth animations

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Anonymous (localStorage)
- **Icons**: Lucide React
- **Build**: Vite
- **Mobile**: Capacitor (iOS)

## 🔒 Security Features

### Database (Row Level Security)
```sql
✓ Users can only edit their own categories
✓ Public categories viewable by all
✓ Private categories only by creator
✓ Like system prevents duplicates
✓ Auto-increment triggers secure
```

### Client Side
```typescript
✓ Input validation
✓ SQL injection prevention (Supabase handles)
✓ XSS protection (React handles)
✓ Rate limiting (future enhancement)
```

## 📊 Database Schema

### Tables

#### `community_categories`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Category name |
| words | TEXT[] | Array of words |
| creator_id | TEXT | Anonymous user ID |
| creator_name | TEXT | Display name |
| is_public | BOOLEAN | Visibility |
| likes_count | INTEGER | Auto-counted |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last modified |

#### `category_likes`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| category_id | UUID | Foreign key |
| user_id | TEXT | Anonymous user ID |
| created_at | TIMESTAMP | When liked |

### Indexes
- `is_public` - Fast filtering
- `likes_count DESC` - Sort by popularity
- `creator_id` - User's categories
- `user_id` - User's likes

### Triggers
- Auto-increment likes on insert
- Auto-decrement likes on delete
- Update timestamp on modify

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- Supabase account (free)
- Internet connection

### Quick Setup

```bash
# 1. Clone/download project
cd imposter-game

# 2. Install dependencies
npm install

# 3. Set up Supabase (see SUPABASE_SETUP.md)
# Create project, run schema, get API keys

# 4. Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 5. Start development
npm run dev
```

### First Category

1. Open the app
2. Tap "Custom Categories"
3. Tap "Create"
4. Name it and add words
5. Toggle "Share with community" ON
6. Tap "Save Category"
7. Tap "Explore Community Library"
8. See your category! 🎉

## 📱 User Flows

### Publishing a Category
```
1. Create category (Category Selector)
   ↓
2. Toggle "Share with community"
   ↓
3. Click "Save Category"
   ↓
4. Saved locally + published to Supabase
   ↓
5. Appears in community library for all users
```

### Discovering Categories
```
1. Click "Explore Community Library"
   ↓
2. Browse categories (sorted by likes or date)
   ↓
3. Like favorites
   ↓
4. Tap category to select
   ↓
5. Use in your game!
```

### Liking a Category
```
1. Click heart icon
   ↓
2. Optimistic UI update (instant)
   ↓
3. Insert into category_likes table
   ↓
4. Trigger auto-increments likes_count
   ↓
5. Category moves up in rankings
```

## 🎨 UI Components

### CategorySelector (Updated)
- Added "Explore Community Library" button
- Added "Share with community" toggle
- Integrated publishing logic

### CommunityCategories (New)
- Full-screen modal
- Sort tabs (Most Liked / Recent)
- Username editor
- Heart buttons for liking
- Category cards with metadata

### Shared Components
- CategoryIcon (emoji/gradient icons)
- CategoryBackground (animated backgrounds)
- RippleButton (interactive buttons)

## 🧪 Testing Checklist

- [ ] Create private category (local only)
- [ ] Create public category (appears in library)
- [ ] Browse community library
- [ ] Sort by "Most Liked"
- [ ] Sort by "Recent"
- [ ] Like a category (heart fills)
- [ ] Unlike a category (heart empties)
- [ ] Select community category for game
- [ ] Edit username
- [ ] Username appears on published categories
- [ ] Like count increments automatically
- [ ] Can't like same category twice
- [ ] Can't edit other users' categories
- [ ] Private categories don't appear in library

## 🐛 Troubleshooting

### Categories not appearing
1. Check Supabase URL/key in .env
2. Verify schema was run successfully
3. Check is_public = true
4. Look for errors in browser console

### Can't publish
1. Verify Supabase credentials
2. Check internet connection
3. Ensure project isn't paused (free tier)
4. Check browser console for errors

### Likes not counting
1. Verify triggers are set up (run schema)
2. Check RLS policies allow likes
3. Can't like your own categories
4. Can't like same category twice

## 📈 Future Enhancements

### Phase 2
- [ ] Search/filter by name
- [ ] Category tags
- [ ] Usage statistics
- [ ] Featured categories

### Phase 3
- [ ] Comments/ratings
- [ ] Report system
- [ ] Admin moderation
- [ ] User profiles

### Phase 4
- [ ] Push notifications
- [ ] Leaderboards
- [ ] Achievements
- [ ] Analytics dashboard

## 📞 Support

Need help?

1. Check the guides:
   - [Quick Start](./COMMUNITY_QUICKSTART.md)
   - [Supabase Setup](./SUPABASE_SETUP.md)
   - [Feature Details](./COMMUNITY_FEATURE.md)

2. Common issues:
   - Verify environment variables
   - Check Supabase dashboard logs
   - Look for console errors
   - Ensure schema ran successfully

3. Debug mode:
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests
   - Verify localStorage for user ID

## 🎉 Success Criteria

You'll know it's working when:

✅ You can create and save categories locally
✅ Toggle switches work smoothly
✅ Community library opens and shows categories
✅ Like buttons respond instantly
✅ Sorting works (Most Liked / Recent)
✅ Selected categories work in games
✅ Username persists and appears correctly

## 🏆 Best Practices

### For Creators
- Make descriptive category names
- Include 30+ varied words
- Test before publishing
- Keep content appropriate

### For Players
- Like quality categories
- Try different community content
- Report issues if found
- Respect the community

### For Developers
- Keep RLS policies tight
- Monitor database usage
- Index important columns
- Handle errors gracefully

---

**Built with ❤️ for the Imposter Game community**

*Let's create amazing categories together! 🎮✨*
