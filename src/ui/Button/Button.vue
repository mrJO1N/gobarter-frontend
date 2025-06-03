<template>
  <div class="Button" :class="visibilityType">
    <button :disabled="isDisabled" @click="handleClick">
      <span v-if="loading">Загрузка...</span>
      <span v-else><slot /></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";

type ButtonType = "colored";

export default defineComponent({
  name: "Button",
  props: {
    visibilityType: {
      visibilityType: String as PropType<ButtonType>,
      default: "colored",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const isDisabled = computed(() => props.disabled || props.loading);

    const handleClick = (event: MouseEvent) => {
      emit("click", event);
    };

    return {
      isDisabled,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@use "@/const";
@use "sass:color";

.Button {
  button {
    background-color: const.$accent-color;
    color: #fff;
    padding: 3% 5%;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    width: 100%; /* Занимает всю ширину */

    &:hover {
      background: color.mix(const.$main-color, const.$accent-color);
    }
  }
}
</style>
