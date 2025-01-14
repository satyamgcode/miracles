<template>
  <CommonContainerWrapper
    class="bg-custom-grey-500 text-white pb-12 md:pb-8"
    footer-classes="bg-background"
  >
    <div>
      <div class="flex justify-center px-4">
        <div
          class="flex flex-col gap-6 md:flex-row justify-between md:basis-[1140px] mt-20 md:mt-8"
        >
          <div class="flex gap-2">
            <HomeSectionsCount class="font-medium !text-xl">01</HomeSectionsCount>
            <h1 class="text-[2rem] leading-8 md:text-[3rem] font-normal md:leading-[4rem]">
              Latest Posts
            </h1>
          </div>
          <div class="md:basis-[471px] text-base font-normal">
            <p>
              Aenean sit amet maximus dui. Nullam maximus urna leo, eu
              condimentum turpis luctus sed. Vestibulum sed urna quis urna
              venenatis tempor. In accumsan suscipit nisl et aliquam.
            </p>
          </div>
        </div>
      </div>
      <div
        class="mt-[60px] md:mt-[30px] container-with-blur bg-gradient-to-b from-gray-800 to-transparent relative"
      >
        <CommonCarousel :breakpoints :slides="slides" userClass="md:px-[134px] mx-4">
          <template #slide="{ slide }">
            <div class="md:pr-5 px-5 ">
              <HomeCarouselSlide class="h-[323px] max-w-[400px] w-full mx-auto" header-classes="h-[23.77px]">
                <div class="h-full">
                  <div v-if="slide.isVideo" class="w-full h-full relative max-w-[400px]">
                    <button
                      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-[104px] w-[104px] rounded-full backdrop-blur-24 bg-custom-dark-200"
                    >
                      <img src="@/assets/images/play.svg" alt="play svg" />
                    </button>
                    <img
                      :src="slide.source"
                      alt="slide image"
                      class="w-full h-full"
                    />
                  </div>
                  <div
                    v-if="slide.isLogo"
                    class="flex h-full w-full justify-center items-center mx-auto"
                  >
                    <img :src="slide.source" alt="logo image" />
                  </div>
                </div>
              </HomeCarouselSlide>
              <div class="mt-6 text-left">
                <div class="flex gap-4 mb-4">
                  <img
                    v-if="slide.headingIcon"
                    :src="slide.headingIcon"
                    alt="heading icon"
                  />
                  <h1
                    class="font-medium text-lg leading-7 line-clamp-1 overflow-hidden text-ellipsis"
                  >
                    {{ slide.heading }} 
                  </h1>
                </div>
                <p class="font-normal text-sm leading-[1.2rem] mb-6">
                  {{ slide.description }}
                </p>
                <CommonChevronRightButton stroke="white text-base font-semibold"
                  >Watch now ></CommonChevronRightButton
                >
              </div>
            </div>
          </template>
        </CommonCarousel >
      </div>
    </div>
  </CommonContainerWrapper>
</template>

<script setup lang="ts">
import LatestPost1 from "@/assets/images/home/latest-post-1.png";
import LatestPost2 from "@/assets/images/home/latest-post-2.png";
import LatestPost3 from "@/assets/images/home/latest-post-3.svg";
import LatestPost4 from "@/assets/images/home/latest-post-4.png";
import MicrophoneIcon from "@/assets/images/home/microphone.svg";
import FontSizeIcon from "@/assets/images/home/font-size.svg";

const slides = [
  {
    isVideo: true,
    isLogo: false,
    source: LatestPost1,
    heading: "Lorem ipsum dolor sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sagittis vitae eleifend vitae amet nisi cum.",
  },
  {
    isVideo: true,
    isLogo: false,
    source: LatestPost2,
    heading: "Lorem ipsum dolor sit",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sagittis vitae eleifend vitae amet nisi cum.",
  },
  {
    isVideo: false,
    isLogo: true,
    source: LatestPost3,
    heading:
      "What symptoms did you have? What was the western medical diagnosis and/or the eastern medicine diagnosis?",
    headingIcon: FontSizeIcon,
    description:
      "Lorem ipsum dolor sit amet consectetur. Sagittis vitae eleifend vitae amet nisi cum.",
  },
  {
    isVideo: false,
    isLogo: true,
    source: LatestPost4,
    headingIcon: MicrophoneIcon,
    heading:
      "What symptoms did you have? What was the western medical diagnosis and/or the eastern medicine diagnosis?",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sagittis vitae eleifend vitae amet nisi cum.",
  },
  {
    isVideo: false,
    isLogo: true,
    source: LatestPost4,
    headingIcon: MicrophoneIcon,
    heading:
      "What symptoms did you have? What was the western medical diagnosis and/or the eastern medicine diagnosis?",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sagittis vitae eleifend vitae amet nisi cum.",
  },
  {
    isVideo: false,
    isLogo: true,
    source: LatestPost4,
    headingIcon: MicrophoneIcon,
    heading:
      "What symptoms did you have? What was the western medical diagnosis and/or the eastern medicine diagnosis?",
    description:
      "Lorem ipsum dolor sit amet consectetur. Sagittis vitae eleifend vitae amet nisi cum.",
  },
];

const breakpoints = computed(() => ({
  0: {
    itemsToShow: 1,
  },
  768: {
    itemsToShow: 3.3,
  },
}));
</script>

<style scoped>
.container-with-blur {
  position: relative;
  overflow: hidden; /* Prevent overflow from blur */
}

.container-with-blur::before,
.container-with-blur::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 99;
  width: 634px; /* Width of the blur area */
  height: 200px;
  background: linear-gradient(
    180deg,
    #1f2933 0%,
    rgba(31, 41, 51, 0) 100%
  ); /* Optional background for a more defined blur */
}

.container-with-blur::before {
  left: -217px;
  transform: rotate(-90deg);
}

.container-with-blur::after {
  right: -217px;
  transform: rotate(90deg);
}
</style>
