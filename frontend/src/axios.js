import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.surveyhero.com/v1',
});

export default instance;
