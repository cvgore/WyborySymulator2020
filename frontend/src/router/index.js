import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: "Home",
    component: () => import("@/views/Surveys"),
  },
  {
    path: "/polls/:id",
    name: "poll",
    component: () => import("@/views/FillPoll")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
