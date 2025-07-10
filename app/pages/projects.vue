<script setup lang="ts">
const { data: page } = await useAsyncData("projects-page", () => {
  return queryCollection("pages").path("/projects").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData("projects", () => {
  return queryCollection("projects").all();
});

const { global } = useAppConfig();

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <div v-if="page" class="min-h-screen">
    <!-- Page Hero Section -->
    <div class="container mx-auto px-14 py-28 mt-18">
      <div class="text-left">
        <h1 class="text-4xl font-bold mb-4">{{ page.title }}</h1>
        <p class="text-lg mb-6">{{ page.description }}</p>

        <!-- Links Section -->
        <div v-if="page.links" class="flex items-center gap-2 justify-start">
          <a
            :href="global.meetingLink"
            class="btn btn-info"
            v-bind="page.links[0]"
          >
            {{ page.links[0]?.label }}
          </a>
          <a
            :href="`mailto:${global.email}`"
            class="btn btn-outline"
            v-bind="page.links[1]"
          >
            {{ page.links[1]?.label }}
          </a>
        </div>
      </div>
    </div>

    <!-- Projects Section -->
    <div class="container mx-auto px-8 pt-0 mb-14">
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <!-- Project Card -->
        <div
          class="card lg:card-side bg-transparent shadow-none mb-8 group transition-all"
        >
          <div
            class="flex flex-col lg:flex-row gap-6 p-6"
            :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
          >
            <!-- Image Section -->
            <div class="flex-shrink-0 lg:w-96 max-sm:order-last">
              <img
                :src="project.image"
                :alt="project.title"
                class="object-cover w-full h-48 rounded-lg"
              />
            </div>

            <!-- Content Section -->
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <!-- Year Badge -->
                <div class="mb-2">
                  <span class="text-sm">
                    {{ new Date(project.date).getFullYear() }}
                  </span>
                </div>

                <!-- Title and Description -->
                <h2 class="card-title text-xl mb-3">{{ project.title }}</h2>
                <p class="mb-4">
                  {{ project.description }}
                </p>
              </div>

              <!-- Footer Link -->
              <div class="card-actions">
                <a
                  :href="project.url"
                  class="text-sm text-info flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Project
                  <svg
                    class="w-4 h-4 text-info transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>
