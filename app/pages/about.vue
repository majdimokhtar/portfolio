<script setup lang="ts">
const { data: page } = await useAsyncData("about", () => {
  return queryCollection("about").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { global } = useAppConfig();

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <div v-if="page" class="min-h-screen content-colors">
    <!-- Page Hero Section -->
    <div class="container mx-auto px-14 py-28 mt-18">
      <div class="lg:flex sm:flex-row items-center">
        <div class="flex-1">
          <h1 class="md:text-5xl text-4xl font-bold mb-4 text-left">{{ page.title }}</h1>
          <p class="text-lg mb-6 text-left">
            {{ page.description }}
          </p>
        </div>
        <div class="flex justify-start">
          <div class="avatar">
            <div
              class="w-36 h-36 rounded-lg ring ring-gray-300 dark:ring-stone-700 ring-offset-gray-300 dark:ring-offset-stone-700 ring-offset-4 sm:rotate-2 ml-12"
            >
              <img
                :src="global.picture?.light || global.picture?.dark"
                :alt="global.picture?.alt"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Content Section -->
    <div class="container mx-auto px-14 pt-0">
      <div class="prose prose-md max-w-none content-colors">
        <MDC :value="page.content" unwrap="div" />
      </div>

      <!-- Images Section -->
      <div
        class="flex flex-row justify-center items-center py-10 space-x-[-2rem] mb-14"
      >
        <!-- <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        /> -->
      </div>
    </div>
  </div>
</template>
