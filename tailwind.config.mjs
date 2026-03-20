/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        "background": "#fff6dd",
        "primary": "#2c6816",
        "primary-light": "#b2f893",
        "secondary": "#446506",
        "secondary-light": "#c7f086",
        "tertiary": "#964300",
        "tertiary-light": "#ff9655",
        "surface": "#fff6dd",
        "surface-light": "#faf0d3",
        "on-primary": "#d4ffbd",
        "on-surface": "#332f1d",
        "on-surface-variant": "#615b47",
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Be Vietnam Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
}
