import axios from 'axios';
import store from './store/index';

const headers = {};
Object.defineProperty(headers, 'Authorization', {
  get() {
    if (!store.getters.Auth.getToken.token) {
      return '';
    }
    return `Bearer ${store.getters['Auth/getToken']}`;
  },
});
const instance = axios.create({
  baseURL: 'http://localhost:3850',
  headers,
});

export default instance;
