# Download Instructions for Capacitor Setup

Since Figma Make doesn't currently have a one-click download feature, you'll need to manually recreate the project structure on your Mac.

## Method 1: Check for Export Feature

Look in the Figma Make interface for:
- **File menu** → Export/Download Project
- **Share button** → Download as ZIP
- **Settings** → Export Options

If you find this feature, use it! Then skip to "After Download" section below.

## Method 2: Manual Recreation (Step by Step)

### Step 1: Create Project Folder

```bash
mkdir imposter-game
cd imposter-game
```

### Step 2: Copy Files One by One

You'll need to copy the content of each file from Figma Make. Here's the complete list:

#### Root Files (Priority Order)
1. `App.tsx` ⭐ (Main app file)
2. `capacitor.config.ts` (Capacitor configuration)
3. `package.json.template` (rename to package.json)
4. `index.html` (you'll create this - see CAPACITOR_SETUP.md)
5. `main.tsx` (you'll create this - see CAPACITOR_SETUP.md)
6. `vite.config.ts` (you'll create this - see CAPACITOR_SETUP.md)
7. `tsconfig.json` (you'll create this - see CAPACITOR_SETUP.md)
8. `tsconfig.node.json` (you'll create this - see CAPACITOR_SETUP.md)

#### Configuration Files
- `/config/openai.ts`

#### Data Files
- `/data/categories.ts`

#### Utility Files
- `/utils/openai.ts`
- `/utils/supabase.ts` ⭐ (Community categories)
- `/utils/supabase/info.tsx`

#### Styles
- `/styles/globals.css` ⭐ (Critical for styling)

#### Components (18 files)
- `/components/AnimatedBackground.tsx`
- `/components/CategoryBackground.tsx`
- `/components/CategoryIcon.tsx`
- `/components/CategorySelector.tsx`
- `/components/CategoryTutorial.tsx`
- `/components/CommunityCategories.tsx` ⭐ (Community library browser)
- `/components/GameSettings.tsx`
- `/components/IntroSlides.tsx`
- `/components/LobbySetup.tsx`
- `/components/OnboardingTutorial.tsx`
- `/components/PaywallModal.tsx`
- `/components/ResultsScreen.tsx`
- `/components/RippleButton.tsx`
- `/components/RoleReveal.tsx`
- `/components/ThemeToggle.tsx`
- `/components/VotingScreen.tsx`
- `/components/WelcomeScreen.tsx`
- `/components/figma/ImageWithFallback.tsx` (Protected - DO NOT modify)

#### Supabase Functions (Optional for now)
- `/supabase/functions/server/index.tsx`
- `/supabase/functions/server/kv_store.tsx`

#### Documentation
- `/CAPACITOR_SETUP.md` - iOS build instructions
- `/SUPABASE_SETUP.md` ⭐ - Community feature setup
- `/COMMUNITY_FEATURE.md` - How community categories work
- `/.env.example` - Environment variables template
- `/supabase-schema.sql` ⭐ - Database schema for community features

#### ShadCN UI Components (All 47 files in /components/ui/)
You can skip these for now and regenerate them later with:
```bash
npx shadcn@latest add [component-name]
```

### Step 3: Copy Assets

You have two image assets that need to be included:
- Imposter icon: `figma:asset/88f96b2be2ecf56e846ac1b153054bb388382435.png`
- Detective icon: `figma:asset/2b135083bc42d1f5c6e09a485a24e8c5f57aae1c.png`

**How to get these:**
1. Right-click on the images in Figma Make
2. Save them to `/public/assets/` folder
3. Update imports in App.tsx:
   ```tsx
   // Change from:
   import imposterIcon from "figma:asset/88f96b2be2ecf56e846ac1b153054bb388382435.png";
   import detectiveIcon from "figma:asset/2b135083bc42d1f5c6e09a485a24e8c5f57aae1c.png";
   
   // To:
   import imposterIcon from "./public/assets/imposter-icon.png";
   import detectiveIcon from "./public/assets/detective-icon.png";
   ```

## Method 3: Use AI Coding Assistant (Fastest)

If you have access to **Claude**, **ChatGPT**, or **Cursor**:

1. Copy the entire file tree from Figma Make
2. Ask the AI: "Help me recreate this project structure locally"
3. Paste each file's contents one by one
4. The AI will guide you through the setup

## After Download

Once you have all files on your Mac:

### 1. Install Dependencies

```bash
cd imposter-game
npm install
```

### 2. Rename Template File

```bash
mv package.json.template package.json
```

### 3. Set Up Environment Variables (IMPORTANT!)

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API keys
nano .env
```

Add your Supabase credentials (see SUPABASE_SETUP.md):
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_OPENAI_API_KEY=your-openai-key-here  # Optional
```

### 4. Set Up Supabase (For Community Features)

Follow the detailed guide in `SUPABASE_SETUP.md`:
1. Create a Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Get your API keys
4. Add them to `.env` file

**Note**: The app will work without Supabase, but community features will be disabled.

### 5. Create Missing Build Files

Follow the instructions in `CAPACITOR_SETUP.md` to create:
- `index.html`
- `main.tsx`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`

These are all documented in the setup guide with full content.

### 6. Test Web Version First

```bash
npm run dev
```

Open http://localhost:5173 to verify everything works.

### 7. Build and Add Capacitor

```bash
npm run build
npx cap add ios
npx cap open ios
```

## Verification Checklist

Before proceeding to Capacitor:

- [ ] All TypeScript files compile without errors
- [ ] `npm run build` completes successfully
- [ ] Web version runs on localhost
- [ ] Images load correctly
- [ ] All game phases work (intro → lobby → category → game)
- [ ] No console errors in browser DevTools

## Priority Files to Copy First

If you're copying manually, start with these **10 critical files**:

1. ✅ `App.tsx` - Core game logic
2. ✅ `styles/globals.css` - All styling and animations
3. ✅ `data/categories.ts` - Game data
4. ✅ `config/openai.ts` - API configuration
5. ✅ `utils/supabase.ts` - Community categories backend
6. ✅ `utils/supabase/info.tsx` - Supabase config
7. ✅ `components/CategorySelector.tsx` - Category selection
8. ✅ `components/CommunityCategories.tsx` - Community library
9. ✅ `components/RoleReveal.tsx` - Role reveal cards
10. ✅ `components/VotingScreen.tsx` - Voting phase

Then copy the remaining component files, documentation, and UI components.

## Need Help?

If you get stuck:
1. Check `CAPACITOR_SETUP.md` for detailed build configuration
2. Ensure Node.js v16+ is installed
3. Make sure all imports match the new local file structure
4. Verify all dependencies are in package.json

## Estimated Time

- **With export feature**: 5 minutes
- **Manual copy (priority files only)**: 30 minutes  
- **Full manual copy (all files)**: 1-2 hours
- **Using AI assistant**: 15-20 minutes

---

**Pro Tip**: Start with just the priority files, get it building, then add the rest incrementally. You can always add more components later!