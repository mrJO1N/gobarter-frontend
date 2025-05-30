<template>
  <div class="Input" :class="inputType">
    <label v-if="inputType !== 'checkbox'">
      {{ label ?? "" }}
    </label>
    <!-- the end of component has label for checkbox  -->

    <input
      :type="inputType"
      :placeholder="placeholder"
      :checked="isChecked"
      @input="updateValue"
      @change="updateChecked"
    />

    <label v-if="inputType === 'checkbox'">
      {{ label ?? "" }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

type VisibilityType = "password" | "email" | "search" | "checkbox";

export default defineComponent({
  name: "Input",
  props: {
    modelValue: {
      type: [String, Boolean] as PropType<string | boolean>,
      required: true,
    },
    visibilityType: {
      type: String as PropType<VisibilityType>,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputType(): string {
      return this.visibilityType;
    },
    isChecked(): boolean {
      return this.visibilityType === "checkbox"
        ? Boolean(this.modelValue)
        : false;
    },
  },
  methods: {
    updateValue(event: Event) {
      if (this.visibilityType !== "checkbox") {
        const element = event.target as HTMLInputElement;
        this.$emit("update:modelValue", element.value);
      }
    },
    updateChecked(event: Event) {
      if (this.visibilityType === "checkbox") {
        const element = event.target as HTMLInputElement;
        this.$emit("update:modelValue", element.checked);
      }
    },
  },
});
</script>

<style lang="scss">
.Input {
  font-size: 1rem;

  height: 36px;

  label {
    font-size: 1rem;
  }

  &.password,
  &.email,
  &.search {
    input {
      padding: 6px 12px;
      font-size: 1rem;
      width: 100%;

      border-radius: 5px;
    }

    label {
      margin-bottom: 5px;
    }
  }

  &.checkbox {
    input {
      width: auto;
      transform: scale(1.4);
    }

    label {
      margin-left: 5px;
    }
  }
}
</style>
