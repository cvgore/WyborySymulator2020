import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import store from './store';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

createApp(App).use(store).use(router).use(VueAxios,axios()).mount('#app');
