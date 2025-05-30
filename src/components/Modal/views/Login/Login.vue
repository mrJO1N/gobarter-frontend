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

      <Input
        visibility-type="checkbox"
        v-model="rememberMe"
        label="Запомнить меня"
      />
    </div>

    <button class="login-btn" @click="send">Войти</button>
    <div class="reg-link-container">
      <a @click="openModal('reg')" class="reg-link"> Регистрация профиля </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import "./Login.scss";
import Input from "@ui/Input";
import type { types } from "@comp/Modal";
import { authApi } from "@/api/routes/auth";

interface IProps {
  openModal: types.IModalInstance["openModal"];
}
const { openModal } = defineProps<IProps>();

const email = ref("");
const password = ref("");
const rememberMe = ref(true);

const send = () => {
  authApi.login({ email: email.value, password: password.value });
};
</script>
