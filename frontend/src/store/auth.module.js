import axios from '../axios'

const state = {
  email: null,
  token: null,
  ts: null
};

const mutations = {
  changeEmail(state,payload){
    state.email = payload;
  },
  insertToken(state,payload){
    state.token = payload.token;
    state.ts = payload.ts;
  }
};
const getters = {
  getEmail: state => {
    return state.email
  },
  getToken: state => {
    return {
      token: state.token,
      ts: state.ts
    }
  }
}
export default {
  state,
  mutations,
  getters
};
