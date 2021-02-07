import axios from "@/axios";
const state = {
  email: null,
  token: null,
};

const mutations = {
  changeEmail(state,payload){
    state.email = payload;
  },
  insertToken(state,payload){
    state.token = payload.token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
  }
};
const getters = {
  getEmail: state => {
    return state.email
  },
  getToken: state => {
    return state.token
  }
}
export default {
  state,
  mutations,
  getters
};
