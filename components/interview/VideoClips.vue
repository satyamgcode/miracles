<template>
  <div class="relative">
    <video ref="video" :src="videoUrl" class="hidden" />
    <div
      class="w-[600px] px-2 h-[132px] flex items-center overflow-x-auto whitespace-nowrap select-none"
    >
      <div ref="thumbnailsContainer" class="relative flex gap-4">
        <div
          v-for="(clips, index) in segmentedClips"
          :key="'segment-' + index"
          class="flex select-none p-[6px] rounded-[4px] bg-custom-grey-800 border-2"
          :class="{ 'border-custom-green-300': selectedSegmentIndex === index }"
          @click="selectSegment(index)"
        >
          <div
            v-for="(clip, index) in clips"
            :key="index"
            class="w-[100px] inline-block mr-[1px] select-none"
          >
            <img
              :src="clip.thumbnail"
              class="w-full h-auto select-none rounded-[3px]"
            />
          </div>
          <div
            class="absolute -top-[3px] bottom-0 w-1 bg-custom-grey-500 cursor-grab rounded-[7px] before:content-[''] before:absolute before:-top-3 before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-0 before:border-x-8 before:border-x-transparent before:border-t-8 before:border-t-custom-grey-500"
            :style="{ left: sliderPosition + 'px' }"
            @mousedown="startDrag"
            @touchstart="startDrag"
            @click.stop
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Clip = {
  time: number;
  thumbnail: string;
};

type Props = {
  videoUrl: string;
  videoPlayer: HTMLVideoElement;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "on-time-update", value: number): void;
  (
    e: "on-clips-delete",
    value: { start: number; end: number; duration: number }
  ): void;
}>();

const video = ref<HTMLVideoElement | null>(null);
const thumbnailsContainer = ref<HTMLElement | null>(null);
const segmentedClips = ref<Clip[][]>([]);
const sliderPosition = ref(0);
const selectedSegmentIndex = ref<number | null>(null);

const generateThumbnails = () => {
  const videoEl = video.value;
  if (!videoEl) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const interval = 5;
  const thumbnails: Clip[] = [];

  const generate = () => {
    if (!videoEl) return;

    canvas.width = videoEl.videoWidth / 5;
    canvas.height = videoEl.videoHeight / 5;
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    thumbnails.push({
      time: videoEl.currentTime,
      thumbnail: canvas.toDataURL("image/png"),
    });

    if (videoEl.currentTime + interval < videoEl.duration) {
      videoEl.currentTime += interval;
    } else {
      videoEl.removeEventListener("seeked", generate);
      segmentedClips.value = [thumbnails];
    }
  };

  videoEl.addEventListener("seeked", generate);
  videoEl.currentTime = 0;
};

const selectSegment = (index: number) => {
  selectedSegmentIndex.value =
    selectedSegmentIndex.value === index ? null : index;
};

const deleteSelectedSegment = () => {
  if (selectedSegmentIndex.value !== null && video.value) {
    const allSegments = segmentedClips.value.flat();
    const selectedSegment = segmentedClips.value[selectedSegmentIndex.value];
    const startSegmentIndex = allSegments.findIndex(
      (segment) => segment.time === selectedSegment[0].time
    );
    const endSegmentIndex = allSegments.findIndex(
      (segment) =>
        segment.time === selectedSegment[selectedSegment.length - 1].time
    );

    const start =
      startSegmentIndex === 0
        ? 0
        : allSegments[startSegmentIndex - 1].time * 1000;
    const end =
      endSegmentIndex === allSegments.length - 1
        ? video.value.duration * 1000
        : allSegments[startSegmentIndex + 1].time * 1000;

    const duration = video.value.duration * 1000 - (end - start);

    segmentedClips.value.splice(selectedSegmentIndex.value, 1);

    selectedSegmentIndex.value = null;

    emit("on-clips-delete", { start, end, duration });
  }
  // updateVideoSegments();
};

const startDrag = (event: MouseEvent | TouchEvent) => {
  // Get the initial X coordinate based on the event type
  const startX =
    event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

  const startSliderPosition = sliderPosition.value;

  const containerWidth = thumbnailsContainer.value?.offsetWidth ?? 600;
  const maxLeft = containerWidth - 1;

  const onMove = (e: MouseEvent | TouchEvent) => {
    // Calculate the new X coordinate based on the event type
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

    let newLeft = startSliderPosition + (clientX - startX);
    newLeft = Math.max(0, Math.min(maxLeft, newLeft));
    sliderPosition.value = newLeft;
    syncVideoWithSlider(newLeft);
  };

  const onEnd = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onEnd);
    window.removeEventListener("touchend", onEnd);
  };

  // Attach event listeners for both mouse and touch events
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove);
  window.addEventListener("mouseup", onEnd);
  window.addEventListener("touchend", onEnd);
};

const syncVideoWithSlider = (position: number) => {
  const videoEl = video.value;
  if (!videoEl) return;

  const sliderMaxPosition = thumbnailsContainer.value?.offsetWidth ?? 600;
  const percentage = position / sliderMaxPosition;
  videoEl.currentTime = videoEl.duration * percentage;
  emit("on-time-update", videoEl.currentTime);
};

const syncSliderWithVideo = () => {
  const videoEl = props.videoPlayer;
  const containerWidth = thumbnailsContainer.value?.offsetWidth ?? 600;
  if (!videoEl) return;

  const currentTime = videoEl.currentTime;
  const percentage = currentTime / videoEl.duration;
  sliderPosition.value = percentage * containerWidth;
};

const splitAtSliderPosition = () => {
  if (!video.value || segmentedClips.value.length === 0) return;
  const containerWidth = thumbnailsContainer.value?.offsetWidth ?? 600;
  const splitTime =
    (sliderPosition.value / containerWidth) * video.value.duration;

  const newSegments: Clip[][] = [];

  segmentedClips.value.forEach((segment) => {
    const beforeSplit = segment.filter((clip) => clip.time < splitTime);
    const afterSplit = segment.filter((clip) => clip.time >= splitTime);

    if (beforeSplit.length > 0) newSegments.push(beforeSplit);
    if (afterSplit.length > 0) newSegments.push(afterSplit);
  });

  segmentedClips.value = newSegments;
  // updateVideoSegments();
};

const updateVideoSegments = () => {
  if (!video.value) return;

  const remainingSegments = segmentedClips.value.flat();
  let currentIndex = 0;

  const playNextSegment = () => {
    if (currentIndex >= remainingSegments.length) {
      video.value?.pause();
      return;
    }

    if (video.value) {
      const clip = remainingSegments[currentIndex];
      video.value.currentTime = clip.time;
      currentIndex++;

      video.value.play();
      video.value.addEventListener("timeupdate", onTimeUpdate);
    }
  };

  const onTimeUpdate = () => {
    if (
      video.value &&
      video.value.currentTime >= remainingSegments[currentIndex]?.time
    ) {
      video.value.removeEventListener("timeupdate", onTimeUpdate);
      playNextSegment();
    }
  };

  playNextSegment();
};

onMounted(() => {
  const hiddenVideoEl = video.value;
  const originalVideoEl = props.videoPlayer;
  if (hiddenVideoEl && originalVideoEl) {
    hiddenVideoEl.addEventListener("loadedmetadata", generateThumbnails);
    originalVideoEl.addEventListener("timeupdate", syncSliderWithVideo);
  }
});

defineExpose({
  splitClips: splitAtSliderPosition,
  deleteSegment: deleteSelectedSegment,
});
</script>
