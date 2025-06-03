<template>
  <RouterLink :to="`/offer/${item.id}`">
    <div class="OfferListItem">
      <h3 class="title">{{ item.title }}</h3>
      <p class="need">Нужно: {{ item.need }}</p>
      <p class="offer">Готов предложить: {{ item.offer }}</p>

      <p class="description">Описание: {{ cropStr(item.description) }}</p>

      <div class="arrow-right_container">
        <img src="@/assets/icons/arrow-right.svg" class="arrow-right" alt="" />
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { config } from "@/utils/config";
import type { IOffer } from "@/utils/types";

interface IProps {
  item: IOffer;
}
defineProps<IProps>();

const cropStr = (str: string) => {
  const maxLength = +config.get("OFFER_ITEM_MAX_DESC_LEN");
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};
</script>

<style lang="scss" scoped>
.OfferListItem {
  .need,
  .offer {
    margin-bottom: 0;
  }

  .arrow-right_container {
    display: flex;
    justify-content: end;

    .arrow-right {
      width: 25px;
    }
  }
}
</style>
