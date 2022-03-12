<script setup lang="ts">
import { reactive, ref } from "vue";
import type { Field } from "@/types/global";
//@ts-ignore
import InputComponent from "@/components/InputComponent.vue";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { useRouter } from "vue-router";
import { errorStore } from "@/utils/errorStore";

const name: Field = reactive({ value: "" });
const username: Field = reactive({ value: "" });
const email: Field = reactive({ value: "" });
const password: Field = reactive({ value: "" });

const nameField = ref<InstanceType<typeof InputComponent> | null>(null);
const usernameField = ref<InstanceType<typeof InputComponent> | null>(null);
const emailField = ref<InstanceType<typeof InputComponent> | null>(null);
const passwordField = ref<InstanceType<typeof InputComponent> | null>(null);

const router = useRouter();

function validate() {
  if (name.value) name.feedback = undefined;
  else name.feedback = "What's your name?";

  if (username.value) {
    if (username.value.length >= 4 && username.value.length <= 15) {
      if (username.value.match("[\\w+]")) username.feedback = undefined;
      else
        username.feedback =
          "Your username must only contain letters, numbers, and underscores.";
    } else username.feedback = "Your username must be 4-15 characters.";
  } else username.feedback = "Please provide a username.";

  if (email.value) {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.value
      )
    )
      email.feedback = undefined;
    else email.feedback = "Please provide a valid email address.";
  } else email.feedback = "Please provide an email address.";

  if (password.value) {
    if (password.value.length >= 6) password.feedback = undefined;
    else
      password.feedback = "Your password must be at least 6 characters long.";
  } else password.feedback = "Please provide a password.";

  if (name.feedback) return nameField.value?.$refs.input.focus();
  if (username.feedback) return usernameField.value?.$refs.input.focus();
  if (email.feedback) return emailField.value?.$refs.input.focus();
  if (password.feedback) return passwordField.value?.$refs.input.focus();
}

function handleRegister() {
  const error = validate();
  if (error) return;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: name.value,
      }).then(() => {
        const db = getFirestore();
        const ref = doc(db, "users", userCredential.user.uid);
        setDoc(
          ref,
          {
            followers: [],
            name: name.value,
            username: username.value,
          },
          { merge: true }
        ).then(() => {
          router.push("/");
        });
      });
    })
    .catch((error) => (errorStore.value = error));
}
</script>

<template>
  <div class="p-4 mx-8 mt-12">
    <h1>Register</h1>

    <form @submit.prevent="handleRegister">
      <input-component
        id="name"
        ref="nameField"
        v-model="name.value"
        :feedback="name.feedback"
      >
        <template #label>Name</template>
        <template #helper>
          This is what we'll call you. You can change this anytime.
        </template>
      </input-component>

      <input-component
        id="username"
        ref="usernameField"
        v-model="username.value"
        :feedback="username.feedback"
      >
        <template #label>Username</template>
        <template #helper>
          Your username is unique to your account and appears in your profile
          URL. You cannot change this later.
        </template>
      </input-component>

      <input-component
        id="email"
        ref="emailField"
        v-model="email.value"
        :feedback="email.feedback"
      >
        <template #label>Email address</template>
        <template #helper>You will use this to access your account.</template>
      </input-component>

      <input-component
        id="password"
        type="password"
        ref="passwordField"
        v-model="password.value"
        :feedback="password.feedback"
      >
        <template #label>Password</template>
        <template #helper>
          Pick a secure password to protect your account. Minimum 6 characters.
        </template>
      </input-component>
      <button type="submit" class="block w-full px-5 py-2 my-5 text-center font-medium rounded-md	text-white bg-indigo-400 hover:bg-indigo-600">Sign up</button>
    </form>

    <div class="flex justify-center">
      <div>
        <router-link to="/login" class="italic underline">I have an account</router-link>
      </div></div>
  </div>
</template>
