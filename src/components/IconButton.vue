<template>
    <button
      class="w-full h-full flex items-center justify-center p-1"
      @click="navigate"
    >
     <slot> </slot></button
  >
</template>

<script>
export default {
  props: {
    to: String,
  },
};
</script>
