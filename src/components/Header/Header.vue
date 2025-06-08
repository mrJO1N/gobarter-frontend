<template>
  <header>
    <div class="topbar-left">
      <RouterLink to="/" class="logo link">GoBarter</RouterLink>
      <span class="link" @click="openModal('create post')"
        >Разместить объявление</span
      >
      <RouterLink to="/about" class="link">О нас</RouterLink>
    </div>
    <Input
      visibility-type="search"
      class="search"
      placeholder="Поиск по объявлениям..."
      v-model="searchText"
    />

    <div class="auth-links">
      <span class="link" @click="openModal('login')">Вход</span>
      <span class="link" @click="openModal('reg')">Регистрация</span>
    </div>
  </header>
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
