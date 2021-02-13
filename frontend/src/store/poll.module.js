const state = {
  polls: [],
  data: null,
  edit: null
};

const getters = {
  getPollById: state => id => {
    return state.polls.find(poll => poll.id === id);
  },
};

const mutations = {
  storePolls(state,payload){
    state.polls = payload
  },
  passPickedData(state,payload){
    state.data = payload
  },
  passEditData(state,payload){
    state.edit = payload
  },
  resetPickedData(state){
    state.data = null;
    state.edit = null;
  }
};


export default {
  state,
  getters,
  mutations,
};
