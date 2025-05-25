<template>
  <div class="modal-wrapper">
    <div class="modal">
      <span class="close">x</span>
      <h2>Регистрация</h2>

      <div class="form-group">
        <label for="email">email</label>
        <input type="email" id="email" placeholder="email" v-model="email">
      </div>

      <div class="form-group">
        <label for="password">пароль</label>
        <input type="password" id="password" placeholder="password" v-model="password">
      </div>

      <div class="form-group remember-me">
        <label>
          <input type="checkbox" v-model="rememberMe"> Запомнить меня
        </label>
      </div>

      <button class="submit-btn" @click="register">Зарегистрироваться</button>
      <div class="switch-link">
        Уже есть аккаунт?
        <a href="#">Войти</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {}
import "./Reg.scss"


defineProps<IProps>();
</script>

<style lang="sass" scoped></style>
