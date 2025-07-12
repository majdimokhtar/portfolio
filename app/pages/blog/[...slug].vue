<script setup lang="ts">
import { NuxtLink } from "#components";
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

// Toast state
const showToast = ref(false);
const toastMessage = ref("");

// Copy to clipboard function
const copyToClipboard = async (text: string, message: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toastMessage.value = message;
    showToast.value = true;

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } catch (err) {
    console.error("Failed to copy: ", err);
    toastMessage.value = "Failed to copy link";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
};
</script>

<template>
  <main class="px-4 md:px-18 my-24">
    <div class="container mx-auto relative min-h-screen">
      <div v-if="page" class="prose prose-lg max-w-none">
        <NuxtLink
          to="/blog"
          class="text-sm flex items-center gap-1 no-underline hover:underline text-stone-900 dark:text-stone-50"
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
        </NuxtLink>
        <div class="flex flex-col gap-3 mt-8">
          <div
            class="flex text-xs text-stone-900 dark:text-stone-50 items-center justify-center gap-2"
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
            class="rounded-lg w-full h-[400px] object-fill object-center"
          />
          <h1
            class="text-xl md:text-4xl text-center font-bold max-w-3xl mx-auto mt-4 text-stone-900 dark:text-stone-50"
          >
            {{ page.title }}
          </h1>
          <p
            class="text-stone-900 dark:text-stone-50 text-center max-w-2xl mx-auto text-sm md:text-lg"
          >
            {{ page.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <!-- DaisyUI Avatar Component -->
            <div class="flex flex-col items-center text-center gap-2 my-4">
              <div class="avatar">
                <div
                  class="w-12 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2 not-prose"
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
                <div class="text-xs text-stone-900 dark:text-stone-50">
                  {{ (page.author as any).role }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-5xl mx-auto text-stone-900 dark:text-stone-50">
          <div class="prose prose-sm md:prose-lg max-w-none content-colors">
            <ContentRenderer v-if="page.body" :value="page" />
          </div>

          <div
            class="flex items-center justify-end gap-2 text-sm text-stone-900 dark:text-stone-50"
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

          <!-- Custom ContentSurround replacement -->
          <div
            v-if="surround && (surround[0] || surround[1])"
            class="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Previous Post -->
              <div v-if="surround[0]" class="flex">
                <NuxtLink
                  :to="`${surround[0].path}`"
                  class="group flex flex-col justify-between w-full p-6 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-colors no-underline min-h-[120px]"
                >
                  <div>
                    <div
                      class="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-3"
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
                      Previous
                    </div>
                    <div
                      class="text-base font-medium text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 mb-2"
                    >
                      {{ surround[0].title }}
                    </div>
                  </div>
                  <div
                    v-if="surround[0].description"
                    class="text-sm text-stone-600 dark:text-stone-400 line-clamp-2"
                  >
                    {{ surround[0].description }}
                  </div>
                </NuxtLink>
              </div>

              <!-- Empty space if no previous post -->
              <div v-else class="hidden md:block"></div>

              <!-- Next Post -->
              <div v-if="surround[1]" class="flex">
                <NuxtLink
                  :to="`${surround[1].path}`"
                  class="group flex flex-col justify-between w-full p-6 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-colors no-underline text-right min-h-[120px]"
                >
                  <div>
                    <div
                      class="flex items-center justify-end gap-2 text-sm text-stone-500 dark:text-stone-400 mb-3"
                    >
                      Next
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div
                      class="text-base font-medium text-stone-900 dark:text-stone-50 group-hover:text-stone-700 dark:group-hover:text-stone-300 mb-2"
                    >
                      {{ surround[1].title }}
                    </div>
                  </div>
                  <div
                    v-if="surround[1].description"
                    class="text-sm text-stone-600 dark:text-stone-400 line-clamp-2"
                  >
                    {{ surround[1].description }}
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DaisyUI Toast - Bottom Right -->
    <div class="toast toast-end toast-bottom z-50">
      <div v-if="showToast" class="alert alert-success shadow-lg">
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm">{{ toastMessage }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.content-colors {
  --tw-prose-body: #1c1917;
  --tw-prose-headings: #1c1917;
  --tw-prose-links: #1c1917;
  --tw-prose-bold: #1c1917;
  --tw-prose-counters: #1c1917;
  --tw-prose-bullets: #1c1917;
  --tw-prose-hr: #1c1917;
  --tw-prose-quotes: #1c1917;
  --tw-prose-quote-borders: #1c1917;
  --tw-prose-captions: #1c1917;
  --tw-prose-code: #1c1917;
  --tw-prose-pre-code: #1c1917;
  --tw-prose-pre-bg: #f5f5f4;
  --tw-prose-th-borders: #1c1917;
  --tw-prose-td-borders: #1c1917;
}

.dark .content-colors {
  --tw-prose-body: #fafaf9;
  --tw-prose-headings: #fafaf9;
  --tw-prose-links: #fafaf9;
  --tw-prose-bold: #fafaf9;
  --tw-prose-counters: #fafaf9;
  --tw-prose-bullets: #fafaf9;
  --tw-prose-hr: #fafaf9;
  --tw-prose-quotes: #fafaf9;
  --tw-prose-quote-borders: #fafaf9;
  --tw-prose-captions: #fafaf9;
  --tw-prose-code: #fafaf9;
  --tw-prose-pre-code: #fafaf9;
  --tw-prose-pre-bg: #292524;
  --tw-prose-th-borders: #fafaf9;
  --tw-prose-td-borders: #fafaf9;
}
</style>
