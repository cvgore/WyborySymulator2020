import { createRouter, createWebHistory } from 'vue-router';
import SurveyDB from '@/views/SurveyDB.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Surveys from '@/views/Surveys.vue';
import Test from '../components/test.vue'

const routes = [
  {
    path: '/',
    redirect: '/surveys',
  },
  {
    path: '/surveys/:id',
    name: 'survey',
    component: Test
  },
  {
    path: '/surveys',
    name: 'surveys',
    component: Surveys,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/create-survey',
    name: 'CreateSurvey',
    component: SurveyDB,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
