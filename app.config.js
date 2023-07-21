// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

/** @type {import('expo/config').ExpoConfig} */
export default {
  name: 'Box Calculator',
  slug: 'box-calculator',
  version: '1.0.0',
  extra: {
    eas: {
      projectId: "4664018b-88df-40f6-a63b-b8dc3204bc6d",
    },
  },
  plugins: [
  ],
  scheme: 'boxcalculator',
  orientation: 'default',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier : "host.exp.expo"

  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: "com.box.Boxestimate"
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
};