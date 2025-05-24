<template>
  <div class="container">
    <div class="row">
      <div
        class="col-xl-4 col-md-4 mb-3"
        v-for="(offer, id) in offers"
        v-bind:key="id"
      >
        <OfferListItem :item="offer" :key="id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { api } from "@/utils/api.service";
import type { IOffer } from "@/utils/types";
import OfferListItem from "@comp/offer/offer-list-item.vue";
import { onMounted } from "vue";

let offers: IOffer[] = [];

onMounted(async () => {
  // const response = await fetch(
  //   "https://gobarter.ru/api/v1/offers/search?only_my=false&page=1&size=50",
  //   {
  //     method: "GET", // Метод запроса
  //     headers: {
  //       "Content-Type": "application/json", // Укажите заголовки, если необходимо
  //       Accept: "application/json",
  //       // "Access-Control-Allow-Origin": "https://gobarter.ru", // Этот заголовок не должен быть здесь
  //     },
  //   }
  // );
  // if (!response.ok) {
  //   // Обработка ошибок
  //   throw new Error(`Ошибка: ${response.status}`);
  // }
  // offers = await response.json().then((data) => data.items); // Преобразование ответа в JSON
});

offers = [
  {
    title: "nothing",
    description: "desc",
    userGive: "nothing",
    userWant: "everything",
  },
  {
    title: "nothing",
    description: "desc",
    userGive: "nothing",
    userWant: "everything",
  },
];
</script>
