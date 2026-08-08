import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://huaqianlee.github.io',
  outDir: '../dist',
  publicDir: './public',
  integrations: [sitemap()],
  server: {
    port: 4321,
  },
  vite: {
    server: {
      proxy: {
        '/blog': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  },
});
