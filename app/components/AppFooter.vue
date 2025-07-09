<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <footer class="z-10 bg-default">
    <div
      class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3"
    >
      <div
        class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3"
      >
        <template v-if="footer?.links">
          <a
            v-for="(link, index) of footer?.links"
            :key="index"
            :href="link.to"
            :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined"
            :target="link.target"
            :aria-label="link['aria-label']"
            class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-xs gap-1 text-default hover:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1"
          >
            <Icon
              v-if="link.icon"
              :name="link.icon"
              class="shrink-0 size-4"
              aria-hidden="true"
              size="16"
            />
          </a>
        </template>
      </div>
      <div class="mt-3 lg:mt-0 lg:order-2 flex items-center justify-center">
        <!-- Empty center section -->
      </div>
      <div
        class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1 text-md"
      >
        {{ footer.credits }}
      </div>
    </div>
  </footer>
</template>
