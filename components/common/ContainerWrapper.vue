<template>
  <div class="relative rounded-c-4xl">
    <div class="rounded-c-4xl h-full rounded-tl-none">
      <slot />
    </div>
    <div v-bind="footerProps" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ footerClasses?: string }>(), {
  footerClasses: "",
});

const footerProps = computed(() => ({
  class:
    "both-side-slanted absolute bottom-[-1px] z-20 h-10 w-1/2 left-1/2 -translate-x-1/2"
      .concat(" ")
      .concat(props.footerClasses),
}));
</script>

<style scoped>
.both-side-slanted {
  clip-path: polygon(5% 0, 94% 0, 100% 100%, 0% 100%);
}
</style>
