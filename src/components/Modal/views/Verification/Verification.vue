<template>
  <div class="Login-form">
    <h2>Верификация</h2>

    <div class="form-inputs">
      <Input
        visibility-type="email"
        placeholder="email"
        v-model="email"
        label="email"
      />

      <Input
        visibility-type="code"
        placeholder="код"
        v-model="password"
        label="код"
      />
    </div>

    <Button @click="send">Отправить</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import "./Verification.scss";
import Input from "@ui/Input";
import Button from "@ui/Button";
import type { types } from "@comp/Modal";
import { api } from "@/api/main";

interface IProps {
  openModal: types.IModalInstance["openModal"];
  closeModal: types.IModalInstance["closeModal"];
}
const { closeModal } = defineProps<IProps>();

const email = ref("");
const password = ref("");

const send = async () => {
  const { data, isLoading } = api.auth.login({
    email: email.value,
    password: password.value,
  });

  setInterval(() => {
    console.log(data.value, isLoading.value);
  }, 500);

  watch([data], closeModal);
};
</script>
