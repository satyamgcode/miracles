<template>
  <div class="bg-custom-blue-300 rounded-c-4xl pb-8 md:pb-[40px]">
    <div class="lg:mx-auto px-4 xl:px-4 pt-10 md:pt-20 max-w-[1140px] w-full">
      <div class="flex justify-between">
        <div class="flex items-center gap-4">
          <HomeSectionsCount class="!text-xl">02</HomeSectionsCount>
          <h1
            class="text-[2rem] leading-[2.4rem] md:text-[3rem] md:leading-[4rem] font-medium"
          >
            Healing Journeys
          </h1>
        </div>
        <div class="basis-[538px] max-md:hidden">
          <p class="text-sm leading-[1.5rem] text-custom-grey-900 font-medium">
            Explore diverse healing journeys from cancer to chronic pain and
            beyond. Find strength and inspiration in each story, and see how
            others have navigated similar paths to recovery.
          </p>
        </div>
      </div>
      <div class="mt-10">
        <CommonTabs class="text-base font-medium" :tabs="tabs" v-model="activeTab" />
        <HomeAllCaseStudyTab />
      </div>
      <div class="mt-[24px]">
        <CommonBaseButton variant="secondary" class="md:mx-auto w-full md:w-[unset] text-base px-12 py-6 font-semibold"
          >View All Stories </CommonBaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Cancer",
    value: "cancer",
  },
  {
    label: "Chronic Pain",
    value: "chronic-pain",
  },
  {
    label: "High Blood Pressure",
    value: "high-blood-pressure",
  },
  {
    label: "Diabetes",
    value: "diabetes",
  },
  {
    label: "Skin issues",
    value: "skin-issues",
  },
  {
    label: "Depression",
    value: "depression",
  },
  {
    label: "Suicidal Thoughts",
    value: "suicidal-thoughts",
  },
];

const activeTab = ref("all");
</script>
