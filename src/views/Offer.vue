<template>
  <Alert visibility-type="error" v-if="errorMessage">{{ errorMessage }}</Alert>
  <Loader v-show="isLoading" />

  <div class="Offer-view" v-if="offer">
    <div class="offer_container">
      <h2 class="title">{{ offer.title }}</h2>

      <p class="need">
        <span class="template">Нужно:</span> <span>{{ offer.need }}</span>
      </p>
      <p class="offer">
        <span class="template">Дам тебе:</span> <span>{{ offer.offer }}</span>
      </p>

      <p class="description">
        <span class="template">Описание: </span>
        <span>{{ offer.description }}</span>
      </p>
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
@use "@/const";

.Offer-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 80vh;

  .offer_container {
    * {
      color: const.$accent-color;
      span.template {
        font-size: 1.2rem;
      }
      span:not(.template) {
        // text-decoration: underline;
      }
    }
    .title {
      font-size: 2.5rem;
      border-bottom: 2.5px solid const.$accent-color;
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
