import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const routes = ['contact', 'properties', 'about', 'services', 'partnerships', 'inquiries'];

if (fs.existsSync(path.join(distDir, 'index.html'))) {
  // 404 fallback
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
  
  // Explicit route directories
  for (const route of routes) {
    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(path.join(distDir, 'index.html'), path.join(routeDir, 'index.html'));
  }
  console.log('[Postbuild] Generated static route fallbacks for all SPA pages.');
}
