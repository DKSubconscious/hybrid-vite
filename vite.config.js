import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'), // Static entry point /
        app: resolve(__dirname, 'app.html'),  // Vue entry point for client side routes
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' }, // Serve static page at root URL
        { from: /./, to: '/app.html' }, // Serve app.html for all other routes
      ],
    },
  },
})
