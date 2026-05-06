import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://heybaldur.github.io",
  base: '/baldurion-trener',
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          es: "es-ES",
          en: "en-US",
          pl: "pl-PL",
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en", "pl"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
