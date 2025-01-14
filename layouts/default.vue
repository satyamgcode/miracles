<template>
  <div class="bg-background">
    <div class="max-w-screen-2xl h-screen overflow-y-scroll mx-auto">
      <AppNavbar />
      <slot />
      <AppFooter v-if="showFooter" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  showFooter: {
    type: Boolean,
    default: true  
  }
})
</script>
