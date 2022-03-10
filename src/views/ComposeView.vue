<script setup lang="ts">
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { userStore } from "@/utils/userStore";
import { errorStore } from "@/utils/errorStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import TopBar from "@/components/TopBar.vue";

const text = ref<string | null>();

const router = useRouter();

const db = getFirestore();
const postsRef = collection(db, "posts");

function handleCompose() {
  addDoc(collection(db, "posts"), {
    timestamp: Date.now(),
    text: text.value,
    user: userStore.value!.uid,
  })
    .then(() => router.push("/"))
    .catch((error) => (errorStore.value = error));
}
</script>

<template>
  <form @submit.prevent="handleCompose">
    <TopBar>
      <template #title>Compose</template>
      <template #actions> <button type="submit">Post</button></template>
    </TopBar>
    <textarea
      ref="textarea"
      v-model="text"
      rows="20"
      placeholder="What's on your mind?"
    />
  </form>
</template>

<style scoped>
textarea {
  @apply focus:outline-none w-full resize-none p-4;
}
</style>
