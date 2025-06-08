<template>
  <div class="Home">
    <Alert visibility-type="error" v-if="errorMessage">{{
      errorMessage
    }}</Alert>
    <Loader v-if="isLoading" />

    <InfinityScrollTrigger :loadMore>
      <OfferList :items="offers" />
    </InfinityScrollTrigger>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import type { IGettedOffer } from "@/utils/types";
import InfinityScrollTrigger from "@comp/InfinityScrollTrigger";
import OfferList from "@comp/Offer/";
import { api } from "@/api/main";
import Alert from "@ui/Alert";
import Loader from "@ui/Loader";

interface IProps {}
defineProps<IProps>();

const offers = ref<IGettedOffer[]>([]);
const pageId = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");

const loadMore = () => {
  isLoading.value = true;
  const {
    data,
    error: apiError,
    isLoading: apiIsLoading,
  } = api.offer.search({
    page: pageId.value,
    onlyMy: false,
  });

  watch(
    data,
    (newValue) => (offers.value = { ...offers.value, ...newValue.items })
  );
  watch(apiError, (newValue: Error | string | null) => {
    errorMessage.value =
      (newValue as Error)?.message ?? (newValue as string) ?? "";
  });
  watch(apiIsLoading, (newValue) => (isLoading.value = newValue));
};
</script>

<style lang="sass" scoped></style>
