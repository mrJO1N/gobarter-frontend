<template>
  <div class="create-post-form">
    <h2>Разместить объявление</h2>
    <Alert visibilityType="error" v-show="errorMessage">{{
      errorMessage
    }}</Alert>
    <Loader v-show="isLoading" />

    <form class="form-inputs" @submit="send" v-on:keyup.enter="send">
      <Input
        visibility-type="text"
        placeholder="Заголовок"
        v-model="title"
        label="Заголовок"
      />

      <Input
        visibility-type="text"
        placeholder="Что нужно"
        v-model="need"
        label="Что нужно"
      />

      <Input
        visibility-type="text"
        placeholder="Что предлагаете"
        v-model="offer"
        label="Что предлагаете"
      />

      <Input
        visibility-type="textarea"
        placeholder="Описание"
        v-model="description"
        label="Описание"
      />
    </form>

    <Button @click="send">Разместить предложение</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { z } from "zod";

import "./CreatePost.scss";
import { api } from "@/api/main";
import type { types } from "@comp/Modal";
import Input from "@ui/Input";
import Button from "@ui/Button";
import Alert from "@ui/Alert";
import Loader from "@ui/Loader";

interface IProps {
  openModal: types.IModalInstance["openModal"];
  closeModal: types.IModalInstance["closeModal"];
}
const { closeModal } = defineProps<IProps>();

const title = ref("");
const need = ref("");
const offer = ref("");
const description = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const validate = () => {
  const formFields = z.object({
    title: z
      .string()
      .min(3, { message: "мин длина заголовка - 3" })
      .max(50, { message: "макс длина заголовка - 50" }),

    need: z
      .string()
      .min(3, { message: "мин длина того, что нужно - 3" })
      .max(100, { message: "макс длина того, что нужно - 100" }),

    offer: z
      .string()
      .min(3, { message: "мин длина того, что предлогаете - 3" })
      .max(100, { message: "макс длина того, что предлогаете - 100" }),

    description: z
      .string()
      .min(3, { message: "мин длина описания - 3" })
      .max(5000, { message: "макс длина описания - 50" }),
  });

  try {
    return {
      data: formFields.parse({
        title: title.value,
        need: need.value,
        offer: offer.value,
        description: description.value,
      }),
    };
  } catch (err: any) {
    return { error: err as z.ZodError };
  }
};

const send = () => {
  errorMessage.value = "";

  const { error: err, data: formFields } = validate();

  if (err) {
    errorMessage.value = err.issues[0].message;
    return;
  } else if (!formFields) throw "no form fuilds";

  isLoading.value = true;
  const {
    data,
    error: apiError,
    isLoading: apiIsLoading,
  } = api.offer.create(formFields);

  watch(apiIsLoading, (newValue) => (isLoading.value = newValue));
  watch(
    apiError,
    (newValue: Error | string | null) =>
      (errorMessage.value =
        (newValue as Error)?.message ?? (newValue as string) ?? "")
  );
  watch(data, closeModal);
};
</script>
