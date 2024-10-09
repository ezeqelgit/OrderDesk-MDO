import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: "/OrderDesk",
    name: "OrderDesk",
    meta: { cursor: true, click: true },
    component: () => import("../../components/OrderDesk/OrderDesk.vue"),
  },
  {
    path: "/Authorization",
    name: "Authorization",
    meta: { cursor: true, click: true },
    component: () => import("../../components/Authorization/Authorization.vue"),
  },
];

const router = new Router({
  mode: 'history',
  routes
});

export default router;