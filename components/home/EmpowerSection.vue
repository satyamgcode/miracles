<template>
  <div>
    <div
      class="px-4 max-w-[1140px] flex flex-col md:flex-row gap-8 md:justify-between items-center mb-[60px]"
    >
      <div class="flex gap-4 md:basis-[530px]">
        <HomeSectionsCount class="font-medium">01</HomeSectionsCount>
        <span
          class="text-[2rem] font-medium leading-[2.4rem] md:text-[3rem] md:leading-[3.5rem] max-md:font-normal"
          >Empower Your Health Journey</span
        >
      </div>
      <div class="md:basis-[242px]">
        <span class="font-medium text-base md:text-lg md:text-normal leading-[1.35rem] text-custom-grey-900"
          >Guidance, Inspiration, and Understanding</span
        >
      </div>
    </div>
    <div
      ref="cardsSection"
      class="max-md:hidden flex gap-5 overflow-x-scroll hidden-scrollbar"
    >
    </div>
    <div class="max-md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-0">
      <InformationCards
        v-for="(slide, index) in slides"
        :key="index"
        :heading="slide.heading"
        :description="slide.description"
        :image="slide.icon"
      />
    </div>




    <div class="md:hidden">
      <CommonCarousel
        v-model="activeSlide"
        :breakpoints
        :slides="slides"
        show-pagination
        :show-actions="false"
      >
        <template #slide="{ slide }">
          <!-- <div class="px-4">
            <div
              class="bg-custom-blue-300 rounded-2xl p-8 h-[447px] overflow-hidden"
            >
              <img :src="slide.icon" alt="slide icon" />
              <div class="mt-8 text-left">
                <h1 class="mb-4 text-[2rem] leading-[2.4rem] font-medium">
                  {{ slide.heading }}
                </h1>
                <p
                  class="text-lg leading-[1.575rem] text-custom-grey-900 font-medium"
                >
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div> -->
          <InformationCards
        :heading="slide.heading"
        :description="slide.description"
        :image="slide.icon"
      />
        </template>
      </CommonCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserIcon from "@/assets/images/home/user-icon2.svg";
import HeartIcon from "@/assets/images/home/heart-icon2.svg";
import PillIcon from "@/assets/images/home/pill-icon2.svg";
import stethescope from "@/assets/images/home/stethescope.svg"
import comboShape from "@/assets/images/home/combo-shape.svg"
import InformationCards from '../common/InformationCards.vue';

const slides = [
  {
    icon: UserIcon,
    heading: "Personal Transformations",
    description:
      "Witness the power of personal transformation as individuals make lifestyle changes and work with health experts. Documented Miracles showcases unfiltered stories of those who have overcome crippling mental illnesses, incurable diseases, injuries, and more. Whether through medication, physical therapy, nutritional interventions, or practices like yoga and qigong, we document their healing journey as an inspiration to all.",
  },
  {
    icon: HeartIcon,
    heading: "Inspiration and Hope",
    description:
      "Share and discover stories that spark motivation and inspire hope, fostering a supportive community. Your story could be the light someone else needs to find their way.",
  },
  {
    icon: PillIcon,
    heading: "Western & Eastern Perspectives",
    description:
      "We present unbiased insights from both Western and Eastern medicine. Our case studies let the healing modalities speak for themselves, offering genuine pathways to well-being.",
  },
  {
    icon: stethescope,
    heading: "Expert Insights",
    description:
      "Gain access to insights from leading experts in the healthcare industry. Our platform provides articles, interviews, and podcasts featuring top professionals who share their knowledge and experiences.",
  },
  {
    icon: comboShape,
    heading: "Support Groups",
    description:
      "Connect with support groups tailored to your specific needs and conditions. These groups offer a safe space to share your experiences, ask questions, and find comfort in knowing you are not alone.",
  },
];

const breakpoints = computed(() => ({
  0: {
    itemsToShow: 1,
  },
  768: {
    itemsToShow: 2.4,
  },
}));

const activeSlide = ref(0);

const cardsSection: Ref<HTMLDivElement | null> = ref(null);
const cards: Ref<HTMLElement[] | null> = ref(null);

onMounted(() => {
  setInterval(() => {
    if (activeSlide.value === slides.length - 1) {
      activeSlide.value = 0;
    } else {
      activeSlide.value += 1;
    }
  }, 2000);

  if (cardsSection.value && cards.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let delay = 0;

            cards.value?.forEach((card) => {
              setTimeout(() => {
                card.style.transform = "translateX(0)";
                card.style.opacity = "1";
              }, delay);
              delay += 200;
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    // Observe the cards section
    observer.observe(cardsSection.value);
  }
});
</script>
