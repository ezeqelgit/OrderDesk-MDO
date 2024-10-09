import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/Orders",
    name: "Orders",
    meta: { cursor: true, click: true },
    component: () => import("../components/OrderDesk/Orders/Orders.vue"),
  },
  {
    path: "/Authorization",
    name: "Authorization",
    meta: { cursor: true, click: true },
    component: () => import("../components/OrderDesk/Authorization/Authorization.vue"),
  },
];

const router = new Router({
  mode: 'history',
  routes
});

export default router;