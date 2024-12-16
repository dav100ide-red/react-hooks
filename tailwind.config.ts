import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import { BREAKPOINTS } from "./src/constants/breakpoints";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: Object.fromEntries(
      Object.entries(BREAKPOINTS).map(([key, value]) => [key, `${value}px`])
    ),
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: { marginTop: "0" },
            h2: { marginTop: "0" },
            h3: { marginTop: "0" },
            h4: { marginTop: "0" },
            h5: { marginTop: "0" },
            h6: { marginTop: "0" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
