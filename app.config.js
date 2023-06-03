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
    // eas: {
    //   projectId: process.env.EAS_PROJECT_ID,
    // },
  },
  plugins: [
  ],
  scheme: 'boxcalculator',
  orientation: 'default',
//   icon: './src/assets/icon/icon.png',
  userInterfaceStyle: 'light',
//   splash: {
//     image: './src/assets/images/splash.png',
//     resizeMode: 'cover',
//     backgroundColor: '#ffffff',
//   },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,

  },
  android: {
    // adaptiveIcon: {
    //   foregroundImage: './src/assets/icon',
    //   backgroundColor: '#ffffff',
    // },
  },
  web: {
    // favicon: './assets/favicon.png',
  },
};