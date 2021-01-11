import Vue from "vue";
import VueRouter from "vue-router";
//components
import Main from "@/views/Main";
//import Login from "@/views/Login";
//import Login from "@/components/Login";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
  ],
});


export default router;
