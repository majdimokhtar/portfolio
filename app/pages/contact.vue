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

// Form errors
const errors = ref({
  name: "",
  email: "",
  message: "",
});

// Validation functions
const validateName = () => {
  if (!form.value.name.trim()) {
    errors.value.name = "Name is required";
    return false;
  }
  errors.value.name = "";
  return true;
};

const validateEmail = () => {
  if (!form.value.email.trim()) {
    errors.value.email = "Email is required";
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
    return false;
  }
  errors.value.email = "";
  return true;
};

const validateMessage = () => {
  if (!form.value.message.trim()) {
    errors.value.message = "Message is required";
    return false;
  }
  errors.value.message = "";
  return true;
};

// Watch for form changes to clear errors
watch(
  () => form.value.name,
  () => {
    if (form.value.name.trim()) validateName();
    else errors.value.name = "";
  }
);
watch(
  () => form.value.email,
  () => {
    if (form.value.email.trim()) validateEmail();
    else errors.value.email = "";
  }
);
watch(
  () => form.value.message,
  () => {
    if (form.value.message.trim()) validateMessage();
    else errors.value.message = "";
  }
);

// Formspree submission handler
const handleSubmit = async () => {
  if (isSubmitting.value) return;

  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Replace YOUR_FORM_ID with your actual Formspree form ID
    const response = await fetch("https://formspree.io/f/mgvzwzvq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      }),
    });

    if (response.ok) {
      isSubmitted.value = true;
      form.value = { name: "", email: "", subject: "", message: "" };
      errors.value = { name: "", email: "", message: "" };

      // Auto-hide success message after 2 seconds
      setTimeout(() => {
        isSubmitted.value = false;
      }, 2000);
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    alert("There was an error sending your message. Please try again.");
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
            <label class="label mb-2">
              <span class="label-text text-base font-medium">
                Name <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.name"
              type="text"
              name="name"
              placeholder="Your full name"
              class="input input-bordered w-full bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              :class="{ 'border-red-500': errors.name }"
              
            />
            <div v-if="errors.name" class="label">
              <span class="label-text-alt text-red-500">{{ errors.name }}</span>
            </div>
          </div>

          <!-- Email Field -->
          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text text-base font-medium">
                Email <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              class="input input-bordered w-full bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              :class="{ 'border-red-500': errors.email }"
              
            />
            <div v-if="errors.email" class="label">
              <span class="label-text-alt text-red-500">{{
                errors.email
              }}</span>
            </div>
          </div>

          <!-- Subject Field -->
          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text text-base font-medium">Subject</span>
            </label>
            <input
              v-model="form.subject"
              type="text"
              name="subject"
              placeholder="What's this about?"
              class="input input-bordered w-full bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
            />
          </div>

          <!-- Message Field -->
          <div class="form-control">
            <label class="label mb-2">
              <span class="label-text text-base font-medium">
                Message <span class="text-red-500">*</span>
              </span>
            </label>
            <textarea
              v-model="form.message"
              name="message"
              placeholder="Tell me about your project, ideas, or just say hello..."
              class="textarea textarea-bordered h-32 w-full resize-none bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-50 placeholder-stone-500 dark:placeholder-stone-400"
              :class="{ 'border-red-500': errors.message }"
              
            ></textarea>
            <div v-if="errors.message" class="label">
              <span class="label-text-alt text-red-500">{{
                errors.message
              }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-control">
            <button
              type="submit"
              class="btn btn-info text-white w-full flex items-center justify-center gap-2"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="loading loading-spinner loading-sm"
              ></span>
              <span>{{ isSubmitting ? "Sending..." : "Send Message" }}</span>
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
