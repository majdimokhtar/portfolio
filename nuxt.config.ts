// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["tslib"],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/content",
    "@vueuse/nuxt",
    "vue3-carousel-nuxt",
    "nuxt-og-image",
    "motion-v/nuxt",
    [
      "@nuxtjs/color-mode",
      {
        classSuffix: "",
        preference: "system",
        fallback: "light",
        storageKey: "nuxt-color-mode",
      },
    ],
  ],

  devtools: {
    enabled: false,
  },

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-01",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
