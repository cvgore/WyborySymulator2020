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
      path: 'register',
      name: 'register',
      component: Register
    }]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
