/**
 * Sound Manager - Handles all UI sound effects for the game
 * Optimized for mobile web with preloading, pooling, and battery consideration
 */

export type SoundName = 
  | 'tap'
  | 'confirm'
  | 'error'
  | 'countdown-tick'
  | 'vote-cast'
  | 'start-match'
  | 'win-sting'
  | 'lose-sting'
  | 'swipe'
  | 'avatar-select'
  | 'modal-open'
  | 'modal-close';

class SoundManager {
  private sounds: Map<SoundName, HTMLAudioElement[]> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.7;
  private poolSize: number = 3; // Number of instances per sound for overlapping
  private currentIndex: Map<SoundName, number> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    // Load settings from localStorage
    const savedEnabled = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('soundVolume');
    
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }
    
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
  }

  /**
   * Initialize and preload all sounds
   */
  async init() {
    if (this.isInitialized) return;

    // Silent audio data URI (tiny 0.1s silence MP3)
    // This is a placeholder until real sound files are added
    const silentAudio = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAA4T0JsWTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//syZAYP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

    const soundFiles: Record<SoundName, string> = {
      'tap': '/sounds/tap.mp3',
      'confirm': '/sounds/confirm.mp3',
      'error': '/sounds/error.mp3',
      'countdown-tick': '/sounds/countdown-tick.mp3',
      'vote-cast': '/sounds/vote-cast.mp3',
      'start-match': '/sounds/start-match.mp3',
      'win-sting': '/sounds/win-sting.mp3',
      'lose-sting': '/sounds/lose-sting.mp3',
      'swipe': '/sounds/swipe.mp3',
      'avatar-select': '/sounds/avatar-select.mp3',
      'modal-open': '/sounds/modal-open.mp3',
      'modal-close': '/sounds/modal-close.mp3',
    };

    // Preload each sound with pooling
    const loadPromises = Object.entries(soundFiles).map(([name, path]) => 
      this.preloadSound(name as SoundName, path)
    );

    try {
      await Promise.all(loadPromises);
      this.isInitialized = true;
      console.log('🔊 Sound Manager initialized');
    } catch (error) {
      console.warn('⚠️ Some sounds failed to load:', error);
      // Continue anyway - graceful degradation
      this.isInitialized = true;
    }
  }

  /**
   * Preload a single sound with pooling
   */
  private async preloadSound(name: SoundName, path: string): Promise<void> {
    const pool: HTMLAudioElement[] = [];
    const silentAudio = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAA4T0JsWTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//syZAYP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

    for (let i = 0; i < this.poolSize; i++) {
      const audio = new Audio();
      audio.preload = 'auto';
      
      try {
        // Try to load the actual file first
        const response = await fetch(path, { method: 'HEAD' }).catch(() => null);
        
        if (response && response.ok) {
          // File exists - use it
          audio.src = path;
          // Wait for the audio to be loaded
          await new Promise((resolve, reject) => {
            audio.addEventListener('loadeddata', resolve, { once: true });
            audio.addEventListener('error', reject, { once: true });
            audio.load();
          });
          pool.push(audio);
        } else {
          // File doesn't exist - use silent placeholder
          audio.src = silentAudio;
          // Wait for silent audio to load
          await new Promise((resolve) => {
            audio.addEventListener('loadeddata', resolve, { once: true });
            audio.load();
          });
          pool.push(audio);
          
          // Only log once for the first instance
          if (i === 0) {
            console.log(`🔇 Using silent placeholder for: ${name} (add ${path} for real sound)`);
          }
        }
      } catch (error) {
        // Fallback to silent audio on any error
        audio.src = silentAudio;
        try {
          await new Promise((resolve) => {
            audio.addEventListener('loadeddata', resolve, { once: true });
            audio.load();
          });
        } catch {
          // If even silent audio fails, just add the element anyway
        }
        pool.push(audio);
      }
    }

    this.sounds.set(name, pool);
    this.currentIndex.set(name, 0);
  }

  /**
   * Play a sound effect
   */
  play(name: SoundName, volumeOverride?: number) {
    if (!this.enabled || !this.isInitialized) return;

    const pool = this.sounds.get(name);
    if (!pool || pool.length === 0) return;

    // Get current sound from pool and rotate
    const currentIdx = this.currentIndex.get(name) || 0;
    const sound = pool[currentIdx];
    this.currentIndex.set(name, (currentIdx + 1) % pool.length);

    // Check if audio has a valid source before trying to play
    if (!sound.src || sound.readyState === 0) {
      // Audio not ready, skip silently
      return;
    }

    // Apply volume
    const finalVolume = volumeOverride !== undefined ? volumeOverride : this.getVolumeForSound(name);
    sound.volume = finalVolume * this.volume;

    // Reset and play
    sound.currentTime = 0;
    sound.play().catch(e => {
      // Silently handle autoplay restrictions and missing sources
      if (e.name !== 'NotAllowedError' && e.name !== 'NotSupportedError') {
        console.warn(`Failed to play sound ${name}:`, e.name);
      }
    });

    // Haptic feedback for key sounds
    if (['tap', 'confirm', 'vote-cast'].includes(name)) {
      this.vibrate(name);
    }
  }

  /**
   * Get recommended volume for specific sound
   */
  private getVolumeForSound(name: SoundName): number {
    const volumes: Record<SoundName, number> = {
      'tap': 0.4,
      'confirm': 0.6,
      'error': 0.5,
      'countdown-tick': 0.3,
      'vote-cast': 0.7,
      'start-match': 0.85,
      'win-sting': 0.9,
      'lose-sting': 0.75,
      'swipe': 0.5,
      'avatar-select': 0.6,
      'modal-open': 0.4,
      'modal-close': 0.4,
    };
    return volumes[name] || 0.5;
  }

  /**
   * Trigger haptic feedback
   */
  private vibrate(name: SoundName) {
    if (!navigator.vibrate) return;

    const patterns: Record<string, number | number[]> = {
      'tap': 10,
      'confirm': [10, 20, 10],
      'vote-cast': 50,
      'error': [20, 10, 20],
    };

    const pattern = patterns[name];
    if (pattern) {
      navigator.vibrate(pattern);
    }
  }

  /**
   * Enable/disable all sounds
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem('soundEnabled', enabled.toString());
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('soundVolume', this.volume.toString());
  }

  /**
   * Get current settings
   */
  getEnabled(): boolean {
    return this.enabled;
  }

  getVolume(): number {
    return this.volume;
  }

  /**
   * Cleanup - stop all sounds
   */
  cleanup() {
    this.sounds.forEach(pool => {
      pool.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    });
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Helper hooks for React components
export const useSound = () => {
  return {
    play: (name: SoundName, volume?: number) => soundManager.play(name, volume),
    setEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    enabled: soundManager.getEnabled(),
    volume: soundManager.getVolume(),
  };
};
