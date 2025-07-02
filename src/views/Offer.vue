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
@use "sass:color";

.Offer-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  z-index: -1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .offer_container {
    border-right: 2px solid const.$main-color;
    border-left: 2px solid const.$main-color;
    height: 100%;
    padding: 0 10vw;

    background-color: color.mix(const.$main-color, const.$bg-color, 10%);

    display: flex;
    justify-content: center;
    flex-direction: column;

    * {
      color: const.$main-color;
      span.template {
        font-size: 1.2rem;
      }
    }
    .title {
      font-size: 2.5rem;
      border-bottom: 2.5px solid const.$main-color;
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
