import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom-inset': 'inset 0px 4px 8px rgba(0, 0, 0, 0.2)',
        'footer-top-shadow': '0 -4px 8px rgba(0, 0, 0, 0.1)', 
      },
    },
  },
  plugins: [],
};
export default config;
