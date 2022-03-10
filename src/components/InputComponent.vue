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
  <label>
    <span><slot name="label"></slot></span>
    <input
      :id="id"
      :type="type"
      ref="input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="$slots.helper" class="helper"><slot name="helper"></slot></div>
    <div class="feedback" v-if="feedback">{{ feedback }}</div>
  </label>
</template>

<style scoped>
input {
  @apply w-full border focus:outline-none;
}
.feedback {
  @apply text-red-500;
}
</style>
