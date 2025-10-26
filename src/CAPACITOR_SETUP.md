# Capacitor Setup Guide - Test on iPhone

This guide will help you wrap your Imposter game in a native iOS app using Capacitor.

## Prerequisites

Before you begin, ensure you have:
- **macOS** (required for iOS development)
- **Xcode** (latest version from Mac App Store)
- **Node.js** (v16 or higher)
- **CocoaPods** (`sudo gem install cocoapods`)
- **Apple Developer Account** (free account works for device testing)

## Step 1: Export Your Project

1. Download all your project files from Figma Make
2. Create a new folder on your Mac (e.g., `imposter-game`)
3. Copy all files maintaining the folder structure shown in the file tree

## Step 2: Set Up Local Development Environment

Open Terminal and navigate to your project folder:

```bash
cd ~/path/to/imposter-game
```

### Initialize Node Project

```bash
npm init -y
```

### Install Dependencies

```bash
# Core React and build tools
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom

# Tailwind CSS
npm install -D tailwindcss@next @tailwindcss/vite@next postcss autoprefixer

# Your app's dependencies
npm install lucide-react
npm install motion framer-motion
npm install openai
npm install @supabase/supabase-js

# Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios
npm install @capacitor/splash-screen
npm install @capacitor/app
npm install @capacitor/haptics
npm install @capacitor/status-bar
```

## Step 3: Create Build Configuration

Create `vite.config.ts` in your project root:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "capacitor.config.ts"]
}
```

Create `index.html` in project root:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>Imposter</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

Create `main.tsx` in project root:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Step 4: Build Your Web App

```bash
npm run build
```

This creates a `dist` folder with your compiled app.

## Step 5: Initialize Capacitor

```bash
npx cap init
```

When prompted:
- App name: **Imposter**
- App ID: **com.imposter.game** (or your preferred bundle ID)
- Web asset directory: **dist**

## Step 6: Add iOS Platform

```bash
npx cap add ios
```

This creates an `ios` folder with your Xcode project.

## Step 7: Build and Sync

Every time you make changes to your web app:

```bash
npm run build
npx cap sync ios
```

## Step 8: Open in Xcode

```bash
npx cap open ios
```

## Step 9: Configure Xcode for Device Testing

1. **Connect your iPhone** to your Mac via USB cable
2. In Xcode, select your device from the device dropdown (top bar)
3. Click on the project name in the left sidebar
4. Go to **"Signing & Capabilities"** tab
5. Check **"Automatically manage signing"**
6. Select your **Apple Developer Team** (or create one)
7. Xcode will automatically create a provisioning profile

## Step 10: Trust Your Developer Certificate on iPhone

1. On your iPhone, go to **Settings > General > VPN & Device Management**
2. Tap on your developer certificate
3. Tap **"Trust [Your Name]"**

## Step 11: Run on Device

1. In Xcode, click the **Play (▶️) button** or press **Cmd+R**
2. Xcode will build and install the app on your iPhone
3. The app will launch automatically

## Important: Fix API Key Before Deploying

⚠️ **CRITICAL**: Your OpenAI API key is currently exposed in the client code. Before testing:

### Option A: Use Supabase Edge Function (Recommended)

You already have a Supabase Edge Function stub. You need to:

1. Deploy your Edge Function:
```bash
cd supabase/functions
npx supabase functions deploy server --no-verify-jwt
```

2. Set your OpenAI API key as a secret:
```bash
npx supabase secrets set OPENAI_API_KEY=your_actual_key_here
```

3. The app will automatically use the Edge Function (already coded in App.tsx)

### Option B: Temporary Testing Only

For testing purposes only, keep the client-side key but:
1. Make sure it has **strict usage limits** in OpenAI dashboard
2. **Remove it before App Store submission**

## Updating Your App

Whenever you make changes:

```bash
# 1. Build web assets
npm run build

# 2. Sync to native project
npx cap sync ios

# 3. Re-run in Xcode
npx cap open ios
# Then click Run in Xcode
```

## Capacitor Plugins You Can Use

Your app can now access native features:

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';

// Haptic feedback on button press
await Haptics.impact({ style: ImpactStyle.Medium });

// Hide status bar for fullscreen
await StatusBar.hide();

// Or set status bar style
await StatusBar.setStyle({ style: Style.Dark });
```

## Troubleshooting

### "Failed to build" errors
- Run `npx cap sync ios` again
- Clean build folder in Xcode: Product > Clean Build Folder

### "Code signing" errors
- Check Signing & Capabilities in Xcode
- Ensure you're signed in to Xcode with your Apple ID

### "This app cannot be installed" on iPhone
- Trust your developer certificate in iPhone Settings
- Restart both iPhone and Xcode

### Changes not showing up
- Make sure you ran `npm run build` before `npx cap sync`
- Try `npx cap sync ios --force`

## Next Steps for App Store

1. **Implement In-App Purchases** (replace localStorage subscription)
2. **Add Privacy Policy URL** (required by Apple)
3. **Create App Store assets** (screenshots, icon, description)
4. **Test on multiple devices**
5. **Submit for App Store Review**

## Useful Commands Reference

```bash
# Build web app
npm run build

# Sync changes to iOS
npx cap sync ios

# Open Xcode
npx cap open ios

# Update Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest @capacitor/ios@latest
npx cap sync

# View native logs
npx cap run ios --livereload
```

## Learn More

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Ionic Capacitor Guide](https://capacitorjs.com/docs/getting-started)
- [Apple Developer Portal](https://developer.apple.com/)
