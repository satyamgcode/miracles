<template>
  <svg
    :width
    :height
    viewBox="0 0 14 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 0C4.79086 0 3 1.79086 3 4V10C3 12.2091 4.79086 14 7 14C9.20914 14 11 12.2091 11 10V4C11 1.79086 9.20914 0 7 0ZM1 8.25C1.41421 8.25 1.75 8.58579 1.75 9V10C1.75 12.8995 4.10051 15.25 7 15.25C9.8995 15.25 12.25 12.8995 12.25 10V9C12.25 8.58579 12.5858 8.25 13 8.25C13.4142 8.25 13.75 8.58579 13.75 9V10C13.75 13.4744 11.125 16.3357 7.75 16.7088V18.5H10C10.4142 18.5 10.75 18.8358 10.75 19.25C10.75 19.6642 10.4142 20 10 20H4C3.58579 20 3.25 19.6642 3.25 19.25C3.25 18.8358 3.58579 18.5 4 18.5H6.25V16.7088C2.87504 16.3357 0.25 13.4744 0.25 10V9C0.25 8.58579 0.585786 8.25 1 8.25Z"
      :fill
    />
  </svg>
</template>

<script setup lang="ts">
type Props = {
  fill?: string;
  height?: number;
  width?: number;
};

withDefaults(defineProps<Props>(), {
  fill: "#1F2933",
  height: 20,
  width: 14,
});
</script>

<style scoped></style>
