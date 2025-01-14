<template>
  <CommonContainerWrapper
    class="bg-custom-grey-500 text-white pb-6"
    footer-classes="bg-background"
  >
    <div class="px-4 max-w-[1140px] w-full mx-auto">
      <div class="flex justify-center">
        <div
          class="flex flex-col gap-6 md:flex-row justify-between md:basis-[1140px] mt-8"
        >
          <div class="flex gap-2">
            <HomeSectionsCount class="!text-xl">03</HomeSectionsCount>
            <h1 class="text-[2rem] leading-8 md:text-[3rem] font-normal md:leading-[4rem]">
              Share a Miracle
            </h1>
          </div>
          <div class="md:basis-[598px] text-sm font-medium hidden md:block ">
            <p>
              Sharing your miracle is simple and empowering. Choose an anonymous
              username and select the format that suits you best: participate in
              a Zoom interview, record a video at your own pace, share an audio
              story, or write a text account. Enhance your story by uploading
              photos or additional videos. Your journey can inspire and guide
              others in their healing process.
            </p>
          </div>
        </div>
      </div>
      <div
        class="mt-[60px] md:mt-[30px] container-with-blur bg-gradient-to-b from-gray-800 to-transparent relative"
      >
        <CommonCarousel :slides="slides" userClass="!md:mt-4">
          <template #slide="{ slide }">
            <div class="relative">
              <HomeCarouselSlide
                class=" h-[326px] md:h-[480px]"
                header-classes="h-10"
              >
                <div class="h-full">
                  <img
                    :src="slide.source"
                    alt="slide image"
                    class="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    class="absolute right-28 bottom-40 max-lg:top-1/2 max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 flex items-center justify-center h-[104px] w-[104px] lg:w-[184px] lg:h-[184px] rounded-full backdrop-blur-24 bg-custom-dark-200"
                  >
                    <img src="@/assets/images/play.svg" alt="play svg" />
                  </button>
                </div>
              </HomeCarouselSlide>
              <div
                class="mt-4 max-w-[490px] w-full lg:absolute lg:left-20 bottom-20 text-left "
              >
                <div
                  class="lg:w-[490px] font-medium text-2xl leading-[1.8rem] lg:text-[28px] lg:leading-[2.4rem] text-white"
                >
                  {{ slide.title }}
                </div>
                <div
                  class="lg:max-w-[490px] w-full opacity-[64%] mt-4 font-medium leading-[1.2rem] lg:text-xl lg:leading-[1.8rem]"
                >
                  {{ slide.description }}
                </div>
              </div>
            </div>
          </template>
        </CommonCarousel>
      </div>
    </div>
  </CommonContainerWrapper>
</template>

<script setup lang="ts">
import VideoShowcase from "@/assets/images/home/video-showcase.png";
import VideoShowcase2 from "@/assets/images/home/video-showcase2.svg";

const slides = [
  {
    source: VideoShowcase2,
    title: "How to Share a Miracle",
    description: "Introduce the process and its benefits.",
  },
  {
    source: VideoShowcase,
    title: "Understanding Chronic Illness Management",
    description:
      "Discover strategies for managing chronic conditions effectively. This video covers practical tips, lifestyle adjustments, and expert advice to improve quality of life.",
  }
];
</script>
