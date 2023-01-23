import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue3 from "bootstrap-vue-3";
import stores from "@/store";
// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap";

const app = createApp(App);

app.config.globalProperties.$store = stores;

app.use(BootstrapVue3);
app.use(router);
app.use(stores);
app.mount("#app");
