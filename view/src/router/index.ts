//  src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const layout = () => import("@/components/layout.vue")
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: layout,
    name: "index",
    redirect: '/home',
    meta: {
      title: "首页",
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import("@/components/HelloWorld.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;