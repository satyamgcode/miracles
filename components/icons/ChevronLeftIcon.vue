<template>
  <svg
    :width
    :height
    viewBox="0 0 6 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 1L1 6L5 11"
      :stroke
      stroke-opacity="0.64"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
type Props = {
  stroke?: string;
  height?: number;
  width?: number;
};

withDefaults(defineProps<Props>(), {
  stroke: "black",
  height: 24,
  width: 24,
});
</script>

<style scoped></style>
