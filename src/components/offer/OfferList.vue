<template>
  <div class="container">
    <div class="row">
      <div
        class="col-xl-4 col-md-4 mb-3"
        v-for="(offer, id) in items"
        v-bind:key="id"
      >
        <OfferListItem :item="offer" :key="id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IGettedOffer } from "@/utils/types";
import OfferListItem from "@comp/Offer/OfferListItem.vue";

interface IProps {
  items: IGettedOffer[];
}
const { items } = defineProps<IProps>();
</script>
