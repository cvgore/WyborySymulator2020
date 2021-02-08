const state = {
  polls: [],
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
};


export default {
  state,
  getters,
  mutations,
};
