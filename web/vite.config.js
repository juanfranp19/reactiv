import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@js': path.resolve(__dirname, 'src/js'),
            '@components': path.resolve(__dirname, 'src/js/components'),
            '@contexts': path.resolve(__dirname, 'src/js/contexts'),
            '@hooks': path.resolve(__dirname, 'src/js/hooks'),
            '@pages': path.resolve(__dirname, 'src/js/pages'),
            '@providers': path.resolve(__dirname, 'src/js/providers'),
            '@routes': path.resolve(__dirname, 'src/js/routes'),
            '@services': path.resolve(__dirname, 'src/js/services'),
            '@utils': path.resolve(__dirname, 'src/js/utils'),
        },
    },
});
