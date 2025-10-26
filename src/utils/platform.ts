/**
 * Platform detection utilities for Capacitor native apps
 */

/**
 * Check if app is running in Capacitor (native mobile app)
 */
export function isCapacitor(): boolean {
  return !!(window as any).Capacitor || 
         window.location.protocol === 'capacitor:' ||
         window.location.protocol === 'ionic:';
}

/**
 * Check if running on iOS
 */
export function isIOS(): boolean {
  if (!isCapacitor()) return false;
  
  const capacitor = (window as any).Capacitor;
  return capacitor?.getPlatform() === 'ios';
}

/**
 * Check if running on Android
 */
export function isAndroid(): boolean {
  if (!isCapacitor()) return false;
  
  const capacitor = (window as any).Capacitor;
  return capacitor?.getPlatform() === 'android';
}

/**
 * Check if running in web browser
 */
export function isWeb(): boolean {
  return !isCapacitor();
}

/**
 * Get platform name
 */
export function getPlatform(): 'ios' | 'android' | 'web' {
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  return 'web';
}

/**
 * Check if running in development mode
 */
export function isDev(): boolean {
  return import.meta.env.DEV;
}

/**
 * Check if running in production mode
 */
export function isProd(): boolean {
  return import.meta.env.PROD;
}

/**
 * Log platform information
 */
export function logPlatformInfo(): void {
  console.log('🔍 Platform Info:', {
    platform: getPlatform(),
    isCapacitor: isCapacitor(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isWeb: isWeb(),
    isDev: isDev(),
    isProd: isProd(),
    userAgent: navigator.userAgent,
  });
}
