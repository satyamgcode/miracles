<template>
  <div class="p-2 md:p-4">
    <CommonHeroCardWrapper class="mb-[77px] md:mb-[150px]">
      <div class="relative w-full min-h-[641px] md:min-h-[788px]">
        <div class="rounded-c-4xl absolute inset-0 container-hero" />
        <div
          class="relative z-20 px-2 max-w-[735px] mx-4 pt-10 md:pt-[77px] md:mx-[134px]"
        >
          <h1 class="text-5xl leading-[3rem] md:text-8xl md:leading-[6rem]">
            Breast Cancer Healing Journeys Participant Summary
          </h1>
          <p class="text-2xl leading-[1.8rem] mt-8 md:mt-12">
            Welcome to our comprehensive analysis of breast cancer healing
            journeys. This page delves into real stories, offering insights into
            effective healing methods and personal experiences.
          </p>
        </div>
      </div>
    </CommonHeroCardWrapper>
    <div class="lg:mx-[150px] mb-[100px]">
      <div class="px-6">
        <div class="flex mb-[60px] gap-[9.5px] items-center">
          <HomeSectionsCount>02</HomeSectionsCount>
          <h1
            class="text-[2rem] md:text-[4rem] leading-[2.4rem] md:leading-[4rem] text-custom-grey-500"
          >
            Successful Treatment Analysis
          </h1>
        </div>
        <div
          class="text-xl leading-6 text-custom-grey-900 font-medium mb-[60px]"
        >
          Sample Size : 500 Healing Stories
        </div>
      </div>
      <CommonTable
        class="px-6"
        :columns="analysisTableColumns"
        :data="analysisTableData"
      />
    </div>
    <div class="lg:mx-[150px] mb-[150px]">
      <div class="flex px-6 gap-[9.5px] items-center mb-[60px]">
        <SectionsCount>03</SectionsCount>
        <h1
          class="text-[2rem] md:text-[4rem] leading-[2.4rem] md:leading-[4rem] text-custom-grey-500"
        >
          Western Medicine Diagnoses:
        </h1>
      </div>
      <CommonTable
        class="px-6"
        :columns="diagnosesTableColumns"
        :data="diagnosesTableData"
      />
    </div>
    <div
      class="mb-4 md:mx-4 pt-10 md:pt-20 pb-16 px-4 lg:px-[134px] rounded-c-4xl bg-custom-blue-300"
    >
      <div
        v-for="(study, index) in studies"
        :key="index"
        class="flex gap-4 mb-12"
      >
        <HomeSectionsCount>0{{ index + 1 }}</HomeSectionsCount>
        <div>
          <h1 class="text-2xl leading-10 font-medium mb-4">
            {{ study.heading }}
          </h1>
          <p class="font-medium text-xl leading-6 text-custom-grey-900">
            {{ study.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="md:mx-4">
      <CommonContainerWrapper
        class="bg-custom-grey-500 text-white pb-12 mb-4"
        footer-classes="bg-background"
      >
        <div class="pt-10 md:pt-20 px-4 lg:px-[134px]">
          <div class="flex gap-4 items-center mb-10 md:mb-[60px]">
            <HomeSectionsCount>03</HomeSectionsCount>
            <h1 class="text-[2rem] leading-8 md:text-[4rem] md:leading-[4rem]">
              Remarkable Recoveries
            </h1>
          </div>
          <CommonCarousel :breakpoints :slides="slides">
            <template #slide="{ slide }">
              <div class="px-[10px]">
                <CommonContainerWrapper
                  class="pb-0 h-[400px]"
                  footer-classes="bg-custom-grey-500"
                >
                  <img
                    class="w-full h-full object-cover"
                    :src="slide.source"
                    alt="slide image"
                  />
                </CommonContainerWrapper>
                <div class="text-left mt-6">
                  <h1 class="mb-4 font-medium text-2xl leading-[1.8rem]">
                    {{ slide.title }}
                  </h1>
                  <div>
                    <span class="font-medium text-lg leading-[1.35rem]"
                      >Summary:
                    </span>
                    <span class="text-lg leading-[1.35rem] font-medium">{{
                      slide.summary
                    }}</span>
                  </div>
                </div>
              </div>
            </template>
          </CommonCarousel>
        </div>
      </CommonContainerWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import CaseStudy from "@/assets/images/home/video-showcase.png";

const analysisTableColumns = [
  {
    label: "Modality",
    dataIndex: "modality",
  },
  {
    label: "Success Rate",
    dataIndex: "success_rate",
  },
  {
    label: "Didn’t Work",
    dataIndex: "did_not_work",
  },
  {
    label: "Success Stories",
    dataIndex: "success_stories",
  },
  {
    label: "Key Insights",
    dataIndex: "key_insights",
  },
];

const analysisTableData = [
  {
    modality: "Chemotherapy",
    success_rate: "75%",
    did_not_work: "20%",
    success_stories: "150",
    key_insights: "Effective in early detection cases",
  },
  {
    modality: "Chemotherapy",
    success_rate: "75%",
    did_not_work: "20%",
    success_stories: "150",
    key_insights: "Effective in early detection cases",
  },
  {
    modality: "Radiation Therapy",
    success_rate: "70%",
    did_not_work: "25%",
    success_stories: "130",
    key_insights: "Best results when paired with surgery",
  },
  {
    modality: "Surgery",
    success_rate: "55%",
    did_not_work: "40%",
    success_stories: "80",
    key_insights: "Complementary to traditional methods",
  },
];

const diagnosesTableColumns = [
  {
    label: "Diagnosis",
    dataIndex: "diagnosis",
  },
  {
    label: "Prevalence",
    dataIndex: "prevalence",
  },
  {
    label: "Insights",
    dataIndex: "insights",
  },
];

const diagnosesTableData = [
  {
    id: 1,
    diagnosis: "Chronic Pain",
    prevalence: "40% (200)",
    insights: "Commonly treated with physical therapy and acupuncture.",
  },
];

const studies = [
  {
    heading: "Understanding Symptoms and Diagnoses",
    description:
      "Patients often report symptoms like lumps, pain, and changes in breast shape. Diagnoses can vary widely, with Western medicine focusing on imaging and biopsies, while Eastern approaches might consider energy imbalances. Accurate diagnosis is key to determining the right treatment path.",
  },
  {
    heading: "Trial and Error in Treatments",
    description:
      "Not every treatment works for everyone. Some patients found certain medications or therapies ineffective due to side effects or lack of improvement. This highlights the need for personalized treatment plans that consider individual health profiles and preferences.",
  },
  {
    heading: "Best Healing Methods",
    description:
      "Our analysis shows that a combination of chemotherapy, surgery, and radiation therapy often yields the highest success rates. Early detection plays a crucial role in the effectiveness of these treatments. Many patients have also found value in incorporating alternative therapies, such as acupuncture and mindfulness, to manage side effects and improve overall well-being.",
  },
  {
    heading: "Healing Journeys",
    description:
      "Patients report that the journey through breast cancer treatment is highly personal and varies greatly. Common themes include the importance of a strong support network, staying informed about treatment options, and maintaining a positive mindset. Many have shared stories of resilience and adaptability, highlighting the significance of mental and emotional strength alongside physical treatment.",
  },
  {
    heading: "Advice for Others",
    description:
      "Those who have successfully navigated their healing journey often advise others to seek multiple opinions, stay proactive in managing their health, and explore integrative therapies that align with their values and lifestyle. Building a supportive community and prioritizing self-care are also frequently emphasized as key components of recovery.",
  },
];

const slides = [
  {
    source: CaseStudy,
    title: "Title of the story ",
    summary:
      "Those who have successfully navigated their healing journey often advise others to seek multiple opinions, stay proactive in managing their health, and explore integrative therapies that align with their values and lifestyle. Building a supportive community and prioritizing self-care are also frequently emphasized as key components of recovery.",
  },
  {
    source: CaseStudy,
    title: "Title of the story ",
    summary:
      "Those who have successfully navigated their healing journey often advise others to seek multiple opinions, stay proactive in managing their health, and explore integrative therapies that align with their values and lifestyle. Building a supportive community and prioritizing self-care are also frequently emphasized as key components of recovery.",
  },
  {
    source: CaseStudy,
    title: "Title of the story ",
    summary:
      "Those who have successfully navigated their healing journey often advise others to seek multiple opinions, stay proactive in managing their health, and explore integrative therapies that align with their values and lifestyle. Building a supportive community and prioritizing self-care are also frequently emphasized as key components of recovery.",
  },
];

const breakpoints = computed(() => ({
  0: {
    itemsToShow: 1,
  },
  768: {
    itemsToShow: 2,
  },
}));
</script>

<style scoped>
.container-hero {
  background: url("@/assets/images/case-study/case-study-hero-image.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.container-hero::after {
  content: "";
  background: linear-gradient(
    322.56deg,
    rgba(180, 192, 208, 0) 24.01%,
    #b6c2d0 56.42%
  );
  position: absolute;
  top: 0;
  height: 30%;
  width: 50%;
}
.container-hero::before {
  content: "";
  background: linear-gradient(
    270deg,
    rgba(180, 192, 208, 0) 0%,
    #b4c0d0 58.87%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 50%;
  border-radius: 40px;
}
/* .custom-gradient-top {
  } */
</style>
