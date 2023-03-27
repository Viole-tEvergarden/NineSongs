//  src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const layout = () => import("@/components/layout.vue")
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: layout,
    name: "index",
    redirect: '/Recommend',
    meta: {
      title: "推荐",
    },
    children: [
      {
        path: '/Recommend',
        name: 'Recommend',
        component: () => import("@/pages/Recommend.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;