import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Supplies from "../views/Supplies.vue";
import Ailton from "../views/Ailton.vue";
import Produtos from "../views/produtos/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/supplies",
    name: "supplies",
    component: Supplies,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/ailton",
    name: "ailton",
    component: Ailton,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/produtos/",
    name: "produtos",
    component: Produtos,
    meta: {
      requiresLogin: true
    }
  },
  { path: "*", component: Login }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
