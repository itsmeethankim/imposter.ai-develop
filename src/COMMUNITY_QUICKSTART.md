# 🚀 Community Categories - Quick Start

## What You Can Do

### 📤 Publish Your Own Categories
1. Create a custom category in the game
2. Toggle "Share with community" ON
3. Click "Save Category"
4. Done! Your category is now live for everyone to discover

### 📥 Discover Community Categories
1. Tap "Explore Community Library" on the category selector
2. Browse categories created by players worldwide
3. Sort by "Most Liked" or "Recent"
4. Tap a category to use it in your game

### ❤️ Like Great Categories
- Tap the heart icon on any category
- Your likes help great content rise to the top
- Unlike by tapping the heart again

### 👤 Customize Your Identity
- Change your username in the Community Library
- Your name appears on all categories you publish
- Auto-generated names like "SwiftDragon42" can be customized

## Setup in 3 Steps

### Step 1: Create Supabase Project (Free)
```
1. Go to supabase.com
2. Sign up (free tier is generous)
3. Create new project
4. Wait 2 minutes for setup
```

### Step 2: Run Database Script
```
1. Open SQL Editor in Supabase
2. Copy/paste contents of supabase-schema.sql
3. Click "Run"
4. Done! Tables created ✓
```

### Step 3: Add Environment Variables
```bash
# Create .env file in your project root
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxx

# Get these from Supabase Dashboard > Settings > API
```

## Feature Highlights

### 🌟 Smart Sorting
- **Most Liked**: Highest quality content first
- **Recent**: Fresh categories from the community

### 🔒 Privacy Options
- **Public**: Share with everyone (default when toggled ON)
- **Private**: Keep on your device only

### 🎮 Seamless Integration
- Community categories work exactly like built-in ones
- No special steps to use them in games
- Instant synchronization

### 📊 Analytics (Future)
- See how many people liked your category
- Track total downloads/uses
- Creator leaderboards

## How It Works Behind the Scenes

```
[Your Device]              [Supabase Cloud]           [Other Players]
    |                             |                          |
    | 1. Create category          |                          |
    |-------------------------->  |                          |
    |                             |                          |
    | 2. Publish (if public)      |                          |
    |=========================>  |                          |
    |                             |                          |
    |                             | 3. Browse library        |
    |                             |  <---------------------- |
    |                             |                          |
    |                             | 4. Like category         |
    |                             |  <====================== |
    |                             |                          |
    |                             | 5. Auto-increment likes  |
    |                             | (database trigger)       |
```

## Example Categories You Might Find

- 🎌 **Anime Characters** (by CoolNinja99)
  - 120 words • 47 likes
  
- ⚔️ **Clash Royale Cards** (by SwiftDragon42)
  - 85 words • 32 likes
  
- 🎮 **Video Game Weapons** (by BoldWizard7)
  - 95 words • 28 likes
  
- 🍕 **Pizza Toppings** (by CleverFox123)
  - 40 words • 15 likes

## Security & Privacy

### What's Stored
- ✓ Category name and words
- ✓ Your anonymous user ID (random string)
- ✓ Your chosen username
- ✓ Number of likes

### What's NOT Stored
- ✗ Email address
- ✗ Real name
- ✗ Location
- ✗ Device info
- ✗ IP address
- ✗ Any personal information

### You Control
- Whether categories are public or private
- Your display name
- Which categories to publish
- When to like/unlike

## Troubleshooting

### "Community Library is empty"
- Check your internet connection
- Verify Supabase credentials in .env
- Someone needs to publish a category first!

### "Failed to publish category"
- Ensure VITE_SUPABASE_URL is correct
- Verify VITE_SUPABASE_ANON_KEY is set
- Check Supabase project is active (not paused)

### "Can't like categories"
- Make sure you're not trying to like your own
- Check internet connection
- Verify database triggers are set up (run schema.sql again)

### "Username won't save"
- Check localStorage isn't disabled in browser
- Try clearing cache and reloading
- Username changes apply to future published categories

## Best Practices

### Creating Great Categories
- ✅ Use clear, descriptive names
- ✅ Include 30+ words for variety
- ✅ Keep words relevant to the theme
- ✅ Test locally before publishing
- ❌ Avoid offensive content
- ❌ Don't spam similar categories

### Being a Good Community Member
- 👍 Like categories you enjoy
- 🎮 Try different community categories
- ⭐ Create unique, high-quality content
- 🤝 Respect others' creativity

## What's Next?

Potential future features:
- 🔍 Search categories by name
- 🏷️ Category tags (Sports, Gaming, Movies, etc.)
- 💬 Comments and ratings
- 📈 Creator statistics dashboard
- 🏆 Featured categories section
- 📱 Push notifications for likes
- 👥 Follow your favorite creators

## Need Help?

See the full documentation:
- `COMMUNITY_FEATURE.md` - Complete technical details
- `SUPABASE_SETUP.md` - Detailed database setup
- `.env.example` - Environment variable template

---

**Happy creating! 🎨** Let's build an amazing library together! 🌟
