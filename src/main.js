// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Axios from "axios";
Vue.prototype.$http = Axios;

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

import Notifications from "vue-notification";
Vue.use(Notifications);

Vue.use(BootstrapVue);

import vuetify from "@/plugins/vuetify"; // path to vuetify export
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
    "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.19.0/bootstrap-vue-icons.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.19.0/bootstrap-vue.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    // '/print.css' //css stylings should be add to this file in public folder
  ],
};

//repeated data and methods imported here
Vue.mixin({
  data() {
    return {};
  },
  methods: {
    toast(message, type) {
      this.$toast[type](message, {
        position: type == "success" ? "top-left" : "top-center",
        icon: false,
        closeButton: false,
        timeout: 3000,
      });
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  data: {},
  router,
  template: "<App/>",
  components: {
    App,
  },
  vuetify,
  mounted() {},
});
