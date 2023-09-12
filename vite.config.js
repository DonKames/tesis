import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react({
            jsxImportSource:
                mode === 'development'
                    ? '@welldone-software/why-did-you-render'
                    : 'react',
        }),
    ],
    server: {
        host: '0.0.0.0',
        watch: {
            usePolling: true,
            interval: 500,
        },
    },
}));
