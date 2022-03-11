<script setup lang="ts">
import { useRouter } from "vue-router";
import TopBar from "@/components/TopBar.vue";
import type { PostDocument, UserData, UserDocument } from "@/types/global";
import { getAuth, signOut } from "firebase/auth";
import { errorStore } from "@/utils/errorStore";
import {
  getCurrentUser,
  getUserDocument,
  getUserDocumentFromUsername,
  userStore,
} from "@/utils/userStore";

const router = useRouter();

const props = defineProps({
  username: String,
});

function handleLogout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      router.push("/login");
    })
    .catch((error) => (errorStore.value = error));
}
//
// function handleDeleteUser() {
//   const auth = getAuth();
//   deleteUser(auth.currentUser!).then(() => router.push("/"))
//     .catch((error) => (errorStore.value = error));;
// }
const userDocument: UserDocument = await getUserDocumentFromUsername(props.username!)
const userData = Object.values(userDocument)[0] as UserData;
</script>

<template>
  <div>
    <TopBar>
      <template #title>Profile</template>
      <template #actions>
        <button @click="handleLogout">Sign out</button></template
      >
    </TopBar>
    <div class="flex p-4 border-b">
      <img class="w-24 h-24" :src="userData.photoURL" />
      <div class="ml-4">
        <div class="text-2xl">{{ userData.name }}</div>
        <div class="mt-1 text-gray-500">@{{ userData.username }}</div>
      </div>
    </div>
  </div>
</template>
