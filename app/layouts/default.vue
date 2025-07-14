<script setup lang="ts"></script>

<template>
  <div>
    <div
      class="max-w-5xl mx-auto bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20 pt-10"
    >
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </div>
  </div>
</template>
