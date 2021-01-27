import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home";
import Register from "@/components/Auth/Register";
import Login from "@/components/Auth/Login";
import Loginator from "@/views/Loginator";

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path: '/forms',
    name: 'forms',
    component: Loginator,
    children: [{
      path: 'log-in',
      name: 'log-in',
      component: Login
    },{
      path: '2fa',
      name: '2fa',
      component: Register
    }]
  },
  {
    path: '/polls/:id',
    name: 'pickedPoll',
    component: () => import('@/views/PollPreview')
  },
  {
    path: '/creator',
    name: 'creatorsrator',
    component: () => import('@/views/Creating')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
