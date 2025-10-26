# 📱 Export Your App Icons Here

## ✨ YOUR ICONS ARE READY!

The perfect app icons have been selected and are ready to use!

### Required Files for This Directory

Place these two files in `/public/`:

#### ✅ icon-192.png
- **Size:** 192 × 192 pixels
- **Format:** PNG
- **Source:** `figma:asset/734f89d3888e17342f83a9ad7695b51ae1906e4c.png`

#### ✅ icon-512.png
- **Size:** 512 × 512 pixels
- **Format:** PNG
- **Source:** `figma:asset/0a2b70c25f5ad30d26944f9bc183dc7bf481f2d4.png`

## 🎨 Icon Design

Your app icon features:
- 👼 **White angel/innocent ghost** with golden halo (representing innocent players)
- 👽 **Purple imposter blob** peeking from behind (representing the imposter)
- Perfect duality representing your social deduction game!
- Beautiful contrast on all backgrounds

## 🚀 Quick Setup (3 Methods)

### Method 1: Use the Icon Export Helper (Easiest!)

Visit the Icon Export Helper page in your app to download the icons:

1. The helper displays both icons with download buttons
2. Click "Download icon-192.png" and "Download icon-512.png"
3. Save both files to this `/public/` folder
4. Done! ✅

### Method 2: Right-Click Download

1. Open the Icon Export Helper page
2. Right-click on the 192×192 icon → "Save Image As..."
3. Save as `icon-192.png` in `/public/`
4. Right-click on the 512×512 icon → "Save Image As..."
5. Save as `icon-512.png` in `/public/`
6. Done! ✅

### Method 3: Export from Figma

If you have access to the original Figma files:

1. Select the icon layer/frame
2. Export at 192×192px → Save as `/public/icon-192.png`
3. Export at 512×512px → Save as `/public/icon-512.png`
4. Done! ✅

## ✅ Verification Checklist

After placing the files:

- [ ] `/public/icon-192.png` exists (192 × 192 pixels)
- [ ] `/public/icon-512.png` exists (512 × 512 pixels)
- [ ] Both files are PNG format
- [ ] Angel character with halo is visible
- [ ] Purple imposter is visible peeking from behind
- [ ] Icons display correctly in Chrome DevTools → Application → Manifest
- [ ] PWA installs successfully with correct icon

## 📱 Where These Icons Are Used

- **Home Screen:** When users install your PWA
- **App Launcher:** Desktop and mobile app drawers
- **Splash Screen:** Loading screen on app startup
- **Task Switcher:** When switching between apps
- **Browser Tabs:** Favicon in browser
- **Share Dialogs:** When sharing the app

## 🎯 File Locations

```
/public/
├── icon-192.png  ← 192×192 icon goes here
├── icon-512.png  ← 512×512 icon goes here
├── manifest.json (already configured ✅)
└── service-worker.js (already configured ✅)
```

## 🔧 Troubleshooting

**Icons not appearing?**
- Ensure exact filenames: `icon-192.png` and `icon-512.png`
- Check files are in `/public/` directory
- Hard refresh browser (Ctrl+Shift+R)
- Clear cache and reinstall PWA

**Download buttons not working?**
- Use right-click method instead
- Or export directly from Figma

**Wrong size?**
- Verify dimensions in image properties
- Should be exactly 192×192 and 512×512

## 📚 Additional Resources

- See `/ICON_EXPORT_GUIDE.md` for detailed instructions
- See `/PWA_SETUP.md` for complete PWA documentation
- Icons imported in `/utils/icons.ts`
- Icon helper component at `/components/IconExportHelper.tsx`

Your PWA setup is almost complete! Just add these two icon files and you're ready to launch! 🚀
