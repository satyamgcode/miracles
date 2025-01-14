export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("outside-click", {
    mounted(el, binding) {
      const handleClick = (event: MouseEvent) => {
        if (el !== event.target && !el.contains(event.target)) {
          binding.value(event);
        }
      };

      window.addEventListener("click", handleClick);

      // Cleanup on unmount
      el._clickOutsideHandler = handleClick;
    },
    unmounted(el) {
      window.removeEventListener("click", el._clickOutsideHandler);
    },
  });
});
