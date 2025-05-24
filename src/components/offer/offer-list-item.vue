<template>
  <RouterLink to="/">
    <div class="offer-item-list">
      <h3>{{ item.title }}</h3>
      <p class="mb-0">Нужно: {{ item.userWant }}</p>
      <p class="mb-0">Готов предложить: {{ item.userGive }}</p>

      <div class="d-flex justify-content-end">
        <img
          src="@/assets/icons/arrow-right.svg"
          class="arrow-right"
          width="25px"
          alt=""
        />
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { IOffer } from "@/utils/types";

interface IProps {
  item: IOffer;
}

defineProps<IProps>();
</script>

<style lang="sass" scoped></style>
