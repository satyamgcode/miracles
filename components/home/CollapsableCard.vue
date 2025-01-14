<template>
  <div
    class="rounded-[32px] p-6 transition-all duration-100"
    :class="isCollapsed ? 'bg-white' : 'bg-custom-yellow-100'"
  >
    <div class="flex gap-6" :class="isCollapsed ? 'items-center' : ''">
      <div class="w-full flex flex-col gap-4">
        <div
          class="flex justify-between items-center"
          role="button"
          @click="isCollapsed = !isCollapsed"
        >
          <slot name="heading" />
        </div>
        <p v-if="!isCollapsed" @click.stop>
          <slot name="content" />
        </p>
      </div>
      <div>
        <button
          v-if="isCollapsed"
          class="h-12 w-12 flex justify-center items-center rounded-full border border-custom-grey-200"
          @click="isCollapsed = false"
        >
          +
        </button>
        <button
          v-else
          class="h-12 w-12 flex justify-center items-center rounded-full bg-custom-grey-500 text-white"
          @click="isCollapsed = true"
        >
          -
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen?: boolean }>();
const { isOpen } = toRefs(props);

const isCollapsed = ref<boolean>(isOpen.value ? !isOpen.value : true);

watch(isOpen, (value) => {
  isCollapsed.value = !value;
});
</script>
