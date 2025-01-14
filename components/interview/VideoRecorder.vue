<template>
  <div class="w-full">
    <div class="w-full h-full relative mb-6">
      <button
        @click="isSettingsModalOpen = true"
        class="absolute z-20 bg-custom-dark-100 top-3 right-4  w-11 rounded-full flex justify-center items-center"
      >
        <img src="@/assets/images/interview/setting.svg" alt="setting svg" />
      </button>
      <button
        class="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 h-16 w-16 bg-white rounded-full flex justify-center items-center"
        @click="toggleRecording"
      >
        <img
          v-if="recordedVideoUrl"
          src="@/assets/images/interview/play.svg"
          alt="play svg"
        />
        <img
          v-else-if="!isRecording"
          src="@/assets/images/interview/record.svg"
          alt="camera video icon"
        />
        <img
          v-else-if="isRecording"
          src="@/assets/images/interview/stop.svg"
          alt="stop icon"
        />
      </button>
      <button
        class="absolute z-20 bottom-5 right-5"
        @click="isDeleteModalOpen = true"
        v-if="recordedVideoUrl"
      >
        <img src="@/assets/images/interview/delete.svg" alt="delete icon" />
      </button>
      <div class="absolute z-20 bottom-5 left-5 text-white">
        <div v-if="isRecording">REC {{ formattedRecordingTime }}</div>
        <div v-if="recordedVideoUrl">
          {{ formattedPlaybackTime }}
        </div>
      </div>
      <div class="h-full">
        <video
          v-if="!recordedVideoUrl"
          ref="liveVideo"
          autoplay
          muted
          class="rounded-c-4xl w-full h-[450px] sm:min-h-[300px] sm:h-[300px] object-cover"
          :class="{ 'bg-black': !isCameraAccessible }"
        ></video>

        <video
          ref="recordedVideo"
          @timeupdate="updatePlaybackTime"
          v-else-if="recordedVideoUrl"
          :src="recordedVideoUrl"
          class="w-full h-full object-cover rounded-c-4xl"
        ></video>
      </div>

      <!-- <VideoTimer /> -->
    </div>

    <CommonBaseButton
      v-if="recordedVideoUrl"
      variant="primary"
      class="w-full text-sm py-3 px-6 gap-2"
      @click="isEditModalOpen = true"
    >
      <img src="@/assets/images/pencil.svg" alt="pencil logo" />
      <span>Edit Video</span>
    </CommonBaseButton>

    <CommonDialog v-model="isSettingsModalOpen">
      <template #headerIcon>
        <div
          class="h-[72px] w-[72px] border-[12px] border-custom-yellow-100 rounded-full flex justify-center items-center"
        >
          <img
            src="@/assets/images/interview/setting-outline.svg"
            alt="settings outline logo"
          />
        </div>
      </template>
      <VideoSettingsModal
        @stop-track="stopAudioTrack"
        @update-audio="updateAudioStream"
        @update-video="updateVideoStream"
      />
    </CommonDialog>

    <CommonDialog v-model="isDeleteModalOpen">
      <template #headerIcon>
        <div
          class="h-[72px] w-[72px] border-[12px] border-custom-yellow-100 rounded-full flex justify-center items-center"
        >
          <img
            src="@/assets/images/interview/camera.svg"
            alt="settings outline logo"
          />
        </div>
      </template>
      <div class="pt-[54px] pb-12 md:pt-24 px-12">
        <h1
          class="max-md:mb-6 text-[2rem] leading-[2.4rem] md:text-[4rem] md:leading-[4rem]"
        >
          Are you sure you want to delete this video?
        </h1>
        <div class="mt-10 flex gap-6">
          <button
            class="w-[130px] py-5 px-8 rounded-c-4xl border border-custom-grey-500"
            @click="deleteRecordedVideo"
          >
            Yes
          </button>
          <button
            class="w-[130px] py-5 px-8 rounded-c-4xl bg-custom-grey-500 text-white"
            @click="closeDeleteModal"
          >
            No
          </button>
        </div>
      </div>
    </CommonDialog>

    <CommonDialog v-model="isEditModalOpen" class="pt-2">
      <InterviewVideoEditModal
        :video-url="recordedVideoUrl || ''"
        :recorded-chunks="recordedChunks"
        :recording-durations="recordingDurations"
        :recording-start-times="recordingStartTimes"
      />
    </CommonDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import VideoSettingsModal from "./VideoSettingsModal.vue";
import CommonDialog from "../common/CommonDialog.vue";
import { fixWebmDuration } from "@fix-webm-duration/fix";

const emit = defineEmits<{
  (e: "on-recording-finished", value: string): void;
  (e: "on-recording-delete"): void;
}>();

const props = defineProps<{ defaultUrl?: string | null }>();
const { defaultUrl } = toRefs(props);

const isCameraAccessible = ref<boolean>(false);
const isRecording = ref<boolean>(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const recordedChunks = ref<Blob[]>([]);
const recordingStartTimes = ref<number[]>([]);
const recordingDurations = ref<number[]>([]);
const recordedVideoUrl = ref<string | null>(null);
const recordingStartTime = ref<number>(0);
const elapsedRecordingTime = ref<number>(0);
const playbackTime = ref<number>(0);
const videoStream = ref<MediaStream | null>(null);
const audioStream = ref<MediaStream | null>(null);
const liveVideo = ref<HTMLVideoElement | null>(null);
const recordedVideo = ref<HTMLVideoElement | null>(null);
const timerInterval = ref<number | null>(null);
const isSettingsModalOpen = ref<boolean>(false);
const isEditModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);

// Initialize the camera and audio stream
const initializeCamera = async () => {
  try {
    videoStream.value = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (liveVideo.value) {
      liveVideo.value.srcObject = videoStream.value;
    }
    isCameraAccessible.value = true;
  } catch (error) {
    console.error("Camera access denied or unavailable.", error);
    isCameraAccessible.value = false;
  }
};

const initializeAudioStream = async () => {
  try {
    audioStream.value = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  } catch (error) {
    console.error("Audio access denied or unavailable.", error);
  }
};

const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const formattedRecordingTime = computed(() =>
  formatTime(elapsedRecordingTime.value)
);
const formattedPlaybackTime = computed(() => formatTime(playbackTime.value));

const updatePlaybackTime = () => {
  if (recordedVideo.value) {
    playbackTime.value = recordedVideo.value.currentTime;
  }
};

// Handle starting and stopping recording
const toggleRecording = () => {
  if (recordedVideoUrl.value) {
    playRecordedVideo();
  } else {
    if (isRecording.value) {
      stopRecording();
    } else {
      startRecording();
    }
  }
};

// Start recording
const startRecording = () => {
  if (!videoStream.value) return;

  const combinedStream = new MediaStream([
    ...videoStream.value.getVideoTracks(),
    ...(audioStream.value?.getAudioTracks() || []),
  ]);

  mediaRecorder.value = new MediaRecorder(combinedStream, {
    mimeType: "video/webm",
    bitsPerSecond: 100000,
  });

  recordedChunks.value = [];

  mediaRecorder.value.ondataavailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      const chunkDuration = Date.now() - recordingStartTime.value;
      recordedChunks.value.push(event.data);

      recordingStartTimes.value.push(Date.now() - recordingStartTime.value);
      recordingDurations.value.push(chunkDuration);
    }
  };

  mediaRecorder.value.onstop = async () => {
    const blob = new Blob(recordedChunks.value, { type: "video/webm" });
    const duration = Date.now() - recordingStartTime.value;
    const blobWithFixedDuration = await fixWebmDuration(blob, duration);
    const url = URL.createObjectURL(blobWithFixedDuration);
    recordedVideoUrl.value = url;
    emit("on-recording-finished", url);
  };

  mediaRecorder.value.start(1000);
  isRecording.value = true;
  recordingStartTime.value = Date.now();

  timerInterval.value = window.setInterval(() => {
    elapsedRecordingTime.value = Math.floor(
      (Date.now() - recordingStartTime.value) / 1000
    );
  }, 1000);
};

// Stop recording
const stopRecording = () => {
  mediaRecorder.value?.stop();
  isRecording.value = false;
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

// Play the recorded video
const playRecordedVideo = () => {
  recordedVideo.value?.play();
};

const stopAudioTrack = () => {
  videoStream.value?.getTracks().forEach((track) => track.stop());
};

// Update the audio stream when the user switches microphones
const updateAudioStream = (newAudioStream: MediaStream) => {
  audioStream.value?.getTracks().forEach((track) => track.stop()); // Stop the old audio track
  audioStream.value = newAudioStream;

  // Update the combined stream (video + new audio)
  if (videoStream.value) {
    const combinedStream = new MediaStream([
      ...videoStream.value.getVideoTracks(),
      ...audioStream.value.getAudioTracks(),
    ]);
    if (liveVideo.value) {
      liveVideo.value.srcObject = combinedStream;
    }
  }
};

const updateVideoStream = (newStream: MediaStream) => {
  videoStream.value = newStream;
  if (liveVideo.value) {
    liveVideo.value.srcObject = videoStream.value;
  }
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const deleteRecordedVideo = async () => {
  recordedVideoUrl.value = null;
  elapsedRecordingTime.value = 0;
  playbackTime.value = 0;
  closeDeleteModal();
  await initializeCamera();
  emit("on-recording-delete");
};

const reInitializeCamera = async () => {
  recordedVideoUrl.value = null;
  elapsedRecordingTime.value = 0;
  playbackTime.value = 0;
  await initializeCamera();
};

onMounted(async () => {
  await initializeCamera();
  await initializeAudioStream();
});

onBeforeUnmount(() => {
  audioStream.value?.getTracks().forEach((track) => track.stop());
  videoStream.value?.getTracks().forEach((track) => track.stop());
  if (mediaRecorder.value && isRecording.value) {
    stopRecording();
  }
});

watch(
  defaultUrl,
  (url) => {
    if (url) recordedVideoUrl.value = url;
    else recordedVideoUrl.value = null;
  },
  { immediate: true }
);

defineExpose({
  reInitializeCamera,
});

// defineOptions({
//   inheritAttrs: false,
// });
</script>
