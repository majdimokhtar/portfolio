<script setup lang="ts">
const { data: page } = await useAsyncData("blog-page", () => {
  return queryCollection("pages").path("/blog").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection("blog").order("date", "DESC").all()
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}

// Format date function
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <div v-if="page" class="min-h-screen my-28">
    <!-- Page Hero Section -->
    <div class="py-16">
      <div class="text-left max-w-none w-full">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="md:text-5xl text-4xl font-bold text-left mb-4">
            {{ page.title }}
          </h1>
          <p class="text-xl text-left mb-6">
            {{ page.description }}
          </p>
          <div v-if="page.links" class="flex flex-wrap gap-4 justify-start">
            <a
              v-for="link in page.links"
              :key="link.label"
              :href="link.to"
              class="btn btn-info text-white"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Content Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Blog Posts Container -->
      <div class="space-y-16">
        <Motion
          v-for="(post, index) in posts"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <!-- Blog Post Card -->
          <div
            class="group overflow-visible md:grid md:grid-cols-2 gap-8 items-center"
          >
            <!-- Post Image -->
            <div
              :class="[
                'overflow-visible',
                index % 2 === 0 ? 'sm:-rotate-1' : 'sm:rotate-1',
              ]"
            >
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-64 md:h-68 object-fill rounded-lg shadow-lg border-4 border-gray-300 dark:border-stone-700 ring-2 ring-base-content/20 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Post Content -->
            <div class="mt-6 md:mt-0">
              <div class="flex items-center gap-4 mb-4">
                <!-- Author Avatar -->
                <div class="avatar">
                  <div class="w-12 h-12 rounded-full">
                    <img
                      v-if="post.author?.avatar"
                      :src="post.author.avatar.src"
                      :alt="post.author.avatar.alt"
                    />
                  </div>
                </div>
                <div>
                  <p class="font-medium">
                    {{ post.author?.name || "Author" }}
                  </p>
                  <p class="text-2sm text-stone-800 dark:text-stone-400">
                    {{ formatDate(post.date) }}
                  </p>
                </div>
              </div>

              <h2
                class="text-xl md:text-xl font-bold mb-4 group-hover:text-info"
              >
                <a :href="post.path" class="hover:underline">
                  {{ post.title }}
                </a>
              </h2>

              <p class="mb-6 line-clamp-3 text-stone-800 dark:text-stone-400">
                {{ post.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in (post as any).tags"
                  :key="tag"
                  class="badge badge-outline"
                >
                  {{ tag }}
                </span>
              </div>

              <NuxtLink :to="post.path" class="btn btn-info text-white btn-sm">
                Read More
                <svg
                  class="w-4 h-4 ml-2"
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
              </NuxtLink>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>
