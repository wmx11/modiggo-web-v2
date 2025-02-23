// @ts-check
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import i18n from "astro-i18n-aut/integration";
import { defineConfig } from "astro/config";
import { i18nConfig } from "./src/i18n/config";

// https://astro.build/config
export default defineConfig({
  output: "server", // required, with no prerendered pages
  adapter: node({
    mode: "standalone",
  }),
  i18n: {
    locales: Object.keys(i18nConfig.locales),
    defaultLocale: i18nConfig.defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    i18n({
      locales: i18nConfig.locales,
      defaultLocale: i18nConfig.defaultLocale,
      include: ["pages/**/*"],
    }),
  ],
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
});
