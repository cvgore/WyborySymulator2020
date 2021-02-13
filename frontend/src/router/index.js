import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/views/Home";
import Register from "@/components/Auth/Confirm";
import Login from "@/components/Auth/Login";
import Loginator from "@/views/Loginator";
import PollPreview from "@/views/PollPreview";
import Creating from "@/views/Creating";
import store from '../store/index';
import Results from "@/views/Results";
const routes = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path: '/user',
    name: 'forms',
    component: Loginator,
    children: [{
      path: 'mail',
      name: 'log-in',
      component: Login
    },{
      path: 'login',
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
    path: '/vote/:id/:str',
    name: 'pickedPoll',
    component: PollPreview
  },
  {
    path: `/results/:id`,
    name: 'results',
    component: Results
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
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
