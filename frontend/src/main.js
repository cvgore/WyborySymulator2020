import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import store from './store';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .mount('#app');
