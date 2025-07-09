<script setup lang="ts">
</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto sm:border-x border-neutral-200 dark:border-neutral-700 pt-10">
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </div>
  </div>
</template>