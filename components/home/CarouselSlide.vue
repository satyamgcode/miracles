<template>
  <div class="relative w-full rounded-lg rounded-tr-none">
    <div v-bind="headerProps" />
    <div
      class="text-white bg-custom-grey-800 h-full rounded-lg rounded-tr-none"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ headerClasses?: string }>(), {
  headerClasses: "",
});

const headerProps = computed(() => ({
  class:
    "slanted absolute top-[-1px] z-20 bg-custom-grey-500 w-3/4 right-[-1px] " +
    props.headerClasses,
}));
</script>

<style scoped>
.slanted {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 5% 100%);
}
</style>
