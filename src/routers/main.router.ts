import { createMemoryHistory, createRouter } from "vue-router";

import Main from "@view/Home.vue";
import About from "@view/About.vue";
import Offer from "@view/Offer.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/about", component: About },
  { path: "/offer/:id", component: Offer },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
