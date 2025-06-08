<template>
  <div class="Modal" v-show="isOpened">
    <div class="background" @mousedown="closeModal">
      <div class="content-container" @click.stop="" @mousedown.stop>
        <button class="close-btn" @click="closeModal">X</button>
        <div class="content">
          <component
            :is="currentComponent"
            :key="viewType"
            :openModal
            :closeModal
            :data="dataToModalContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, computed } from "vue";

import "./Modal.scss";
import type { TModalViewType } from "./types";
import Login from "./views/Login";
import Reg from "./views/Reg";
import Verification from "./views/Verification";
import CreatePost from "./views/CreatePost";

interface IProps {}
defineProps<IProps>();

const isOpened = ref(false);
const viewType = ref<TModalViewType>("login");
let dataToModalContent: any = {};

const currentComponent = computed(() => {
  switch (viewType.value) {
    case "login":
      return Login;
    case "reg":
      return Reg;
    case "verification":
      return Verification;
    case "create post":
      return CreatePost;

    case "empty modal":
      return;
  }
});

const closeModal = () => {
  isOpened.value = false;
  viewType.value = "empty modal";
};

const openModal = (type: TModalViewType, data?: any) => {
  isOpened.value = true;
  viewType.value = type;
  dataToModalContent = data;
};

defineExpose({ openModal, closeModal });
</script>
