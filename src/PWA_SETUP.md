# PWA Setup Guide

Your Imposter game is now configured as a Progressive Web App (PWA)! Here's what's been set up and how to use it.

## What's Included

### 1. Web App Manifest (`/public/manifest.json`)
Defines your app's metadata, appearance, and behavior when installed:
- **Name & Description**: "Imposter - Social Deduction Game"
- **Display Mode**: Standalone (fullscreen app experience)
- **Theme Colors**: Purple gradient matching your imposter theme
- **Icons**: Configurable at 192x192 and 512x512
- **App Shortcuts**: Quick action to start a new game

### 2. Service Worker (`/public/service-worker.js`)
Provides offline functionality and caching:
- **Precaching**: Essential app shell files are cached on install
- **Runtime Caching**: Pages and assets cached as you use them
- **Network-First Strategy**: Always tries network first, falls back to cache
- **Smart Skipping**: API calls to Supabase and OpenAI always use network
- **Update Handling**: Automatic cache cleanup and version management

### 3. PWA Utilities (`/utils/pwa.ts`)
Helper functions for PWA features:
- `registerServiceWorker()` - Registers and manages the service worker
- `setupInstallPrompt()` - Handles the "Add to Home Screen" prompt
- `promptInstall()` - Manually trigger the install prompt
- `isStandalone()` - Check if app is running as installed PWA
- `canInstall()` - Check if install is available
- `requestNotificationPermission()` - Request push notification access
- `sendNotification()` - Send notifications to users
- `clearAllCaches()` - Clear all caches (debugging)

### 4. Enhanced HTML (`/index.html`)
Includes all necessary PWA meta tags:
- Theme colors for light/dark mode
- Apple Touch icons
- Mobile web app capabilities
- Social media cards (Open Graph, Twitter)
- Optimized viewport settings

## Installation

### Desktop (Chrome, Edge, Opera)
1. Visit your app in a supported browser
2. Look for the install icon (⊕) in the address bar
3. Click "Install" when prompted

### Mobile (iOS Safari)
1. Open your app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"

### Mobile (Android Chrome)
1. Open your app in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home Screen" or "Install App"
4. Confirm the installation

## Creating App Icons

**Your app icon has been selected!** The angel/imposter character image is perfect for your PWA.

### Icon Requirements
You need to export the provided icon image to two sizes and place them in `/public/`:

- **icon-192.png**: 192x192 pixels
- **icon-512.png**: 512x512 pixels

### How to Create the Icons

The icon source image is already in your project at:
```
figma:asset/9c689677b85b60c5b331f50cd9b4fd931f77dd79.png
```

**Steps:**
1. Export this image from Figma at 192x192 pixels → save as `/public/icon-192.png`
2. Export this image from Figma at 512x512 pixels → save as `/public/icon-512.png`

**Export Settings:**
- Format: PNG
- Background: The image already has proper padding and background
- Ensure the aspect ratio is square (1:1)

### Alternative: Quick Icon Generation
If you need to resize quickly, you can use:
- [Favicon.io](https://favicon.io/) - Upload and resize
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive PWA icons
- [PWA Builder](https://www.pwabuilder.com/imageGenerator) - PWA-specific generator
- **ImageMagick** (command line):
  ```bash
  # Resize to 192x192
  convert icon-source.png -resize 192x192 public/icon-192.png
  
  # Resize to 512x512
  convert icon-source.png -resize 512x512 public/icon-512.png
  ```

## Testing Your PWA

### Chrome DevTools (Desktop)
1. Open DevTools (F12)
2. Go to "Application" tab
3. Check "Manifest" - verify all fields are correct
4. Check "Service Workers" - ensure it's activated
5. Use "Clear storage" to test fresh installs

### Lighthouse Audit
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"
5. Aim for 90+ score

### Mobile Testing
- Use Chrome's Device Mode (DevTools)
- Test on real devices when possible
- Check offline functionality by toggling airplane mode

## Offline Features

### What Works Offline
✅ Basic app shell and navigation
✅ Previously visited pages
✅ Cached game data and localStorage
✅ Tutorial screens
✅ Game logic and voting

### What Requires Network
❌ Supabase community categories
❌ OpenAI hint generation
❌ Publishing categories
❌ Fetching new categories

### Offline Strategy
The app uses a "Network-First" approach:
1. Try to fetch from network
2. If network fails, use cached version
3. Cache successful responses for future offline use

## Customization

### Changing Theme Colors
Edit `/public/manifest.json`:
```json
{
  "background_color": "#1e1b4b",  // Dark purple
  "theme_color": "#8B5CF6"        // Bright purple
}
```

### Adding More Shortcuts
Edit `/public/manifest.json`:
```json
{
  "shortcuts": [
    {
      "name": "Browse Categories",
      "url": "/?action=categories",
      "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }]
    }
  ]
}
```

### Adjusting Cache Strategy
Edit `/public/service-worker.js`:
- Change `CACHE_NAME` to force cache refresh
- Modify `PRECACHE_URLS` to cache more/fewer files
- Adjust fetch strategies in the fetch event handler

## Custom Install Button (Optional)

Add a custom "Install App" button to your UI:

```tsx
import { canInstall, promptInstall } from './utils/pwa';

function InstallButton() {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    // Listen for install prompt availability
    const checkInstall = setInterval(() => {
      setInstallable(canInstall());
    }, 1000);
    return () => clearInterval(checkInstall);
  }, []);

  if (!installable) return null;

  return (
    <button onClick={() => promptInstall()}>
      📱 Install App
    </button>
  );
}
```

## Notifications (Future Enhancement)

To add push notifications:

```tsx
import { requestNotificationPermission, sendNotification } from './utils/pwa';

// Request permission
const permission = await requestNotificationPermission();

// Send notification
if (permission === 'granted') {
  sendNotification('Game Starting!', {
    body: 'All players have been assigned their roles',
    icon: '/icon-192.png',
    vibrate: [200, 100, 200]
  });
}
```

## Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure you're using HTTPS (or localhost)
- Clear browser cache and try again
- Check that `/public/service-worker.js` is accessible

### App Not Installable
- Verify manifest.json is valid JSON
- Ensure icons exist at specified paths
- Check that you're using HTTPS
- Try in Chrome/Edge (best PWA support)

### Offline Mode Not Working
- Check Service Worker is active in DevTools
- Verify pages were visited while online (to cache them)
- Check network tab to see which requests fail offline
- Clear cache and try again

### iOS Safari Issues
- Ensure viewport meta tag is correct
- Icons must be served from same domain
- Some features (push notifications) not supported on iOS

## Deployment

When deploying, ensure:
1. All files in `/public/` are served at root level
2. Service worker is served with correct MIME type (`application/javascript`)
3. HTTPS is enabled (required for service workers)
4. Manifest.json is accessible at `/manifest.json`
5. Icons are accessible at `/icon-192.png` and `/icon-512.png`

## Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google PWA Checklist](https://web.dev/pwa-checklist/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox](https://developers.google.com/web/tools/workbox) - Advanced service worker library

## Next Steps

1. **Create App Icons** - Design and add icon-192.png and icon-512.png
2. **Test Installation** - Try installing on desktop and mobile
3. **Run Lighthouse** - Audit and improve PWA score
4. **Test Offline** - Verify offline functionality works
5. **Deploy** - Push to production and test on real devices

Your app is now a fully functional PWA! 🎉
