import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home";
import Register from "@/components/Auth/Confirm";
import Login from "@/components/Auth/Login";
import Loginator from "@/views/Loginator";
import PollPreview from "@/views/PollPreview";
import Creating from "@/views/Creating";
import store from '../store/index';
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
    }],
    beforeEnter(to, from, next) {
      if (store.state.Auth.isAuth) {
        next({
          name: "index"
        });
      } else {
        next()
      }
    }
  },
  {
    path: '/polls/:id',
    name: 'pickedPoll',
    component: PollPreview
  },
  {
    path: '/creator',
    name: 'creatorsrator',
    component: Creating,
    beforeEnter(to, from, next) {
      if (store.state.Auth.isAuth) {
        next();
      } else {
        next({
          name: 'log-in'
        })
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
