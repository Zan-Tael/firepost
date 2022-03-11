<script setup lang="ts">
import { getUserDocument, userStore } from "@/utils/userStore";
import IconButton from "@/components/IconButton.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconUserSolid from "@/components/icons/IconUserSolid.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconPlusSolid from "@/components/icons/IconPlusSolid.vue";
import IconHomeSolid from "@/components/icons/IconHomeSolid.vue";
import IconCog from "@/components/icons/IconCog.vue";
import IconCogSolid from "@/components/icons/IconCogSolid.vue";
import type { UserData, UserDocument } from "@/types/global";

const userDocument: UserDocument = await getUserDocument(userStore.value!.uid);
const username = (Object.values(userDocument)[0] as UserData).username
</script>

<template>
  <nav
    class="bar border-t p-1 grid grid-cols-4 justify-items-center"
  >
    <router-link custom to="/" v-slot="{ navigate, isActive }">
      <IconButton :isActive="isActive"  @click="navigate">
        <IconHomeSolid v-if="isActive" />
        <IconHome v-else />
      </IconButton>
    </router-link>

    <router-link custom to="/compose" v-slot="{ navigate, isActive }">
      <IconButton :isActive="isActive" @click="navigate">
        <IconPlusSolid v-if="isActive" />
        <IconPlus v-else />
      </IconButton>
    </router-link>

    <router-link custom :to="'/' + username" v-slot="{ navigate, isActive }">
      <IconButton :isActive="isActive" @click="navigate">
        <IconUserSolid v-if="isActive" />
        <IconUser v-else />
      </IconButton>
    </router-link>

    <router-link custom to="/settings" v-slot="{ navigate, isActive }">
      <IconButton :isActive="isActive" @click="navigate">
        <IconCogSolid v-if="isActive" />
        <IconCog v-else />
      </IconButton>
    </router-link>
  </nav>
</template>