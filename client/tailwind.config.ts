import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#FFFFFF',
            'secondary': '#000000',
            'accent': '#555555',
        },
        backgroundImage: {
            'white-1': "url('/images/white-1.jpg')",
        },
    },
  },
  plugins: [],
};
export default config;
