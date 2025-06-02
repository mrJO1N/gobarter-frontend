<template>
  <header>
    <div class="topbar-left">
      <RouterLink to="/" class="logo link">GoBarter</RouterLink>
      <RouterLink to="/" class="link">Разместить объявление</RouterLink>
      <RouterLink to="/about" class="link">О нас</RouterLink>
    </div>
    <Input
      visibility-type="text"
      class="search"
      placeholder="Поиск по объявлениям..."
      v-model="searchText"
    />

    <div class="auth-links">
      <span class="link" @click="openModal('login')">Вход</span>
      <span class="link" @click="openModal('reg')">Регистрация</span>
    </div>
  </header>
  <div class="header"></div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";

import "./Header.scss";
import { types } from "@comp/Modal";
import Input from "@ui/Input";
import { ref } from "vue";

interface IProps {
  openModal: types.IModalInstance["openModal"];
}
defineProps<IProps>();

const searchText = ref("");
</script>
