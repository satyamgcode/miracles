<template>
  <div class="mx-6 lg:mx-[150px]">
    <div class="flex justify-center mb-10">
      <div class="flex gap-4 items-center">
        <HomeSectionsCount>04</HomeSectionsCount>
        <span
          class="text-[2rem] font-medium leading-[2.4rem] md:text-[3.5rem] md:leading-[4rem] max-md:font-normal"
          >FAQs</span
        >
      </div>
    </div>
    <div class="flex justify-center mb-10">
      <CommonTabs
        :tabs="faqTabs"
        v-model="selectedTab"
        :show-next-button="false"
      />
    </div>
    <div
      v-for="faq in faqs"
      :key="faq.id"
      class="mb-2"
      @click="selectedCard = faq"
    >
      <HomeCollapsableCard :is-open="selectedCard?.id === faq.id">
        <template #heading>
          <span class="text-xl leading-5 md:text-2xl md:leading-[28.8px] font-medium">{{
            faq.heading
          }}</span>
        </template>
        <template #content>
          <span class="text-custom-grey-900 text-base font-medium leading-[1.4rem]">{{
            faq.description
          }}</span>
        </template>
      </HomeCollapsableCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Faqs = {
  id: number;
  heading: string;
  description: string;
};

const faqs: Faqs[] = [
  {
    id: 1,
    heading: "How do I share my miracle on the platform?",
    description:
      "To share your miracle on our platform, create an account and choose your preferred format—video, audio, or text. For detailed instructions, including tips on video quality and lighting, visit our How to Share a Miracle page. We're here to support you every step of the way.",
  },
  {
    id: 2,
    heading: "How do I choose the best format for my story? ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
  {
    id: 3,
    heading: "Will my story be shared on social media?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
  {
    id: 4,
    heading: "Lorem ipsum dolor sit amet?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
  {
    id: 5,
    heading: "What types of content can I include with my story?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
  {
    id: 6,
    heading: "Are there guidelines for writing or recording my journey?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
  {
    id: 7,
    heading: "How is my privacy protected?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
  {
    id: 8,
    heading: "Can I edit or delete my story after posting?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, dolorum quaerat! Aut ea sequi eos maxime. Cupiditate vel labore voluptatum.",
  },
];

const faqTabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Practitioner",
    value: "practitioner",
  },
];

const selectedCard = ref<Faqs | null>(null);
const selectedTab = ref<string>("all");
</script>
