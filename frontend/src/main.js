import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@/./styles.css';
createApp(App).use(store).use(router).use(VueAxios,axios).mount('#app');
