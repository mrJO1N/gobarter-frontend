<template>
  <div class="Input" :class="inputType">
    <label v-if="isTextInput">
      {{ label ?? "" }}
    </label>
    <!-- the end of component has label for checkbox  -->

    <textarea
      v-if="visibilityType === 'textarea'"
      @input="updateValue"
      :placeholder="placeholder"
      class="input-element"
    />
    <input
      class="input-element"
      :type="inputType"
      :placeholder="placeholder"
      :checked="isChecked"
      @input="updateValue"
      @change="updateChecked"
      v-else-if="visibilityType !== 'code'"
    />
    <MaskInput
      class="input-element"
      mask="### ###"
      @input="updateValue"
      placeholder="Код"
      v-show="visibilityType === 'code'"
    />

    <label v-if="!isTextInput">
      {{ label ?? "" }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { MaskInput } from "vue-3-mask";

type VisibilityType =
  | "password"
  | "email"
  | "search"
  | "checkbox"
  | "text"
  | "code"
  | "textarea";

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
    isTextInput(): boolean {
      return !["checkbox"].includes(this.visibilityType);
    },
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

  components: { MaskInput },
});
</script>

<style lang="scss">
@use "@/const";
@use "sass:color";

.Input {
  font-size: 1rem;
  margin-bottom: 10px;

  label {
    font-size: 1rem;
  }

  .input-element {
    background: const.$bg-color;

    &::placeholder {
      color: color.mix(const.$main-text-color, const.$bg-color);
    }

    &:hover {
      background: color.mix(const.$main-text-color, const.$bg-color, 5%);
    }

    &:focus {
      background: color.mix(const.$main-text-color, const.$bg-color, 5%);
      outline: 2px solid const.$accent-color;
    }
  }

  &.password,
  &.email,
  &.search,
  &.text,
  &.code,
  &.textarea {
    .input-element {
      padding: 6px 12px;
      font-size: 1rem;
      width: 100%;
      height: 36px;

      border-radius: 5px;
      border: 0.5px solid #6d6d6d;
    }

    label {
      margin-bottom: 5px;
    }
  }

  &.textarea {
    .input-element {
      height: 12vh;
      resize: none;
    }
  }

  &.checkbox {
    .input-element {
      width: auto;
      transform: scale(1.4);
    }

    label {
      margin-left: 5px;
    }
  }
}
</style>
