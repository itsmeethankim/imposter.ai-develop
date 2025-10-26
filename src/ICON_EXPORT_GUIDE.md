# App Icon Export Guide

## Your Selected Icon - READY TO USE! ✨

The perfect icons for your Imposter game have been provided and are ready to download!

**Source Images:**
- **icon-192.png:** `figma:asset/734f89d3888e17342f83a9ad7695b51ae1906e4c.png`
- **icon-512.png:** `figma:asset/0a2b70c25f5ad30d26944f9bc183dc7bf481f2d4.png`

These icons feature:
- 👼 White angel/innocent ghost with golden halo
- 👽 Purple imposter blob peeking from behind
- Perfect duality representing your social deduction game!

## Required Exports

To complete your PWA setup, you need to export this icon in two sizes:

### 1. Icon 192x192 (`/public/icon-192.png`)
- **Size:** 192 × 192 pixels
- **Format:** PNG
- **Usage:** Home screen icon, app launcher, manifest

### 2. Icon 512x512 (`/public/icon-512.png`)
- **Size:** 512 × 512 pixels  
- **Format:** PNG
- **Usage:** Splash screens, high-res displays, app stores

## Export Instructions

### ⭐ RECOMMENDED: Use the Icon Export Helper

The easiest way to get your icons is to use the built-in Icon Export Helper:

1. Open your app and navigate to the Icon Export Helper page
2. Click the download button for **icon-192.png**
3. Click the download button for **icon-512.png**
4. Save both files to your `/public/` folder
5. ✅ Done!

Alternatively, right-click on each displayed icon and select "Save Image As..."

### From Figma (If You Have the Source)
1. Select the icon frame/layer in Figma
2. In the right panel, click **Export**
3. Choose **PNG** format
4. Set size to **192w × 192h** for the first export
5. Click **Export icon-192**
6. Save to `/public/icon-192.png`
7. Repeat steps 3-6 with **512w × 512h** for the second export
8. Save to `/public/icon-512.png`

### Using Image Editing Software

**Photoshop:**
1. Open the source image
2. Go to Image → Image Size
3. Set to 192 × 192 (ensure "Constrain Proportions" is checked)
4. File → Export → Export As → PNG
5. Save to `/public/icon-192.png`
6. Repeat for 512 × 512 version

**GIMP (Free):**
1. Open the source image
2. Image → Scale Image
3. Set to 192 × 192 (chain link icon should be locked)
4. Scale
5. File → Export As → PNG
6. Save to `/public/icon-192.png`
7. Repeat for 512 × 512 version

**Online Tools:**
1. Visit [Favicon.io](https://favicon.io/favicon-converter/)
2. Upload your icon image
3. Download the generated icons
4. Rename to `icon-192.png` and `icon-512.png`
5. Place in `/public/` folder

### Command Line (ImageMagick)

If you have ImageMagick installed:

```bash
# Export at 192x192
magick convert source-icon.png -resize 192x192 public/icon-192.png

# Export at 512x512
magick convert source-icon.png -resize 512x512 public/icon-512.png
```

### Command Line (sips - macOS only)

```bash
# Export at 192x192
sips -z 192 192 source-icon.png --out public/icon-192.png

# Export at 512x512
sips -z 512 512 source-icon.png --out public/icon-512.png
```

## Icon Design Notes

Your selected icon is already perfectly designed:

✅ **Square aspect ratio** - 1:1 ratio works perfectly  
✅ **Distinctive characters** - Angel and imposter clearly visible  
✅ **Good contrast** - Purple and white stand out on all backgrounds  
✅ **Appropriate padding** - Characters have breathing room  
✅ **Theme consistency** - Matches your app's imposter energy aesthetic  
✅ **Recognizable** - Clear at small sizes (192px) and large (512px)

## Verification

After exporting, verify your icons:

### File Checklist
- [ ] `/public/icon-192.png` exists (192 × 192 pixels)
- [ ] `/public/icon-512.png` exists (512 × 512 pixels)
- [ ] Both files are PNG format
- [ ] Both files have transparent or appropriate backgrounds
- [ ] File sizes are reasonable (< 100KB each)

### Testing
1. **Chrome DevTools:**
   - Open DevTools (F12)
   - Go to Application tab
   - Click Manifest
   - Verify icons appear correctly

2. **Installation Test:**
   - Install the PWA on your device
   - Check that the home screen icon looks good
   - Verify it matches your intended design

3. **Visual Check:**
   - Open both icon files
   - Ensure they're crisp and clear
   - No pixelation or artifacts
   - Characters are centered and visible

## Troubleshooting

### Icons Not Appearing
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R)
- Check file names match exactly: `icon-192.png` and `icon-512.png`
- Verify files are in `/public/` directory
- Check file permissions (should be readable)

### Icons Look Blurry
- Ensure you exported at exact sizes (192×192 and 512×512)
- Don't upscale from smaller images
- Use PNG format, not JPG
- Check that resize algorithm used "bicubic" or "lanczos" interpolation

### Wrong Icon Showing
- Browser may cache old icons for days/weeks
- Uninstall the PWA completely
- Clear all browser data
- Reinstall the app
- On iOS, may need to delete and re-add to home screen

## Platform-Specific Notes

### iOS (Safari)
- Uses `icon-192.png` for home screen
- Automatically adds rounded corners
- May apply subtle gradient overlay
- Padding in your icon prevents cropping

### Android (Chrome)
- Uses adaptive icon sizing
- Supports both icon sizes
- May apply circular mask on some launchers
- Your centered design works well

### Desktop (Chrome/Edge)
- Uses `icon-192.png` for app drawer
- Uses `icon-512.png` for splash screen
- Appears in taskbar when installed
- Windows may use for Start Menu tile

## Next Steps

Once you've exported the icons:

1. ✅ Place `icon-192.png` in `/public/`
2. ✅ Place `icon-512.png` in `/public/`
3. ✅ Test installation on desktop
4. ✅ Test installation on mobile
5. ✅ Run Lighthouse PWA audit
6. ✅ Deploy and celebrate! 🎉

Your app will now have a professional, recognizable icon that perfectly represents the Imposter game experience!
