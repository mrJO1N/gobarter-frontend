<template>
  <Alert visibility-type="error" v-if="errorMessage">{{ errorMessage }}</Alert>
  <Loader v-show="isLoading" />

  <div class="Offer-view" v-if="offer">
    <div class="offer_container">
      <h2 class="title">{{ offer.title }}</h2>

      <p class="need">Нужно: {{ offer.need }}</p>
      <p class="offer">Даст: {{ offer.offer }}</p>

      <p class="description">Описание: {{ offer.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import type { IGettedOffer } from "@/utils/types";
import { api } from "@/api/main";
import Alert from "@ui/Alert";
import Loader from "@ui/Loader";

interface IProps {}
defineProps<IProps>();

const offer = ref<IGettedOffer | null>(null);
const isLoading = ref(false);
const errorMessage = ref("");

onMounted(() => {
  isLoading.value = true;
  const urlRoute = useRoute();
  const offerId = +urlRoute.params.id;

  const {
    data,
    isLoading: apiIsLoading,
    error: apiError,
  } = api.offer.getOne(offerId);

  watch(data, (newValue) => (offer.value = newValue));
  watch(apiIsLoading, (newValue) => (isLoading.value = newValue));
  watch(
    apiError,
    (newValue: Error | string | null) =>
      (errorMessage.value =
        (newValue as Error)?.message ?? (newValue as string) ?? "")
  );
});
</script>

<style lang="scss" scoped>
.Offer-view {
  display: flex;
  .offer_container {
    .title {
    }
    .need {
    }
    .offer {
    }
    .description {
    }
  }
}
</style>
