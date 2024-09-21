// vite.config.js
import { readFileSync } from 'fs';
import { resolve } from 'path';

export default function customPageRoutePlugin () {
  return {
    name: 'spa-page-fallback-middleware',
    configureServer(server) {

      // console.log('rootDIR: ', server.config.root);
      const rootDir = server.config.root;

      server.middlewares.use((req, res, next) => {
        // List of routes that should serve app.html
        const spaRoutes = [{
          index: '/',
          indexFull: 'index.html'
        }];

        // Remove query parameters and hash fragments from the URL
        const cleanUrl = req.url.split('?')[0].split('#')[0];
        // Find the route that matches the current URL
        const route = spaRoutes.find((route) => route.index === cleanUrl);

        if (route) {
          console.log('indexFull: ', `${rootDir}/public/${route.indexFull}`);
          const appHtmlPath = resolve(rootDir, `${rootDir}/public/${route.indexFull}`);

          try {
            const html = readFileSync(appHtmlPath, 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          }
          catch (error) {
            console.error('Error reading index.html:', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
          }

          return;
        }

        next();
      });

    },
  };
};
