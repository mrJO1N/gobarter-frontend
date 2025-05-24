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
      <a class="forgot_password" href="#">Забыли пароль?</a>
    </div>

    <button class="login-btn">Войти</button>
    <div class="register-link">
      <a href="#">Регистрация профиля</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Input from "@ui/Input";
import "./Login.scss";

interface IProps {}
defineProps<IProps>();
</script>

<style lang="sass" scoped></style>
