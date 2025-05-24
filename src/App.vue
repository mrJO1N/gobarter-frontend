<script lang="ts" setup>
import { ref } from "vue";

import Header from "@comp/Header";
import Modal, { types } from "@comp/Modal";

const modalRef = ref<types.IModalInstance | null>(null);

const openModal = (type: types.TModalViewType) => {
  if (modalRef.value) {
    modalRef.value.openModal(type);
  }
};
</script>

<template>
  <Header :openModal />
  <RouterView />
  <Modal ref="modalRef" />
</template>
