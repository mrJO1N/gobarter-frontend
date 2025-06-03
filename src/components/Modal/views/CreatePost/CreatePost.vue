<template>
  <div class="reg-form">
    <h2>Разместить обявление</h2>
    <h6>пока что заглушка</h6>
    <div class="form-inputs">
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
        label="пароль"
      />

      <Input
        visibility-type="password"
        placeholder="пароль"
        v-model="password2"
        label="пароль"
      />
    </div>

    <Button @click="send">регистрация</Button>

    <div class="switch-link">
      Уже есть аккаунт?
      <a @click="openModal('login')" class="reg-link"> Войти </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import "./CreatePost.scss";
import type { types } from "@comp/Modal";
import Input from "@ui/Input";
import Button from "@ui/Button";

interface IProps {
  openModal: types.IModalInstance["openModal"];
}
const { openModal } = defineProps<IProps>();

const email = ref("");
const username = ref("");
const password = ref("");
const password2 = ref("");
const send = () => {
  openModal("verification");
};
</script>
