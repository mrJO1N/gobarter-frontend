<template>
  <div ref="loadMore" class="InfinityScroll">
    <slot />
    <span class="hiden-trigger-element" ref="loadMore-trigger"></span>
  </div>
</template>

<script lang="ts" setup>
import { useElementVisibility } from "@vueuse/core";
import { useTemplateRef, watch } from "vue";

interface IProps {
  loadMore: () => any;
}
const { loadMore } = defineProps<IProps>();

const target = useTemplateRef("loadMore-trigger");
const isTargetVisible = useElementVisibility(target);

watch(isTargetVisible, (newValue) => {
  if (newValue) {
    loadMore();
  }
});
</script>
