<template>
  <div class="Login-form">
    <h2>Авторизация</h2>

    <div class="input-group">
      <label>email</label>
      <Input visibility-type="email" placeholder="email" />
    </div>
    <div class="input-group">
      <label>пароль</label>
      <Input visibility-type="password" placeholder="password" />
    </div>

    <div class="remember">
      <label><Input visibility-type="checkbox" checked /> Запомнить меня</label>
    </div>

    <button class="login-btn">Войти</button>
    <div class="reg-link-container">
      <a @click="openModal('reg')" class="reg-link"> Регистрация профиля </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Input from "@ui/Input";
import "./Login.scss";
import type { types } from "@comp/Modal";

interface IProps {
  openModal: types.IModalInstance["openModal"];
}
const { openModal } = defineProps<IProps>();
</script>

<style lang="sass" scoped></style>
