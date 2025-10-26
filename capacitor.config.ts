import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.imposterai.game',
  appName: 'Imposter',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // Auto-hide disabled - we control it manually
      launchAutoHide: false, // Prevent auto-hide
      backgroundColor: "#1A1A1A",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
    },
  },
};

export default config;