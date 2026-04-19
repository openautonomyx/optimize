import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "#0A1026",
          900: "#101A3F"
        }
      }
    }
  },
  plugins: []
};

export default config;
