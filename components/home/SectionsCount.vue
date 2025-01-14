<template>
  <div>
    <div
      v-bind="$attrs"
      class="bg-custom-grey-800 border max-w-[53px] max-h-[35px] md:max-h-[45px] md:max-w-[63px] w-full h-full border-custom-grey-400 px-4 py-2 rounded-[27px] font-medium md:text-2xl leading-[1.2rem] md:leading-[1.8rem]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
