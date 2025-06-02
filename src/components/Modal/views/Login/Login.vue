<template>
  <div class="Login-form">
    <h2>Авторизация</h2>

    <div class="form-inputs">
      <Input
        visibility-type="email"
        placeholder="email"
        v-model="email"
        label="email"
      />

      <Input
        visibility-type="password"
        placeholder="password"
        v-model="password"
        label="пароль"
      />
    </div>

    <button class="login-btn" @click="send">Войти</button>
    <div class="reg-link-container">
      <a @click="openModal('reg')" class="reg-link"> Регистрация профиля </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import "./Login.scss";
import Input from "@ui/Input";
import type { types } from "@comp/Modal";
import { api } from "@/api/main";

interface IProps {
  openModal: types.IModalInstance["openModal"];
  closeModal: types.IModalInstance["closeModal"];
}
const { openModal, closeModal } = defineProps<IProps>();

const email = ref("");
const password = ref("");

const send = async () => {
  const { data, isLoading } = api.auth.login({
    email: email.value,
    password: password.value,
  });

  setInterval(() => {
    console.log(data.value, isLoading.value);
  }, 500);

  watch([data], closeModal);
};
</script>
