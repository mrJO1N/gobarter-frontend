<template>
  <div class="Loader">
    <span class="loader"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
  props: {},
});
</script>

<style lang="scss">
@use "@/const";
@use "sass:color";

$loader-color: #0ff;

.Loader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: const.$main-color;
  opacity: 60%;

  .loader {
    width: 48px;
    height: 48px;
    border: 3px solid const.$bg-color;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid;
      border-color: const.$accent-color transparent;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
