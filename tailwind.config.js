/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#7c3aed',   // cursed purple
        secondary: '#2563eb',   // infinity blue
        accent:    '#dc2626',   // cursed red
        hollow:    '#9333ea',   // hollow purple
        dark:      '#06060f',   // void
        card:      '#0d0d1a',
      },
      fontFamily: {
        sans:    ["'Satoshi'", "'Inter'", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono:    ["'Fira Code'", "monospace"],
        hero:    ["'Another Danger'", "cursive"],
        heading: ["'Blacker Display'", "serif"],
        jp:      ["'Yuji Syuku'", "serif"],
      },
    },
  },
  plugins: [],
};
