<template>
  <div
    class="h-[calc(100vh-10vh)] pt-14 pb-6 md:pb-10 px-4 md:px-12 flex flex-col gap-8"
  >
    <h1 class="text-[2rem] leading-[2.4rem] md:text-[3rem] md:leading-[4rem]">
      Gallery
    </h1>
    <div class="flex-1 h-0 overflow-hidden">
      <CommonCarousel
        ref="carousel"
        :slides="files"
        :items-to-show="1"
        :show-actions="false"
        v-model="currentSlide"
        class="h-full"
      >
        <template #slide="{ slide: file }">
          <div class="h-full px-1">
            <img
              v-if="file.type === 'image/png'"
              :src="file.url"
              :alt="file.name"
              class="w-full h-full object-cover"
            />
            <embed
              v-if="file.type === 'application/pdf'"
              :src="file.url"
              :type="file.type"
              class="w-full h-full"
            />
            <div v-if="file.type === 'video/mp4'" class="h-full w-full">
              <InterviewVideoPlayer :video-url="file.url" />
            </div>
          </div>
        </template>
      </CommonCarousel>
    </div>
    <div>
      <h1 class="text-2xl leading-[1.8rem] md:text-[2rem] md:leading-[2.4rem]">
        AI Summary
      </h1>
      <p class="leading-5 text-custom-grey-900">
        This is an AI Summary of the above PDF content, or image, or video.
      </p>
    </div>
    <div class="flex items-center justify-between">
      <!-- @vue-expect-error -->
      <CommonBaseButton
        variant="outlined"
        class="py-5 px-8"
        @click="carousel?.previous"
      >
        Previous
      </CommonBaseButton>
      <div v-if="files.length">
        {{ currentSlide + 1 }} / {{ medias.length }}
      </div>
      <!-- @vue-expect-error -->
      <CommonBaseButton
        variant="secondary"
        class="py-5 px-8"
        @click="carousel?.next"
      >
        Next
      </CommonBaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  medias: File[];
};

type MediaFile = {
  name: string;
  type: string;
  url: string;
};

const props = defineProps<Props>();
const { medias } = toRefs(props);
const files = ref<MediaFile[]>([]);
const carousel = ref<HTMLElement | null>(null);
const currentSlide = ref<number>(0);

onMounted(() => {
  Array.from(medias.value).forEach((file: File) => {
    const fileUrl = URL.createObjectURL(file);
    files.value.push({
      name: file.name,
      type: file.type,
      url: fileUrl,
    });
  });
});
</script>
