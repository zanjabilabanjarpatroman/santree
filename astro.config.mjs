import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false, // We'll use custom styles from landing page
  })],
  output: 'hybrid', // Enable API routes
  adapter: vercel(),
});
