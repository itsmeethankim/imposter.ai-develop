# iOS Testing Guide - Fixed Service Worker Issue

## ✅ Issue Fixed

**Problem**: The app was trying to use PWA Service Workers in the native iOS app, which aren't supported in Capacitor's WebView.

**Solution**: Updated `/utils/pwa.ts` to detect when running in Capacitor and skip service worker registration for native apps.

---

## 🚀 Steps to Rebuild & Test

### 1. Rebuild the Web App
```bash
cd ~/ImposterAI/imposter.ai  # Or wherever your project is
npm run build
```

### 2. Sync to iOS
```bash
npx cap sync ios
```

### 3. Open in Xcode
```bash
npx cap open ios
```

### 4. Run on Device/Simulator
1. In Xcode, select your **iPhone** or **Simulator** at the top
2. Click the **Play button** (▶️) to build and run
3. Watch the console - you should now see:
   ```
   [PWA] Running in Capacitor - Service Worker not needed for native app
   ```

---

## ✅ Expected Behavior

### Console Output (Normal)
✅ `⚡️ Loading app at capacitor://localhost...` - Good!  
✅ `[PWA] Running in Capacitor - Service Worker not needed` - Perfect!  
✅ `⚡️ WebView loaded` - Working!  
⚠️ Some iOS privacy warnings - **Safe to ignore**  

### App Should:
✅ Launch successfully on iPhone/Simulator  
✅ Show IntroSlides or Lobby screen  
✅ Respond to touch/interactions  
✅ Play sounds (if enabled)  
✅ Navigate through screens smoothly  

---

## 🐛 Still Having Issues?

### If app doesn't launch:
1. **Clean build folder**: Product → Clean Build Folder (`Cmd + Shift + K`)
2. **Delete derived data**: Xcode → Preferences → Locations → Click arrow next to DerivedData → Delete folder
3. **Rebuild**: Click Play (▶️) again

### If you see white screen:
1. Check **Xcode console** for JavaScript errors
2. Look for red error messages (not yellow warnings)
3. Share the error with me

### If nothing happens on device:
1. On iPhone: **Settings → General → VPN & Device Management**
2. Tap your **Developer Certificate** (your name)
3. Tap **Trust** and confirm
4. Go back to home screen and **tap the app icon**

---

## 📱 Next Steps After Successful Launch

1. **Test all features** on the simulator:
   - Create players
   - Select categories
   - Play a game
   - Test voting
   - Check sounds
   - Verify AI generation (needs OpenAI key)

2. **Test on real iPhone**:
   - Build to your connected iPhone
   - Test touch interactions
   - Test haptic feedback
   - Test in portrait/landscape

3. **When ready for TestFlight**:
   - Change scheme to **"Any iOS Device (arm64)"**
   - Product → Archive
   - Follow App Store Connect upload process

---

## 💡 What Changed

**File Updated**: `/utils/pwa.ts`

Added Capacitor detection:
```typescript
function isCapacitor(): boolean {
  return !!(window as any).Capacitor || 
         window.location.protocol === 'capacitor:' ||
         window.location.protocol === 'ionic:';
}
```

Now service workers only register in **web browsers**, not in **native iOS app**.

---

## 🎉 You're Ready!

Run these commands and test your app:
```bash
npm run build
npx cap sync ios
npx cap open ios
```

Then click ▶️ in Xcode and watch it launch! 🚀
