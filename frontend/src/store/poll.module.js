const state = {
  polls: [],
  editData: null
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
  editData(state,payload){
    state.editData = payload
  },
  resetEditData(state,payload){
    state.editData = null;
  }
};


export default {
  state,
  getters,
  mutations,
};
