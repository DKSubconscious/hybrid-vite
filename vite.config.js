// node
import { fileURLToPath, URL } from 'node:url';
// vite
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
// plugins
import customPageRoutePlugin from './plugins/vite-plugin-page-routes.js';
import customStaticPageRoutePlugin from './plugins/vite-plugin-static-page-routes.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    customStaticPageRoutePlugin(),
    customPageRoutePlugin(),
  ],

  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'public/index.html'), // Static entry point /
  //       app: resolve(__dirname, 'app.html'),  // Vue entry point for client side routes
  //     },
  //   },
  // },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    historyApiFallback: {
      rewrites: [
        // { from: /^\/$/, to: '/index.html' }, // Serve static page at root URL
        { from: /./, to: '/app.html' }, // Serve app.html for all other routes
      ],
    },
  },

})
