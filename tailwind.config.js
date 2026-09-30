/** @type {import('tailwindcss').Config} */
// Flazyn — Tailwind is used only for small layout utilities (spacing,
// flex). All design tokens live as CSS custom properties in src/index.css.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
