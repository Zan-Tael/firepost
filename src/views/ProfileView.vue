<script setup lang="ts">
import { useRouter } from "vue-router";
import PostComponent from "@/components/PostItem.vue";
import TopBar from "@/components/TopBar.vue";
import { getPosts } from "@/utils/feedUtils";
import { ref } from "vue";
import type { PostDocument } from "@/types/global";
import { getAuth, signOut } from "firebase/auth";
import { errorStore } from "@/utils/errorStore";

const router = useRouter();

function handleLogout() {
  const auth = getAuth();
  signOut(auth).then(() => {
    router.push("/login");
  })
    .catch((error) => (errorStore.value = error));;
}
//
// function handleDeleteUser() {
//   const auth = getAuth();
//   deleteUser(auth.currentUser!).then(() => router.push("/"))
//     .catch((error) => (errorStore.value = error));;
// }

const posts = ref<Array<PostDocument>>([]);
posts.value = await getPosts("qaNCQvo9nzTrWBEkP5LjBPEXoin1");
</script>

<template>
  <div>
    <TopBar>
      <template #title>Profile</template>
      <template #actions>
        <button @click="handleLogout">Sign out</button></template
      >
    </TopBar>
    <div>
      <post-component v-for="(post, i) in posts" :key="i" :post="post" />
    </div>
  </div>
</template>
