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
import { z } from "zod";

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
  errorMessage.value = "";
  const validate = () => {
    if (password.value !== password2.value) {
      errorMessage.value = "пароли не совпадают";
      return;
    }
    const formFields = z.object({
      email: z.string().email({ message: "невалидный email" }),
      name: z
        .string()
        .min(3, { message: "мин длина никнейма - 3" })
        .max(50, { message: "макс длина никнейма - 50" }),
      password: z
        .string()
        .min(8, { message: "мин длина пароля - 8" })
        .max(50, { message: "макс длина пароля - 50" }),
    });

    try {
      return {
        data: formFields.parse({
          email: email.value,
          name: username.value,
          password: password.value,
        }),
      };
    } catch (err: any) {
      return { error: err as z.ZodError };
    }
  };

  const { error: err, data: formFields } = validate();

  if (err) {
    errorMessage.value = err.issues[0].message;
    return;
  } else if (!formFields) throw "no form fuilds";

  isLoading.value = true;
  const {
    data,
    error: apiError,
    isLoading: innerIsLoading,
  } = api.auth.register(formFields);

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
