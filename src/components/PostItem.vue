<script setup lang="ts">
import { computed, defineProps } from "vue";
import { getUserDocument } from "@/utils/userStore";

import TimeAgo from "javascript-time-ago";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const [uid, data] = Object.entries(props.post)[0];
const user = await getUserDocument(data.user);
const { name, username } = Object.values(user as object)[0];
const timeAgo = computed(() => {
  return new TimeAgo("en-US").format(data.timestamp, "twitter-minute-now");
});
</script>

<template>
    <div class="p-4 border-b">
      <div>
        <span class="font-medium">{{ name }}</span>
        <span class="text-gray-500 ml-1">@{{ username }} · {{ timeAgo }}</span>
      </div>
      <p>{{ data.text }}</p>
    </div>
</template>
