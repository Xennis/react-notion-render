import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@xennis/react-notion-cms-render/**/*.{js,ts,jsx,tsx}",
  ],
}
export default config
