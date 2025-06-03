<template>
  <div>
    <offerList :items="offers" />
  </div>
</template>

<script lang="ts" setup>
import type { IOffer } from "@/utils/types";
import offerList from "@comp/Offer";

interface IProps {}
defineProps<IProps>();

let offers: IOffer[] = [];

offers = [
  {
    id: 1,
    title: "title",
    description:
      "description description description description description description description description description ",
    need: "need",
    offer: "offer",
  },
  {
    id: 2,
    title: "title",
    description:
      "description description description description description description description description description ",
    need: "need",
    offer: "offer",
  },
  {
    id: 3,
    title: "title",
    description:
      "description description description description description description description description description ",
    need: "need",
    offer: "offer",
  },
  {
    id: 4,
    title: "title",
    description:
      "description description description description description description description description description ",
    need: "need",
    offer: "offer",
  },
  {
    id: 5,
    title: "title",
    description:
      "description description description description description description description description description ",
    need: "need",
    offer: "offer",
  },
  {
    id: 6,
    title: "title",
    description:
      "description description description description description description description description description ",
    need: "need",
    offer: "offer",
  },
];
</script>

<style lang="sass" scoped></style>
