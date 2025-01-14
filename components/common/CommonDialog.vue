<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      v-bind="$attrs"
      class="fixed px-2 py-2 z-50 inset-0 bg-custom-grey-400 backdrop-blur-24 flex justify-center overflow-y-scroll"
      :class="{
        'items-center': position === 'center',
      }"
    >
      <div
        class="relative w-full h-full lg:w-[60%]"
        :class="{ 'h-full': position === 'top' }"
      >
        <div
          :class="`slanted w-3/4 md:w-2/5 mb-[-2px] rounded-bl-[40px] h-16 ${bgColor}`"
        />
        <div class="absolute top-0 right-6">
          <button
            @click="isOpen = false"
            class="lg:hidden h-14 w-14 rounded-full bg-custom-grey-500 flex justify-center items-center"
          >
            <IconsCloseIcon stroke="white" />
          </button>
        </div>
        <div :class="`relative rounded-c-4xl rounded-tl-none ${bgColor}`">
          <div class="absolute -top-4 left-4 md:left-10">
            <slot name="headerIcon" />
          </div>
          <div class="hidden lg:block absolute right-10 top-10">
            <button
              @click="isOpen = false"
              class="h-14 w-14 rounded-full border border-custom-grey-400 flex justify-center items-center"
            >
              <IconsCloseIcon />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
type Props = {
  position?: "top" | "center";
  backgroundColor?: string;
};

const props = withDefaults(defineProps<Props>(), {
  position: "center",
  backgroundColor: undefined,
});

const isOpen = defineModel({ default: false });

const bgColor = computed(() =>
  props.backgroundColor ? `bg-${props.backgroundColor}` : "bg-white"
);

// For preventing scroll for body content
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped>
.slanted {
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
  transform: rotateX(180deg);
}
</style>
