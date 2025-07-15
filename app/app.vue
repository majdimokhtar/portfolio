<script setup lang="ts">
import { ref } from "vue";

const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white"
);

const showSearch = ref(false);
const searchQuery = ref('');
const searchResults = ref<any[]>([]);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s - Nuxt Portfolio",
  ogImage: "/ogImage.webp",
  twitterImage: "/ogImage.webp",
  twitterCard: "summary_large_image",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    "navigation",
    () => {
      return Promise.all([queryCollectionNavigation("blog")]);
    },
    {
      transform: (data) => data.flat(),
    }
  ),
  useLazyAsyncData(
    "search",
    () => {
      return Promise.all([queryCollectionSearchSections("blog")]);
    },
    {
      server: false,
      transform: (data) => data.flat(),
    }
  ),
]);
</script>

<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-black text-neutral-900 dark:text-white"
  >
    <NuxtLayout>
      <main class="relative">
        <NuxtPage />
      </main>
    </NuxtLayout>

    <ClientOnly>
      <!-- Custom search component to replace LazyUContentSearch -->
      <div
        v-if="showSearch"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4"
      >
        <div
          class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-20"
        >
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keydown.escape="showSearch = false"
            />
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div
              v-for="result in searchResults"
              :key="result.id"
              class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700"
            >
              <div class="font-medium text-gray-900 dark:text-white">
                {{ result.title }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ result.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
