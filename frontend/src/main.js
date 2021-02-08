import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import '@/./styles.css';
import '../src/assets/main.scss';


createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
