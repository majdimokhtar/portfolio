<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  links: NavigationMenuItem[];
}>();
</script>

<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10 w-[calc(100vw-16px)] sm:w-auto max-w-[calc(100vw-16px)]"
  >
    <nav
      class="relative flex gap-1 sm:gap-1.5 items-center justify-between bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-1.5 sm:px-2 md:px-4 border border-neutral-200 dark:border-neutral-700 border-opacity-40 dark:border-opacity-40 shadow-lg shadow-neutral-950/5 min-h-[44px] sm:min-h-[48px]"
    >
      <div class="relative flex-1 min-w-0">
        <ul
          class="isolate min-w-0 flex items-center justify-start overflow-x-auto scrollbar-hide"
        >
          <li
            v-for="link in links"
            :key="link.label"
            class="min-w-0 py-1.5 sm:py-2 flex-shrink-0"
          >
            <NuxtLink
              :to="link.to as string"
              class="group relative w-full flex items-center gap-1 sm:gap-1.5 font-medium text-xs sm:text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-inverted before:inset-x-px before:inset-y-0 text-neutral-600 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors px-1.5 sm:px-2 py-1 whitespace-nowrap"
              :class="{
                'text-neutral-900 dark:text-white': $route.path === link.to,
              }"
            >
              <span class="truncate">{{ link.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="flex-shrink-0 ml-1 sm:ml-2">
        <ColorModeButton />
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
