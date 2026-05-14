import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#293044",
        mist: "#f7f8fc",
        cloud: "#eef4ff",
        peach: "#ffe6dc",
        butter: "#fff3c9",
        lilac: "#eee6ff",
        leaf: "#e2f6e6",
        coral: "#ff8a7a",
        denim: "#5b7bd5"
      },
      boxShadow: {
        sticker: "0 14px 32px rgba(70, 75, 102, 0.12)",
        soft: "0 10px 24px rgba(54, 60, 88, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
