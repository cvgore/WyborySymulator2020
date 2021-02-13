import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3850',
  withCredentials: !!process.env.RYSZARD,
  delayed: true,
});
instance.interceptors.request.use((config) => {
  if (config.delayed) {
    return new Promise((resolve) => setTimeout(() => resolve(config), 200));
  }
  return config;
});

instance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem(
  'token'
)}`;
export default instance;
