<script setup lang="ts">
import { ref } from "vue";
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  links: NavigationMenuItem[];
}>();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10 w-[calc(100vw-16px)] md:w-auto max-w-[calc(100vw-16px)]"
  >
    <!-- Desktop Navigation -->
    <nav
      class="relative hidden md:flex gap-1 sm:gap-1.5 items-center justify-between bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full px-1.5 sm:px-2 md:px-4 border border-neutral-200 dark:border-neutral-700 border-opacity-40 dark:border-opacity-40 shadow-lg shadow-neutral-950/5 min-h-[44px] sm:min-h-[48px]"
    >
      <div class="relative flex-1 min-w-0">
        <ul
          class="isolate min-w-0 flex items-center justify-start scrollbar-hide"
        >
          <li
            v-for="link in links"
            :key="link.label"
            class="min-w-0 py-1.5 sm:py-2 flex-shrink-0"
          >
            <NuxtLink
              :to="link.to as string"
              class="group relative w-full flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-inverted before:inset-x-px before:inset-y-0 hover:text-info dark:text-gray-400 dark:hover:text-info transition-colors px-1.5 sm:px-2 py-1 whitespace-nowrap"
              :class="{
                'text-info dark:text-info font-bold': $route.path === link.to,
                'font-medium': $route.path !== link.to,
              }"
            >
              <span class="truncate">{{ link.label }}</span>

              <!-- Active route indicator - positioned like in the example -->
              <span
                v-if="$route.path === link.to"
                class="absolute inset-x-0 top-[37px] h-[1px] bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0"
              ></span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Desktop Color Mode Button -->
      <div class="flex-shrink-0 ml-1 sm:ml-2">
        <ColorModeButton />
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <div
      class="flex flex-1 justify-end md:hidden"
      :class="{ 'opacity-0 pointer-events-none': isMenuOpen }"
    >
      <div class="flex items-center gap-2">
        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 transition-colors"
          type="button"
          :aria-expanded="isMenuOpen"
        >
          Menu
          <svg
            viewBox="0 0 8 6"
            aria-hidden="true"
            class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400 transition-transform"
            :class="{ 'rotate-180': isMenuOpen }"
          >
            <path
              d="M1.75 1.75 4 4.25l2.25-2.5"
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Mobile Color Mode Button -->
        <ColorModeButton class="mr-2" />
      </div>
    </div>

    <!-- Mobile Modal Overlay -->
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800 md:hidden"
        @click.self="closeMenu"
      >
        <!-- Modal Header -->
        <div class="flex flex-row-reverse items-center justify-between">
          <button
            @click="closeMenu"
            aria-label="Close menu"
            class="-m-1 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="h-6 w-6 text-zinc-500 dark:text-zinc-400"
            >
              <path
                d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Navigation
          </h2>
        </div>

        <!-- Modal Navigation -->
        <nav class="mt-6">
          <ul
            class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
          >
            <li v-for="link in links" :key="link.label">
              <NuxtLink
                :to="link.to as string"
                @click="closeMenu"
                class="block py-2 hover:text-info transition-colors"
                :class="{
                  'text-info': $route.path === link.to,
                }"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>

    <!-- Modal Backdrop -->
    <Transition
      enter-active-class="duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden min-h-screen"
        style="min-height: 100vh; min-height: 100dvh; margin-top: -20px"
        @click="closeMenu"
      />
    </Transition>
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
