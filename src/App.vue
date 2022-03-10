<script lang="ts" setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { userStore } from "@/utils/userStore";
import { errorStore, dismissError } from "@/utils/errorStore";
import { computed } from "vue";
import IconButton from "@/components/IconButton.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconUserSolid from "@/components/icons/IconUserSolid.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconPlusSolid from "@/components/icons/IconPlusSolid.vue";
import IconHomeSolid from "@/components/icons/IconHomeSolid.vue";

const router = useRouter();

const routes = computed(() => {
  if (userStore.value) {
    return router
      .getRoutes()
      .filter(
        (route) =>
          route.meta.authRequired || route.meta.authRequired === undefined
      );
  } else {
    return router
      .getRoutes()
      .filter(
        (route) =>
          route.meta.authRequired === false ||
          route.meta.authRequired === undefined
      );
  }
});

// const routes = useRouter().getRoutes();
</script>

<template>
  <div class="flex flex-col h-full break-words">
    <div class="h-[calc(100%_-_3.5rem)] overflow-y-auto">
      <div class="p-4 bg-red-800" v-if="errorStore" @click="dismissError">
        <p class="text-white">
          {{ errorStore }}
        </p>
        <p class="text-xs text-red-200 mt-2">Click to dismiss</p>
      </div>

      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback><div class="p-4"></div> </template>
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
    </div>

    <nav class="bar p-2 border-t grid grid-cols-3 justify-items-center" v-if="userStore">
      <router-link custom to="/" v-slot="{ navigate, isActive }">
        <IconButton @click="navigate">
          <IconHomeSolid v-if="isActive" />
          <IconHome v-else />
        </IconButton>
      </router-link>

      <router-link custom to="/compose" v-slot="{ navigate, isActive }">
        <IconButton @click="navigate">
          <IconPlusSolid v-if="isActive" />
          <IconPlus v-else />
        </IconButton>
      </router-link>

      <router-link custom to="/profile" v-slot="{ navigate, isActive }">
        <IconButton @click="navigate">
          <IconUserSolid v-if="isActive" />
          <IconUser v-else />
        </IconButton>
      </router-link>
    </nav>
  </div>
</template>
