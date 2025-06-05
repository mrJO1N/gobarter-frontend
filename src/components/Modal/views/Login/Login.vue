<template>
  <div class="Login-form">
    <h2>Вход</h2>
    <Alert visibilityType="error" v-show="errorMessage">{{
      errorMessage
    }}</Alert>
    <Loader v-show="isLoading" />

    <form class="form-inputs" @submit="send" v-on:keyup.enter="send">
      <Input
        visibility-type="email"
        placeholder="Е-mail"
        v-model="email"
        label="Е-mail"
      />

      <Input
        visibility-type="password"
        placeholder="Пароль"
        v-model="password"
        label="Пароль"
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
import { z } from "zod";

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
const errorMessage = ref<string>("");
const isLoading = ref(false);

onUnmounted(() => {
  errorMessage.value = "";
});

const validate = () => {
  const formFields = z.object({
    email: z.string().email({ message: "невалидный email" }),
    password: z
      .string()
      .min(8, { message: "мин длина пароля - 8" })
      .max(50, { message: "макс длина пароля - 50" }),
  });

  try {
    return {
      data: formFields.parse({
        email: email.value,
        password: password.value,
      }),
    };
  } catch (err: any) {
    return { error: err as z.ZodError };
  }
};

const send = async () => {
  errorMessage.value = "";

  const { error: err, data: formFields } = validate();

  if (err) {
    errorMessage.value = err.issues[0].message;
    return;
  } else if (!formFields) throw "no form fuilds";

  isLoading.value = true;
  const {
    data,
    error: apiError,
    isLoading: apiIsLoading,
  } = api.auth.login(formFields);

  watch(apiIsLoading, (newValue) => (isLoading.value = newValue));
  watch(
    apiError,
    (newValue: Error | string | null) =>
      (errorMessage.value =
        (newValue as Error)?.message ?? (newValue as string) ?? "")
  );
  watch(data, closeModal);
};
</script>
