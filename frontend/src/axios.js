import axios from 'axios';
import store from './store/index';

const instance = axios.create({
  baseURL: 'http://localhost:3850',
});

export default instance;
