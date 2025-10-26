# Sound Effects Directory

This directory contains all UI sound effects for the game. Place your `.mp3` files here.

## Required Sound Files

You need to add these 12 sound files (see `/SOUND_EFFECTS_SPEC.md` for detailed specifications):

### Core Sounds (Required)
1. **tap.mp3** - Button press feedback (50-100ms)
2. **confirm.mp3** - Success/confirmation (200-350ms)
3. **error.mp3** - Error/invalid action (150-250ms)
4. **countdown-tick.mp3** - Timer tick (80-120ms)
5. **vote-cast.mp3** - Vote submission (250-400ms)
6. **start-match.mp3** - Game begin (400-500ms)
7. **win-sting.mp3** - Victory sound (450-500ms)
8. **lose-sting.mp3** - Defeat sound (400-500ms)

### Additional Sounds (Optional)
9. **swipe.mp3** - Card flip/role reveal (180-250ms)
10. **avatar-select.mp3** - Avatar selection (120-180ms)
11. **modal-open.mp3** - Modal appears (150-200ms)
12. **modal-close.mp3** - Modal disappears (150-200ms)

## Where to Get Sounds

### Free Sound Libraries
- **freesound.org** - Community uploaded sounds (requires account)
- **zapsplat.com** - Free UI sounds (requires account)
- **mixkit.co/free-sound-effects/game/** - Free game UI sounds (no account)
- **pixabay.com/sound-effects/** - Royalty-free sounds

### Quick Option: Use a UI Sound Pack
Search for "UI sound pack" or "game UI sounds" on these sites:
- **itch.io** - Many free game asset packs
- **OpenGameArt.org** - Community game assets
- **Kenney.nl** - Free game assets including sounds

### Generate Your Own
- **jsfxr.com** - Browser-based retro sound generator
- **sfxr.me** - 8-bit sound effect generator
- **ChipTone** - Advanced retro sound tool

### Hire a Sound Designer (Recommended for Polish)
- **Fiverr** - $20-100 for full UI sound package
- **Upwork** - Professional sound designers
- Search for "UI sound design" or "game sfx"

## Sound Specifications

Each sound should be:
- **Format:** MP3 (for web compatibility)
- **Sample Rate:** 44.1kHz or 48kHz
- **Bit Rate:** 128-256kbps
- **Channels:** Mono (for simple UI sounds) or Stereo (for spatial effects)
- **File Size:** Under 50KB each (mobile optimization)

## Testing

Once you add the files:
1. Open the app
2. Click buttons to hear tap sounds
3. Navigate through flows to test all sounds
4. Check browser console for any missing file warnings
5. Test on mobile devices (iOS Safari, Android Chrome)

## Fallback Behavior

If sound files are missing:
- The app will continue to work normally
- No sounds will play (graceful degradation)
- A warning will appear in the browser console
- Haptic feedback will still work (on supported devices)

## Current Status

🔇 **Currently using silent placeholders** 

The sound system is active but playing silent audio until you add real sound files.

To add real sounds:
1. Download or create the 12 MP3 files (see sources above)
2. Place them in this `/public/sounds/` directory
3. Ensure filenames match exactly (e.g., `tap.mp3`, `confirm.mp3`)
4. Refresh the app - the sounds will automatically load!

You'll see console messages like:
- `🔇 Using silent placeholder for: tap` (means file not found)
- `🔊 Sound Manager initialized` (means system is ready)

All sound triggers are working - they're just silent until you add the audio files. The game is fully playable!
