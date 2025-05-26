<template>verification</template>

<script lang="ts" setup>
interface IProps {
  openModal: types.IModalInstance["openModal"];
}
import type { types } from "@comp/Modal";
import "./Verification.scss";
import Input from "@ui/Input";

const { openModal } = defineProps<IProps>();
</script>
