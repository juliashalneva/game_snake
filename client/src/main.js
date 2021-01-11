import Vue from "vue";
import store from "@/plugins/vuex";
import App from "./App.vue";
//import Main from "@/views/Main.vue";
import router from "@/router/index";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
