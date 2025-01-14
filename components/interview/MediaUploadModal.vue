<template>
  <div class="pt-10 pb-6 px-4 md:px-8 lg:px-12 w-full">
    <h1
      class="mb-4 text-[1.5rem] leading-[2rem] sm:text-[2rem] sm:leading-[2.4rem] lg:text-[3rem] lg:leading-[3.5rem] xl:text-[3.5rem] xl:leading-[4.2rem]"
    >
      Add Media
    </h1>
    <p class="mb-8 text-sm leading-[1.4rem] sm:text-base sm:leading-[1.6rem] md:text-lg md:leading-6 lg:leading-7">
      Note:
      <span class="text-custom-grey-900">
        Any content you upload will automatically be anonymized on your behalf,
        so no personally identifiable information is revealed.
      </span>
    </p>
    <form @submit.prevent="handleFileSubmit" class="w-full">
      <div class="mb-6 md:mb-8 lg:mb-10">
        <CommonFileUpload v-model="files" multiple />
      </div>
      <div class="flex justify-start">
        <CommonBaseButton
          type="submit"
          variant="secondary"
          class="py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10"
          @click="handleFileSubmit"
        >
          Submit
        </CommonBaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "on-submit", value: File[]): void;
}>();

const files = ref<File[]>([]);

const handleFileSubmit = () => {
  if (files.value) {
    emit("on-submit", files.value);
    console.log("Files submitted:", files.value);
  }
};
</script>
