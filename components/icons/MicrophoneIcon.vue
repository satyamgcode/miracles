<template>
  <svg
    :width
    :height
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.3327 13.3333V16C25.3327 21.1546 21.154 25.3333 15.9993 25.3333M6.66602 13.3333V16C6.66602 21.1546 10.8447 25.3333 15.9993 25.3333M15.9993 25.3333V29.3333M10.666 29.3333H21.3327M15.9993 20C13.7902 20 11.9993 18.2091 11.9993 16V6.66663C11.9993 4.45749 13.7902 2.66663 15.9993 2.66663C18.2085 2.66663 19.9993 4.45749 19.9993 6.66663V16C19.9993 18.2091 18.2085 20 15.9993 20Z"
      :stroke
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
  stroke: "#398B39",
  height: 32,
  width: 32,
});
</script>

<style scoped></style>
