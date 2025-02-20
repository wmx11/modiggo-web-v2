// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  output: "server", // required, with no prerendered pages
  adapter: node({
    mode: "standalone",
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "lt"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
