<script setup lang="ts">
import { ref } from "vue";
import PostComponent from "@/components/PostItem.vue";
import { getPosts } from "@/utils/feedUtils";
import type { PostData, PostDocument, UID } from "@/types/global";
import { getUserDocument } from "@/utils/userStore";
import TopBar from "@/components/TopBar.vue";

const posts = ref<Array<PostDocument>>([]);

posts.value = await getPosts();
</script>

<template>
  <div>
    <TopBar>
      <template #title>Home</template>
    </TopBar>
    <div>
      <post-component v-for="(post, i) in posts" :key="i" :post="post" />
    </div></div>
</template>
