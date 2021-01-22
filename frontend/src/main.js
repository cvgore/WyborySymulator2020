import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@/./styles.css';
import {VueReCaptcha} from "vue-recaptcha-v3";

createApp(App)
  .use(store)
  .use(router)
  .use(VueReCaptcha, {siteKey:''})
  .mount('#app');
