<template>
  <div
    class="flex flex-col items-center px-6 md:px-8 py-8 rounded-xl border border-custom-grey-200 bg-custom-light-100 border-dashed"
    @dragover.prevent
    @drop="handleFileDrop"
  >
    <button
      v-if="!selectedFiles?.length"
      class="flex items-center justify-center w-20 h-20 rounded-md bg-custom-grey-200"
    >
      <img src="@/assets/images/interview/upload.svg" alt="upload icon" />
    </button>
    <div v-else class="flex gap-1">
      <div v-for="file in filesToPreview" :key="file.name" class="h-20 w-20">
        <img
          v-if="file.type === 'image/png'"
          :src="file.url"
          :alt="file.name"
          class="w-full h-full object-cover"
        />
        <div
          v-if="file.type === 'application/pdf'"
          class="flex items-center justify-center h-full w-full border"
        >
          {{ file.name }}
        </div>
        <video
          v-if="file.type === 'video/mp4'"
          ref="video"
          class="w-full h-full object-cover"
        >
          <source :src="file.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <p
      class="mt-6 mb-10 text-custom-grey-900 text-lg leading-[1.125rem] text-center"
    >
      Drag and drop or select from files
    </p>
    <div class="flex justify-between">
      <CommonBaseButton
        variant="outlined"
        class="py-5 px-8"
        @click="triggerFileInput"
      >
        Upload from files
      </CommonBaseButton>
    </div>
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="handleFiles"
      :multiple
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ multiple?: boolean }>(), {
  multiple: false,
});

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = defineModel<File[]>({ default: [] });

const filesToPreview = computed(() =>
  selectedFiles.value.map((file: File) => {
    const fileUrl = URL.createObjectURL(file);
    return {
      name: file.name,
      type: file.type,
      url: fileUrl,
    };
  })
);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault();
  const files = event.dataTransfer?.files as FileList;
  selectedFiles.value = [...files];
};

const handleFiles = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    selectedFiles.value = [...files];
  }
};
</script>
