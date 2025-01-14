<template>
  <div class="p-2 md:p-4 md:px-[20px] lg:px-[90px] xl:px-[160px]">
    <CommonContainerWrapper
      class="bg-custom-blue-100 pb-8"
      footer-classes="bg-background"
    >
      <div class="px-4 pt-10 lg:pt-14 md:px-[110px] mx-auto">
        <div
          class="flex flex-col lg:flex-row justify-between gap-[80px] text-custom-grey-500 font-medium leading-[1.4rem] mb-10 md:mb-14"
        >
          <div class="lg:basis-[366px]">
            <img src="@/assets/images/logo.svg" alt="app logo" class="mb-4" />
            <span class="text-base font-medium"
              >Documented Miracles.ai empowers individuals to achieve their
              optimal health through data driven healthcare decisions.</span
            >
          </div>
          <div class="flex lg:basis-[590px] justify-between gap-[10px]">
            <div class="max-sm:w-[160px]">
              <h1 class="mb-[40px] text-xl font-medium">Quick Link</h1>
              <ul class="[&_li]:mb-4 text-base font-medium">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div>
              <h1 class="mb-[40px] text-xl font-medium">Others Link</h1>
              <ul class="[&_li]:mb-4 text-base font-medium">
                <li>Terms of use</li>
                <li>Privacy Policy</li>
                <li>Advertising Policy</li>
                <li>Do Not Sell or Share My Personal Information</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pt-[38px] md:mb-8 pb-4 md:pb-[unset] border-t border-custom-grey-400">
          <div
            class="flex flex-col md:flex-row items-center justify-center max-md:gap-10 md:justify-between"
          >
            <span class="text-custom-grey-900 text-base font-normal leading-6"
              >&copy; Copyright 2024 Documented Miracles.ai | All Rights
              Reserved.</span
            >
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/footer/facebook.svg"
                alt="facebook logo"
              />
              <img
                src="@/assets/images/footer/instagram.svg"
                alt="instagram logo"
              />
            </div>
          </div>
        </div>
      </div>
    </CommonContainerWrapper>
  </div>
</template>

<script setup>


</script>
