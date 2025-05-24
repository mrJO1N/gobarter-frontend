import { createMemoryHistory, createRouter } from "vue-router";

import Main from "@view/Home.vue";
import AboutView from "@view/About.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/about", component: AboutView },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
