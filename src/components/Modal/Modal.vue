<template>
  <div class="Modal" v-show="isOpened">
    <div class="background" @click="closeModal">
      <div class="content-container" @click.stop="">
        <button class="close-btn" @click="closeModal">X</button>
        <div class="content">
          <component
            :is="currentComponent"
            :key="viewType"
            :openModal
            :closeModal
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, computed } from "vue";
import "./Modal.scss";

import Login from "./views/Login";
import Reg from "./views/Reg";
import Verification from "./views/Verification";
import type { TModalViewType } from "./types";
import CreatePost from "./views/CreatePost";

interface IProps {}
defineProps<IProps>();

let isOpened = ref(false);
let viewType = ref<TModalViewType>("login");

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
  }
});

const closeModal = () => {
  isOpened.value = false;
};

const openModal = (type: TModalViewType) => {
  isOpened.value = true;
  viewType.value = type;
};

defineExpose({ openModal, closeModal });
</script>
