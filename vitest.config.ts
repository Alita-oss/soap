import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            '@': path.resolve(__dirname),
            assets: path.resolve(__dirname, 'assets'),
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['**/*.{test,spec}.{js,ts}'],
    },
});
