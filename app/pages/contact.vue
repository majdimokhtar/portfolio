<script setup lang="ts">
const { data: page } = await useAsyncData("contact-page", () => {
  return queryCollection("pages").path("/contact").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { global } = useAppConfig();

// Form state
const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);

// Form submission handler
const handleSubmit = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    // Replace with your actual form submission logic
    // await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: form.value
    // })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    isSubmitted.value = true;
    form.value = { name: "", email: "", subject: "", message: "" };
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <div v-if="page" class="min-h-screen text-stone-800 dark:text-stone-50">
    <!-- Page Hero Section -->
    <div class="container mx-auto px-14 py-12 mt-18">
      <div class="text-left max-w-2xl">
        <h1 class="text-4xl font-bold mb-4">{{ page.title }}</h1>
        <p class="text-lg mb-8">{{ page.description }}</p>
      </div>
    </div>

    <!-- Contact Form Section -->
    <div class="container mx-auto px-14 pt-0">
      <div class="max-w-2xl">
        <!-- Success Message -->
        <div v-if="isSubmitted" class="alert alert-success mb-6">
          <Icon
            name="fa6-solid:circle-check"
            class="shrink-0 size-6"
            aria-hidden="true"
            size="24"
          />
          <span>Thank you! Your message has been sent successfully.</span>
        </div>

        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base font-medium">Name</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Your full name"
              class="input input-bordered w-full bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              required
            />
          </div>

          <!-- Email Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base font-medium">Email</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="your.email@example.com"
              class="input input-bordered w-full bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              required
            />
          </div>

          <!-- Subject Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base font-medium">Subject</span>
            </label>
            <input
              v-model="form.subject"
              type="text"
              placeholder="What's this about?"
              class="input input-bordered w-full bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              required
            />
          </div>

          <!-- Message Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base font-medium">Message</span>
            </label>
            <textarea
              v-model="form.message"
              placeholder="Tell me about your project, ideas, or just say hello..."
              class="textarea textarea-bordered h-32 w-full resize-none bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              required
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="form-control">
            <button
              type="submit"
              class="btn btn-info w-full text-white"
              :class="{ loading: isSubmitting }"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </div>
        </form>

        <!-- Alternative Contact Info -->
        <div class="mt-12 pt-8 border-t border-base-300 mb-14">
          <h3 class="text-lg font-medium mb-4">Or reach out directly</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Icon
                name="fa6-solid:envelope"
                class="shrink-0 size-5 dark:text-base-content/60 text-info"
                aria-hidden="true"
                size="20"
              />
              <a
                :href="`mailto:${global.email}`"
                class="text-info hover:underline"
              >
                {{ global.email }}
              </a>
            </div>
            <div v-if="global.meetingLink" class="flex items-center gap-3">
              <Icon
                name="fa6-solid:calendar-days"
                class="shrink-0 size-5 dark:text-base-content/60 text-info"
                aria-hidden="true"
                size="20"
              />
              <a :href="global.meetingLink" class="text-info hover:underline">
                Schedule a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
