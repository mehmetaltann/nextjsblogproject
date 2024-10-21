import type { Config } from 'tailwindcss';

/** @type {Config} */
const tailwindConfig: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notosans: ["var(--font-notosans)"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        color1: "var(--color-theme1)",
        color2: "var(--color-theme2)",
        color3: "var(--color-theme3)",
        color4: "var(--color-theme4)",
        color5: "var(--color-theme5)",
        color6: "var(--color-theme6)",
        color7: "var(--color-theme7)",
        color8: "var(--color-theme8)",
        color9: "var(--color-theme9)",
        color10: "var(--color-theme10)",
        color11: "var(--color-theme11)",
        color12: "var(--color-theme12)",
        color13: "var(--color-theme13)",
        color14: "var(--color-theme14)",
      },
    },
  },
  darkMode: 'class', // Optional: Enable dark mode support
};

export default tailwindConfig;
