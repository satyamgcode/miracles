<template>
  <div class="pt-[54px] md:pt-24 px-12 h-[540px]">
    <h1
      class="max-md:mb-6 text-[2rem] leading-[2.4rem] md:text-[4rem] md:leading-[4rem]"
    >
      Settings
    </h1>
    <div class="flex flex-col md:flex-row mt-8 gap-16">
      <div>
        <button
          @click="selectedTab = 'audio'"
          class="p-[10px] mb-[10px] w-[222px] rounded-[20px] flex items-center gap-2"
          :class="{ 'bg-custom-yellow-100': selectedTab === 'audio' }"
        >
          <IconsMicrophoneFilledIcon
            :fill="selectedTab === 'audio' ? '#398B39' : '#1F2933'"
          />
          <span>Audio</span>
        </button>
        <button
          @click="selectedTab = 'video'"
          class="p-[10px] w-[222px] rounded-[20px] flex items-center gap-2"
          :class="{ 'bg-custom-yellow-100': selectedTab === 'video' }"
        >
          <IconsVideoFilledIcon
            :fill="selectedTab === 'video' ? '#398B39' : '#1F2933'"
          />
          <span>Video</span>
        </button>
      </div>
      <div v-if="selectedTab === 'audio'" class="w-full">
        <CommonSelect
          class="mb-6 max-w-[366px]"
          :options="microphones"
          label="Microphone"
          v-model="selectedMicrophone"
          @on-change="changeMicrophone"
        >
          <template #prefix>
            <div>
              <IconsMicrophoneIcon :height="20" :width="20" />
            </div>
          </template>
        </CommonSelect>
        <CommonSelect
          class="max-w-[366px]"
          :options="speakers"
          label="Speaker"
          v-model="selectedSpeaker"
          @on-change="changeMicrophone"
        >
          <template #prefix>
            <img
              src="@/assets/images/interview/speaker.svg"
              alt="speaker icon"
            />
          </template>
        </CommonSelect>
      </div>
      <div v-if="selectedTab === 'video'" class="w-full">
        <CommonSelect
          class="max-w-[366px]"
          :options="cameras"
          label="Camera"
          v-model="selectedCamera"
          @on-change="changeCamera"
        >
          <template #prefix>
            <img
              src="@/assets/images/interview/video-outline.svg"
              alt="speaker icon"
            />
          </template>
        </CommonSelect>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "stop-track"): void;
  (e: "update-audio", value: MediaStream): void;
  (e: "update-video", value: MediaStream): void;
}>();

const selectedTab = ref<"audio" | "video">("audio");
const microphones = ref<{ label: string; value: string }[]>([]);
const speakers = ref<{ label: string; value: string }[]>([]);
const cameras = ref<{ label: string; value: string }[]>([]);
const selectedMicrophone = ref<string>("");
const selectedSpeaker = ref<string>("");
const selectedCamera = ref<string>("");
const currentStream = ref<MediaStream | null>(null);

const getDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  const videoTrack = mediaStream.getVideoTracks()[0];
  const audioTrack = mediaStream.getAudioTracks()[0];

  microphones.value = devices
    .filter((device) => device.kind === "audioinput")
    .map((device) => ({
      label: device.label,
      value: device.deviceId,
    }));

  selectedMicrophone.value = audioTrack?.getSettings().deviceId || "";

  speakers.value = devices
    .filter((device) => device.kind === "audiooutput")
    .map((device) => ({
      label: device.label,
      value: device.deviceId,
    }));

  selectedSpeaker.value = speakers.value[0].value;

  cameras.value = devices
    .filter((device) => device.kind === "videoinput")
    .map((device) => ({
      label: device.label,
      value: device.deviceId,
    }));

  selectedCamera.value = videoTrack?.getSettings().deviceId || "";
};

// Change microphone
const changeMicrophone = async (deviceId: string) => {
  try {
    emit("stop-track");

    const newStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: deviceId } },
    });

    currentStream.value = newStream;

    emit("update-audio", newStream);
  } catch (error) {
    console.error("Error switching microphones:", error);
  }
};

// Change camera
const changeCamera = async (deviceId: string) => {
  try {
    emit("stop-track");

    const newStream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
    });

    currentStream.value = newStream;

    // Emit the new audio stream to the parent component
    emit("update-video", newStream);
  } catch (error) {
    console.error("Error switching microphones:", error);
  }
};

getDevices();
</script>
