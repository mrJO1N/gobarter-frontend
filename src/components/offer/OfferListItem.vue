<template>
  <RouterLink :to="`/offer/${item.id}`">
    <div class="OfferListItem">
      <h3 class="title">{{ item.title }}</h3>
      <p class="need">Нужно: {{ cropStr(item.need) }}</p>
      <p class="offer">Дам тебе: {{ cropStr(item.offer) }}</p>

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
@use "sass:color";

.OfferListItem {
  border: 3px solid const.$main-color;
  border-radius: 10px;
  color: const.$main-color;
  background-color: color.mix(const.$main-color, const.$bg-color, 10%);

  height: 30vh;

  .title {
    text-align: center;
    font-size: 2rem;
    border-bottom: 3px solid const.$main-color;
  }

  .need,
  .offer,
  .description {
    margin-bottom: 0;
    margin-left: 5px;
    font-size: 1.2rem;
  }

  .arrow-right_container {
    display: flex;
    justify-content: end;

    .arrow-right {
      width: 25px;
      margin-right: 10px;
    }
  }
}
</style>
