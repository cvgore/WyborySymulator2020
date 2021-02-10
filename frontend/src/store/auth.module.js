import axios from '@/axios';

const state = {
  isAuth: !!window.localStorage.getItem('status')
};

const mutations = {
  changeAuth(state, payload) {
    state.isAuth = payload;
  },
  reset(state) {
    window.localStorage.clear();
    state.isAuth = false
  },
};
const actions = {
  checkAuth(context){
    if(window.localStorage.getItem('email') && window.localStorage.getItem('token')){
      context.commit('changeAuth',true);
    } else {
      context.commit('changeAuth',false);
    }
  }
}
export default {
  actions,
  state,
  mutations,
};