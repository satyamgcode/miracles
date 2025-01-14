<template>
  <div class="px-4 pb-[10px] pt-10 md:px-12 md:pt-12">
    <div class="flex flex-col max-md:gap-6 md:flex-row md:pr-12 mb-8">
      <h1 class="md:basis-[340px] text-[2.5rem] leading-[2.5rem]">
        Audio Interview (Pre-recorded)
      </h1>
      <div class="flex gap-4 items-center">
        <button
          class="w-full py-5 px-8 border border-custom-grey-500 rounded-c-4xl whitespace-nowrap"
        >
          Revert to original
        </button>
        <button
          class="w-full py-5 px-8 border border-custom-grey-500 rounded-c-4xl"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="h-[230px] md:h-[424px] mb-6">
      <InterviewVideoPlayer
        ref="videoRef"
        :key="editedVideoUrl"
        :video-url="editedVideoUrl"
      />
    </div>
    <div class="flex items-center justify-between mb-6">
      <div class="flex gap-4">
        <CommonBaseButton
          variant="outlined"
          class="py-5 px-8"
          @click="splitClips"
          >Split at {{ currentVideoTime }}</CommonBaseButton
        >
        <CommonBaseButton
          variant="outlined"
          class="py-5 px-8"
          @click="deleteClipsSegment"
          >Delete Clip</CommonBaseButton
        >
      </div>
      <div class="flex gap-8">
        <button class="flex items-center gap-2">
          <IconsChevronLeftIcon :height="12" :width="6" stroke="#1F2933" />
          <span class="font-semibold leading-4"> Undo </span>
        </button>
        <button class="flex items-center gap-2">
          <span class="font-semibold leading-4"> Redo </span>
          <IconsChevronRightIcon :height="12" :width="6" stroke="#1F2933" />
        </button>
      </div>
    </div>
    <div class="mb-[30px]">
      <!-- @vue-expect-error -->
      <InterviewVideoClips
        v-if="videoRef"
        ref="clipsRef"
        :video-player="videoRef.el"
        :videoUrl
        @on-time-update="updateTime"
        @on-clips-delete="trimVideo"
      />
    </div>
    <div class="flex justify-end">
      <CommonBaseButton variant="secondary" class="py-5 px-8"
        >Save</CommonBaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { fixWebmDuration } from "@fix-webm-duration/fix";

type Props = {
  videoUrl: string;
  recordedChunks: Blob[];
  recordingStartTimes: number[];
  recordingDurations: number[];
};

const props = defineProps<Props>();

const { videoUrl, recordedChunks, recordingDurations, recordingStartTimes } =
  toRefs(props);
const videoRef = ref<HTMLElement | null>(null);
const clipsRef = ref<HTMLElement | null>(null);
const currentVideoTime = ref<string>("0:00");
const editedVideoUrl = ref<string>(videoUrl.value);

const updateTime = (currentTime: number) => {
  // @ts-expect-error ref
  const videoPlayer = videoRef.value.el as HTMLVideoElement;
  videoPlayer.currentTime = currentTime;
  const minutes = Math.floor(videoPlayer.currentTime / 60);
  const seconds = Math.floor(videoPlayer.currentTime % 60)
    .toString()
    .padStart(2, "0");
  currentVideoTime.value = `${minutes}:${seconds}`;
};

const splitClips = () => {
  // @ts-expect-error ref
  clipsRef.value?.splitClips();
};

const deleteClipsSegment = () => {
  // @ts-expect-error ref
  clipsRef.value?.deleteSegment();
};

const trimVideo = async ({
  start,
  end,
  duration,
}: {
  start: number;
  end: number;
  duration: number;
}) => {
  const trimmedChunks = recordedChunks.value.filter((chunk, index) => {
    const chunkDuration = recordingDurations.value[index];
    const chunkStart = recordingStartTimes.value[index];

    return chunkStart + chunkDuration <= start || chunkStart >= end;
  });

  console.log(trimmedChunks);

  try {
    const trimmedBlob = new Blob(trimmedChunks, { type: "video/webm" });
    // const blobWithFixedDuration = await fixWebmDuration(trimmedBlob, duration);
    editedVideoUrl.value = URL.createObjectURL(trimmedBlob);
  } catch (error) {
    console.log(error);
  }
};
</script>
