# iOS App Optimization Tips

## 🎯 Current Status
✅ Service Worker issue fixed  
✅ Capacitor configured properly  
✅ Bundle ID set: `com.imposterai.game`  
✅ Icons and splash screens ready  

---

## 🔧 Recommended iOS Optimizations

### 1. Add Splash Screen Auto-Hide
Your console showed: 
```
SplashScreen.hideSplash: SplashScreen was automatically hidden after default timeout.
```

**Fix**: Add this to your `App.tsx` useEffect:

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

useEffect(() => {
  // Hide splash screen when app is ready
  SplashScreen.hide();
}, []);
```

### 2. Enable Haptic Feedback (iOS Only)
You already have `@capacitor/haptics` installed! Use it for better UX:

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Light tap feedback
await Haptics.impact({ style: ImpactStyle.Light });

// Medium tap feedback (for buttons)
await Haptics.impact({ style: ImpactStyle.Medium });

// Heavy tap feedback (for important actions)
await Haptics.impact({ style: ImpactStyle.Heavy });

// Vibrate notification
await Haptics.notification({ type: 'SUCCESS' }); // or 'WARNING', 'ERROR'
```

**Where to add**:
- Button clicks → Light/Medium
- Vote cast → Heavy
- Game start → Notification SUCCESS
- Wrong action → Notification ERROR

### 3. Status Bar Styling
Make the status bar match your dark theme:

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// In App.tsx useEffect
if (isCapacitor()) {
  StatusBar.setStyle({ style: Style.Dark }); // White text for dark background
  StatusBar.setBackgroundColor({ color: '#1A1A1A' });
}
```

### 4. Handle App State Changes
Pause timers when app goes to background:

```typescript
import { App as CapApp } from '@capacitor/app';

useEffect(() => {
  if (isCapacitor()) {
    CapApp.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        // App went to background - pause timer
        setTimerActive(false);
      }
    });
  }
  
  return () => {
    CapApp.removeAllListeners();
  };
}, []);
```

### 5. Prevent Screen Sleep During Game
Keep screen on during active gameplay:

```typescript
import { KeepAwake } from '@capacitor-community/keep-awake';

// When game starts
await KeepAwake.keepAwake();

// When game ends
await KeepAwake.allowSleep();
```

**Note**: You'll need to install this plugin:
```bash
npm install @capacitor-community/keep-awake
```

---

## 📱 iOS-Specific Features to Consider

### Face ID / Touch ID for Premium
Since you have a subscription model, consider using biometric auth:

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

const result = await NativeBiometric.isAvailable();
if (result.isAvailable) {
  // Use Face ID/Touch ID for premium features
}
```

### Local Notifications
Remind users to play again:

```typescript
import { LocalNotifications } from '@capacitor/local-notifications';

// Request permission
await LocalNotifications.requestPermissions();

// Schedule notification
await LocalNotifications.schedule({
  notifications: [
    {
      title: "Ready for another game?",
      body: "Gather your friends and play Imposter AI!",
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 24) } // 24 hours
    }
  ]
});
```

### Share Results
Let users share game results:

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: 'Imposter AI Game Results',
  text: `I just caught the imposter in Imposter AI! Can you?`,
  url: 'https://yourapp.com',
  dialogTitle: 'Share with friends'
});
```

---

## 🎨 iOS Design Polish

### Safe Areas
Your UI should respect iPhone notches/home indicators:

```css
/* In your component styles */
.game-container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

### iOS Bounce Effect
Disable overscroll bounce for better control:

Add to `capacitor.config.ts`:
```typescript
{
  ios: {
    webContentsDebuggingEnabled: true,
    allowsLinkPreview: false,
    scrollEnabled: false // Disable bounce
  }
}
```

---

## 🔐 App Store Requirements

Before submitting to App Store:

### 1. Privacy Policy
✅ You have a template in `PRIVACY_POLICY_TEMPLATE.md`
- Host it on a public URL (GitHub Pages, your website, etc.)
- Add link to App Store Connect

### 2. App Store Screenshots
Required sizes (for iPhone):
- **6.7"** (iPhone 15 Pro Max): 1290 x 2796
- **6.5"** (iPhone 11 Pro Max): 1242 x 2688  
- **5.5"** (iPhone 8 Plus): 1242 x 2208

Take screenshots in Simulator: `Cmd + S`

### 3. App Icon
Make sure you have all required sizes:
- 1024x1024 (App Store)
- 180x180 (iPhone)
- 167x167 (iPad Pro)
- 152x152 (iPad)
- 120x120 (iPhone)
- 87x87 (iPhone settings)
- 80x80 (iPad settings)
- 76x76 (iPad)
- 60x60 (iPhone notifications)
- 58x58 (iPad settings)
- 40x40 (iPad notifications)
- 29x29 (Settings)
- 20x20 (iPad notifications)

Xcode will warn you about missing sizes.

### 4. App Description
Write compelling App Store description highlighting:
- Social deduction gameplay
- AI-powered categories
- Pass-and-play multiplayer
- Premium features

### 5. Keywords
Research and add keywords in App Store Connect:
- social deduction
- party game
- multiplayer
- imposter
- detective
- spy game
- etc.

---

## 🧪 Testing Checklist

Before TestFlight:
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPhone 15 Pro Max (large screen)
- [ ] Test on iPad (if supporting tablets)
- [ ] Test in airplane mode (offline)
- [ ] Test subscription flow
- [ ] Test AI generation
- [ ] Test sound on/off
- [ ] Test in dark/light environments
- [ ] Test pass-the-phone with real people
- [ ] Battery usage test (30 min gameplay)
- [ ] Memory leak test (play 10+ games)

---

## 🚀 Quick Wins

**Add these today for better UX**:

1. **Haptic feedback** on button taps (5 min)
2. **Status bar styling** to match theme (2 min)
3. **Splash screen** auto-hide (1 min)
4. **Safe area insets** for notch support (5 min)

These small touches make your app feel native and polished! ✨
