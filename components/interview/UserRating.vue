<template>
  <div class="flex gap-1">
    <button
      v-for="n in totalRating"
      :key="n"
      class="rounded-lg border-[0.5px] text-sm h-6 w-6"
      @click="rating = n"
    >
      {{ n }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ totalRating: number }>()
const rating = defineModel()
</script>
