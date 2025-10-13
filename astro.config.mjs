import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://jcm-developer.github.io",
  base: "/my-portfolio",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});