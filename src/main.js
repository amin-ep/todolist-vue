import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import TheDialog from "./components/UI/TheDialog.vue";
import ErrorMessage from "./components/UI/ErrorMessage.vue";
import VueCookies from "vue-cookies";
import BaseSpinner from "./components/UI/BaseSpinner.vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.component("base-button", BaseButton);
app.component("the-dialog", TheDialog);
app.component("error-message", ErrorMessage);
app.component("base-spinner", BaseSpinner);
app.use(VueCookies);
app.use(Vue3Toastify, {
  autoClose: 5000,
  limit: 3,
});
app.mount("#app");
