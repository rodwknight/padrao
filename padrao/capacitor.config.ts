import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Destramed',
  webDir: 'www',
  android: {
    backgroundColor: '#FFFFFF', // Cor de fundo para a splash screen
    allowMixedContent: true, // Permitir conteúdo misto (HTTP e HTTPS)
    captureInput: true, // Captura de entrada
    webContentsDebuggingEnabled: true, // Depuração do conteúdo web no Android
  },
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      "*"
    ]
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
    },
  }
};

export default config;
