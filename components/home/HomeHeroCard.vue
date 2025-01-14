<template>
  <div class="relative min-h-[788px] px-4 lg:min-h-[600px] pt-[99px]">
    <img
      src="@/assets/images/home/hero-hero-image1.svg"
      class="absolute right-0 lg:right-0 bottom-0 max-lg:rounded-c-4xl"
    />
    <div class="flex flex-col lg:flex-row gap-10 max-w-[1140px] mx-auto xl:ml-20 2xl:ml-24">
      <div class="relative w-full lg:w-1/2 z-30">
        <h1 class="text-5xl lg:text-[76px] max-w-[480px] lg:max-w-[unset] leading-[3rem] lg:leading-[4.5rem]">
          Documented Miracles.ai
        </h1>
        <div class="mt-8">
          <h2 class="text-[20px] font-medium leading-[28.8px]">
            Share your Healing Journey, Inspire Hope
          </h2>
          <p class="mt-5 font-normal max-w-[480px] text-xl lg:text-base leading-7">
            Join our community of recovery and resilience, and gain insights
            from those who have traveled your path. <span class="text-[#1F2933A3]">
              Using advanced language
            models, we deliver data-driven insights from real stories about
            effective healing  methods.
            </span>
          </p>
        </div>
        <div class="flex flex-col lg:flex-row gap-2 mt-[50px] md:mb-[44px] xl:mb-0">
          <CommonBaseButton variant="secondary" class="px-12 text-sm py-8 max-h-10 font-semibold"
            >Participant Stories</CommonBaseButton
          >
          <CommonBaseButton variant="primary" class="px-12 text-sm py-8 max-h-10 font-semibold"
            >Join Us</CommonBaseButton
          >
        </div>
      </div>
      <div class="w-full relative mb-[44px] lg:max-w-[500px] ">
        <div
          class="w-[263px] lg:w-[220px] max-lg:hidden p-4 rounded-lg text-white bg-custom-grey-400 backdrop-blur-24 absolute right-0 xl:right-6 top-0"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium leading-4">Statistics</span>
            <img src="@/assets/images/home/star.svg" alt="star icon" />
          </div>
          <div class="my-6 lg:my-3">
            <div class="w-fit relative">
              <img src="@/assets/images/home/ellipse.svg" alt="ellipse svg" />
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-medium text-[2.5rem] leading-10"
              >
                95%
              </div>
            </div>
          </div>
          <div class="flex gap-4 w-[163px]">
            <div>
              <div class="h-4 w-4 bg-custom-yellow-100 rounded-full" />
            </div>
            <span class="font-medium lg:text-sm leading-4">User satisfaction rate.</span>
          </div>
        </div>
        <div class="flex gap-3 lg:max-w-[180px]">
          <div
          class="w-1/2 xl:w-[220px] p-4 rounded-lg text-white bg-custom-grey-400 backdrop-blur-24 lg:absolute bottom-10 md:bottom-0 right-0 xl:right-6"
        >
          <h1
            class="font-medium text-[2rem] leading-8 lg:text-[2rem] lg:leading-10 mb-4"
          >
            10,000+
          </h1>
          <p class="leading-4 font-medium text-xs">
            transformations <br />
            documented.
          </p>
        </div>
          <div
          class="w-1/2 max-lg:mb-1 xl:w-[220px] ml-auto p-4 rounded-lg text-white bg-custom-grey-400 backdrop-blur-24 lg:absolute bottom-10 md:bottom-0 left-0"
        >
          <h1
            class="font-medium text-[2rem] leading-8 lg:text-[2rem] lg:leading-10 mb-4"
          >
            80%
          </h1>
          <p class="leading-4 font-medium text-xs">
            achieve their health 
            goals with our help.
          </p>
        </div>
     
        </div>
      </div>
    </div>
  </div>
</template>
