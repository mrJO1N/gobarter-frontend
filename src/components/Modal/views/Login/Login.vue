<template>
  <div class="Login-form">
    <h2>Вход</h2>
    <Alert visibilityType="error" v-show="error">{{ error }}</Alert>
    <Loader v-show="isLoading" />

    <form class="form-inputs" @submit="send" v-on:keyup.enter="send">
      <Input
        visibility-type="email"
        placeholder="email"
        v-model="email"
        label="email"
      />

      <Input
        visibility-type="password"
        placeholder="пароль"
        v-model="password"
        label="пароль"
      />
    </form>

    <Button @click="send">Вход</Button>
    <div class="reg-link-container">
      <a @click="openModal('reg')" class="reg-link"> Регистрация профиля </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue";

import "./Login.scss";
import Input from "@ui/Input";
import Button from "@ui/Button";
import Alert from "@ui/Alert";
import type { types } from "@comp/Modal";
import { api } from "@/api/main";
import Loader from "@ui/Loader";

interface IProps {
  openModal: types.IModalInstance["openModal"];
  closeModal: types.IModalInstance["closeModal"];
}
const { openModal, closeModal } = defineProps<IProps>();

const email = ref("");
const password = ref("");
const error = ref<string>("");
const isLoading = ref(false);

onUnmounted(() => {
  error.value = "";
});

const send = async () => {
  isLoading.value = true;
  const {
    data,
    error: apiError,
    isLoading: innerIsLoading,
  } = api.auth.login({
    email: email.value,
    password: password.value,
  });

  watch(innerIsLoading, (newValue) => (isLoading.value = newValue));
  watch(
    apiError,
    (newValue: Error | string | null) =>
      (error.value = (newValue as Error)?.message ?? (newValue as string) ?? "")
  );
  watch(data, closeModal);
};
</script>
