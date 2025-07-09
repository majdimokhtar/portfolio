<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();

const { data: posts } = await useAsyncData("index-blogs", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all()
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}
</script>

<template>
  <section class="px-8 pt-8 !pt-0 sm:gap-6 lg:gap-8">
    <div class="mb-6">
      <h2 class="text-left text-xl sm:text-xl lg:text-2xl font-medium">
        {{ page.blog.title }}
      </h2>
      <p class="text-left mt-2 text-sm sm:text-md lg:text-sm text-gray-600">
        {{ page.blog.description }}
      </p>
    </div>

    <div class="flex flex-col gap-4 lg:gap-y-4">
      <article
        v-for="(post, index) in posts"
        :key="index"
        class="group relative lg:items-start lg:flex ring-0 hover:ring-0"
      >
        <NuxtLink :to="post.path" class="flex flex-col lg:flex-row w-full">
          <div class="flex-1 !px-0">
            <div class="space-y-2">
              <h3
                class="font-medium text-lg group-hover:text-primary transition-colors"
              >
                {{ post.title }}
              </h3>
              <p class="text-gray-600 text-sm">
                {{ post.description }}
              </p>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <time :datetime="post.date">
                  {{ new Date(post.date).toLocaleDateString() }}
                </time>
              </div>
            </div>

            <div class="mt-4">
              <span
                class="inline-flex items-center px-0 gap-0 text-xs text-primary hover:underline"
              >
                Read Article
                <svg
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
