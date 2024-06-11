import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
type AddUtilities = (utilities: {
  [key: string]: { [key: string]: string };
}) => void;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: AddUtilities }) {
      addUtilities({
        ".text-center-except-first > :not(:first-child)": {
          textAlign: "center",
        },
      });
    }),
  ],
};
export default config;
function addUtilities(arg0: {
  ".content-auto": { "content-visibility": string };
  ".content-hidden": { "content-visibility": string };
  ".content-visible": { "content-visibility": string };
}) {
  throw new Error("Function not implemented.");
}
