# 🚀 Quick Start - Test Your iOS App NOW

## 3 Commands to Launch

```bash
npm run build
npx cap sync ios
npx cap open ios
```

Then click ▶️ in Xcode. That's it! 🎉

---

## ✅ What to Expect

### Console (Good Signs)
```
✅ ⚡️ Loading app at capacitor://localhost...
✅ [PWA] Running in Capacitor - Service Worker not needed
✅ [iOS] Splash screen hidden
✅ ⚡️ WebView loaded
```

### Screen
- IntroSlides appear (first time)
- OR Lobby screen (if you've seen intro)
- Touch works
- Buttons respond
- Sounds play (if enabled)

---

## ❌ Common Issues & Fixes

### App doesn't open on device
**Fix**: Settings → General → VPN & Device Management → Trust certificate

### White screen
**Fix**: 
```bash
# In Xcode
Product → Clean Build Folder (Cmd+Shift+K)
# Then run again
```

### Old version running
**Fix**:
```bash
npm run build && npx cap sync ios
# Then in Xcode: Product → Clean Build Folder
```

---

## 🎯 What Was Fixed

| Issue | Status |
|-------|--------|
| Service Worker Error | ✅ Fixed |
| Splash Screen Warning | ✅ Fixed |
| Platform Detection | ✅ Added |
| iOS Ready | ✅ Yes |

---

## 📱 Test Checklist

Once it launches:
- [ ] Intro slides work
- [ ] Create players (2-12)
- [ ] Select category
- [ ] Configure settings
- [ ] Role reveal (swipe through)
- [ ] Discussion timer works
- [ ] Voting works
- [ ] Results show
- [ ] Play again works
- [ ] Sounds work

---

## 🎨 Files Changed

1. `/utils/pwa.ts` - Skip service workers in Capacitor
2. `/utils/platform.ts` - NEW platform detection
3. `/App.tsx` - Auto-hide splash screen

---

## 💡 Pro Tips

### Speed up builds
```bash
# One command for everything
npm run ios
```

### View logs
In Xcode: View → Debug Area → Show Debug Area (Cmd+Shift+Y)

### Take screenshots
In Simulator: Cmd+S

### Reset app state
Delete app from device/simulator and reinstall

---

## 🐛 Still Stuck?

1. Check `/IOS_FIX_SUMMARY.md` for detailed explanation
2. Check `/IOS_TESTING_GUIDE.md` for step-by-step guide
3. Check Xcode console for specific error messages

---

## 🎉 Ready for More?

After testing works:
1. See `/IOS_OPTIMIZATION_TIPS.md` for haptics, status bar, etc.
2. See `/APP_STORE_DEPLOYMENT_GUIDE.md` for TestFlight
3. Test on real iPhone (not just simulator)

---

**Now run those 3 commands and watch your app come to life! 🚀**
