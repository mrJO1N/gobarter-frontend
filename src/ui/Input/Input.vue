<template>
  <input class="Input" :class="visibilityType" :type="visibilityType" />
</template>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from "vue";

type TVisibilityType = "email" | "password" | "checkbox" | "search";
interface IProps {
  visibilityType: TVisibilityType;
}
const { visibilityType } = defineProps<IProps>();

let elementType: InputTypeHTMLAttribute = "";

switch (visibilityType) {
  case "email":
  case "password":
  case "checkbox":
    elementType = visibilityType;
    break;
  case "search":
    elementType = "text";
    break;
}
</script>

<style lang="scss" scoped>
.Input {
  &.password,
  &.email,
  &search {
    padding: 6px 12px;
    font-size: 1rem;
    width: 30vw;
    min-width: 240px;

    height: 36px;

    border-radius: 5px;
  }

  &.checkbox {
    transform: scale(1.4);
  }
}
</style>
