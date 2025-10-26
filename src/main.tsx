import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/globals.css';

// Global error handler to catch all uncaught errors
window.addEventListener('error', (event) => {
  console.error('🚨 Global error caught:', event.error);
  console.error('🚨 Error message:', event.message);
  console.error('🚨 Error stack:', event.error?.stack);
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
});

console.log('🚀 App starting - main.tsx loaded');
console.log('📱 Platform:', navigator.userAgent);
console.log('🌐 Location:', window.location.href);

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found!');
  }
  
  console.log('✅ Root element found, creating React root...');
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('✅ React root created and rendering...');
} catch (error) {
  console.error('🚨 Fatal error during app initialization:', error);
  
  // Fallback UI if React fails to initialize
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background: #1A1A1A; display: flex; align-items: center; justify-content: center; padding: 24px;">
        <div style="max-width: 400px; background: #2D2D2D; border-radius: 16px; padding: 32px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <h1 style="color: white; font-size: 24px; margin-bottom: 8px;">Failed to Start</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 24px;">
            The app encountered a critical error during startup
          </p>
          <button onclick="window.location.reload()" style="width: 100%; padding: 16px; border-radius: 12px; background: white; color: #1A1A1A; font-weight: 600; border: none; cursor: pointer;">
            Reload App
          </button>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 16px; font-family: monospace;">
            ${error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </div>
    `;
  }
}
