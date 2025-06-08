<template>
  <RouterLink :to="`/offer/${item.id}`">
    <div class="OfferListItem">
      <h3 class="title">{{ item.title }}</h3>
      <p class="need">Нужно: {{ cropStr(item.need) }}</p>
      <p class="offer">Готов предложить: {{ cropStr(item.offer) }}</p>

      <p class="description">Описание: {{ cropStr(item.description) }}</p>

      <div class="arrow-right_container">
        <img src="@/assets/icons/arrow-right.svg" class="arrow-right" alt="" />
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { config } from "@/utils/config";
import type { IGettedOffer } from "@/utils/types";

interface IProps {
  item: IGettedOffer;
}
defineProps<IProps>();

const cropStr = (str: string) => {
  const maxLength = +config.get("OFFER_ITEM_MAX_FIELD_LEN");
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};
</script>

<style lang="scss" scoped>
@use "@/const";

.OfferListItem {
  border: 3px solid const.$accent-color;
  border-radius: 10px;
  color: const.$accent-color;
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
