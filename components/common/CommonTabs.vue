<template>
    <div class="relative">
      <div
        ref="scrollContainer"
        class="md:h-[64px] h-14 rounded-[110px] p-1 border border-custom-grey-400 flex gap-[10px] overflow-x-scroll hidden-scrollbar"
      >
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="h-full flex gap-1 justify-center items-center px-4 py-6 md:py-[21px] md:px-10 whitespace-nowrap  font-medium leading-[1.4rem]"
          :class="{
            'bg-custom-yellow-100 rounded-c-4xl text-custom-green-300 hover:bg-custom-yellow-300 active:bg-custom-yellow-100':
              activeTab === tab.value,
          }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
      <button
        v-if="showNextButton"
        class="absolute right-1 top-2 w-[42px] h-10 md:right-1.5 md:top-2 md:h-14 md:w-14 bg-white rounded-full flex items-center justify-center"
        @click="handleScroll"
      >
        <img src="@/assets/images/chevron-right.svg" alt="chevron right logo" />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  type Props = {
    tabs: Array<{
      label: string;
      value: string;
    }>;
    showNextButton?: boolean;
  };
  
  withDefaults(defineProps<Props>(), {
    showNextButton: true,
  });
  
  const scrollContainer = ref<HTMLElement | null>(null);
  const activeTab = defineModel();
  
  const handleScroll = () => {
    const container = scrollContainer.value;
    if (container) {
      const scrollableWidth = container.scrollWidth - container.clientWidth;
      const currentScrollPosition = container.scrollLeft;
  
      if (Math.abs(currentScrollPosition - scrollableWidth) <= 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };
  
  const preventScroll = (event: WheelEvent) => {
    event.preventDefault();
  };
  
  onMounted(() => {
    const container = scrollContainer.value;
    container?.addEventListener("wheel", preventScroll);
  });
  
  onBeforeUnmount(() => {
    const container = scrollContainer.value;
    container?.removeEventListener("wheel", preventScroll);
  });
  </script>
  