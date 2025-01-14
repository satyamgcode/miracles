<template>
  <div class="relative">
    <div class="relative h-fit max-h-14 w-[400px]">
      <input
        v-model="model"
        type="text"
        placeholder="Search"
        class="w-full py-3 pl-10 pr-10 border rounded-full focus:outline-none"
      />
      <div
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        <img src="@/assets/images/search.svg" alt="search icon" />
      </div>
      <button
        @click="$emit('onClose')"
        class="absolute top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none"
        :class="model ? 'right-[90px]' : 'right-3'"
      >
        <img src="@/assets/images/close.svg" alt="close icon" />
      </button>
      <button v-if="model"
        class="bg-custom-yellow-100 rounded-c-4xl absolute p-[10px] right-3 top-1/2 transform -translate-y-1/2 max-h-10 max-w-20 h-full w-full flex items-center justify-center hover:bg-custom-yellow-300 active:bg-custom-yellow-100"
      >
        <span class="text-sm text-custom-green-300">Search</span>
      </button>
    </div>
    <div
      v-if="model && queryData?.length"
      class="absolute inset-x-0 bg-white rounded-2xl p-4"
    >
      <div class="max-h-[216px] overflow-y-scroll">
        <div
          v-for="(value, index) in queryData"
          :key="`${index}-${value}`"
          class="px-2 py-[10px] font-medium text-xl leading-6"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  data?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  data: [],
});

defineEmits<{
  (e: "onClose"): void;
}>();

const model = defineModel<string>({ default: "" });

const queryData = computed(() =>
  props.data.filter((s: string) =>
    s.toLowerCase().includes(model.value?.toLowerCase())
  )
);
</script>
