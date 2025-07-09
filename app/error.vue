<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
});

// Search functionality
const showSearch = ref(false);
const searchQuery = ref("");
const searchResults = computed(() => {
  if (!searchQuery.value || !files.value) return [];

  // Simple search implementation - you can enhance this with Fuse.js or other search libraries
  return files.value
    .filter(
      (file) =>
        file.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        file.description
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    )
    .slice(0, 42);
});

// Handle keyboard shortcut (Cmd/Ctrl + K)
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      showSearch.value = true;
    }
  };

  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
});

// Toast notifications
const toasts = ref([]);
const showToast = (
  message: string,
  type: "success" | "error" | "warning" | "info" = "info"
) => {
  const id = Date.now();
  toasts.value.push({ id, message, type });

  setTimeout(() => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }, 5000);
};

useHead({
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Page not found",
  description: "We are sorry but this page could not be found.",
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
  <div>
    <AppHeader :links="navLinks" />

    <main class="min-h-screen bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-16">
          <!-- Custom Error Component -->
          <div class="text-center">
            <div class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {{ error.statusCode || 404 }}
            </div>
            <h1
              class="text-3xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              {{ error.statusMessage || "Page not found" }}
            </h1>
            <p
              class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              {{
                error.message ||
                "We are sorry but this page could not be found."
              }}
            </p>
            <NuxtLink
              to="/"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Go back home
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />

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

    <!-- Custom Toast component to replace UToaster -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform"
        :class="{
          'bg-green-500 text-white': toast.type === 'success',
          'bg-red-500 text-white': toast.type === 'error',
          'bg-yellow-500 text-white': toast.type === 'warning',
          'bg-blue-500 text-white': toast.type === 'info',
        }"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>
