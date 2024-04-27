import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    server: {
        proxy: {
            '/apis': {
                target: 'http://47.93.50.49:5052/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apis/, ''),
            },
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                //生产环境时移除console.log()
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
});
