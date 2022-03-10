import { ref } from "vue";

const errorStore = ref<object | string | null>(null);
const dismissError = (): void => {
  errorStore.value = null;
};

export { errorStore, dismissError };
