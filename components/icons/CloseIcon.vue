<template>
  <svg
    :width
    :height
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2431 7.75738L7.75781 16.2427M16.2431 16.2426L7.75781 7.75732"
      :stroke
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
type Props = {
  stroke?: string
  height?: number
  width?: number
}

withDefaults(defineProps<Props>(), {
  stroke: '#28303F',
  height: 24,
  width: 24,
})
</script>

<style scoped></style>
