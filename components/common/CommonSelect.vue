<template>
  <div>
    <div v-if="label" class="font-semibold text-sm mb-2">{{ label }}</div>
    <div
      class="p-4 border w-full border-custom-grey-400 rounded-full flex items-center justify-between"
      role="button"
      @click="showOptions = !showOptions"
    >
      <div class="w-full flex items-center gap-3">
        <slot name="prefix" />
        <div class="leading-5 line-clamp-1">
          {{ selectedLabel }}
        </div>
      </div>
      <img src="@/assets/images/chevron-down.svg" alt="chevron down icon" />
    </div>
    <div class="relative w-full">
      <div
        v-if="showOptions"
        class="absolute top-1 inset-x-1 border border-custom-grey-400 bg-white rounded-2xl p-4"
      >
        <div class="max-h-[216px] overflow-y-scroll">
          <div
            v-for="option in options"
            :key="option.value"
            class="px-2 py-[10px] font-medium text-xl leading-6"
            :class="{ 'bg-custom-grey-100': selected === option.value }"
            @click="$emit('onChange', option.value)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Option = {
  label: string;
  value: string;
};

type Props = { options?: Option[]; label?: string };

const props = withDefaults(defineProps<Props>(), {
  options: [],
});

defineEmits<{
  (e: "onChange", deviceId: string): void;
}>();

const showOptions = ref<boolean>(false);
const selected = defineModel();
const selectedLabel = computed(
  () => props.options.find((option) => option.value === selected.value)?.label
);
</script>
