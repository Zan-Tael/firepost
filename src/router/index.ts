import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ComposeView from "@/views/ComposeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { getCurrentUser } from "@/utils/userStore";
import { dismissError } from "@/utils/errorStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Feed",
      component: HomeView,
      meta: {
        authRequired: true,
      },
    },
    {
      path: "/compose",
      name: "Compose",
      component: ComposeView,
      meta: {
        authRequired: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        authRequired: false,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
      meta: {
        authRequired: false,
      },
    },
    {
      path: "/:uid",
      name: "Profile",
      component: ProfileView,
      props: true,
      meta: {
        authRequired: true,
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const user = await getCurrentUser();
  dismissError();
  const authRequired = to.meta.authRequired;
  if (authRequired !== undefined) {
    if (authRequired) {
      if (!user) {
        return { name: "Login" };
      }
    } else {
      if (user) {
        return { name: "Feed" };
      }
    }
  }
});

export default router;
