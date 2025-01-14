<template>
  <button class="flex items-center gap-2">
    <span class="font-semibold leading-4">
      <slot />
    </span>
    <IconsChevronRightIcon :height="10" :width="5" :stroke />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ stroke?: string }>(), {
  stroke: "black",
});
</script>
