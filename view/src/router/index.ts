//  src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页",
    },
    component: () => import("@/components/HelloWorld.vue"),
  },
  {
    path: "/helloworld",
    name: "helloworld",
    meta: {
      title: "helloworld",
    },
    component: () => import("@/components/HelloWorld.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;