import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false, // We'll use custom styles from landing page
  })],
  output: 'static', // Static with on-demand server routes
  adapter: vercel({
    runtime: 'nodejs20.x',
  }),
});
