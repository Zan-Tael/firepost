<template>
  <header class=" flex justify-between items-center p-4 border-b shadow z-10">
    <div class="text-lg font-bold"><slot name="title"></slot></div>
    <slot name="actions"></slot>
  </header>
</template>

<script>
export default {
  name: "TopBar",
};
</script>
