<template>
  <div class="relative max-w-[560px] w-full rounded-tl-[32px] sm:mx-auto">
    <div class="slanted absolute top-[-1px] z-20 bg-background w-48 right-[-1px] h-10 " />
    <div
      class="bg-custom-grey-800 rounded-tl-[32px] rounded-br-[32px] rounded-bl-[32px] max-w-[500px] min-h-[300px] "
    >
    <img class="absolute bottom-9 right-10":src="image" alt="icon">
    <div
          class="bg-custom-blue-300 rounded-2xl p-8 w-full overflow-hidden"
        >
          <div class="mt-8 text-left">
            <h1 class="mb-4 text-xl leading-[1.8rem] font-medium">
              {{  heading }}
            </h1>
            <p
              class="text-base leading-[1.35rem] text-custom-grey-900 font-medium md:line-clamp-6"
            >
              {{ description}}
            </p>
          </div>
        </div>  
      
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image :{
    type : String,
    required :true ,
  }
});

</script>

<style scoped>
.slanted {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 25% 100%);
}
</style>

