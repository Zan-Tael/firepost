<script setup lang="ts">
import { reactive, ref } from "vue";
import type { Field } from "@/types/global";
//@ts-ignore
import InputComponent from "@/components/InputComponent.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { errorStore } from "@/utils/errorStore";

const email: Field = reactive({ value: "" });
const password: Field = reactive({ value: "" });

const emailField = ref<InstanceType<typeof InputComponent> | null>(null);
const passwordField = ref<InstanceType<typeof InputComponent> | null>(null);

const router = useRouter();

function validate() {
  if (email.value) {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.value
      )
    )
      email.feedback = undefined;
    else email.feedback = "Invalid email.";
  } else email.feedback = "Please enter your email address.";

  if (password.value) password.feedback = undefined;
  else password.feedback = "Please provide a password.";

  if (email.feedback) return emailField.value?.$refs.input.focus();
  if (password.feedback) return passwordField.value?.$refs.input.focus();
}

function handleLogin() {
  const error = validate();
  if (error) return;

  console.log("validated");

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/");
    })
    .catch((error) => (errorStore.value = error));
}
</script>

<template>
  <div class="p-4 mx-8 mt-20">
    <form @submit.prevent="handleLogin">
      <input-component
        id="email"
        ref="emailField"
        v-model="email.value"
        :feedback="email.feedback"
      >
        <template #label>Email address</template>
      </input-component>

      <input-component
        id="password"
        type="password"
        ref="passwordField"
        v-model="password.value"
        :feedback="password.feedback"
      >
        <template #label>Password</template>
      </input-component>
      <button type="submit" class="block w-full px-5 py-2 my-5 text-center font-medium rounded-md	text-white bg-indigo-400 hover:bg-indigo-600">Log in</button>
    </form>
    <div class="flex justify-center">
      <div>
        <router-link class="italic underline" to="/register">Create an account</router-link>
      </div>
    </div>
  </div>
</template>
