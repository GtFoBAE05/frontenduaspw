import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
//import Bootsterap, Popper, JQuerry
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";
import Toaster from "@incuca/vue3-toaster";
const app = createApp(App);
//use vue router
app.use(router);
app.use(Toaster);
app.mount("#app");
