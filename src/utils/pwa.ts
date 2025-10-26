/**
 * PWA Utilities - Service Worker registration and install prompt handling
 */

import { isCapacitor } from './platform';

let deferredPrompt: any = null;

/**
 * Register the service worker
 */
export function registerServiceWorker() {
  // Skip service worker registration in Capacitor native apps
  if (isCapacitor()) {
    console.log('[PWA] Running in Capacitor - Service Worker not needed for native app');
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          scope: '/'
        });
        
        console.log('[PWA] Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New service worker available, prompting for update...');
                showUpdateNotification();
              }
            });
          }
        });
        
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error);
      }
    });
  } else {
    console.log('[PWA] Service Workers not supported in this browser');
  }
}

/**
 * Show update notification to user
 */
function showUpdateNotification() {
  // You can integrate with a toast notification library here
  if (confirm('A new version of the app is available. Reload to update?')) {
    window.location.reload();
  }
}

/**
 * Handle PWA install prompt
 */
export function setupInstallPrompt() {
  // Skip install prompt in Capacitor native apps
  if (isCapacitor()) {
    console.log('[PWA] Running in Capacitor - Install prompt not needed for native app');
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar
    e.preventDefault();
    // Store the event for later use
    deferredPrompt = e;
    
    console.log('[PWA] Install prompt ready');
    
    // Show custom install button or UI
    showInstallButton();
  });
  
  // Handle successful installation
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully');
    deferredPrompt = null;
  });
}

/**
 * Show custom install button
 */
function showInstallButton() {
  // You can implement a custom UI here
  // For now, just log that the app is installable
  console.log('[PWA] App is installable - show custom install button if desired');
}

/**
 * Trigger the install prompt
 */
export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) {
    console.log('[PWA] Install prompt not available');
    return false;
  }
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user's response
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`[PWA] User response to install prompt: ${outcome}`);
  
  // Clear the deferred prompt
  deferredPrompt = null;
  
  return outcome === 'accepted';
}

/**
 * Check if app is running in standalone mode (installed as PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

/**
 * Check if PWA install is available
 */
export function canInstall(): boolean {
  return deferredPrompt !== null;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if ('Notification' in window) {
    return await Notification.requestPermission();
  }
  return 'denied';
}

/**
 * Send a notification (requires permission)
 */
export function sendNotification(title: string, options?: NotificationOptions) {
  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Send notification via service worker for better reliability
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          ...options
        });
      });
    } else {
      new Notification(title, {
        icon: '/icon-192.png',
        ...options
      });
    }
  }
}

/**
 * Clear all caches (useful for debugging)
 */
export async function clearAllCaches() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('[PWA] All caches cleared');
  }
}
