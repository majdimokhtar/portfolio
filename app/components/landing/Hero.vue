<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

const { footer, global } = useAppConfig();

defineProps<{
  page: IndexCollectionItem;
}>();

const colorMode = useColorMode();
</script>

<template>
  <div class="py-8 px-4 sm:py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="text-center max-w-7xl mx-auto">
      <!-- Headline (Avatar) -->
      <div class="flex items-center justify-center">
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.6,
            delay: 0.1,
          }"
        >
          <div
            class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 sm:ring-4 ring-gray-200 dark:ring-gray-700 ring-offset-2 sm:ring-offset-4 ring-offset-white dark:ring-offset-gray-900"
          >
            <img
              :src="
                colorMode.value === 'dark'
                  ? global.picture?.dark
                  : global.picture?.light
              "
              :alt="global.picture?.alt"
              class="w-full h-full object-cover"
            />
          </div>
        </Motion>
      </div>

      <!-- Title -->
      <div
        class="text-shadow-md max-w-xs sm:max-w-lg md:max-w-lg lg:max-w-lg mx-auto mt-6 sm:mt-8 px-2"
      >
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.6,
            delay: 0.1,
          }"
        >
          <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            {{ page.title }}
          </h1>
        </Motion>
      </div>

      <!-- Description -->
      <div class="mt-4 sm:mt-6 max-w-xs sm:max-w-md md:max-w-xl mx-auto px-2">
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.6,
            delay: 0.3,
          }"
        >
          <p
            class="text-sm sm:text-base md:text-md text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {{ page.description }}
          </p>
        </Motion>
      </div>

      <!-- Links -->
      <div class="mt-6 sm:mt-8 flex flex-col justify-center items-center px-2">
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)',
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5,
          }"
        >
          <div
            v-if="page.hero.links"
            class="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full max-w-xs sm:max-w-none"
          >
            <NuxtLink
              v-bind="page.hero.links[0]"
              class="btn bg-white text-stone-900 btn-sm sm:btn-md lg:btn-md w-full sm:w-auto whitespace-nowrap"
            >
              {{ page.hero.links[0]?.label || "Let's work together" }}
            </NuxtLink>
            <NuxtLink
              :to="global.available ? global.meetingLink : ''"
              class="btn btn-sm sm:btn-md lg:btn-md btn-ghost border-2 transition-colors duration-200 w-full sm:w-auto"
              :class="
                global.available
                  ? 'border-success text-success hover:border-success hover:text-success hover:bg-success/10'
                  : 'border-error text-error hover:border-error hover:text-error hover:bg-error/10'
              "
            >
              <span class="relative flex w-2 h-2 flex-shrink-0">
                <span
                  class="absolute inline-flex w-full h-full rounded-full opacity-75"
                  :class="
                    global.available
                      ? 'bg-green-500 animate-ping'
                      : 'bg-red-500'
                  "
                />
                <span
                  class="relative inline-flex w-2 h-2 scale-90 rounded-full"
                  :class="global.available ? 'bg-green-500' : 'bg-red-500'"
                />
              </span>
              <span class="text-xs sm:text-sm lg:text-base truncate">
                {{
                  global.available
                    ? "Available for new projects"
                    : "Not available at the moment"
                }}
              </span>
            </NuxtLink>
          </div>
        </Motion>

        <div
          class="gap-x-2 sm:gap-x-4 inline-flex mt-4 flex-wrap justify-center px-2"
        >
          <Motion
            v-for="(link, index) of footer?.links"
            :key="index"
            :initial="{
              scale: 1.1,
              opacity: 0,
              filter: 'blur(20px)',
            }"
            :animate="{
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
            }"
            :transition="{
              duration: 0.6,
              delay: 0.5 + index * 0.1,
            }"
          >
            <NuxtLink v-bind="link" class="btn btn-xs sm:btn-sm btn-ghost mb-2">
              <span class="text-xs sm:text-sm truncate">{{ link.label }}</span>
              <Icon
                :name="link.icon"
                class="size-3 sm:size-4 flex-shrink-0"
                size="16"
              />
            </NuxtLink>
          </Motion>
        </div>
      </div>
    </div>

    <!-- Marquee -->
    <CarouselComponent />
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
