<template>
  <div class="flex flex-col md:flex-row mt-10 gap-5 ">
    <div class="max-md:mb-[49px] max-w-[560px] w-full mx-auto">
      <div class="relative">
        <div
          class="slanted-div absolute right-[-1px] bottom-[-1px] w-6 h-[90%] bg-custom-blue-300"
        />
        <img
          src="@/assets/images/home/case-study-1.svg"
          class="w-full"
          alt="case study img"
        />
        <button
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-[104px] w-[104px] rounded-full backdrop-blur-24 bg-custom-dark-200"
        >
          <img src="@/assets/images/play.svg" alt="play svg" />
        </button>
      </div>
      <div class="mt-10 mb-[18px]">
        <h1 class="text-2xl md:text-xl leading-[1.8rem] font-medium mb-4">
          Overcoming Cancer: Emily's Triumph
        </h1>
        <p
          class="font-normal text-sm leading-6 text-custom-grey-900 line-clamp-2 overflow-hidden text-ellipsis"
        >
          Follow Emily's inspiring journey through diagnosis, treatment, and
          resilience as she shares her strategies for maintaining hope and
          strength.
        </p>
      </div>
      <ChevronRightButton class="text-base font-semibold">Watch now > </ChevronRightButton>
    </div>
    <div class="max-w-[554px] mx-auto">
      <div
        class="bg-custom-grey-600 rounded-c-4xl border border-custom-grey-400 p-6 mb-[18px]"
      >
        <div class="flex flex-col-reverse md:flex-row gap-[19px]">
          <div class="md:basis-[222px]">
            <h1
              class="text-xl md:text-lg leading-[1.8rem] font-medium mb-4 line-clamp-2 overflow-hidden text-ellipsis"
            >
              From Darkness to Light: Someone’s Battle with Depression
            </h1>
            <p
              class="text-custom-grey-900 text-base md:text-sm leading-6 font-normal line-clamp-2 overflow-hidden text-ellipsis mb-4"
            >
              Join Sarah as she opens up about her battle with depression,
              offering insights into the healing power of community and
              self-care.
            </p>
            <CommonChevronRightButton class="text-base font-semibold">Watch now</CommonChevronRightButton>
          </div>
          <div class="w-full md:w-[264px] relative">
            <img
              src="@/assets/images/home/case-study-2.svg"
              alt="case study image"
              class="w-full h-full"
            />
            <img
              src="@/assets/images/home/play.svg"
              alt="play svg"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
      <div
        class="bg-custom-grey-600 rounded-c-4xl border border-custom-grey-400 p-6 mb-[18px]"
      >
        <div class="flex gap-4 pr-[25px] mb-4">
          <img
            src="@/assets/images/home/microphone.svg"
            alt="microphone icon"
          />
          <span class="font-medium text-xl md:text-lg leading-[1.8rem]"
            >What did you try that didn’t help you better?</span
          >
        </div>
        <div class="flex gap-[10px] mb-4">
          <img
            src="@/assets/images/home/play-filled.svg"
            alt="play filled icon"
          />
          <div>
            <img
              src="@/assets/images/home/audio-timing.svg"
              alt="audio timing"
            />
            <div class="flex items-center justify-between mt-1">
              <span
                class="text-xs leading-[0.825rem] text-custom-grey-500 font-medium"
                >1:15</span
              >
              <span
                class="text-xs leading-[0.825rem] text-custom-grey-900 font-medium"
                >3:29</span
              >
            </div>
          </div>
        </div>
        <CommonChevronRightButton class="text-base font-semibold">Listen now</CommonChevronRightButton>
      </div>
      <div
        class="bg-custom-grey-600 rounded-c-4xl border border-custom-grey-400 p-6"
      >
        <div class="mb-4">
          <div class="flex gap-4 pr-[25px] mb-4">
            <img
              src="@/assets/images/home/font-size.svg"
              alt="microphone icon"
            />
            <span
              class="font-medium text-xl md:text-lg leading-[1.8rem] line-clamp-2 overflow-hidden text-ellipsis"
              >What symptoms did you have? What was the western medical
              diagnosis and/or the eastern medicine diagnosis?</span
            >
          </div>
          <p
            class="text-custom-grey-900 md:font-normal font-medium text-xl sm:text-sm leading-6 line-clamp-2 overflow-hidden text-ellipsis"
          >
            Join Sarah as she opens up about her battle with depression,
            offering insights into the healing power of community and self-care.
          </p>
        </div>
        <CommonChevronRightButton>Read More</CommonChevronRightButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.slanted-div {
  clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
}
</style>
