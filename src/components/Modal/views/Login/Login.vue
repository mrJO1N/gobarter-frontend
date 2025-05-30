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

    <button class="login-btn" @click="show">Войти</button>
    <div class="reg-link-container">
      <a @click="openModal('reg')" class="reg-link"> Регистрация профиля </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Input from "@ui/Input";
import "./Login.scss";
import type { types } from "@comp/Modal";
import { ref } from "vue";

interface IProps {
  openModal: types.IModalInstance["openModal"];
}
const { openModal } = defineProps<IProps>();

const email = ref("");
const password = ref("");
const rememberMe = ref(true);

const show = () => console.log(email.value, password.value, rememberMe.value);
</script>
