<template>
  <svg
    :width
    :height
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V12C14 14.2091 12.2091 16 10 16H4C1.79086 16 0 14.2091 0 12V4ZM11 5C11 6.10457 10.1046 7 9 7C7.89543 7 7 6.10457 7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5ZM16.5409 12.3103L15.5 11.1999V4.79993L16.5409 3.68961C17.781 2.3669 20 3.24442 20 5.05749V10.9424C20 12.7554 17.781 13.633 16.5409 12.3103Z"
      :fill
      fill-opacity="0.64"
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
  height: 16,
  width: 20,
});
</script>

<style scoped></style>
