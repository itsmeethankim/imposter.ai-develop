# ✅ TestFlight Deployment Checklist

**App**: Imposter - Social Deduction Game  
**Version**: 1.0.0 (Beta)  
**Date**: October 18, 2025

---

## 🎯 PRE-EXPORT CHECKLIST (Before Downloading Code)

### Critical Items (MUST DO):

- [x] **Fixed Rate Limiting Mismatch** ✅
  - Backend now matches frontend: 50 word generations/day, 150 hint generations/day
  - Files updated: `/supabase/functions/server/index.tsx`

- [x] **Updated Service Worker Cache Version** ✅
  - Changed from `v1` to `v1.0.0` for better version tracking
  - File updated: `/public/service-worker.js`

- [x] **Optimized Build Configuration** ✅
  - Added Terser minification for smaller bundle size
  - Added code splitting for faster load times
  - File updated: `/vite.config.ts`

- [ ] **Export App Icons** ⚠️ REQUIRED
  - Visit your deployed app at `?icons=export`
  - Download `icon-192.png` (192x192px)
  - Download `icon-512.png` (512x512px)
  - Place both files in `/public/` directory
  - **DO NOT SKIP - App will fail without these!**

### Optional (Recommended):

- [ ] Test full game flow one more time
- [ ] Verify AI category generation works
- [ ] Check that sounds play correctly
- [ ] Test paywall modal display

---

## 📦 DOWNLOAD & SETUP (After Exporting from Figma Make)

### 1. Download Your Code
```bash
# After downloading the zip from Figma Make:
cd path/to/downloaded/imposter-game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Your Icon Files
```bash
# Copy the two icon files you exported to /public/
cp path/to/icon-192.png public/
cp path/to/icon-512.png public/

# Verify they exist:
ls -la public/*.png
# Should show: icon-192.png, icon-512.png
```

### 4. Test the Build Locally
```bash
npm run build
npm run preview

# Visit http://localhost:4173 and test:
# - Game flow works
# - Icons appear in browser
# - No console errors
```

---

## 🔧 SUPABASE SETUP (If Not Already Deployed)

### Deploy Edge Function

```bash
# Login to Supabase (if not already)
npx supabase login

# Link to your project
npx supabase link --project-ref [your-project-id]

# Deploy the edge function
npx supabase functions deploy make-server-be273801

# Verify it's working
curl https://[your-project-id].supabase.co/functions/v1/make-server-be273801/health
# Should return: {"status":"ok","timestamp":"2025-10-18T..."}
```

### Set Environment Variable

```bash
# Set OpenAI API key (if not already set)
npx supabase secrets set OPENAI_API_KEY=sk-proj-...

# Verify secrets are set
npx supabase secrets list
# Should show: OPENAI_API_KEY
```

### Test AI Generation

```bash
# Test word generation
curl -X POST https://[your-project-id].supabase.co/functions/v1/make-server-be273801/generate-words \
  -H "Authorization: Bearer [your-anon-key]" \
  -H "Content-Type: application/json" \
  -d '{"categoryName":"Test Category","numberOfWords":10}'

# Should return JSON with words array
```

---

## 📱 CAPACITOR & XCODE SETUP

### 1. Initialize Capacitor for iOS

```bash
# Build the web app first
npm run build

# Sync to iOS (creates iOS project if needed)
npx cap sync ios

# Open in Xcode
npx cap open ios
```

### 2. In Xcode - First Time Setup

**Project Settings**:
- [ ] Set **Team** (your Apple Developer account)
- [ ] Set **Bundle Identifier**: `com.imposter.game`
- [ ] Set **Version**: `1.0.0`
- [ ] Set **Build Number**: `1`

**Signing & Capabilities**:
- [ ] Enable **Automatic Signing**
- [ ] Select your **Provisioning Profile**
- [ ] Add capability: **App Groups** (optional, for data sharing)

**Build Settings**:
- [ ] Set **Deployment Target**: iOS 14.0+
- [ ] Architecture: `arm64` (for devices)

**Info.plist Entries** (should already be set by Capacitor):
- [ ] `CFBundleDisplayName`: "Imposter"
- [ ] `UILaunchStoryboardName`: "LaunchScreen"
- [ ] `UIRequiresFullScreen`: YES
- [ ] `UISupportedInterfaceOrientations`: Portrait

### 3. Add Privacy Permissions (iOS Requires These)

In Xcode, add to `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app does not use the camera</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app does not access your photos</string>
```

**Note**: Even if you don't use these, App Store might require descriptions.

### 4. Test on Simulator

```bash
# In Xcode:
1. Select a simulator (iPhone 15 Pro recommended)
2. Click "Run" (⌘R)
3. Test the app thoroughly
```

**What to Test**:
- [ ] App launches without crashes
- [ ] Icons display correctly
- [ ] Intro slides work
- [ ] Can create lobby and add players
- [ ] Can select categories
- [ ] Can start a game
- [ ] Role reveal works
- [ ] Voting works
- [ ] Results screen displays
- [ ] Sounds play (turn on simulator volume!)
- [ ] Paywall modal appears after first game

### 5. Test on Physical Device (Recommended)

```bash
# In Xcode:
1. Connect your iPhone via USB
2. Select your device from the device list
3. Click "Run" (⌘R)
4. If prompted, trust computer on device
```

**Critical Physical Device Tests**:
- [ ] Touch interactions feel responsive
- [ ] Swipe gestures work smoothly
- [ ] No lag or performance issues
- [ ] Sounds play correctly
- [ ] Screen stays on during game
- [ ] No unexpected crashes

---

## 🚀 TESTFLIGHT UPLOAD

### 1. Archive the App

```bash
# In Xcode:
1. Select "Any iOS Device (arm64)" as target
2. Menu: Product → Archive
3. Wait for archive to complete (2-5 minutes)
```

### 2. Upload to App Store Connect

```bash
# In the Organizer window:
1. Select your archive
2. Click "Distribute App"
3. Select "App Store Connect"
4. Select "Upload"
5. Choose automatic signing
6. Click "Upload"
```

**This will take 5-15 minutes depending on your internet speed.**

### 3. Complete TestFlight Setup

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select your app
3. Go to **TestFlight** tab
4. Wait for build to process (can take 15-60 minutes)

**Fill in Required Info**:
- [ ] **What to Test**: "Full game flow, AI category generation, paywall functionality"
- [ ] **Test Information**: Add test account if needed (not required for this app)
- [ ] **Export Compliance**: 
  - Does your app use encryption? → YES
  - Is it exempt? → YES (using HTTPS only)

### 4. Add Beta Testers

**Internal Testing** (up to 100 testers, no review needed):
1. Go to TestFlight → Internal Testing
2. Click "+" to add internal testers
3. Enter email addresses
4. They'll receive invite immediately

**External Testing** (up to 10,000 testers, requires Apple review):
1. Go to TestFlight → External Testing
2. Create a new group
3. Submit for Beta App Review
4. Wait for approval (usually 24-48 hours)
5. Add testers' email addresses
6. They'll receive invite after approval

---

## 📧 INVITE YOUR BETA TESTERS

### Email Template for Beta Testers:

```
Subject: You're Invited to Beta Test Imposter!

Hi [Name],

You've been invited to beta test Imposter - a social deduction game where you try to identify the imposter among your friends!

🎮 HOW TO JOIN:
1. Install TestFlight from the App Store (if you don't have it)
2. Click the invite link in this email
3. Install "Imposter" from TestFlight
4. Start playing!

⚠️ WHAT TO TEST:
- Create a lobby with 3-8 players
- Try both free and premium categories
- Test AI-powered custom categories
- Check if the hint system helps imposters blend in
- Report any bugs or crashes

💬 FEEDBACK:
Please send feedback to: [your-email@example.com]
Or use TestFlight's built-in screenshot feedback feature.

Thanks for helping make this game awesome!

Best,
[Your Name]
```

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Build Fails in Xcode

**Error**: "No signing certificate found"
- **Solution**: Go to Xcode Preferences → Accounts → Download Manual Profiles

**Error**: "Missing Info.plist"
- **Solution**: Run `npx cap sync ios` again

**Error**: "Module not found"
- **Solution**: Run `npm run build` before `npx cap sync ios`

### App Crashes on Launch

**Check**:
1. Xcode console for error messages
2. Device console: Window → Devices & Simulators → Select device → View logs
3. Rebuild with `npm run build && npx cap sync ios`

### Icons Not Showing

**Check**:
1. Verify `icon-192.png` and `icon-512.png` exist in `/public/`
2. Rebuild: `npm run build && npx cap sync ios`
3. Clean build in Xcode: Product → Clean Build Folder

### Service Worker Not Working on iOS

**Note**: iOS may cache aggressively. To clear:
1. Safari Settings → Advanced → Website Data → Remove All
2. Rebuild and reinstall app

---

## 📊 POST-DEPLOYMENT MONITORING

### Week 1: Watch for Critical Issues

**Daily Checks**:
- [ ] Check TestFlight crashes (should be 0%)
- [ ] Monitor Supabase function logs
- [ ] Review OpenAI API usage
- [ ] Check for tester feedback

### Week 2-4: Gather Feedback

**What to Ask Testers**:
- Is the AI category generation useful?
- Are hints too obvious or too vague?
- Is the paywall timing appropriate?
- Any UI/UX confusion?
- Performance issues?

### Monitor Costs

**Supabase** (should be free tier):
- Edge function invocations
- Database reads/writes
- Bandwidth usage

**OpenAI API** (estimate: $5-10/month for 50 beta users):
- Check daily usage at platform.openai.com
- Set up billing alerts at $20/month

---

## 🎯 SUCCESS METRICS FOR BETA

### Technical Health
- [ ] 0% crash rate
- [ ] <500ms API response times
- [ ] No critical bugs reported

### User Engagement
- [ ] 70%+ testers play multiple games
- [ ] Positive feedback on AI features
- [ ] Low churn (testers keep coming back)

### Feature Validation
- [ ] AI categories being created and used
- [ ] Hints working well for imposters
- [ ] Paywall conversion rate >5% (if testing purchases)

---

## 🎉 YOU'RE READY!

**Estimated Time**: 2-3 hours for first-time setup

**Order of Operations**:
1. ✅ Export icons (5 min)
2. ✅ Download code from Figma Make (2 min)
3. ✅ Install dependencies (5 min)
4. ✅ Add icon files (1 min)
5. ✅ Test build locally (10 min)
6. ✅ Deploy Supabase function if needed (10 min)
7. ✅ Sync to iOS (5 min)
8. ✅ Configure Xcode (15 min)
9. ✅ Test on simulator (15 min)
10. ✅ Test on device (15 min)
11. ✅ Archive and upload (30 min)
12. ✅ Wait for TestFlight processing (15-60 min)
13. ✅ Invite testers (10 min)

**Total**: ~2-3 hours (excluding waiting time)

---

## 🆘 NEED HELP?

**Xcode Issues**: [Apple Developer Forums](https://developer.apple.com/forums/)  
**TestFlight Issues**: [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)  
**Capacitor Issues**: [Capacitor Docs](https://capacitorjs.com/docs)  
**Supabase Issues**: [Supabase Support](https://supabase.com/support)

---

**Good luck with your beta! 🚀🎮**
