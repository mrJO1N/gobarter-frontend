<template>
  <div class="Verification-form">
    <h2>Верификация</h2>
    <Alert visibilityType="error" v-show="errorMessage">{{
      errorMessage
    }}</Alert>
    <Loader v-show="isLoading" />

    <form class="form-inputs" @submit="send" v-on:keyup.enter="send">
      <Input
        visibility-type="code"
        placeholder="код"
        v-model="code"
        class="code-input"
      />
    </form>

    <Button @click="send">Отправить</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import "./Verification.scss";
import { api } from "@/api/main";
import Input from "@ui/Input";
import Button from "@ui/Button";
import type { types } from "@comp/Modal";
import Loader from "@ui/Loader";
import Alert from "@ui/Alert";

interface IProps {
  openModal: types.IModalInstance["openModal"];
  closeModal: types.IModalInstance["closeModal"];
  data?: {
    email: string;
  };
}
const { closeModal, data } = defineProps<IProps>();

const email = data?.email;
if (!email) throw "no email from reg modal to verif modal";

const code = ref("");
const errorMessage = ref<string>("");
const isLoading = ref(false);

const send = async () => {
  errorMessage.value = "";
  if (!code.value) {
    errorMessage.value = "введите код";
    return;
  }

  const {
    data,
    isLoading: innerIsLoading,
    error: apiError,
  } = api.auth.verify({
    email,
    code: code.value.replace(/\s/g, "").slice(0, 6),
  });

  watch(innerIsLoading, (newValue) => (isLoading.value = newValue));
  watch(
    apiError,
    (newValue: Error | string | null) =>
      (errorMessage.value =
        (newValue as Error)?.message ?? (newValue as string) ?? "")
  );
  watch(data, closeModal);
};
</script>
