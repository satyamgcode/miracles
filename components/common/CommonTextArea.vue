<template>
  <div>
    <div v-if="label" class="font-semibold text-sm leading-5 mb-2">
      {{ label }}
    </div>
    <div class="relative">
      <textarea
        v-model="message"
        :placeholder
        :required
        rows="4"
        class="w-full border border-custom-grey-50 rounded-3xl placeholder:text-custom-grey-900 placeholder:leading-[1.6rem] outline-none py-4 px-3 resize-none"
        @input="checkCharactersLimit"
      ></textarea>
      <div class="absolute right-3 bottom-4 flex items-center gap-1">
        <img src="@/assets/images/file.svg" alt="file icon" />
        <span class="text-[0.625rem] leading-[0.814rem] text-custom-grey-900"
          >{{ message.length }} / {{ maxChars }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  label?: string;
  placeholder?: string;
  maxChars?: number;
  required?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  maxChars: 500,
  required: false,
  placeholder: "",
});

const message = defineModel<string>({ default: "" });

const checkCharactersLimit = () => {
  if (message.value.length > props.maxChars) {
    message.value = message.value.slice(0, props.maxChars);
  }
};
</script>
