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
        const spaRoutes = ['/about', '/contact', '/account', '/login'];

        // Remove query parameters and hash fragments from the URL
        const cleanUrl = req.url.split('?')[0].split('#')[0];

        // console.log('spaRoutes.includes(cleanUrl)', spaRoutes.includes(cleanUrl), cleanUrl);

        if (spaRoutes.includes(cleanUrl)) {
          console.log(`${cleanUrl} page being resolved`);
          const appHtmlPath = resolve(rootDir, 'app.html');
          console.log('appHtmlPath', appHtmlPath);
          const html = readFileSync(appHtmlPath, 'utf-8');
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        }
        else {
          next();
        }
      });

    },
  };
};
