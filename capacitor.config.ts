import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.herodotus-app.app',
    appName: 'Herodotus',
    webDir: 'build',
    server: {
        androidScheme: 'https'
    }
};

export default config;
