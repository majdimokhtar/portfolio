<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

const { footer, global } = useAppConfig();

defineProps<{
  page: IndexCollectionItem;
}>();

const colorMode = useColorMode();
</script>

<template>
  <div class="py-16 lg:py-24">
    <!-- Hero Section -->
    <div class="text-center">
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
            class="w-18 h-18 rounded-full overflow-hidden ring-4 ring-gray-200 dark:ring-gray-700 ring-offset-4 ring-offset-white dark:ring-offset-gray-900"
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
      <div class="text-shadow-md max-w-lg mx-auto mt-8">
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
            class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            {{ page.title }}
          </h1>
        </Motion>
      </div>

      <!-- Description -->
      <div class="mt-6 max-w-2xl mx-auto">
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
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ page.description }}
          </p>
        </Motion>
      </div>

      <!-- Links -->
      <div class="mt-4 flex flex-col justify-center items-center">
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
          <div v-if="page.hero.links" class="flex items-center gap-2">
            <NuxtLink
              v-bind="page.hero.links[0]"
              class="btn btn-info btn-lg text-white"
            >
              {{ page.hero.links[0]?.label || "Let's work together" }}
            </NuxtLink>
            <NuxtLink
              :to="global.available ? global.meetingLink : ''"
              class="btn btn-lg btn-ghost border-2 transition-colors duration-200"
              :class="
                global.available
                  ? 'border-success text-success hover:border-success hover:text-success hover:bg-success/10'
                  : 'border-error text-error hover:border-error hover:text-error hover:bg-error/10'
              "
            >
              <span class="relative flex w-2 h-2">
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
              {{
                global.available
                  ? "Available for new projects"
                  : "Not available at the moment"
              }}
            </NuxtLink>
          </div>
        </Motion>

        <div class="gap-x-4 inline-flex mt-4">
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
            <NuxtLink v-bind="link" class="btn btn-sm btn-ghost">
              {{ link.label }}
              <Icon :name="link.icon" class="size-4" size="16" />
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
