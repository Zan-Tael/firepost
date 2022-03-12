<script setup lang="ts">
defineProps({
  modelValue: String,
  feedback: String,
  id: String,
  type: {
    type: String,
    default: "text"
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="mt-5">
    <span><slot name="label"></slot></span>
    <input
      style=" border-bottom:1px solid black"
      :id="id"
      :type="type"
      ref="input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="$slots.helper" class="helper  text-xs "><slot name="helper"></slot></div>
    <div class="feedback" v-if="feedback">{{ feedback }}</div>
  </label>
</template>

<style scoped>
input {
  @apply w-full border-none focus:outline-none mt-2 ;
}
.feedback {
  @apply text-red-500 text-xs;
}
</style>
