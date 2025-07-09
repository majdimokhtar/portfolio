<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});
</script>

<template>
  <div v-if="page" class="py-16">
    <LandingHero :page />
    <section
      class="pt-0 lg:grid lg:grid-cols-2 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-14"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </section>
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14"
    >
      <LandingBlog :page />
      <!-- <LandingTestimonials :page /> -->
      <LandingFAQ :page />
    </section>
  </div>
</template>
