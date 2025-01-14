<template>
  <button
    :class="`flex items-center justify-center rounded-c-4xl leading-4 ${classesAsPerVariant} transition-all duration-300`"
    :type
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Props = {
  variant?: "primary" | "secondary" | "outlined";
  type?: "button" | "reset" | "submit" | undefined;
};

const props = withDefaults(defineProps<Props>(), {
  padding: "lg",
  variant: "primary",
  type: "button",
});

const classesAsPerVariant = computed(() => {
  if (props.variant === "primary")
    return "bg-custom-yellow-100 text-custom-green-300 hover:bg-custom-yellow-300 active:bg-custom-yellow-100";
  if (props.variant === "secondary")
    return "bg-custom-grey-500 text-white hover:bg-custom-dark-400 active:bg-custom-grey-500";
  if (props.variant === "outlined")
    return "border border-custom-grey-500 hover:text-white hover:bg-custom-grey-500 active:text-white active:bg-custom-dark-400";
});
</script>
