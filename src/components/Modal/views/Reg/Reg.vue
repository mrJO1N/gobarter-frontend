<template>
  <div class="reg-form">
    <h2>Регистрация</h2>

    <div class="form-group">
      <label for="email">email</label>
      <Input
        visibility-type="email"
        id="email"
        placeholder="email"
        v-model="email"
      />
    </div>

    <div class="form-group">
      <label for="password">пароль</label>
      <input
        type="password"
        id="password"
        placeholder="password"
        v-model="password"
      />
    </div>

    <div class="form-group remember-me">
      <label>
        <Input visibility-type="checkbox" v-model="rememberMe" /> Запомнить меня
      </label>
    </div>

    <button class="submit-btn" @click="register">Зарегистрироваться</button>
    <div class="switch-link">
      Уже есть аккаунт?
      <a @click="openModal('login')" class="reg-link"> Войти </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  openModal: types.IModalInstance["openModal"];
}
import type { types } from "@comp/Modal";
import "./Reg.scss";
import Input from "@ui/Input";

const { openModal } = defineProps<IProps>();
</script>
