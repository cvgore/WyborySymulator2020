import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3850',
  withCredentials : !!process.env.RYSZARD
});
instance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
export default instance;