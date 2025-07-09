<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import {
  findPageBreadcrumb,
  mapContentNavigation,
} from "@nuxt/ui-pro/runtime/utils/content.js";

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first()
);
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings("blog", route.path, {
    fields: ["description"],
  })
);

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation", ref([]));
const blogNavigation = computed(
  () => navigation.value.find((item) => item.path === "/blog")?.children || []
);

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(blogNavigation?.value, page.value)
  ).map(({ icon, ...link }) => link)
);

if (page.value.image) {
  defineOgImage({ url: page.value.image });
} else {
  defineOgImageComponent(
    "Blog",
    {
      headline: breadcrumb.value.map((item) => item.label).join(" > "),
    },
    {
      fonts: ["Geist:400", "Geist:600"],
    }
  );
}

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
});

const articleLink = computed(() => `${window?.location}`);

const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <main class="mt-20 px-8">
    <div class="container mx-auto relative min-h-screen">
      <div v-if="page" class="prose prose-lg max-w-none">
        <a
          href="/blog"
          class="text-sm flex items-center gap-1 no-underline hover:underline"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Blog
        </a>
        <div class="flex flex-col gap-3 mt-8">
          <div
            class="flex text-xs text-base-content/60 items-center justify-center gap-2"
          >
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead"> - </span>
            <span v-if="page.minRead"> {{ page.minRead }} MIN READ </span>
          </div>
          <img
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-base-content/60 text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <!-- DaisyUI Avatar Component -->
            <div class="flex flex-col items-center text-center gap-2 my-4">
              <div class="avatar">
                <div
                  class="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2"
                >
                  <img
                    v-if="page.author?.avatar"
                    :src="page.author.avatar.src"
                    :alt="page.author.avatar.alt"
                  />
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div class="font-medium text-sm">{{ page.author.name }}</div>
                <div class="text-xs text-base-content/60">
                  {{ (page.author as any).role }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-3xl mx-auto">
          <ContentRenderer v-if="page.body" :value="page" />

          <div
            class="flex items-center justify-end gap-2 text-sm text-base-content/60"
          >
            <button
              class="btn btn-ghost btn-sm"
              @click="
                copyToClipboard(articleLink, 'Article link copied to clipboard')
              "
            >
              Copy link
            </button>
          </div>
          <ContentSurround :surround />
        </div>
      </div>
    </div>
  </main>
</template>
