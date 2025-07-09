<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  links: NavigationMenuItem[];
}>();
</script>

<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10"
  >
    <nav
      class="relative flex gap-1.5 items-center justify-between bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-neutral-200 dark:border-neutral-700 border-opacity-40 dark:border-opacity-40 shadow-lg shadow-neutral-950/5"
    >
      <div class="relative">
        <ul class="isolate min-w-0 flex items-center">
          <li v-for="link in links" :key="link.label" class="min-w-0 py-2">
            <a
              :href="link.to as string"
              class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-inverted before:inset-x-px before:inset-y-0 text-neutral-600 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors px-2 py-1"
              :class="{
                'text-neutral-900 dark:text-white':
                  $route.path === link.to,
              }"
            >
              <span class="truncate">{{ link.label }}</span>
            </a>
          </li>
        </ul>
      </div>
      <ColorModeButton />
    </nav>
  </div>
</template>
