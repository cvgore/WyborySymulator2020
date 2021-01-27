import axios from 'axios';
import store from './store/index';

const instance = axios.create({
  baseURL: 'http://localhost:3850',
  headers: Object.create(
    {},
    {
      Authorization: {
        get() {
          if (!store.getters.Auth.getToken) {
            return '';
          }
          return `Bearer ${store.getters.Auth.getToken}`;
        },
      },
    }
  ),
});

export default instance;
