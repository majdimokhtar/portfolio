<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <section>
    <div class="!p-0">
      <h2 class="text-left text-xl sm:text-xl lg:text-2xl font-medium">
        {{ page.about.title }}
      </h2>
      <p class="text-left mt-3 text-sm sm:text-md lg:text-sm text-muted text-stone-800 dark:text-stone-400">
        {{ page.about.description }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
