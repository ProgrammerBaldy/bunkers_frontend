import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Supplies from "../views/Supplies.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/supplies",
    name: "supplies",
    component: Supplies
  },
  {
    path: "/about",
    name: "About",
    component: function() {
      return import("../views/About.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
