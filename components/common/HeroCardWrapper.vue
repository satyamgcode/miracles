<template>
  <div class="relative w-full rounded-c-4xl rounded-tr-none">
    <div
      :class="`slanted w-3/4 md:w-2/5 mb-[-2px] rounded-bl-[40px] h-16 md:h-16 ${backgroundColor}`"
    />
    <div :class="`${backgroundColor} h-full rounded-c-4xl rounded-tl-none`">
      <slot />
    </div>
    <div v-if="showBothSideSlanted"
      class="both-side-slanted absolute bottom-[-1px] z-20 bg-background h-10 w-1/2 left-1/2 -translate-x-1/2"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: false,
  },
  showBothSideSlanted: {
    type: Boolean,
    default: true, 
  },
});

const showBothSideSlanted = computed(() => props.showBothSideSlanted ?? true);

const backgroundColor = computed(() =>
  props.color ? props.color : "bg-custom-grey-200"
);
</script>

<style scoped>
.slanted {
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
  transform: rotateX(180deg);
}
.both-side-slanted {
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0% 100%);
}
</style>
