# UI Sound Effects Specification

## Overview
This document outlines the UI sound effects (SFX) needed for the social deduction party game. All sounds should be short, punchy, and designed for mobile devices with attention to battery and performance.

---

## Sound Effects List

### 1. **Tap / Button Press**
**Duration:** 50-100ms  
**Waveform:** Short sine wave burst with quick attack and decay  
**Frequency:** 800-1200Hz  
**Characteristics:**
- Attack: 5ms
- Decay: 45-95ms
- Amplitude: Moderate (comfortable volume)
- Envelope: ADSR with very short attack, no sustain, quick decay
- Effects: Slight high-pass filter (remove frequencies below 500Hz)

**Export Settings:**
- Format: MP3 (mobile-optimized)
- Sample Rate: 44.1kHz
- Bit Rate: 128kbps
- Mono (not stereo - saves file size)

**Design Notes:** Clean, subtle click that provides tactile feedback without being intrusive. Should feel "light" and responsive.

---

### 2. **Confirm / Success**
**Duration:** 200-350ms  
**Waveform:** Ascending chord or major triad  
**Frequency:** Start at 500Hz, rise to 1000Hz  
**Characteristics:**
- Two-tone sequence (C5 → E5 or similar pleasant interval)
- Attack: 10ms
- Decay: Gentle fade over 200ms
- Add subtle reverb tail (20% wet)
- Slight bright harmonic overtones

**Export Settings:**
- Format: MP3
- Sample Rate: 44.1kHz
- Bit Rate: 192kbps (higher quality for more complex sound)
- Mono

**Design Notes:** Positive, uplifting sound. Think "success chime" that makes users feel good about their action. Similar to iOS confirmation sounds.

---

### 3. **Error / Invalid Action**
**Duration:** 150-250ms  
**Waveform:** Descending minor interval or dissonant tones  
**Frequency:** Start at 600Hz, drop to 300Hz  
**Characteristics:**
- Two-tone sequence with slight dissonance (tritone or minor 2nd)
- Attack: 5ms (sharp)
- Decay: Quick cutoff at 150-200ms
- No reverb (dry sound)
- Slight distortion/grit (5-10%)

**Export Settings:**
- Format: MP3
- Sample Rate: 44.1kHz
- Bit Rate: 128kbps
- Mono

**Design Notes:** Should sound "wrong" without being harsh or annoying. Gentle enough for repeated errors but distinct enough to communicate failure clearly.

---

### 4. **Countdown Tick**
**Duration:** 80-120ms  
**Waveform:** Short percussive click or woodblock sound  
**Frequency:** 1000-1500Hz  
**Characteristics:**
- Very sharp attack (1-2ms)
- Quick decay (75-115ms)
- Minimal sustain
- Add subtle pitch modulation (5% variation per tick for urgency)
- **Last 10 seconds:** Increase pitch and volume by 10-15%

**Export Settings:**
- Format: MP3
- Sample Rate: 44.1kHz
- Bit Rate: 96kbps (very simple sound)
- Mono

**Design Notes:** Minimalist tick that doesn't distract from gameplay. Should be audible but not annoying during long countdowns. Urgency increases as time runs out.

---

### 5. **Vote Cast**
**Duration:** 250-400ms  
**Waveform:** Whoosh + soft thump combination  
**Frequency:** Broadband (200Hz-8kHz) with emphasis on 400-800Hz  
**Characteristics:**
- Two-stage sound:
  1. Whoosh (white noise filtered): 0-150ms
  2. Soft thump (bass): 150-400ms
- Attack: 5ms for whoosh, 10ms for thump
- Add subtle reverb (15% wet, small room)
- Slight stereo width effect (optional)

**Export Settings:**
- Format: MP3
- Sample Rate: 44.1kHz
- Bit Rate: 192kbps
- Stereo (creates spatial feel)

**Design Notes:** Should feel like a "ballot being cast" or "decision locked in." Satisfying and final without being too dramatic.

---

### 6. **Start Match / Game Begin**
**Duration:** 400-500ms  
**Waveform:** Layered ascending chord progression with shimmer  
**Frequency:** 200Hz (bass) + 800Hz (mid) + 2-4kHz (sparkle)  
**Characteristics:**
- Three-layer sound:
  1. Bass foundation (200-300Hz)
  2. Main melody (rising major chord: C → E → G)
  3. High-frequency shimmer/bells (2-4kHz)
- Attack: 20ms
- Sustain: 200ms
- Decay: 200-280ms with reverb tail
- Add bright harmonic overtones
- Subtle reverb (30% wet, medium hall)

**Export Settings:**
- Format: MP3
- Sample Rate: 44.1kHz
- Bit Rate: 256kbps (highest quality for important moment)
- Stereo

**Design Notes:** Epic, exciting sound that creates anticipation. Should feel like "the game is beginning!" Similar to RPG battle start or level-up sounds.

---

### 7. **Win Sting**
**Duration:** 450-500ms  
**Waveform:** Major chord arpeggio with sparkle and shimmer  
**Frequency:** 400Hz → 800Hz → 1600Hz (ascending)  
**Characteristics:**
- Triumphant ascending arpeggio (major 7th or major 9th chord)
- Three-note sequence with slight overlap
- Add bell-like harmonics in upper register (3-6kHz)
- Bright reverb tail (40% wet)
- Optional subtle choir/vocal pad underneath
- Gentle compression for fullness

**Export Settings:**
- Format: MP3
- Sample Rate: 48kHz (higher fidelity for emotional impact)
- Bit Rate: 256kbps
- Stereo

**Design Notes:** Celebratory and triumphant. Should make winners feel accomplished. Reference: game show win sounds, iOS achievement unlocks.

---

### 8. **Lose Sting**
**Duration:** 400-500ms  
**Waveform:** Descending minor chord with subtle dissonance  
**Frequency:** 800Hz → 400Hz → 200Hz (descending)  
**Characteristics:**
- Gentle descending progression (minor chord)
- Not harsh or punishing - empathetic tone
- Subtle string-like texture
- Soft reverb (25% wet)
- Gentle fade-out
- Slightly muted/warm tone (low-pass filter at 3kHz)

**Export Settings:**
- Format: MP3
- Sample Rate: 48kHz
- Bit Rate: 256kbps
- Stereo

**Design Notes:** Should communicate loss without making players feel bad. Gentle, "better luck next time" feeling. Think puzzle game "try again" sounds rather than harsh failure buzzer.

---

## Additional Sounds to Consider

### 9. **Swipe / Card Flip** (for Role Reveal)
**Duration:** 180-250ms  
**Waveform:** Whoosh with pitch bend  
**Frequency:** Broadband with emphasis on 2-6kHz  

### 10. **Avatar Select**
**Duration:** 120-180ms  
**Waveform:** Soft pop + subtle sparkle  
**Frequency:** 600-1200Hz  

### 11. **Modal Open/Close**
**Duration:** 150-200ms  
**Waveform:** Gentle whoosh (open) / soft thud (close)  
**Frequency:** Broadband 300Hz-4kHz  

---

## Technical Implementation Guidelines

### File Organization
```
/public/sounds/
  ├── tap.mp3
  ├── confirm.mp3
  ├── error.mp3
  ├── countdown-tick.mp3
  ├── vote-cast.mp3
  ├── start-match.mp3
  ├── win-sting.mp3
  └── lose-sting.mp3
```

### Web Audio API Implementation
```typescript
// Example sound manager
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  
  async preload(soundName: string, path: string) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    this.sounds.set(soundName, audio);
  }
  
  play(soundName: string, volume: number = 1) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play().catch(e => console.warn('Audio play failed:', e));
    }
  }
}
```

### Volume Recommendations
- Tap/Button: 40-50% of max
- Confirm: 60-70% of max
- Error: 50-60% of max
- Countdown: 30-40% of max (subtle)
- Vote Cast: 70-80% of max
- Start Match: 80-90% of max
- Win Sting: 85-95% of max
- Lose Sting: 70-80% of max

### User Settings
Always provide:
- ✅ Sound effects toggle (on/off)
- ✅ Volume slider (0-100%)
- ✅ Respect device silent mode
- ✅ Reduce motion/sound accessibility option

---

## Sound Design Tools

### Free Options
- **Audacity** - Free, open-source audio editor
- **LMMS** - Free music production software
- **sfxr** / **jsfxr** - 8-bit sound effect generator (good for game SFX)
- **ChipTone** - Online retro sound generator

### Paid Options
- **Logic Pro** / **GarageBand** (Mac)
- **Ableton Live**
- **FL Studio**

### Sound Libraries (Royalty-Free)
- **freesound.org** - Community sound library
- **zapsplat.com** - Free sound effects
- **mixkit.co** - Free UI sounds
- **uppbeat.io** - Free music and SFX

---

## Mobile Optimization

### Performance Tips
1. **Preload essential sounds** during app initialization
2. **Use compressed MP3** (not WAV) for smaller file sizes
3. **Keep files under 50KB each** when possible
4. **Mono instead of stereo** for simple UI sounds (50% file size)
5. **Limit concurrent sounds** to 3-4 max
6. **Use Web Audio API** for better performance than HTML5 Audio
7. **Implement sound pooling** for frequently used sounds

### Battery Considerations
- Avoid continuous background sounds
- Use event-driven playback only
- Disable sounds when app is backgrounded
- Provide easy toggle for users who want to preserve battery

---

## Accessibility

### WCAG Guidelines
- **Don't rely solely on sound** for important information
- Provide **visual feedback** alongside audio cues
- Offer **haptic feedback** as alternative on supported devices
- Allow users to **disable all sounds** without breaking functionality
- Test with **screen readers** to ensure compatibility

### Haptic Feedback Mapping
- Tap → Light impact
- Confirm → Medium impact  
- Error → Notification feedback
- Vote Cast → Heavy impact
- Win → Success notification
- Lose → Warning notification

---

## Testing Checklist

- [ ] Test on iOS Safari (WebKit restrictions)
- [ ] Test on Android Chrome
- [ ] Test with device volume at 0%, 50%, 100%
- [ ] Test with device in silent mode
- [ ] Test with other apps playing audio simultaneously
- [ ] Test file sizes are optimized (<50KB each)
- [ ] Test all sounds play correctly on first tap (no delay)
- [ ] Test sounds don't overlap awkwardly
- [ ] Verify sounds respect user settings
- [ ] Check memory usage with all sounds loaded

---

## Sound Personality

The sound design should match your game's aesthetic:
- **Clean & Modern** - Crisp, digital sounds (not retro/8-bit)
- **Sophisticated** - Avoid childish or cartoon-y sounds
- **Subtle** - UI sounds should support, not dominate
- **Premium Feel** - High-quality, well-produced audio
- **Social & Friendly** - Warm tones, not cold or harsh

Think: **Apple UI sounds** meets **modern board game apps** (like Codenames, Among Us).

---

## Next Steps

1. **Source or create** sounds based on these specifications
2. **Export** using recommended settings
3. **Implement** sound manager in your React app
4. **Add UI controls** for sound settings
5. **Test** on multiple devices
6. **Iterate** based on user feedback

For a polished feel, consider hiring a sound designer from:
- Fiverr ($20-100 for full UI sound package)
- Upwork
- 99designs
- Or use pre-made UI sound packs from game asset stores
