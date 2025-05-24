import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";

import "./main.scss";
import App from "./App.vue";
import mainRouter from "./routers/main.router";

createApp(App).use(mainRouter).mount("#app");
