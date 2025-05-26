<template>
  <div visibility-type="modal">
    <div visibility-type="modal-content">
      <button class="close" @click="close">×</button>
      <h2>Регистрация</h2>

      <label for="email">email</label>
      <input visibility-type="email" id="email" type="email" placeholder="email" v-model="email" />

      <label for="password">пароль</label>
      <input visibility-type="password" id="password" type="password" placeholder="password" v-model="password" />

      <label class="checkbox-wrapper">
        <input visibility-type="checkbox" v-model="remember" />
        <span>Запомнить меня</span>
      </label>

      <button class="submit-btn">Зарегистрироваться</button>

      <div class="switch-link" @click="switchToLogin">Авторизация профиля</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./Reg.scss"
import "@ui/Input"
import "@comp/Modal/views/Reg/Reg.vue"
interface IProps {}
defineProps<IProps>();
</script>

<style lang="sass" scoped></style>
