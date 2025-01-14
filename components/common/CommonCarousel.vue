<template>
  <div class="w-full">
    <Carousel
      ref="carousel"
      v-bind="carouselProps"
      v-model="currentSlide"
      class="h-full mx-auto"
    >
      <slide v-for="(slide, index) in slides" :key="index" style="height: 100% ; margin: 0 auto">
        <div class="w-full h-full">
          <slot name="slide" :slide="slide" />
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination v-if="showPagination" />
      </template>
    </Carousel>
    <div
      v-if="!autoplay && showActions"
      :class="`flex justify-between mt-10 ${props.userClass}`"
    >
      <CommonBaseButton
        variant="secondary"
        class="border border-white gap-[14px] px-8 py-5"
        @click="previousSlide"
      >
        <img src="@/assets/images/arrow-narrow-left.svg" alt="arrow right" />
        <span>Prev</span>
      </CommonBaseButton>
      <CommonBaseButton
        variant="secondary"
        class="border border-white gap-[14px] px-8 py-5"
        @click="nextSlide"
      >
        <span>Next</span>
        <img src="@/assets/images/arrow-narrow-right.svg" alt="arrow right" />
      </CommonBaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

type Props = {
  itemsToShow?: number;
  autoplay?: number;
  wrapAround?: boolean;
  breakpoints?: any;
  slides: any[];
  showPagination?: boolean;
  showActions?: boolean;
  userClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  itemsToShow: 0,
  autoplay: 0,
  wrapAround: false,
  breakpoints: null,
  showPagination: false,
  showActions: true,
  userClass : ''
});

const carousel = ref(null);
const currentSlide = defineModel<number>();

const carouselProps = computed(() => {
  const componentProps: Props = {
    slides: props.slides,
    autoplay: props.autoplay,
    wrapAround: props.wrapAround,
  };
  if (props.itemsToShow) componentProps["itemsToShow"] = props.itemsToShow;
  if (props.breakpoints) componentProps["breakpoints"] = props.breakpoints;

  return componentProps;
});

const previousSlide = () => {
  if (carousel.value) {
    // @ts-expect-error ref
    carousel.value.prev();
  }
};

const nextSlide = () => {
  if (carousel.value) {
    // @ts-expect-error ref
    carousel.value.next();
  }
};

defineExpose({
  previous: previousSlide,
  next: nextSlide,
});
</script>

<style scoped>
:deep(.carousel__next) {
  display: none;
}
:deep(.carousel__prev) {
  display: none;
}
:deep(.carousel__pagination-button::after) {
  height: 10px;
  width: 10px;
  background-color: #bad8f14d;
  border-radius: 9999px;
}
:deep(.carousel__pagination-button--active::after) {
  background-color: #398b39 !important;
}
:deep(.carousel__viewport) {
  height: 100%;
}
:deep(.carousel__track) {
  height: 100%;
}
</style>
