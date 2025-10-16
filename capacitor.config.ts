import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guillermo_projectmanagement.memosnotes',
  appName: "Memo's Notes",
  webDir: '.output/public',
  server: {
    androidScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1c044f",
      showSpinner: false,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#1c044f",
    },
  },
};

export default config;