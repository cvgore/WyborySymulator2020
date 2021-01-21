import axios from '../axios'
import {DateTime} from "luxon";

const state = {
  polls: [],
  isLoading: false,
  isError: {
    errMsg: null,
    errCondition: false
  }
};

const getters = {
  openedPolls: state => {
    return state.polls.filter(poll => DateTime.fromISO(poll.validUntil) >= DateTime.local())
  },
  closedPolls: state => {
    return state.polls.filter(poll => DateTime.fromISO(poll.validUntil) <= DateTime.local())
  },
  getPollById: state => id => {
    return state.polls.find(poll => poll.id === id);
  }
}
;

const mutations = {
  loadingChanger(state,payload){
    state.isLoading = payload
  },
  storePolls(state,payload){
    state.polls = payload
  },
  errorCapture(state,payload){
    state.isError.errCondition = true
    state.isError.errMsg = payload
  }
};

const actions = {
  fetchPolls : {
    handler(context){
      context.commit('loadingChanger',true);
      axios.get('/polls').then(({data}) => {
        context.commit('storePolls',data);
      }).catch(error => {
        context.commit('errorCapture',error.message);
      }).finally(()=>{
        context.commit('loadingChanger',false);
      })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
