// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

/** @type {import('expo/config').ExpoConfig} */
export default {
  name: 'Box Calculator',
  slug: 'box-calculator',
  version: '1.0.0',
  extra: {
    // pageBaseUrl: process.env.ACUBALL_BASE_URL,
    eas: {
      projectId: "4664018b-88df-40f6-a63b-b8dc3204bc6d",
    },
  },
  plugins: [
  ],
  scheme: 'boxcalculator',
  orientation: 'default',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,

  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
    package: "com.box.Boxestimate"
  },
  web: {
    favicon: './assets/favicon.png',
  },
};