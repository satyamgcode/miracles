<template>
  <div class="relative h-full w-full">
    <video
      ref="video"
      @loadedmetadata="updateSliderMax"
      @timeupdate="updateTime"
      @ended="onVideoEnd"
      class="w-full h-full rounded-2xl object-cover"
    >
      <source :src="videoUrl" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div
      class="flex gap-3 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <button class="md:hidden flex items-center justify-center">
        <img src="@/assets/images/previous.svg" alt="previous icon" />
      </button>
      <button
        v-if="!isPlaying"
        @click="togglePlayPause"
        class="flex items-center justify-center h-12 w-12 md:h-20 md:w-20 rounded-full backdrop-blur-24 bg-custom-dark-200"
      >
        <IconsPlayIcon :height="13" :width="10" class="md:hidden" />
        <IconsPlayIcon :height="20" :width="16" class="max-md:hidden" />
      </button>
      <button class="md:hidden flex items-center justify-center">
        <img src="@/assets/images/next.svg" alt="next icon" />
      </button>
    </div>
    <div class="absolute inset-x-2 md:inset-x-0 -bottom-1.5 md:bottom-0">
      <input
        ref="slider"
        type="range"
        v-model="currentTime"
        @input="seek"
        :max="videoDuration"
        step="0.01"
        class="w-full h-1 outline-none appearance-none rounded-lg"
      />
      <div class="h-10 flex px-4 items-center gap-4 max-sm:hidden">
        <button class="flex items-center justify-center">
          <img src="@/assets/images/previous.svg" alt="previous icon" />
        </button>
        <button
          class="flex items-center justify-center"
          @click="togglePlayPause"
        >
          <img
            v-if="isPlaying"
            src="@/assets/images/pause.svg"
            alt="pause icon"
          />
          <IconsPlayIcon v-else :height="14" :width="14" />
        </button>
        <button class="flex items-center justify-center">
          <img src="@/assets/images/next.svg" alt="next icon" />
        </button>
        <span class="text-xs text-white leading-[0.976rem]"
          >{{ currentTimeDisplay }} / {{ totalTimeDisplay }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ videoUrl: string }>();

const video = ref<HTMLVideoElement | null>(null);
const slider = ref<HTMLInputElement | null>(null);
const isPlaying = ref<boolean>(false);
const videoDuration = ref<number>(0);
const currentTime = ref<number>(0);
const animationFrameId = ref<number | null>(null);

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const currentTimeDisplay = computed(() => formatTime(currentTime.value));
const totalTimeDisplay = computed(() => formatTime(videoDuration.value));

const updateSliderMax = () => {
  if (video.value) videoDuration.value = video.value.duration;
};

const updateTime = () => {
  if (video.value) currentTime.value = video.value.currentTime;
};

const smoothUpdateTime = () => {
  if (video.value) {
    currentTime.value = video.value.currentTime;
    animationFrameId.value = requestAnimationFrame(smoothUpdateTime);
  }
};

const togglePlayPause = () => {
  if (video.value) {
    if (video.value.paused || video.value.ended) {
      video.value.play();
      isPlaying.value = true;
      animationFrameId.value = requestAnimationFrame(smoothUpdateTime);
    } else {
      video.value.pause();
      isPlaying.value = false;
      if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value);
    }
  }
};

const seek = () => {
  if (video.value) video.value.currentTime = currentTime.value;
};

const onVideoEnd = () => {
  isPlaying.value = false;
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value);
};

onBeforeUnmount(() => {
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value);
});

watch(
  () => props.videoUrl,
  () => {
    if (video.value) {
      video.value.load();
      currentTime.value = 0;
      isPlaying.value = false;
    }
  }
);

watch(currentTime, () => {
  if (slider.value) {
    const value = Number(slider.value.value);
    const min = Number(slider.value.min);
    const max = Number(slider.value.max);
    slider.value.style.background = `linear-gradient(to right, red 0%, red ${
      ((value - min) / (max - min)) * 100
    }%, #FFFFFF ${((value - min) / (max - min)) * 100}%, #FFFFFF 100%)`;
  }
});

defineExpose({
  el: video,
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  display: none;
}
</style>
