<template>
  <div class="reg-form">
    <h2>Регистрация</h2>

    <Alert visibilityType="error" v-show="errorMessage">{{
      errorMessage
    }}</Alert>
    <Loader v-show="isLoading" />

    <form class="form-inputs" @submit="send" v-on:keyup.enter="send">
      <Input
        visibility-type="email"
        placeholder="email"
        v-model="email"
        label="email"
      />

      <Input
        visibility-type="text"
        placeholder="никнейм"
        v-model="username"
        label="никнейм"
      />

      <Input
        visibility-type="password"
        placeholder="пароль"
        v-model="password"
        label="Пароль"
      />

      <Input
        visibility-type="password"
        placeholder="пароль"
        v-model="password2"
        label="Повторите пароль"
      />
    </form>

    <Button @click="send">регистрация</Button>

    <div class="switch-link">
      Уже есть аккаунт?
      <a @click="openModal('login')" class="reg-link"> Войти </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue";

import "./Reg.scss";
import type { types } from "@comp/Modal";
import Input from "@ui/Input";
import Button from "@ui/Button";
import Loader from "@ui/Loader";
import Alert from "@ui/Alert";
import { api } from "@/api/main";

interface IProps {
  openModal: types.IModalInstance["openModal"];
}
const { openModal } = defineProps<IProps>();

const email = ref("");
const username = ref("");
const password = ref("");
const password2 = ref("");
const errorMessage = ref<string>("");
const isLoading = ref(false);

onUnmounted(() => {
  errorMessage.value = "";
});

const send = () => {
  if (password.value !== password2.value) {
    errorMessage.value = "пароли не совпадают";
    return;
  }

  isLoading.value = true;
  const {
    data,
    error: apiError,
    isLoading: innerIsLoading,
  } = api.auth.register({
    email: email.value,
    name: username.value,
    password: password.value,
  });

  watch(innerIsLoading, (newValue) => (isLoading.value = newValue));
  watch(
    apiError,
    (newValue: Error | string | null) =>
      (errorMessage.value =
        (newValue as Error)?.message ?? (newValue as string) ?? "")
  );
  watch(data, () => {
    openModal("verification", { email: email.value });
  });
};
</script>
