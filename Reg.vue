<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close">x</span>
      <h2>Регистрация</h2>

      <label for="email">email</label>
      <Input visibility-type ="email" placeholder="email" />

      <label for="password">пароль</label>
      <Input visibility-type ="password" type="password" placeholder="password" />

      <label class="checkbox-wrapper">
        <input type="checkbox" checked />
        Запомнить меня
      </label>

      <button class="submit-btn">Зарегистрироваться</button>
      <div class="switch-link">Авторизация профиля</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./Reg.scss"
import "@ui/Input"
interface IProps {}
defineProps<IProps>();
</script>

<style lang="sass" scoped></style>
