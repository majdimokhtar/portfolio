<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";
import { ref, computed, nextTick } from "vue";

const props = defineProps<{
  page: IndexCollectionItem;
}>();

const items = computed(() => {
  return props.page.faq?.categories.map((faq) => {
    return {
      label: faq.title,
      key: faq.title.toLowerCase(),
      questions: faq.questions,
    };
  });
});

const activeTab = ref(0);
const openAccordions = ref<{ [key: string]: boolean }>({});

const toggleAccordion = async (tabIndex: number, questionIndex: number) => {
  const key = `${tabIndex}-${questionIndex}`;
  openAccordions.value[key] = !openAccordions.value[key];

  // Force reactivity update
  await nextTick();
};

const isAccordionOpen = (tabIndex: number, questionIndex: number) => {
  const key = `${tabIndex}-${questionIndex}`;
  return openAccordions.value[key] || false;
};

const getIndicatorStyle = (index: number) => {
  if (!items.value || items.value.length === 0) return {};

  const tabWidth = 100 / items.value.length;
  const position = (100 / items.value.length) * index;

  return {
    width: `${tabWidth}%`,
    transform: `translateX(${position * (100 / tabWidth)}%)`,
  };
};
</script>

<template>
  <div
    class="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 px-0 !pt-0 gap-4 sm:gap-4 mt-24"
  >
    <!-- Header -->
    <div class="">
      <div class="">
        <h2
          class="text-pretty tracking-tight text-gray-900 dark:text-white text-left text-xl sm:text-xl lg:text-2xl font-medium"
        >
          {{ page.faq.title }}
        </h2>
        <div
          class="text-balance text-left mt-2 text-sm sm:text-md lg:text-sm text-gray-600 dark:text-gray-400"
        >
          {{ page.faq.description }}
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-col items-center gap-4 w-full">
      <!-- Tab List -->
      <div
        class="p-1 group rounded-lg w-full relative grid bg-transparent dark:bg-transparent gap-2 px-0"
        :style="{ gridTemplateColumns: `repeat(${items?.length || 1}, 1fr)` }"
      >
        <!-- Indicator -->
        <div
          class="absolute top-[4px] bottom-1 duration-200 ease-out rounded-lg bg-neutral-100/60 dark:bg-neutral-800/60 transition-all"
          :style="getIndicatorStyle(activeTab)"
        ></div>

        <!-- Tab Buttons -->
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="activeTab = index"
          class="group relative inline-flex items-center min-w-0 hover:text-gray-900 dark:hover:text-white font-medium disabled:cursor-not-allowed disabled:opacity-75 transition-colors justify-center text-sm gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 px-3 py-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
          :class="[
            activeTab === index
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400',
          ]"
          :aria-selected="activeTab === index"
          role="tab"
        >
          <span class="truncate">{{ item.label }}</span>
        </button>
      </div>

      <!-- Tab Content -->
      <div
        v-for="(item, tabIndex) in items"
        :key="tabIndex"
        v-show="activeTab === tabIndex"
        class="focus:outline-none w-full"
        role="tabpanel"
      >
        <div class="w-full space-y-0">
          <!-- Accordion Items -->
          <div
            v-for="(question, questionIndex) in item.questions"
            :key="questionIndex"
            class="accordion-item"
          >
            <!-- Accordion Trigger -->
            <button
              type="button"
              @click="toggleAccordion(tabIndex, questionIndex)"
              :aria-expanded="isAccordionOpen(tabIndex, questionIndex)"
              class="accordion-trigger w-full flex items-center justify-between gap-4 font-medium py-4 px-4 text-base mb-2 rounded-lg bg-neutral-100/60 dark:bg-neutral-800/60 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left text-gray-900 dark:text-white group"
            >
              <span>{{ question.label }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="accordion-icon flex-shrink-0 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ease-out"
                :class="[
                  isAccordionOpen(tabIndex, questionIndex)
                    ? 'rotate-45'
                    : 'rotate-0',
                ]"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>

            <!-- Accordion Content -->
            <div
              class="accordion-content"
              :class="[
                isAccordionOpen(tabIndex, questionIndex)
                  ? 'accordion-open'
                  : 'accordion-closed',
              ]"
              role="region"
            >
              <div class="accordion-inner">
                <div class="pb-3.5 text-base text-gray-600 dark:text-gray-400">
                  <div class="px-4">
                    {{ question.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-content.accordion-open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
  min-height: 0;
}

.accordion-item {
  border: none;
}

.accordion-trigger {
  transform: translateZ(0);
  will-change: transform;
}

.accordion-icon {
  transform-origin: center;
}

/* Alternative method using max-height for better browser support */
@supports not (grid-template-rows: 1fr) {
  .accordion-content {
    display: block;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .accordion-content.accordion-open {
    max-height: 500px; /* Adjust based on your content */
    opacity: 1;
  }
}

/* Smooth animation enhancements */
.accordion-content,
.accordion-trigger,
.accordion-icon {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
