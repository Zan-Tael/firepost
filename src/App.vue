<script lang="ts" setup>
import { RouterView, useRouter } from "vue-router";
import { getUserDocument, userStore } from "@/utils/userStore";
import { dismissError, errorStore } from "@/utils/errorStore";
import { computed } from "vue";
import BottomBar from "@/components/BottomBar.vue";

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
  <Suspense>
    <div class="flex flex-col h-full break-words">
      <div class="h-full overflow-y-auto">
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

      <BottomBar
        v-if="userStore" />
    </div
  ></Suspense>
</template>
