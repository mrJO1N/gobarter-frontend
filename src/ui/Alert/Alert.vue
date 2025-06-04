<template>
  <div class="Alert" :class="visibilityType">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

type AlertType = "error" | "warning";

export default defineComponent({
  name: "Alert",
  props: {
    visibilityType: {
      type: String as PropType<AlertType>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@use "@/const";
@use "sass:color";

.Alert {
  background: color.mix(const.$bg-color, red);
  border: 3px solid color.mix(const.$bg-color, red, 0%);
  border-radius: 15px;
  padding: 5px 10px;
  width: auto;
  font-size: 1.2rem;
  color: color.mix(const.$main-color, red, 60%);
}
</style>
