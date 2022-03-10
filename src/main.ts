import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "tailwindcss/tailwind.css";
import "@/assets/base.css";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB94LdVNhlfGahQ-xipxXRbiuWEyEJIv7Q",
  authDomain: "firesocials.firebaseapp.com",
  projectId: "firesocials",
  storageBucket: "firesocials.appspot.com",
  messagingSenderId: "287140944749",
  appId: "1:287140944749:web:02bf21e226e0eb4f6b5864",
};
initializeApp(firebaseConfig);

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

createApp(App).use(router).mount("#app");
