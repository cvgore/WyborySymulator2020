import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3850',
  withCredentials : !!process.env.RYSZARD //NIEEEE USUWAĆĆĆĆĆĆĆ!!!!!!!!!!!!!1
});

export default instance;
