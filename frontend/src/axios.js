import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3850',
});
// instance.interceptors.request.use(config => {
//   config.headers = {
//     'Authorization': `Bearer token`,
//     'Accept': 'application/json',
//   }
// })
// instance.interceptors.response.use(config => {
//   config.headers = {
//     'Authorization': `Bearer token`,
//     'Accept': 'application/json',
//   }
// })
export default instance;
