<template>
  <input class="Input" :class="visibilityType" :elementType />
</template>

<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from "vue";

type TVisibilityType = "email" | "password" | "checkbox" | "text";
interface IProps {
  visibilityType: TVisibilityType;
}
const { visibilityType } = defineProps<IProps>();

let elementType: InputTypeHTMLAttribute = "";

switch (visibilityType) {
  case "email":
  case "password":
  case "text":
    elementType = visibilityType;
    break;
}
</script>

<style lang="scss" scoped>
.Input {
  &.text {
    padding: 6px 12px;
    font-size: 1rem;
    width: 30vw;
    min-width: 240px;

    height: 36px;
    border-radius: 5px;
  }
}
</style>
