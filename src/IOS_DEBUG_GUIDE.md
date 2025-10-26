# iOS White Screen Debug Guide

## 🔍 What We Fixed

Added comprehensive error logging to identify the white screen issue:

### Changes Made:

1. **`/components/ErrorBoundary.tsx`** (NEW)
   - React Error Boundary to catch rendering errors
   - Shows user-friendly error screen with reload button
   - Logs detailed error information

2. **`/main.tsx`** (UPDATED)
   - Global error handlers for uncaught errors
   - Promise rejection handler
   - Fallback UI if React fails to initialize
   - Wrapped App in ErrorBoundary

3. **`/App.tsx`** (UPDATED)
   - Added console.log statements throughout
   - Wrapped all initialization code in try-catch blocks
   - Better error tracking for each useEffect

4. **`/components/IntroSlides.tsx`** (UPDATED)
   - Added render confirmation log

---

## 🚀 Rebuild and Test

### Step 1: Clean Build
```bash
# Navigate to project
cd ~/ImposterAI/imposter.ai

# Clean old build
rm -rf dist

# Rebuild with new logging
npm run build
```

### Step 2: Sync to iOS
```bash
npx cap sync ios
```

### Step 3: Clean Xcode
```bash
npx cap open ios
```

In Xcode:
1. **Product** → **Clean Build Folder** (Cmd+Shift+K)
2. **Close Xcode completely**
3. **Delete Derived Data**:
   - Xcode → **Preferences** → **Locations**
   - Click arrow next to **Derived Data** path
   - Delete the entire folder
4. **Reopen**: `npx cap open ios`

### Step 4: Run and Watch Console
1. Select your simulator (iPhone 15 Pro or similar)
2. Click **Play** (▶️)
3. **Watch the console carefully** - look for our emoji logs:

---

## 📊 What to Look For in Console

### ✅ Expected Success Logs:
```
🚀 App starting - main.tsx loaded
✅ Root element found, creating React root...
✅ React root created and rendering...
🎮 App component rendering...
📊 Current game phase: intro
🔧 Running app state initialization useEffect...
✅ App state initialization complete
🔧 Running PWA/platform initialization useEffect...
[PWA] Running in Capacitor - Service Worker not needed
✅ PWA/platform initialization complete
🎨 About to render App JSX, gamePhase: intro
✅ Rendering IntroSlides component
🎬 IntroSlides component rendering
```

### ❌ Error Indicators:
```
🚨 Global error caught: [error details]
🚨 React Error Boundary caught an error: [error details]
🚨 Fatal error during app initialization: [error details]
🚨 Error during app state initialization: [error details]
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Import Errors
**Symptom**: `🚨 Error: Cannot find module`
**Solution**: Missing file or incorrect import path
```bash
# Check if all components exist
ls components/*.tsx
```

### Issue 2: Asset Loading Errors
**Symptom**: `🚨 Error loading image` or `Failed to load resource`
**Solution**: Asset path issue
```bash
# Check if figma assets exist
ls src/assets/*.png
```

### Issue 3: localStorage Errors
**Symptom**: `🚨 Error during app state initialization`
**Solution**: localStorage might be blocked
- This is rare on iOS but possible
- Check console for specific error

### Issue 4: React Rendering Errors
**Symptom**: `🚨 React Error Boundary caught an error`
**Solution**: Component rendering issue
- Look at the component stack in console
- Check which component failed

### Issue 5: JavaScript Syntax Errors
**Symptom**: App stops loading, no logs after certain point
**Solution**: TypeScript/JavaScript error during build
```bash
# Check for build errors
npm run build
# Look for TypeScript errors
```

---

## 📋 Debug Checklist

After rebuilding, check each of these:

- [ ] Console shows: `🚀 App starting`
- [ ] Console shows: `✅ React root created`
- [ ] Console shows: `🎮 App component rendering`
- [ ] Console shows: `🎬 IntroSlides component rendering`
- [ ] **NO** console shows: `🚨` emoji errors
- [ ] Screen shows content (not white)

---

## 🎯 Next Steps Based on Results

### If you see intro slides ✅
**SUCCESS!** The app is working. Move on to testing features.

### If you see error boundary screen ⚠️
1. Screenshot the error message
2. Share the full console output
3. We'll fix the specific error

### If you still see white screen 🤔
1. **Copy ALL console output** (everything from start)
2. Look for the LAST successful emoji log
3. Share both with me

### If console stops logging partway through 🛑
1. Note which log was the LAST one you see
2. This tells us exactly where it's failing
3. Share that info

---

## 💡 Pro Tips

### View Full Console in Xcode
1. **View** → **Debug Area** → **Show Debug Area** (Cmd+Shift+Y)
2. Make debug area taller (drag divider up)
3. Click **Console** tab if not showing

### Filter Console Logs
In Xcode console search box, type:
- `🚨` - Show only errors
- `✅` - Show only success
- `App component` - Show App rendering
- `IntroSlides` - Show IntroSlides logs

### Copy All Logs
1. Click in console
2. **Cmd+A** (select all)
3. **Cmd+C** (copy)
4. Paste into text file for review

---

## 🆘 If Nothing Works

### Nuclear Option - Complete Reset

```bash
# 1. Stop Xcode completely
# 2. Delete everything and start fresh

cd ~/ImposterAI/imposter.ai

# Delete iOS folder
rm -rf ios

# Delete build artifacts
rm -rf dist
rm -rf node_modules/.vite

# Rebuild everything
npm run build

# Recreate iOS project
npx cap add ios

# Open fresh
npx cap open ios

# In Xcode: Clean Build Folder → Run
```

---

## 📞 What to Share

When reporting results, include:

1. **Console output** - Copy everything from start to error
2. **Screenshot** - What you see on screen
3. **Last successful log** - What was the last ✅ or emoji you saw
4. **First error** - What was the first 🚨 you saw

This will help me pinpoint the exact issue!

---

**Let's debug this together! Run the rebuild and share what you see in the console.** 🔍
